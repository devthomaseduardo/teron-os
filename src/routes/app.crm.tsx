import { createFileRoute } from "@tanstack/react-router";
import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency } from "@/lib/teron-data";
import { leads } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/crm")({
  head: () => ({ meta: [{ title: "CRM — TERON OS" }] }),
  component: CrmPage,
});

const stages = [
  { key: "novo", label: "Novo" },
  { key: "qualificado", label: "Qualificado" },
  { key: "reunião", label: "Reunião" },
  { key: "proposta", label: "Proposta" },
  { key: "ganho", label: "Ganho" },
  { key: "perdido", label: "Perdido" },
] as const;

const toneByStage = {
  novo: "info",
  qualificado: "info",
  reunião: "warning",
  proposta: "primary",
  ganho: "success",
  perdido: "danger",
} as const;

function CrmPage() {
  const total = leads.reduce((s, l) => s + l.value, 0);
  return (
    <WorkspaceShell
      eyebrow="Aquisição"
      title="CRM"
      description="Do primeiro contato ao contrato assinado. Funil, follow-ups e próximas ações."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          + Novo lead
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label="Leads no pipeline" value={String(leads.filter((l) => l.stage !== "ganho" && l.stage !== "perdido").length)} hint="ativos" />
        <Kpi label="Valor em pipeline" value={currency(total)} hint="somatório aberto" />
        <Kpi label="Taxa de conversão" value="34%" hint="lead → cliente" />
        <Kpi label="Ticket médio" value={currency(58500)} hint="últimos 90 dias" />
      </div>

      <section className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {stages.map((s) => {
          const cards = leads.filter((l) => l.stage === s.key);
          return (
            <div key={s.key} className="rounded-xl border border-border bg-card">
              <header className="flex items-center justify-between border-b border-border px-3 py-2">
                <div className="flex items-center gap-2">
                  <StatusPill tone={toneByStage[s.key]} dot>·</StatusPill>
                  <span className="text-[12px] font-medium">{s.label}</span>
                </div>
                <span className="text-[11px] text-muted-foreground">{cards.length}</span>
              </header>
              <ul className="min-h-32 space-y-2 p-2">
                {cards.map((l) => (
                  <li key={l.id} className="rounded-md border border-border bg-background p-2.5 text-[12px] transition-colors hover:border-foreground/30">
                    <p className="truncate font-medium">{l.company}</p>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{l.name}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="font-mono text-[10.5px] text-muted-foreground">{l.lastTouch}</span>
                      {l.value > 0 && (
                        <span className="font-mono text-[10.5px]">{currency(l.value)}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
          <h3 className="text-[13px] font-semibold">Próximas ações</h3>
          <span className="text-[11px] text-muted-foreground">Priorizado por IA</span>
        </header>
        <ul className="divide-y divide-border">
          {leads.slice(0, 5).map((l) => (
            <li key={l.id} className="flex items-center gap-3 px-5 py-3">
              <div className="grid size-8 place-items-center rounded-full bg-muted text-[11px] font-semibold">
                {l.company.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">{l.company}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {l.stage === "novo" && "Qualificar via chamada rápida"}
                  {l.stage === "qualificado" && "Agendar reunião de descoberta"}
                  {l.stage === "reunião" && "Enviar resumo e próximos passos"}
                  {l.stage === "proposta" && "Fazer follow-up da proposta"}
                  {l.stage === "ganho" && "Iniciar onboarding do cliente"}
                  {l.stage === "perdido" && "Registrar motivo e mover para nurture"}
                </p>
              </div>
              <StatusPill tone={toneByStage[l.stage]}>{l.stage}</StatusPill>
            </li>
          ))}
        </ul>
      </section>
    </WorkspaceShell>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}
