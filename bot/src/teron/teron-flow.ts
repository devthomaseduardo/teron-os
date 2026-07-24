import { sessionStore } from '../core/session.js';
import { appendLead } from '../core/leads.js';
import { normalize } from '../util/text.js';
import type { RichMessage } from '../messaging/types.js';
import {
  tplTeronMenu,
  tplAskStep1FirstName,
  tplAskStep2CompanyName,
  tplAskStep3Email,
  tplAskStep4City,
  tplAskStep5Website,
  tplAskStep6ProjectType,
  tplAskStep7ProjectDetails,
  tplAskStep8Deadline,
  tplTeronCompleted,
  tplClientInfo,
  tplPricingInfo,
  tplHandoff,
  tplScheduleCall,
  tplVisitWebsite,
  tplPosProposta,
  tplEmailError,
  tplGenericError,
  tplProdutoTeronIntro,
  tplRecruiterIntro,
  tplRecruiterDone,
} from './templates.js';

export interface TeronFlowResult {
  handled: boolean;
  text: string;
  source: string;
  rich?: RichMessage;
}

type TeronStep =
  | 'idle'
  | 'menu'
  | 'step1_first_name'
  | 'step2_company_name'
  | 'step3_email'
  | 'step4_city'
  | 'step5_website'
  | 'step6_project_type'
  | 'step7_project_details'
  | 'step8_deadline'
  | 'recruiter_name'
  | 'recruiter_company'
  | 'recruiter_role'
  | 'done';

function stepOf(chatId: string): TeronStep {
  return (sessionStore.get(chatId).profile.teron_step as TeronStep) || 'idle';
}

function setStep(chatId: string, step: TeronStep): void {
  sessionStore.setProfile(chatId, 'teron_step', step);
  sessionStore.setTopic(chatId, 'teron_b2b', { intentId: 'teron', awaiting: step });
}

function rich(r: RichMessage, source = 'teron'): TeronFlowResult {
  return { handled: true, text: r.text, source, rich: r };
}

function isGreeting(text: string): boolean {
  const t = (text || '').trim().toLowerCase();
  if (!t || t.length > 40) return false;
  return /^(oi+|oie|ola+|olá|eae|eai|iae|fala|salve|hey|hi|hello|bom dia|boa tarde|boa noite|menu|0)[\s!.?]*$/.test(
    t
  );
}

function isEscapeCommand(text: string, n: string): boolean {
  return isGreeting(text) || /^(menu|voltar|cancelar|sair|0|reiniciar)$/i.test(n.trim());
}

function handleFail(chatId: string, customErrorFn?: (fails: number) => RichMessage): TeronFlowResult {
  const fails = sessionStore.bumpFail(chatId);
  if (fails >= 3) {
    sessionStore.setHandoff(chatId, true);
    return rich({
      text: 'Notei dificuldade em compreender a resposta. Transferindo para um especialista do time.',
      keepTogether: true,
    });
  }
  if (customErrorFn) return rich(customErrorFn(fails));
  return rich(tplGenericError(fails));
}

function generatePersonalizedProposalUrl(p: {
  name: string;
  company: string;
  email: string;
  city: string;
  project_type: string;
  project_details: string;
  deadline: string;
}): string {
  const companyName = p.company || p.name || 'cliente';
  const slug = companyName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const proposalId = `os-${slug}-${randomSuffix}`;
  const queryParams = new URLSearchParams({
    cliente: p.name || '',
    empresa: p.company || '',
    email: p.email || '',
    endereco: p.city || 'São Paulo, SP',
    projeto: p.project_type || 'Portal Dealer B2B & Plataforma Web',
    briefing: p.project_details || '',
    prazo: p.deadline || '15 dias úteis',
  }).toString();
  const baseUrl = (process.env.TERON_OS_URL || 'https://os.thomaseduardo.com.br').replace(/\/$/, '');
  return `${baseUrl}/proposta/${proposalId}?${queryParams}`;
}

async function createProposalOnOs(
  chatId: string,
  leadProfile: {
    name: string;
    company: string;
    email: string;
    city: string;
    project_type: string;
    project_details: string;
    deadline: string;
    website?: string;
    intent?: string;
  }
): Promise<string> {
  const phoneDigits = chatId.replace(/\D/g, '');
  let proposalUrl = '';

  try {
    const teronOsUrl = (process.env.TERON_OS_URL || 'https://os.thomaseduardo.com.br').replace(/\/$/, '');
    const leadPayload = {
      name: leadProfile.name,
      company: leadProfile.company,
      email: leadProfile.email,
      phone: phoneDigits,
      whatsappId: chatId,
      city: leadProfile.city,
      address: leadProfile.city || 'São Paulo, SP',
      projectType: leadProfile.project_type,
      briefing: leadProfile.project_details,
      deadline: leadProfile.deadline,
      answers: {
        ...leadProfile,
        intent: leadProfile.intent || 'proposta',
      },
    };

    let res = await fetch(`${teronOsUrl}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload),
    });

    if (!res.ok) {
      res = await fetch(`${teronOsUrl}/_build/createLeadFn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
    }

    const rawRes = await res.text();
    try {
      const data = JSON.parse(rawRes) as { url?: string; proposalUrl?: string; result?: { url?: string } };
      proposalUrl = data.url || data.proposalUrl || data.result?.url || '';
    } catch {
      /* ignore */
    }
  } catch (err) {
    console.warn('[teron-flow] OS offline:', err);
  }

  if (!proposalUrl) {
    proposalUrl = generatePersonalizedProposalUrl(leadProfile);
  }
  return proposalUrl;
}

export async function runTeronFlow(chatId: string, userText: string): Promise<TeronFlowResult | null> {
  const text = (userText || '').trim();
  const n = normalize(text);

  if (isEscapeCommand(text, n)) {
    sessionStore.setHandoff(chatId, false);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'booking_step', 'idle');
    setStep(chatId, 'menu');
    return rich(tplTeronMenu());
  }

  const current = stepOf(chatId);

  if (current === 'done') {
    if (n.includes('status') || n.includes('onboarding') || n.includes('acessei') || n.includes('assinei') || n.includes('paguei')) {
      return rich(tplPosProposta(sessionStore.get(chatId).profile.name || 'cliente'));
    }
    if (n.includes('humano') || n.includes('falar') || n.includes('time')) {
      sessionStore.setHandoff(chatId, true);
      return rich(tplHandoff());
    }
    sessionStore.clearFails(chatId);
    setStep(chatId, 'menu');
    return rich(tplTeronMenu());
  }

  // MENU
  if (current === 'menu' || current === 'idle') {
    // 1 — orçamento padrão
    if (n === '1' || n.includes('orcamento') || n.includes('orçamento') || n.includes('proposta')) {
      sessionStore.setProfile(chatId, 'intent', 'proposta');
      setStep(chatId, 'step1_first_name');
      sessionStore.clearFails(chatId);
      return rich(tplAskStep1FirstName());
    }
    // 7 — quero um projeto como o TERON OS
    if (
      n === '7' ||
      n.includes('projeto como') ||
      n.includes('como este') ||
      n.includes('como o teron') ||
      n.includes('estilo teron') ||
      n.includes('sistema operacional')
    ) {
      sessionStore.setProfile(chatId, 'intent', 'produto_teron');
      sessionStore.setProfile(chatId, 'project_type', 'Produto no estilo TERON OS');
      setStep(chatId, 'step1_first_name');
      sessionStore.clearFails(chatId);
      return rich(tplProdutoTeronIntro());
    }
    // 8 — recrutador
    if (n === '8' || n.includes('recrutador') || n.includes('vaga') || n.includes('rh') || n.includes('talent')) {
      sessionStore.setProfile(chatId, 'intent', 'recrutador');
      setStep(chatId, 'recruiter_name');
      sessionStore.clearFails(chatId);
      return rich(tplRecruiterIntro());
    }
    if (n === '2' || n.includes('cliente') || n.includes('ja sou')) return rich(tplClientInfo());
    if (n === '3' || n.includes('prazo') || n.includes('valor')) return rich(tplPricingInfo());
    if (n === '4' || n.includes('falar') || n.includes('atendente') || n.includes('time') || n.includes('humano')) {
      sessionStore.setHandoff(chatId, true);
      return rich(tplHandoff());
    }
    if (n === '5' || n.includes('agendar') || n.includes('call') || n.includes('reuniao') || n.includes('reunião')) {
      return rich(tplScheduleCall());
    }
    if (n === '6' || n.includes('site') || n.includes('acessar') || n.includes('link')) {
      return rich(tplVisitWebsite());
    }
    if (n.includes('reiniciar')) {
      setStep(chatId, 'menu');
      return rich(tplTeronMenu());
    }
  }

  // RECRUTADOR
  if (current === 'recruiter_name') {
    if (text.length < 2) return handleFail(chatId);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'name', text.split(' ')[0]);
    setStep(chatId, 'recruiter_company');
    return rich({ text: 'Qual a empresa ou consultoria que você representa?', keepTogether: true });
  }
  if (current === 'recruiter_company') {
    if (text.length < 2) return handleFail(chatId);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'company', text);
    setStep(chatId, 'recruiter_role');
    return rich({ text: 'Qual a vaga ou perfil que está buscando?', keepTogether: true });
  }
  if (current === 'recruiter_role') {
    if (text.length < 2) return handleFail(chatId);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'project_details', text);
    const p = sessionStore.get(chatId).profile;
    appendLead({
      chatId,
      profile: {
        name: p.name || '',
        company: p.company || '',
        role: text,
        intent: 'recrutador',
      },
      source: 'teron:recruiter',
    });
    // Lead na OS (sem proposta comercial)
    try {
      const teronOsUrl = (process.env.TERON_OS_URL || 'https://os.thomaseduardo.com.br').replace(/\/$/, '');
      await fetch(`${teronOsUrl}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: p.name,
          company: p.company,
          phone: chatId.replace(/\D/g, ''),
          whatsappId: chatId,
          projectType: 'Recrutamento',
          briefing: text,
          answers: { intent: 'recrutador', role: text },
        }),
      });
    } catch {
      /* offline ok */
    }
    setStep(chatId, 'done');
    return rich(tplRecruiterDone(p.name || 'recrutador'));
  }

  // DISCOVERY PROPOSTA / PRODUTO TERON
  if (current === 'step1_first_name') {
    if (text.length < 2) return handleFail(chatId);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'name', text.split(' ')[0]);
    setStep(chatId, 'step2_company_name');
    return rich(tplAskStep2CompanyName(text.split(' ')[0]));
  }
  if (current === 'step2_company_name') {
    if (text.length < 2) return handleFail(chatId);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'company', text);
    setStep(chatId, 'step3_email');
    return rich(tplAskStep3Email());
  }
  if (current === 'step3_email') {
    if (!/\S+@\S+\.\S+/.test(text)) return handleFail(chatId, tplEmailError);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'email', text);
    setStep(chatId, 'step4_city');
    return rich(tplAskStep4City());
  }
  if (current === 'step4_city') {
    if (text.length < 2) return handleFail(chatId);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'city', text);
    setStep(chatId, 'step5_website');
    return rich(tplAskStep5Website());
  }
  if (current === 'step5_website') {
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'website', text);
    // Se já veio como produto TERON, pula escolha de tipo
    const intent = sessionStore.get(chatId).profile.intent;
    if (intent === 'produto_teron') {
      sessionStore.setProfile(chatId, 'project_type', 'Produto no estilo TERON OS');
      setStep(chatId, 'step7_project_details');
      return rich(tplAskStep7ProjectDetails());
    }
    setStep(chatId, 'step6_project_type');
    return rich(tplAskStep6ProjectType());
  }
  if (current === 'step6_project_type') {
    let type = text.trim();
    if (n === '1' || n.includes('landing')) type = 'Landing Page';
    else if (n === '2' || n.includes('portal') || n.includes('web app')) type = 'Portal / Web App';
    else if (n === '3' || n.includes('automa') || n.includes('whatsapp')) type = 'Automação WhatsApp & OS';
    else if (n === '4' || n.includes('medida') || n.includes('outro')) type = 'Sistema Sob Medida / Outro';
    else if (n === '5' || n.includes('teron') || n.includes('estilo')) type = 'Produto no estilo TERON OS';
    if (type.length < 2) return handleFail(chatId);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'project_type', type);
    setStep(chatId, 'step7_project_details');
    return rich(tplAskStep7ProjectDetails());
  }
  if (current === 'step7_project_details') {
    if (text.length < 2) return handleFail(chatId);
    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'project_details', text);
    setStep(chatId, 'step8_deadline');
    return rich(tplAskStep8Deadline());
  }
  if (current === 'step8_deadline') {
    let deadline = text.trim();
    if (n === '1' || n.includes('15') || n.includes('urgente')) deadline = 'Até 15 dias (Urgente)';
    else if (n === '2' || n.includes('30') || n.includes('1 mes') || n.includes('1 mês')) deadline = 'Até 30 dias (1 mês)';
    else if (n === '3' || n.includes('60') || n.includes('sem pressa')) deadline = '60+ dias (Sem pressa)';
    else if (n === '4' || n.includes('definir')) deadline = 'A definir / Orçamento';

    sessionStore.clearFails(chatId);
    sessionStore.setProfile(chatId, 'deadline', deadline);
    const p = sessionStore.get(chatId).profile;

    appendLead({
      chatId,
      profile: {
        name: p.name || '',
        company: p.company || '',
        email: p.email || '',
        city: p.city || '',
        website: p.website || '',
        project_type: p.project_type || '',
        project_details: p.project_details || '',
        deadline,
        intent: p.intent || 'proposta',
      },
      source: 'teron:b2b_flow',
    });

    const proposalUrl = await createProposalOnOs(chatId, {
      name: p.name || 'Contato Teron',
      company: p.company || '',
      email: p.email || '',
      city: p.city || '',
      project_type: p.project_type || 'Projeto sob medida',
      project_details: p.project_details || '',
      deadline,
      website: p.website,
      intent: p.intent || 'proposta',
    });

    setStep(chatId, 'done');
    return rich(
      tplTeronCompleted({
        name: p.name || 'cliente',
        company: p.company || '',
        proposalUrl,
      })
    );
  }

  return null;
}
