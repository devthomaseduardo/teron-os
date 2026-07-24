import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency, scopeRequests } from "@/lib/teron-data";

export const Route = createFileRoute("/app/escopo")({
  head: () => ({ meta: [{ title: "Escopo — TERON OS" }] }),
  component: ScopePage,
});

const statusMap = {
  detectado: { label: "Detectado pela IA", tone: "warning" as const },
  orcamento_enviado: { label: "Orçamento enviado", tone: "info" as const },
  aprovado: { label: "Aprovado", tone: "success" as const },
  rejeitado: { label: "Rejeitado", tone: "danger" as const },
};

function ScopePage() {
  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Controle de Escopo"
      description="Toda solicitação fora do contrato é detectada automaticamente. Nenhum retrabalho não pago."
    >
      <div className="space-y-3">
        {scopeRequests.map((r) => {
          const s = statusMap[r.status];
          return (
            <div key={r.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-amber-400/10 text-amber-300">
                  <AlertTriangle className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-medium text-foreground">{r.request}</p>
                    <StatusPill tone={s.tone} dot>{s.label}</StatusPill>
                  </div>
                  <p className="mt-1 text-[12.5px] text-muted-foreground">
                    {r.project} · detectado {r.detectedAt}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-[12.5px]">
                    <span className="text-muted-foreground">Estimativa: <span className="font-medium text-foreground">{r.estimatedHours}h</span></span>
                    <span className="text-muted-foreground">Valor: <span className="font-mono text-foreground">{currency(r.estimatedValue)}</span></span>
                  </div>
                </div>
                {r.status === "detectado" && (
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
                    Gerar orçamento <ArrowRight className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </WorkspaceShell>
  );
}
