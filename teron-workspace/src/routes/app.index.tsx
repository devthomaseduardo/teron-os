import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  FileText,
  Plus,
  Rocket,
  UserCircle2,
} from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const getDashboardData = createServerFn({ method: "GET" }).handler(async () => {
  // Fetch active projects for the upcoming deliveries widget
  const projects = await prisma.project.findMany({
    where: { status: { notIn: ["concluido", "cancelado"] } },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  // Calculate "A receber" from accepted proposals that don't have entryPayment == amount
  // We'll just sum all accepted proposals' amount as a placeholder
  const acceptedProposals = await prisma.proposal.aggregate({
    where: { status: "aceita" },
    _sum: { amount: true },
  });

  const aReceber = acceptedProposals._sum.amount || 0;

  // Mock data for things we don't have tables for yet
  const attentionItems = [
    { id: "1", kind: "proposal" as const, priority: "high" as const, title: "Aprovação de escopo Pallas", meta: "Proposta PR-022", dueLabel: "Hoje", blockedBy: "cliente" },
    { id: "2", kind: "payment" as const, priority: "critical" as const, title: "Fatura em atraso — Nordica", meta: "R$ 12.000,00", dueLabel: "Atrasado 2d", blockedBy: "cliente" },
    { id: "3", kind: "meeting" as const, priority: "medium" as const, title: "Kickoff Meridian Finance", meta: "Reunião de alinhamento", dueLabel: "14:30", blockedBy: "nos" },
    { id: "4", kind: "deploy" as const, priority: "medium" as const, title: "Deploy v1.2.0 Órion", meta: "Staging pronto", dueLabel: "17:00", blockedBy: "nos" },
  ];

  const activity = [
    { id: "1", who: "Marina", what: "visualizou a proposta PR-022", when: "Agora mesmo" },
    { id: "2", who: "Você", what: "aprovou o deploy v1.2.0 Órion", when: "Há 2 horas" },
    { id: "3", who: "Nordica Motors", what: "assinou o contrato C-041", when: "Há 4 horas" },
  ];

  return {
    projects: projects.map(p => ({
      id: p.id,
      name: p.title,
      client: p.clientName,
      progress: 0, // TODO: Computed field
      nextMilestone: "Nenhum marco definido",
    })),
    aReceber,
    attentionItems,
    activity
  };
});

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [{ title: "Hoje — TERON Studio" }],
  }),
  loader: () => getDashboardData(),
  component: WorkspaceHome,
});

const kindIcon = {
  payment: CircleDollarSign,
  proposal: FileText,
  client: UserCircle2,
  meeting: Calendar,
  deploy: Rocket,
  delivery: CheckCircle2,
};

const priorityTone = {
  critical: "danger",
  high: "warning",
  medium: "info",
  low: "neutral",
} as const;

function WorkspaceHome() {
  const { projects, aReceber, attentionItems, activity } = Route.useLoaderData();

  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const totals = {
    critical: attentionItems.filter((a) => a.priority === "critical").length,
    waitingClient: attentionItems.filter((a) => a.blockedBy === "cliente").length,
    todayMeetings: 2,
    deploys: attentionItems.filter((a) => a.kind === "deploy").length,
    hoursToday: 4.2,
    aReceber,
  };

  return (
    <WorkspaceShell
      eyebrow={hoje}
      title="O que precisa da sua atenção hoje"
      description="Priorizamos as pendências que estão bloqueando você, seu time ou o cliente."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          <Plus className="size-3.5" /> Novo projeto
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <MetricCard label="Pendências críticas" value={totals.critical} tone="danger" hint="agir agora" />
        <MetricCard label="Aguardando cliente" value={totals.waitingClient} tone="warning" hint="cronograma pausado" />
        <MetricCard label="Reuniões hoje" value={totals.todayMeetings} tone="info" hint="14:30 · 17:00" />
        <MetricCard label="Deploys prontos" value={totals.deploys} tone="info" hint="aguarda aprovação" />
        <MetricCard label="Horas hoje" value={`${totals.hoursToday}h`} tone="neutral" hint="meta 6h" />
        <MetricCard label="A receber" value={currency(totals.aReceber)} tone="success" hint="Faturas e propostas aceitas" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Surface>
          <SurfaceHeader
            title="Fila de prioridade"
            hint="Ordenado por impacto"
            action={<Link to="/app/inbox" className="text-[12px] text-muted-foreground hover:text-foreground">Ver inbox <ArrowUpRight className="ml-0.5 inline size-3" /></Link>}
          />
          <ul className="divide-y divide-border">
            {attentionItems.map((item) => {
              const Icon = kindIcon[item.kind];
              const tone = priorityTone[item.priority];
              return (
                <li key={item.id} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/30">
                  <div className="grid size-9 place-items-center rounded-md border border-border bg-card">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13.5px] font-medium text-foreground">{item.title}</p>
                      {item.blockedBy === "cliente" && (
                        <StatusPill tone="warning" dot>Aguarda cliente</StatusPill>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{item.meta}</p>
                  </div>
                  <StatusPill tone={tone}>{item.dueLabel}</StatusPill>
                </li>
              );
            })}
          </ul>
        </Surface>

        <div className="space-y-6">
          <Surface>
            <SurfaceHeader title="Agenda de hoje" />
            <div className="space-y-3 p-5">
              {[
                { t: "10:00", n: "1:1 com Marina — Pallas Studio", tag: "Kickoff" },
                { t: "14:30", n: "Kickoff Meridian Finance", tag: "Novo cliente" },
                { t: "17:00", n: "Review sprint Órion", tag: "Interno" },
              ].map((e) => (
                <div key={e.t} className="flex items-start gap-3">
                  <div className="w-12 shrink-0 font-mono text-[11px] text-muted-foreground">{e.t}</div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-foreground">{e.n}</p>
                    <p className="text-[11px] text-muted-foreground">{e.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </Surface>

          <Surface>
            <SurfaceHeader title="Atividade recente" />
            <ul className="divide-y divide-border">
              {activity.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-start gap-3 px-5 py-3">
                  <div className="mt-1 size-1.5 rounded-full bg-muted-foreground/60" />
                  <div className="flex-1 text-[12.5px] text-muted-foreground">
                    <span className="text-foreground">{a.who}</span> {a.what}
                    <div className="mt-0.5 text-[10.5px] text-muted-foreground/70">{a.when}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Surface>
          <SurfaceHeader title="Próximas entregas" action={<Link to="/app/projetos" className="text-[12px] text-muted-foreground hover:text-foreground">Ver projetos</Link>} />
          <ul className="divide-y divide-border">
            {projects.slice(0, 4).map((p) => (
              <li key={p.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium">{p.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{p.client} · {p.nextMilestone}</p>
                  </div>
                  <div className="flex w-32 items-center gap-2">
                    <div className="h-1 flex-1 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-foreground" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="w-8 text-right font-mono text-[11px] text-muted-foreground">{p.progress}%</span>
                  </div>
                </div>
              </li>
            ))}
            {projects.length === 0 && (
              <li className="px-5 py-6 text-center text-sm text-muted-foreground">
                Nenhum projeto em andamento.
              </li>
            )}
          </ul>
        </Surface>

        <Surface tone="warning">
          <div className="flex items-start gap-4 p-5">
            <div className="grid size-10 place-items-center rounded-md bg-[oklch(0.8_0.14_78_/_15%)]">
              <AlertTriangle className="size-5 text-[oklch(0.88_0.14_78)]" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.88_0.14_78)]">Pendências do cliente</p>
              <h3 className="mt-1 font-display text-lg font-semibold">3 cronogramas pausados aguardando cliente</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Enquanto o material não chega, os prazos são recalculados automaticamente. O cliente foi notificado e vê o impacto no portal.
              </p>
              <div className="mt-4 space-y-2">
                {["Pallas Studio · imagens da marca", "Nordica Motors · aprovação da proposta", "Kite SaaS · acesso ao banco de dados"].map((x) => (
                  <div key={x} className="flex items-center gap-2 text-[12.5px]">
                    <Clock className="size-3.5 text-muted-foreground" />
                    <span className="flex-1 text-foreground">{x}</span>
                    <StatusPill tone="warning">Pausado</StatusPill>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Surface>
      </div>
    </WorkspaceShell>
  );
}

function MetricCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string | number;
  hint: string;
  tone: "danger" | "warning" | "info" | "success" | "neutral";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <StatusPill tone={tone} dot>·</StatusPill>
      </div>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
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