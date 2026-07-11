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
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency, projects } from "@/lib/teron-data";
import {
  commandInsights,
  companyKpis,
  smartSuggestions,
} from "@/lib/teron-os-data";

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

const suggestionTone = {
  primary: "bg-[oklch(0.7_0.14_250_/_10%)] text-[oklch(0.85_0.13_250)] ring-[oklch(0.7_0.14_250_/_28%)]",
  warning: "bg-[oklch(0.8_0.14_78_/_10%)] text-[oklch(0.88_0.14_78)] ring-[oklch(0.8_0.14_78_/_28%)]",
  success: "bg-[oklch(0.72_0.15_155_/_10%)] text-[oklch(0.82_0.15_155)] ring-[oklch(0.72_0.15_155_/_28%)]",
  info: "bg-muted/40 text-foreground ring-border",
} as const;

function CommandCenter() {
  const hour = new Date().getHours();
  const greet = hour < 5 ? "Boa madrugada" : hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const date = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <WorkspaceShell
      eyebrow={date}
      title={`${greet}, Thomas.`}
      description="Este é o pulso da TERON OS — tudo que exige a sua atenção hoje, em uma única tela."
      action={
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-[13px] text-foreground hover:bg-accent">
            <Sparkles className="size-3.5" /> Perguntar à IA
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
            <Zap className="size-3.5" /> Executar rotina diária
          </button>
        </div>
      }
    >
      {/* Hoje você possui */}
      <section className="rounded-2xl border border-border bg-gradient-to-br from-card to-background p-6">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Hoje você possui</p>
            <h2 className="mt-1 font-display text-lg font-semibold">O que precisa da sua atenção</h2>
          </div>
          <StatusPill tone="info" dot>Atualizado agora</StatusPill>
        </header>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {commandInsights.map((ci) => {
            const Icon = kindIcon[ci.kind] ?? FolderKanban;
            return (
              <Link
                key={ci.id}
                to={ci.href ?? "/app"}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card/60 p-3.5 transition-colors hover:border-foreground/30 hover:bg-card"
              >
                <div className="grid size-9 place-items-center rounded-md border border-border bg-background">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-muted-foreground">{ci.label}</p>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <span className="font-display text-xl font-semibold text-foreground">{ci.value}</span>
                    <StatusPill tone={ci.tone}>·</StatusPill>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{ci.hint}</p>
                </div>
                <ChevronRight className="mt-1 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sugestões da IA + Pulso da empresa */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Surface>
          <SurfaceHeader
            title="Sugestões da IA"
            hint="Ações práticas geradas pelo cérebro da TERON"
            action={
              <Link to="/app/ia" className="text-[12px] text-muted-foreground hover:text-foreground">
                Ver todas <ArrowUpRight className="ml-0.5 inline size-3" />
              </Link>
            }
          />
          <ul className="divide-y divide-border">
            {smartSuggestions.map((s) => (
              <li key={s.id} className="group px-5 py-3.5 transition-colors hover:bg-muted/20">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 grid size-8 place-items-center rounded-md ring-1 ring-inset ${suggestionTone[s.tone]}`}>
                    <Sparkles className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-medium text-foreground">{s.text}</p>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">{s.detail}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <button className="rounded-md bg-foreground px-2.5 py-1 text-[11.5px] font-medium text-background hover:opacity-90">
                        {s.action}
                      </button>
                      <button className="rounded-md border border-border bg-background px-2.5 py-1 text-[11.5px] text-muted-foreground hover:text-foreground">
                        Adiar
                      </button>
                      <button className="rounded-md px-2.5 py-1 text-[11.5px] text-muted-foreground hover:text-foreground">
                        Descartar
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Surface>

        <div className="space-y-6">
          <Surface>
            <SurfaceHeader title="Pulso da empresa" hint="Últimos 30 dias" />
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-xl bg-border">
              <Kpi label="Receita" value={currency(companyKpis.receitaMes)} tone="text-foreground" />
              <Kpi label="Lucro" value={currency(companyKpis.lucroMes)} tone="text-[oklch(0.82_0.15_155)]" />
              <Kpi label="Margem" value={`${companyKpis.margem}%`} tone="text-foreground" />
              <Kpi
                label="Horas vend./trab."
                value={`${companyKpis.horasVendidas}h / ${companyKpis.horasTrabalhadas}h`}
                tone="text-foreground"
              />
              <Kpi label="Projetos ativos" value={String(companyKpis.projetosAtivos)} tone="text-foreground" />
              <Kpi label="Propostas abertas" value={String(companyKpis.propostasAbertas)} tone="text-foreground" />
            </div>
          </Surface>

          <Surface tone="warning">
            <div className="p-5">
              <div className="flex items-start gap-3">
                <Gauge className="mt-0.5 size-5 text-[oklch(0.88_0.14_78)]" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.88_0.14_78)]">Radar de riscos</p>
                  <h3 className="mt-1 font-display text-base font-semibold">3 sinais que merecem sua atenção</h3>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {[
                  { t: "Pallas Studio — cronograma pausado há 7 dias", tag: "Aguarda cliente" },
                  { t: "Órion Commerce — margem caindo para 18%", tag: "Estouro de horas" },
                  { t: "Aurora Health — Health Score em 62", tag: "Atenção" },
                ].map((r) => (
                  <li key={r.t} className="flex items-center gap-2 text-[12.5px]">
                    <span className="size-1.5 rounded-full bg-[oklch(0.88_0.14_78)]" />
                    <span className="flex-1 truncate">{r.t}</span>
                    <StatusPill tone="warning">{r.tag}</StatusPill>
                  </li>
                ))}
              </ul>
            </div>
          </Surface>
        </div>
      </div>

      {/* Próximas entregas + atalhos */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Surface>
          <SurfaceHeader
            title="Próximas entregas"
            action={
              <Link to="/app/projetos" className="text-[12px] text-muted-foreground hover:text-foreground">
                Ver projetos
              </Link>
            }
          />
          <ul className="divide-y divide-border">
            {projects.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-5 py-3.5">
                <CheckCircle2 className="size-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{p.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {p.client} · {p.nextMilestone}
                  </p>
                </div>
                <div className="flex w-32 items-center gap-2">
                  <div className="h-1 flex-1 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-foreground" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px] text-muted-foreground">{p.progress}%</span>
                </div>
              </li>
            ))}
          </ul>
        </Surface>

        <Surface>
          <SurfaceHeader title="Acesso rápido" />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-xl bg-border">
            {[
              { label: "Nova proposta", to: "/app/propostas" },
              { label: "Novo lead", to: "/app/crm" },
              { label: "Novo projeto", to: "/app/projetos" },
              { label: "Cobrar cliente", to: "/app/financeiro" },
              { label: "Registrar horas", to: "/app/horas" },
              { label: "Criar automação", to: "/app/automacoes" },
            ].map((q) => (
              <Link
                key={q.label}
                to={q.to}
                className="flex items-center justify-between bg-card p-4 text-[13px] hover:bg-muted/40"
              >
                <span>{q.label}</span>
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Surface>
      </div>
    </WorkspaceShell>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="bg-card p-4">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-lg font-semibold tracking-tight ${tone}`}>{value}</p>
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
