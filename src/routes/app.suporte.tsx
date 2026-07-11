import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Clock, LifeBuoy } from "lucide-react";
import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { tickets } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/suporte")({
  head: () => ({ meta: [{ title: "Suporte — TERON OS" }] }),
  component: SuportePage,
});

const priorityTone = {
  crítica: "danger",
  alta: "warning",
  média: "info",
  baixa: "neutral",
} as const;
const statusTone = {
  aberto: "warning",
  "em atendimento": "info",
  "aguardando cliente": "warning",
  resolvido: "success",
} as const;

function SuportePage() {
  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Central de Suporte"
      description="Tickets com prioridade, SLA e responsável. Cada solicitação vira histórico rastreável."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          + Novo ticket
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label="Abertos" value={String(tickets.filter((t) => t.status !== "resolvido").length)} hint="em fila ou atendimento" tone="warning" />
        <Kpi label="Críticos" value={String(tickets.filter((t) => t.priority === "crítica").length)} hint="SLA < 4h" tone="danger" />
        <Kpi label="Tempo médio 1ª resposta" value="12min" hint="meta: 30min" tone="success" />
        <Kpi label="CSAT (30d)" value="4.8/5" hint="127 avaliações" tone="success" />
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <LifeBuoy className="size-4 text-muted-foreground" />
            <h3 className="text-[13px] font-semibold">Fila de tickets</h3>
          </div>
          <span className="text-[11px] text-muted-foreground">Ordenado por prioridade + SLA</span>
        </header>
        <table className="w-full text-[13px]">
          <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-2 font-medium">Ticket</th>
              <th className="px-5 py-2 font-medium">Assunto</th>
              <th className="px-5 py-2 font-medium">Cliente</th>
              <th className="px-5 py-2 font-medium">Prioridade</th>
              <th className="px-5 py-2 font-medium">Responsável</th>
              <th className="px-5 py-2 font-medium">SLA</th>
              <th className="px-5 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-muted/30">
                <td className="px-5 py-3 font-mono text-[12px] text-muted-foreground">{t.id}</td>
                <td className="px-5 py-3 font-medium">{t.subject}</td>
                <td className="px-5 py-3 text-muted-foreground">{t.client}</td>
                <td className="px-5 py-3">
                  <StatusPill tone={priorityTone[t.priority]} dot>{t.priority}</StatusPill>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{t.owner}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                    <Clock className="size-3" /> {t.sla}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <StatusPill tone={statusTone[t.status]}>{t.status}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6 rounded-xl border border-[oklch(0.65_0.2_22_/_25%)] bg-[oklch(0.65_0.2_22_/_5%)] p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 size-5 text-[oklch(0.78_0.18_22)]" />
          <div>
            <h3 className="text-[13px] font-semibold">1 ticket crítico com SLA em risco</h3>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              T-142 · Órion Retail · restam 2h30 · escale para o owner ou reatribua imediatamente.
            </p>
          </div>
        </div>
      </section>
    </WorkspaceShell>
  );
}

function Kpi({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "warning" | "danger" | "success" | "info";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <StatusPill tone={tone} dot>·</StatusPill>
      </div>
      <p className="mt-1 font-display text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}
