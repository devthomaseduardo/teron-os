import { createFileRoute } from "@tanstack/react-router";
import { FilePlus2 } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency, proposals } from "@/lib/teron-data";

export const Route = createFileRoute("/app/propostas")({
  head: () => ({ meta: [{ title: "Propostas — TERON Studio" }] }),
  component: ProposalsPage,
});

const statusMap = {
  rascunho: { label: "Rascunho", tone: "neutral" as const },
  enviada: { label: "Aguardando cliente", tone: "warning" as const },
  aprovada: { label: "Aprovada", tone: "success" as const },
  recusada: { label: "Recusada", tone: "danger" as const },
};

function ProposalsPage() {
  return (
    <WorkspaceShell
      eyebrow="Comercial"
      title="Propostas"
      description="Escopo, cronograma, investimento e assinatura em um único documento vivo."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          <FilePlus2 className="size-3.5" /> Nova proposta
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {proposals.map((p) => {
              const s = statusMap[p.status];
              return (
                <li key={p.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/20">
                  <div className="font-mono text-[11px] text-muted-foreground">{p.id}</div>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium text-foreground">{p.client}</p>
                    <p className="truncate text-[12px] text-muted-foreground">{p.scope}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-[14px] font-semibold text-foreground">{currency(p.amount)}</span>
                    <StatusPill tone={s.tone} dot>{s.label}</StatusPill>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="rounded-xl border border-border bg-card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Preview · PR-042</p>
          <h3 className="mt-2 font-display text-lg font-semibold">Portal dealer Nordica Motors</h3>
          <p className="mt-1 text-[12.5px] text-muted-foreground">Enviada em 04/07 · expira em 5 dias</p>

          <div className="mt-5 space-y-3 text-[13px]">
            <Row k="Escopo" v="Portal dealer + integração ERP" />
            <Row k="Prazo" v="14 semanas" />
            <Row k="Time" v="1 PM · 2 devs · 1 designer" />
            <Row k="Investimento" v={currency(84000)} />
            <Row k="Parcelamento" v="3x sem juros" />
          </div>

          <div className="mt-5 rounded-md border border-dashed border-border p-4 text-center">
            <p className="text-[11px] text-muted-foreground">Assinatura digital</p>
            <p className="mt-1 text-[13px] font-medium text-foreground">Aguardando aprovação do cliente</p>
          </div>
        </aside>
      </div>
    </WorkspaceShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}