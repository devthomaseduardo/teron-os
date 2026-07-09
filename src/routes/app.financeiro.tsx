import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency, invoices, revenueSeries } from "@/lib/teron-data";

export const Route = createFileRoute("/app/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro — TERON Studio" }] }),
  component: FinancePage,
});

const statusMap = {
  paga: { label: "Paga", tone: "success" as const },
  aberta: { label: "Em aberto", tone: "info" as const },
  vencida: { label: "Vencida", tone: "danger" as const },
  prevista: { label: "Prevista", tone: "neutral" as const },
};

function FinancePage() {
  const totalPago = invoices.filter((i) => i.status === "paga").reduce((s, i) => s + i.amount, 0);
  const totalAberto = invoices.filter((i) => i.status === "aberta").reduce((s, i) => s + i.amount, 0);
  const totalVencido = invoices.filter((i) => i.status === "vencida").reduce((s, i) => s + i.amount, 0);

  return (
    <WorkspaceShell
      eyebrow="Financeiro"
      title="Fluxo de caixa"
      description="Receitas, faturas em aberto, vencidas e previstas."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Receita — últimos 7 meses</p>
              <p className="mt-1 font-display text-2xl font-semibold">R$ 268 mil</p>
            </div>
            <StatusPill tone="success" dot>+12,4%</StatusPill>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.14 250)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.7 0.14 250)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.66 0.012 264)", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "oklch(0.66 0.012 264)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "oklch(0.175 0.005 264)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="oklch(0.7 0.14 250)" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-3">
          <StatCard label="Recebido no mês" value={currency(totalPago)} tone="success" />
          <StatCard label="A receber" value={currency(totalAberto)} tone="info" />
          <StatCard label="Vencido" value={currency(totalVencido)} tone="danger" />
        </div>
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
          <h3 className="text-[13px] font-semibold">Faturas</h3>
        </header>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5 text-left font-medium">Nº</th>
              <th className="px-4 py-2.5 text-left font-medium">Cliente</th>
              <th className="px-4 py-2.5 text-left font-medium">Vencimento</th>
              <th className="px-4 py-2.5 text-right font-medium">Valor</th>
              <th className="px-4 py-2.5 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => {
              const s = statusMap[i.status];
              return (
                <tr key={i.id} className="border-b border-border/70 text-[13px] last:border-0 hover:bg-muted/20">
                  <td className="px-5 py-3 font-mono text-[12px] text-muted-foreground">{i.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{i.client}</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.dueDate}</td>
                  <td className="px-4 py-3 text-right font-display font-semibold text-foreground">{currency(i.amount)}</td>
                  <td className="px-4 py-3"><StatusPill tone={s.tone} dot>{s.label}</StatusPill></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </WorkspaceShell>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone: "success" | "info" | "danger" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <StatusPill tone={tone} dot>·</StatusPill>
      </div>
      <p className="mt-2 font-display text-xl font-semibold">{value}</p>
    </div>
  );
}