import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock,
  FileSignature,
  FileText,
  FolderKanban,
  Gauge,
  Loader2,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency } from "@/lib/teron-data";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Command Center — TERON OS" }] }),
  component: CommandCenter,
});

const kindIcon: Record<string, LucideIcon> = {
  proposta: FileText,
  contrato: FileSignature,
  cliente: Users,
  pagamento: CircleDollarSign,
  projeto: FolderKanban,
  horas: Clock,
  receita: TrendingUp,
};

type DashboardPayload = {
  success: boolean;
  empty?: boolean;
  error?: string;
  insights: {
    id: string;
    kind: string;
    label: string;
    value: string | number;
    hint: string;
    tone: "info" | "warning" | "success" | "primary" | "neutral" | "danger";
    href: string;
  }[];
  kpis: {
    leadsTotal: number;
    proposalsOpen: number;
    proposalsAccepted: number;
    projectsActive: number;
    pipeline: number;
    acceptedValue: number;
  };
  risks: { text: string; tag: string }[];
  deliveries: {
    id: string;
    name: string;
    client: string;
    progress: number;
    status: string;
    token: string | null;
  }[];
};

function CommandCenter() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        setData(json);
      } catch {
        setData({
          success: false,
          empty: true,
          insights: [],
          kpis: {
            leadsTotal: 0,
            proposalsOpen: 0,
            proposalsAccepted: 0,
            projectsActive: 0,
            pipeline: 0,
            acceptedValue: 0,
          },
          risks: [],
          deliveries: [],
          error: "Falha ao carregar dashboard",
        });
      } finally {
        setLoading(false);
      }
    };
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  const hour = new Date().getHours();
  const greet = hour < 5 ? "Boa madrugada" : hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const date = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const kpis = data?.kpis;
  const insights = data?.insights || [];
  const risks = data?.risks || [];
  const deliveries = data?.deliveries || [];

  return (
    <WorkspaceShell
      eyebrow={date}
      title={`${greet}.`}
      description="Pulso real da TERON OS — leads, propostas e projetos do banco."
      action={
        <div className="flex items-center gap-2">
          <Link
            to="/app/leads"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-[13px] text-foreground hover:bg-accent"
          >
            <Users className="size-3.5" /> Leads
          </Link>
          <Link
            to="/app/propostas"
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90"
          >
            <Zap className="size-3.5" /> Propostas
          </Link>
        </div>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-24 text-sm text-muted-foreground">
          <Loader2 className="size-5 animate-spin" /> Carregando métricas...
        </div>
      ) : (
        <>
          {data?.error && (
            <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
              {data.error}
            </div>
          )}

          {data?.empty && (
            <div className="mb-6 rounded-xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Sistema zerado — pronto para dados reais</p>
              <p className="mt-1">
                Quando o bot enviar o primeiro orçamento, leads e propostas aparecem aqui automaticamente.
              </p>
            </div>
          )}

          <section className="rounded-2xl border border-border bg-gradient-to-br from-card to-background p-6">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Hoje no sistema
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold">O que precisa de atenção</h2>
              </div>
              <StatusPill tone="info" dot>
                PostgreSQL
              </StatusPill>
            </header>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {insights.map((ci) => {
                const Icon = kindIcon[ci.kind] ?? FolderKanban;
                const display =
                  typeof ci.value === "number" && (ci.kind === "receita" || ci.kind === "pagamento")
                    ? currency(ci.value)
                    : String(ci.value);
                return (
                  <Link
                    key={ci.id}
                    to={ci.href as any}
                    className="group flex items-start gap-3 rounded-lg border border-border bg-card/60 p-3.5 transition-colors hover:border-foreground/30 hover:bg-card"
                  >
                    <div className="grid size-9 place-items-center rounded-md border border-border bg-background">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] text-muted-foreground">{ci.label}</p>
                      <div className="mt-0.5 flex items-baseline gap-2">
                        <span className="font-display text-xl font-semibold text-foreground">{display}</span>
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{ci.hint}</p>
                    </div>
                    <ChevronRight className="mt-1 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                );
              })}
            </div>
          </section>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
            <Surface>
              <SurfaceHeader
                title="Próximas entregas / projetos"
                action={
                  <Link to="/app/projetos" className="text-[12px] text-muted-foreground hover:text-foreground">
                    Ver todos
                  </Link>
                }
              />
              {deliveries.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Nenhum projeto ativo ainda.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {deliveries.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 px-5 py-3.5">
                      <CheckCircle2 className="size-4 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium">{p.name}</p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {p.client} · {p.status}
                        </p>
                      </div>
                      <div className="flex w-32 items-center gap-2">
                        <div className="h-1 flex-1 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-foreground"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="w-8 text-right font-mono text-[11px] text-muted-foreground">
                          {p.progress}%
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Surface>

            <div className="space-y-6">
              <Surface>
                <SurfaceHeader title="Pulso" hint="Dados reais do banco" />
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-xl bg-border">
                  <Kpi label="Pipeline" value={currency(kpis?.pipeline || 0)} />
                  <Kpi label="Aceito" value={currency(kpis?.acceptedValue || 0)} />
                  <Kpi label="Leads" value={String(kpis?.leadsTotal || 0)} />
                  <Kpi label="Propostas abertas" value={String(kpis?.proposalsOpen || 0)} />
                  <Kpi label="Aceitas" value={String(kpis?.proposalsAccepted || 0)} />
                  <Kpi label="Projetos ativos" value={String(kpis?.projectsActive || 0)} />
                </div>
              </Surface>

              <Surface tone="warning">
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <Gauge className="mt-0.5 size-5 text-[oklch(0.88_0.14_78)]" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.88_0.14_78)]">
                        Radar
                      </p>
                      <h3 className="mt-1 font-display text-base font-semibold">Sinais reais</h3>
                    </div>
                  </div>
                  {risks.length === 0 ? (
                    <p className="mt-4 text-[12.5px] text-muted-foreground">Nenhum alerta no momento.</p>
                  ) : (
                    <ul className="mt-4 space-y-2">
                      {risks.map((r) => (
                        <li key={r.text} className="flex items-center gap-2 text-[12.5px]">
                          <span className="size-1.5 rounded-full bg-[oklch(0.88_0.14_78)]" />
                          <span className="flex-1 truncate">{r.text}</span>
                          <StatusPill tone="warning">{r.tag}</StatusPill>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Surface>
            </div>
          </div>

          <div className="mt-6">
            <Surface>
              <SurfaceHeader title="Acesso rápido" />
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-xl bg-border sm:grid-cols-3">
                {[
                  { label: "Leads", to: "/app/leads" },
                  { label: "Propostas", to: "/app/propostas" },
                  { label: "Projetos", to: "/app/projetos" },
                  { label: "Clientes", to: "/app/clientes" },
                  { label: "Financeiro", to: "/app/financeiro" },
                  { label: "Configurações", to: "/app/configuracoes" },
                ].map((q) => (
                  <Link
                    key={q.label}
                    to={q.to as any}
                    className="flex items-center justify-between bg-card p-4 text-[13px] hover:bg-muted/40"
                  >
                    <span>{q.label}</span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </Surface>
          </div>
        </>
      )}
    </WorkspaceShell>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">{value}</p>
    </div>
  );
}

function Surface({ children, tone }: { children: React.ReactNode; tone?: "warning" }) {
  return (
    <section
      className={`overflow-hidden rounded-xl border bg-card ${
        tone === "warning"
          ? "border-[oklch(0.8_0.14_78_/_25%)] bg-[oklch(0.8_0.14_78_/_5%)]"
          : "border-border"
      }`}
    >
      {children}
    </section>
  );
}

function SurfaceHeader({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
      <div>
        <h3 className="text-[13px] font-semibold text-foreground">{title}</h3>
        {hint && <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      {action}
    </header>
  );
}
