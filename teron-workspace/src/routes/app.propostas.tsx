import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { FilePlus2 } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const getProposals = createServerFn({ method: "GET" }).handler(async () => {
  const props = await prisma.proposal.findMany({
    include: { lead: true },
    orderBy: { createdAt: "desc" },
  });

  return props.map((p) => {
    return {
      id: p.id,
      displayId: `PR-${p.id.substring(p.id.length - 4).toUpperCase()}`,
      client: p.lead?.name || p.lead?.company || "Sem Cliente",
      scope: p.title,
      amount: p.amount,
      status: p.status,
      createdAt: p.createdAt.toISOString(),
      validUntil: p.validUntil ? p.validUntil.toISOString() : null,
    };
  });
});

export const Route = createFileRoute("/app/propostas")({
  head: () => ({ meta: [{ title: "Propostas — TERON Studio" }] }),
  loader: () => getProposals(),
  component: ProposalsPage,
});

const statusMap: Record<string, { label: string; tone: "success" | "info" | "warning" | "neutral" | "danger" }> = {
  rascunho: { label: "Rascunho", tone: "neutral" },
  enviada: { label: "Enviada", tone: "info" },
  visualizada: { label: "Aguardando cliente", tone: "warning" },
  aceita: { label: "Aprovada", tone: "success" },
  recusada: { label: "Recusada", tone: "danger" },
  expirada: { label: "Expirada", tone: "neutral" },
};

function ProposalsPage() {
  const proposals = Route.useLoaderData();

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
              const s = statusMap[p.status] || { label: p.status, tone: "neutral" };
              return (
                <li key={p.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/20">
                  <div className="font-mono text-[11px] text-muted-foreground">{p.displayId}</div>
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
            {proposals.length === 0 && (
              <li className="px-5 py-12 text-center text-sm text-muted-foreground">
                Nenhuma proposta criada.
              </li>
            )}
          </ul>
        </div>

        <aside className="rounded-xl border border-border bg-card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Preview</p>
          <h3 className="mt-2 font-display text-lg font-semibold">Selecione uma proposta</h3>
          <p className="mt-1 text-[12.5px] text-muted-foreground">Clique em uma proposta ao lado para ver os detalhes</p>

          <div className="mt-5 space-y-3 text-[13px]">
            <Row k="Escopo" v="-" />
            <Row k="Prazo" v="-" />
            <Row k="Investimento" v="-" />
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