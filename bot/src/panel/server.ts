/**
 * Painéis web:
 *   Dono     → http://localhost:8787/
 *   Super    → http://localhost:8787/admin
 *
 *   npm run panel
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import { listTickets, updateTicket, openTicketsCount } from '../ops/tickets.js';
import {
  loadPlatform,
  savePlatform,
  upsertTenant,
  deleteTenant,
  authenticateOwner,
  findTenantBySlug,
  botHealthHint,
} from '../platform/tenants.js';
import { listNiches } from '../config/niches/index.js';
import { readWaStatus } from '../platform/wa-status.js';
import {
  loadPaymentConfig,
  savePaymentConfig,
  paymentProviderSummary,
  handleMercadoPagoWebhook,

} from '../payments/index.js';
import { enqueueOwnerMessage, enqueueOwnerMessage as pushOwner } from '../ops/outbox.js';
import {
  provisionTenant,
  resolveToken,
  setupStatus,
  setRequestTenant,
  getProcessTenant,
} from '../platform/tenant-runtime.js';

import {
  growthDashboard,
  growthFunnel,
  ingestPaste,
  listOpportunities,
  getOpportunity,
  markContacted,
  markDismissed,
  markWon,
  markLost,
  buildWhatsAppLink,
  openGrowthCount,
  classifyDemand,
} from '../growth/index.js';
import {
  attachSseClient,
  startLiveWatchers,
  notifyChange,
  liveClientCount,
} from './live.js';
import { readRecentMessages } from '../core/message-log.js';
import { resolveNicheLabels } from './niche-labels.js';

const PUBLIC = path.join(process.cwd(), 'panel', 'public');
const PORT = Number(process.env.PANEL_PORT || 8787);
const PANEL_TOKEN = process.env.PANEL_TOKEN || 'teron-dev';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.PANEL_TOKEN || 'admin-dev';

function json(res: http.ServerResponse, code: number, body: unknown): void {
  const data = JSON.stringify(body);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Panel-Role',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,OPTIONS',
  });
  res.end(data);
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks as unknown as Uint8Array[]).toString('utf8')));
    req.on('error', reject);
  });
}

function bearer(req: http.IncomingMessage): string {
  const h = req.headers.authorization || '';
  if (h.startsWith('Bearer ')) return h.slice(7).trim();
  return '';
}

function requestToken(req: http.IncomingMessage): string {
  const t = bearer(req);
  if (t) return t;
  try {
    return new URL(req.url || '/', 'http://x').searchParams.get('token') || '';
  } catch {
    return '';
  }
}

/** Resolve tenant do token do dono; null = root/dev */
function resolveOwnerTenant(req: http.IncomingMessage): string | null {
  const t = requestToken(req);
  if (!t) {
    if (PANEL_TOKEN === 'teron-dev') return process.env.TENANT_ID || null;
    return null;
  }
  if (t === PANEL_TOKEN || t === ADMIN_TOKEN) {
    return process.env.TENANT_ID || null; // root / default
  }
  const resolved = resolveToken(t);
  return resolved?.slug || null;
}

function authOwner(req: http.IncomingMessage): boolean {
  const t = requestToken(req);
  if (t && (t === PANEL_TOKEN || t === ADMIN_TOKEN)) return true;
  if (t && resolveToken(t)) return true;
  return PANEL_TOKEN === 'teron-dev' && !t;
}

function authAdmin(req: http.IncomingMessage): boolean {
  const t = requestToken(req);
  if (t === ADMIN_TOKEN || t === PANEL_TOKEN) return true;
  return ADMIN_TOKEN === 'admin-dev' || ADMIN_TOKEN === 'teron-dev';
}

function maskSecret(s: string): string {
  if (!s || s.length < 8) return '••••';
  return s.slice(0, 6) + '••••' + s.slice(-4);
}

function serveStatic(res: http.ServerResponse, urlPath: string): void {
  let rel = urlPath;
  if (rel === '/' || rel === '') rel = '/index.html';
  if (rel === '/admin' || rel === '/admin/') rel = '/admin.html';
  rel = rel.split('?')[0];
  const file = path.normalize(path.join(PUBLIC, rel));
  if (!file.startsWith(PUBLIC)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = path.extname(file);
  const types: Record<string, string> = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.json': 'application/json',
    '.woff2': 'font/woff2',
  };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

async function handleApi(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  pathname: string
): Promise<void> {
  if (req.method === 'OPTIONS') {
    json(res, 204, {});
    return;
  }

  // ── Teron OS Integration API (Integração com Teron OS / Workspace) ──
  if (pathname.startsWith('/api/teron') || pathname.startsWith('/api/v1')) {
    // GET /api/teron/leads ou /api/v1/leads
    if ((pathname === '/api/teron/leads' || pathname === '/api/v1/leads') && req.method === 'GET') {
      const { readLeads } = await import('../core/leads.js');
      const list = readLeads();
      json(res, 200, { ok: true, count: list.length, leads: list });
      return;
    }

    // POST /api/teron/send-message ou /api/v1/send-message
    if ((pathname === '/api/teron/send-message' || pathname === '/api/v1/send-message') && req.method === 'POST') {
      const body = JSON.parse((await readBody(req)) || '{}');
      let target = String(body.chatId || body.to || body.phone || '').trim();
      const text = String(body.text || body.message || '').trim();

      if (!target || !text) {
        json(res, 400, {
          error: 'missing_fields',
          detail: 'Informe "chatId" (ou "phone") e "text" (ou "message")',
        });
        return;
      }

      if (/^\d{10,15}$/.test(target)) {
        target = `${target}@c.us`;
      }

      enqueueOwnerMessage(target, text);
      json(res, 200, {
        ok: true,
        queued: true,
        target,
        text,
        at: new Date().toISOString(),
      });
      return;
    }

    // GET /api/teron/status ou /api/v1/status
    if ((pathname === '/api/teron/status' || pathname === '/api/v1/status') && req.method === 'GET') {
      const wa = readWaStatus();
      const { readLeads } = await import('../core/leads.js');
      json(res, 200, {
        ok: true,
        system: 'Teron Bot Agente API',
        waState: wa.state,
        detail: wa.detail,
        session: wa.session,
        leadsCaptured: readLeads().length,
        updatedAt: wa.updatedAt,
      });
      return;
    }

    // POST /api/teron/webhook-config
    if (pathname === '/api/teron/webhook-config' && req.method === 'POST') {
      const body = JSON.parse((await readBody(req)) || '{}');
      const webhookUrl = String(body.url || body.webhookUrl || '').trim();
      process.env.TERON_OS_WEBHOOK_URL = webhookUrl;
      json(res, 200, {
        ok: true,
        webhookUrl,
        message: 'URL do Webhook Teron OS configurada com sucesso',
      });
      return;
    }
  }

  // ── Auth Público (Login de Dono do Tenant) ───────────────
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const body = JSON.parse((await readBody(req)) || '{}');
    const identifier = String(body.identifier || body.email || body.slug || '').trim();
    const password = String(body.password || body.token || body.secret || '').trim();

    if (!identifier) {
      json(res, 400, { ok: false, error: 'identifier_required', message: 'Informe seu usuário, e-mail ou slug.' });
      return;
    }

    const tenant = authenticateOwner(identifier, password);
    if (tenant) {
      json(res, 200, {
        ok: true,
        tenant,
        token: tenant.ownerToken || tenant.slug || 'teron-dev',
        role: 'owner',
      });
    } else {
      json(res, 401, {
        ok: false,
        error: 'invalid_credentials',
        message: 'Credenciais inválidas. Verifique o usuário e a senha.',
      });
    }
    return;
  }

  if (pathname === '/api/niches' && req.method === 'GET') {
    json(res, 200, { niches: listNiches() });
    return;
  }

  if (pathname === '/api/niche-labels' && req.method === 'GET') {
    const url = new URL(req.url || '/', 'http://x');
    const nicheId = url.searchParams.get('nicheId') || 'generic';
    json(res, 200, resolveNicheLabels(nicheId));
    return;
  }

  // ── Super-admin ──────────────────────────────────────────
  if (pathname.startsWith('/api/admin')) {
    if (!authAdmin(req)) {
      json(res, 401, { error: 'unauthorized_admin' });
      return;
    }

    if (pathname === '/api/admin/overview' && req.method === 'GET') {
      const platform = loadPlatform();
      const health = botHealthHint();
      json(res, 200, {
        platform,
        health,
        niches: listNiches(),
        liveTenant: {
          tickets: openTicketsCount(),
        },
      });
      return;
    }

    if (pathname === '/api/admin/platform' && req.method === 'GET') {
      json(res, 200, loadPlatform());
      return;
    }

    if (pathname === '/api/admin/platform' && req.method === 'POST') {
      const body = JSON.parse((await readBody(req)) || '{}');
      const next = savePlatform(body);
      json(res, 200, next);
      return;
    }

    if (pathname === '/api/admin/tenants' && req.method === 'GET') {
      json(res, 200, { tenants: loadPlatform().tenants });
      return;
    }

    if (pathname === '/api/admin/tenants' && req.method === 'POST') {
      const body = JSON.parse((await readBody(req)) || '{}');
      const result = provisionTenant({
        name: body.name || 'Novo cliente',
        slug: body.slug,
        nicheId: body.nicheId || 'generic',
        plan: body.plan || 'starter',
        email: body.email || body.ownerEmail,
        panelBaseUrl:
          process.env.PANEL_PUBLIC_URL || `http://localhost:${PORT}`,
      });

      const p = loadPlatform();
      const t = p.tenants.find((x) => x.id === result.tenant.id || x.slug === result.tenant.slug);
      if (t) {
        if (body.ownerName) t.ownerName = body.ownerName;
        if (body.email || body.ownerEmail) t.ownerEmail = body.email || body.ownerEmail;
        if (body.password || body.ownerPassword) t.ownerPassword = body.password || body.ownerPassword;
        if (result.accessToken) t.ownerToken = result.accessToken;
        upsertTenant(t);
      }

      json(res, 200, {
        tenant: t || result.tenant,
        setupUrl: result.setupUrl,
        accessToken: result.accessToken,
        message:
          'Cliente criado com sucesso! O dono já pode acessar o painel.',
        platform: loadPlatform(),
      });
      return;
    }

    // reenviar link de acesso do tenant
    const accessMatch = pathname.match(
      /^\/api\/admin\/tenants\/([^/]+)\/access$/
    );
    if (accessMatch && req.method === 'POST') {
      const slug = accessMatch[1];
      const { loadOwner, tenantPaths, provisionTenant: prov } = await import(
        '../platform/tenant-runtime.js'
      );
      let owner = loadOwner(slug);
      if (!owner) {
        const meta = loadPlatform().tenants.find((x) => x.slug === slug);
        const r = provisionTenant({
          name: meta?.name || slug,
          slug,
          nicheId: meta?.nicheId,
          plan: meta?.plan,
        });
        owner = r.owner;
      }
      const base =
        process.env.PANEL_PUBLIC_URL || `http://localhost:${PORT}`;
      const setupUrl = `${base.replace(/\/$/, '')}/?tenant=${encodeURIComponent(slug)}&token=${encodeURIComponent(owner.token)}&setup=1`;
      json(res, 200, {
        slug,
        setupUrl,
        accessToken: owner.token,
        paths: tenantPaths(slug).root,
      });
      return;
    }

    const tenantDeleteMatch = pathname.match(/^\/api\/admin\/tenants\/([^/]+)$/);
    if (tenantDeleteMatch && req.method === 'DELETE') {
      const id = tenantDeleteMatch[1];
      const platform = deleteTenant(id);
      json(res, 200, { ok: true, message: 'Tenant removido com sucesso', platform });
      return;
    }

    const tenantPatch = pathname.match(/^\/api\/admin\/tenants\/([^/]+)$/);
    if (tenantPatch && req.method === 'PATCH') {
      const id = tenantPatch[1];
      const body = JSON.parse((await readBody(req)) || '{}');
      const p = loadPlatform();
      const cur = p.tenants.find((x) => x.id === id || x.slug === id);
      if (!cur) {
        json(res, 404, { error: 'not_found' });
        return;
      }
      const next = { ...cur, ...body, id: cur.id };
      upsertTenant(next);
      json(res, 200, { tenant: next });
      return;
    }



    if (pathname === '/api/admin/business' && req.method === 'GET') {
      try {
        const f = path.join(process.cwd(), 'config', 'business.json');
        json(res, 200, JSON.parse(fs.readFileSync(f, 'utf8')));
      } catch (e) {
        json(res, 500, { error: String(e) });
      }
      return;
    }

    if (pathname === '/api/admin/business' && req.method === 'POST') {
      const body = JSON.parse((await readBody(req)) || '{}');
      const f = path.join(process.cwd(), 'config', 'business.json');
      let cur: Record<string, unknown> = {};
      try {
        cur = JSON.parse(fs.readFileSync(f, 'utf8'));
      } catch {
        /* empty */
      }
      const next = { ...cur, ...body };
      fs.writeFileSync(f, JSON.stringify(next, null, 2), 'utf8');
      json(res, 200, next);
      return;
    }

    json(res, 404, { error: 'admin_not_found', path: pathname });
    return;
  }

  // ── Webhook Mercado Pago (público — antes do auth do painel) ──
  if (
    (pathname === '/api/payments/webhook/mercadopago' ||
      pathname === '/api/webhooks/mercadopago') &&
    (req.method === 'POST' || req.method === 'GET')
  ) {
    try {
      let payload: Record<string, unknown> = {};
      if (req.method === 'POST') {
        const raw = await readBody(req);
        payload = raw ? JSON.parse(raw) : {};
      }
      const url = new URL(req.url || '/', 'http://x');
      const qid = url.searchParams.get('data.id') || url.searchParams.get('id');
      if (qid && !payload.data) payload.data = { id: qid };
      if (url.searchParams.get('topic'))
        payload.type = url.searchParams.get('topic') || payload.type;

      const result = await handleMercadoPagoWebhook(payload);

      json(res, 200, { ok: true, result });
    } catch (e) {
      json(res, 200, { ok: false, error: String(e) });
    }
    return;
  }

  // ── Owner API (self-service por tenant) ──────────────────
  if (!authOwner(req)) {
    json(res, 401, { error: 'unauthorized' });
    return;
  }

  const tenantSlug = resolveOwnerTenant(req);
  setRequestTenant(tenantSlug);

  if (pathname === '/api/me' && req.method === 'GET') {
    const setup = setupStatus(tenantSlug || '_root');
    const wa = readWaStatus();
    if (wa.state === 'online') {
      const step = setup.steps.find((s) => s.id === 'wa');
      if (step) step.done = true;
      setup.percent = Math.round(
        (setup.steps.filter((s) => s.done).length / setup.steps.length) * 100
      );
    }
    json(res, 200, {
      tenantSlug: tenantSlug || getProcessTenant() || 'default',
      role: 'owner',
      setup,
      payments: paymentProviderSummary(),
      selfService: true,
    });
    return;
  }

  if (pathname === '/api/health') {
    json(res, 200, {
      ok: true,
      niche: 'barbershop',
      role: 'owner',
      tenantSlug: tenantSlug || 'default',
      time: new Date().toISOString(),
      health: botHealthHint(),
      wa: readWaStatus(),
      payments: paymentProviderSummary(),
    });
    return;
  }

  // setup self-service: loja + equipe + serviços + horários


  // mensagens WhatsApp (inbox do painel)
  if (pathname === '/api/messages' && req.method === 'GET') {
    const url = new URL(req.url || '/', 'http://x');
    const limit = Math.min(Number(url.searchParams.get('limit') || 80), 300);
    const chatId = url.searchParams.get('chatId') || undefined;
    const list = readRecentMessages(limit, chatId || undefined);
    json(res, 200, {
      messages: list,
      count: list.length,
      at: new Date().toISOString(),
    });
    return;
  }

  if (pathname === '/api/setup/status' && req.method === 'GET') {
    const setup = setupStatus(tenantSlug || '_root');
    const wa = readWaStatus();
    if (wa.state === 'online') {
      const step = setup.steps.find((s) => s.id === 'wa');
      if (step) step.done = true;
    }
    json(res, 200, setup);
    return;
  }

  // ── TERON Growth ─────────────────────────────────────────
  if (pathname === '/api/growth/dashboard' && req.method === 'GET') {
    json(res, 200, growthDashboard());
    return;
  }

  if (pathname === '/api/growth/opportunities' && req.method === 'GET') {
    const url = new URL(req.url || '/', 'http://x');
    const status = url.searchParams.get('status') || undefined;
    const all = url.searchParams.get('all') === '1';
    const list = all
      ? listOpportunities()
      : listOpportunities(
          status
            ? { status: status as any }
            : { status: ['new', 'delivered', 'contacted'] }
        );
    json(res, 200, { opportunities: list, funnel: growthFunnel() });
    return;
  }

  if (pathname === '/api/growth/ingest' && req.method === 'POST') {
    const body = JSON.parse((await readBody(req)) || '{}');
    const text = String(body.text || body.rawText || '').trim();
    const sourceUrl = body.sourceUrl ? String(body.sourceUrl) : undefined;
    if (!text) {
      json(res, 400, { error: 'text_required' });
      return;
    }
    // se colou só URL, usa a URL como texto de contexto
    const result = await ingestPaste({
      text,
      sourceUrl,
      source: body.source || (sourceUrl ? 'paste' : 'manual'),
    });
    if (!result.opportunity) {
      json(res, 200, {
        ok: false,
        discarded: result.discarded,
        // ainda devolve classificação se útil
        preview: await classifyDemand(text),
      });
      return;
    }
    json(res, 200, { ok: true, opportunity: result.opportunity });
    return;
  }

  if (pathname === '/api/growth/classify' && req.method === 'POST') {
    const body = JSON.parse((await readBody(req)) || '{}');
    const text = String(body.text || '').trim();
    if (!text) {
      json(res, 400, { error: 'text_required' });
      return;
    }
    const classification = await classifyDemand(text);
    json(res, 200, { classification });
    return;
  }

  const growthIdMatch = pathname.match(
    /^\/api\/growth\/opportunities\/([^/]+)(?:\/(contact|dismiss|won|lost|wa))?$/
  );
  if (growthIdMatch && req.method === 'POST') {
    const id = growthIdMatch[1];
    const action = growthIdMatch[2] || 'contact';
    const body = JSON.parse((await readBody(req)) || '{}');
    let o = getOpportunity(id);
    if (!o) {
      json(res, 404, { error: 'not_found' });
      return;
    }
    if (action === 'contact' || action === 'wa') {
      o = markContacted(id);
      const link = buildWhatsAppLink(id, body.phone);
      json(res, 200, { opportunity: o, whatsapp: link });
      return;
    }
    if (action === 'dismiss') {
      o = markDismissed(id, body.note);
      json(res, 200, { opportunity: o });
      return;
    }
    if (action === 'won') {
      o = markWon(id, {
        revenue: body.revenue != null ? Number(body.revenue) : undefined,
        bookingId: body.bookingId,
      });
      json(res, 200, { opportunity: o });
      return;
    }
    if (action === 'lost') {
      o = markLost(id);
      json(res, 200, { opportunity: o });
      return;
    }
    json(res, 400, { error: 'unknown_action' });
    return;
  }

  // Status + QR WhatsApp (dono e admin)
  if (pathname === '/api/wa/status' && req.method === 'GET') {
    json(res, 200, readWaStatus());
    return;
  }

  if (pathname === '/api/payments/config' && req.method === 'GET') {
    if (!authOwner(req) && !authAdmin(req)) {
      json(res, 401, { error: 'unauthorized' });
      return;
    }
    const cfg = loadPaymentConfig();
    // não vaza token completo no dono — admin vê mascarado
    const masked = {
      ...cfg,
      mercadoPago: cfg.mercadoPago
        ? {
            ...cfg.mercadoPago,
            accessToken: cfg.mercadoPago.accessToken
              ? maskSecret(cfg.mercadoPago.accessToken)
              : '',
            webhookSecret: cfg.mercadoPago.webhookSecret
              ? '••••'
              : '',
          }
        : undefined,
      summary: paymentProviderSummary(cfg),
      webhookUrl: `http://localhost:${PORT}/api/payments/webhook/mercadopago`,
    };
    // admin com token admin vê flag hasToken
    if (authAdmin(req)) {
      (masked as any).mercadoPagoHasToken = Boolean(
        loadPaymentConfig().mercadoPago?.accessToken
      );
    }
    json(res, 200, masked);
    return;
  }

  if (pathname === '/api/payments/config' && req.method === 'POST') {
    if (!authAdmin(req) && !authOwner(req)) {
      json(res, 401, { error: 'unauthorized' });
      return;
    }
    const body = JSON.parse((await readBody(req)) || '{}');
    // se token mascarado, não sobrescreve
    if (
      body.mercadoPago?.accessToken &&
      String(body.mercadoPago.accessToken).includes('••••')
    ) {
      delete body.mercadoPago.accessToken;
    }
    if (body.mercadoPago?.accessToken === '') {
      delete body.mercadoPago.accessToken;
    }
    // merge: se veio accessToken novo, grava
    const cur = loadPaymentConfig();
    if (body.mercadoPago && !body.mercadoPago.accessToken) {
      body.mercadoPago.accessToken = cur.mercadoPago?.accessToken || '';
    }
    // dono pode ativar MP sozinho
    if (body.mercadoPago?.accessToken && body.activeProvider === 'mercado_pago') {
      body.mercadoPago.enabled = true;
    }
    const next = savePaymentConfig(body);

    json(res, 200, {
      ...next,
      mercadoPago: {
        ...next.mercadoPago,
        accessToken: next.mercadoPago?.accessToken
          ? maskSecret(next.mercadoPago.accessToken)
          : '',
      },
      summary: paymentProviderSummary(next),
    });
    return;
  }


  // ── Tempo real (SSE) ─────────────────────────────────────
  if (pathname === '/api/events' && req.method === 'GET') {
    attachSseClient(res, resolveOwnerTenant(req) || '_root');
    // conexão fica aberta — não encerra a resposta
    return;
  }

  if (pathname === '/api/live' && req.method === 'GET') {
    json(res, 200, {
      clients: liveClientCount(),
      realtime: true,
      at: new Date().toISOString(),
    });
    return;
  }

  if (pathname === '/api/dashboard' && req.method === 'GET') {
    const growth = growthDashboard();
    
    // niche universal labels
    let nicheId = process.env.NICHE_ID || 'teron';
    try {
      const bizPath = path.join(process.cwd(), 'config', 'business.json');
      if (fs.existsSync(bizPath)) {
        const biz = JSON.parse(fs.readFileSync(bizPath, 'utf8'));
        if (biz.nicheId) nicheId = biz.nicheId;
      }
    } catch {
      /* ignore */
    }
    const labels = resolveNicheLabels(nicheId);

    json(res, 200, {
      labels,
      nicheId,
      health: botHealthHint(),
      growth: {
        funnel: growth.funnel,
        openCount: growth.openCount,
      },
      dayReport: {
        ticketsOpen: openTicketsCount(),
      },
      kpis: {
        growthOpen: growth.openCount,
        ticketsOpen: openTicketsCount(),
      }
    });
    return;
  }



  if (pathname === '/api/tickets' && req.method === 'GET') {
    json(res, 200, { tickets: listTickets() });
    return;
  }

  const tickMatch = pathname.match(/^\/api\/tickets\/([^/]+)$/);
  if (tickMatch && req.method === 'PATCH') {
    const body = JSON.parse((await readBody(req)) || '{}');
    const t = updateTicket(tickMatch[1], {
      status: body.status,
      ownerNote: body.ownerNote,
    });
    if (!t) {
      json(res, 404, { error: 'not_found' });
      return;
    }
    if (body.reply && t.chatId) {
      enqueueOwnerMessage(t.chatId, String(body.reply));
    }
    notifyChange('tickets', 'panel', { id: t.id, status: t.status });
    json(res, 200, { ticket: t });
    return;
  }



  json(res, 404, { error: 'not_found', path: pathname });
}

export function startPanelServer(): http.Server {
  if (!fs.existsSync(PUBLIC)) {
    fs.mkdirSync(PUBLIC, { recursive: true });
  }

  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(
        req.url || '/',
        `http://${req.headers.host || 'localhost'}`
      );
      if (url.pathname.startsWith('/api/')) {
        await handleApi(req, res, url.pathname);
        return;
      }
      serveStatic(res, url.pathname);
    } catch (e) {
      json(res, 500, { error: String(e) });
    } finally {
      setRequestTenant(null);
    }
  });

  startLiveWatchers();
  server.listen(PORT, () => {
    console.log(`\n  ════════════════════════════════════════`);
    console.log(`  🖥️  Painel DONO     → http://localhost:${PORT}/`);
    console.log(`  🛠️  Painel ADMIN    → http://localhost:${PORT}/admin`);
    console.log(`  🔴  Tempo real SSE  → /api/events`);
    console.log(`  🔑  Owner token     → ${PANEL_TOKEN}`);
    console.log(`  🔑  Admin token     → ${ADMIN_TOKEN}`);
    console.log(`  ════════════════════════════════════════\n`);
  });
  return server;
}

const entry = process.argv[1] || '';
const isMain =
  /panel[\\/]server\.(ts|js|cjs)$/.test(entry) ||
  entry.endsWith('server.cjs') ||
  entry.includes('panel/server');
if (isMain) {
  startPanelServer();
}
