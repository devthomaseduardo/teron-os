import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency } from "@/lib/teron-data";
import { companyKpis, receitaVsCusto } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — TERON OS" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const max = Math.max(...receitaVsCusto.map((d) => d.receita));

  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Analytics"
      description="A saúde da empresa em uma tela. Receita, lucro, horas, projetos e conversão."
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        <Kpi label="Receita do mês" value={currency(companyKpis.receitaMes)} />
        <Kpi label="Lucro" value={currency(companyKpis.lucroMes)} tone="text-[oklch(0.82_0.15_155)]" />
        <Kpi label="Margem" value={`${companyKpis.margem}%`} />
        <Kpi label="Ticket médio" value={currency(companyKpis.ticketMedio)} />
        <Kpi label="LTV médio" value={currency(companyKpis.ltvMedio)} />
      </div>

      <section className="mt-6 rounded-xl border border-border bg-card p-6">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-[13px] font-semibold">Receita vs Custo · últimos 7 meses</h3>
            <p className="mt-0.5 text-[11px] text-muted-foreground">valores em milhares (R$)</p>
          </div>
        </header>
        <div className="grid grid-cols-7 gap-3">
          {receitaVsCusto.map((d) => (
            <div key={d.month} className="flex flex-col items-center gap-2">
              <div className="relative flex h-40 w-full items-end gap-1">
                <div
                  className="flex-1 rounded-t bg-foreground"
                  style={{ height: `${(d.receita / max) * 100}%` }}
                  title={`Receita ${d.receita}k`}
                />
                <div
                  className="flex-1 rounded-t bg-muted-foreground/40"
                  style={{ height: `${(d.custo / max) * 100}%` }}
                  title={`Custo ${d.custo}k`}
                />
              </div>
              <span className="text-[11px] text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-sm bg-foreground" /> Receita
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-sm bg-muted-foreground/40" /> Custo
          </span>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-[13px] font-semibold">Horas</h3>
          <p className="mt-1 text-[11px] text-muted-foreground">Vendidas vs trabalhadas neste mês</p>
          <div className="mt-4 space-y-3">
            <Bar label="Vendidas" value={companyKpis.horasVendidas} max={400} tone="bg-foreground" />
            <Bar label="Trabalhadas" value={companyKpis.horasTrabalhadas} max={400} tone="bg-muted-foreground/50" />
            <Bar label="Faturadas" value={296} max={400} tone="bg-[oklch(0.72_0.15_155)]" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-[13px] font-semibold">Conversão do funil</h3>
          <p className="mt-1 text-[11px] text-muted-foreground">Últimos 90 dias</p>
          <div className="mt-4 space-y-3">
            <FunnelStep label="Leads" value={148} tone="bg-muted-foreground/30" />
            <FunnelStep label="Qualificados" value={92} tone="bg-muted-foreground/50" />
            <FunnelStep label="Propostas" value={51} tone="bg-primary/40" />
            <FunnelStep label="Fechados" value={17} tone="bg-foreground" />
          </div>
          <p className="mt-4 text-[12px] text-muted-foreground">
            Taxa geral: <span className="font-medium text-foreground">{companyKpis.taxaConversao}%</span> lead → cliente
          </p>
        </div>
      </section>
    </WorkspaceShell>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-xl font-semibold ${tone ?? "text-foreground"}`}>{value}</p>
    </div>
  );
}

function Bar({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11.5px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{value}h</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}

function FunnelStep({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11.5px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${(value / 148) * 100}%` }} />
      </div>
    </div>
  );
}
