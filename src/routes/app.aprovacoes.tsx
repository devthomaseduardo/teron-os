import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageSquare, RefreshCw } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { approvals } from "@/lib/teron-data";

export const Route = createFileRoute("/app/aprovacoes")({
  head: () => ({ meta: [{ title: "Aprovações — TERON OS" }] }),
  component: ApprovalsPage,
});

const statusMap = {
  aguardando: { label: "Aguardando cliente", tone: "warning" as const },
  aprovado: { label: "Aprovado", tone: "success" as const },
  alteracao: { label: "Alteração solicitada", tone: "info" as const },
};

function ApprovalsPage() {
  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Centro de Aprovações"
      description="Cada entrega tem versão, status e histórico. Nada de aprovação por WhatsApp."
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5 text-left font-medium">Entrega</th>
              <th className="px-4 py-2.5 text-left font-medium">Projeto</th>
              <th className="px-4 py-2.5 text-left font-medium">Versão</th>
              <th className="px-4 py-2.5 text-left font-medium">Status</th>
              <th className="px-4 py-2.5 text-left font-medium">Enviado</th>
              <th className="px-4 py-2.5 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((a) => {
              const s = statusMap[a.status];
              return (
                <tr key={a.id} className="border-b border-border/60 text-[13px] last:border-0 hover:bg-muted/20">
                  <td className="px-5 py-3 font-medium text-foreground">{a.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.project}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">{a.version}</td>
                  <td className="px-4 py-3"><StatusPill tone={s.tone} dot>{s.label}</StatusPill></td>
                  <td className="px-4 py-3 text-muted-foreground">{a.sentAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background/50 px-2.5 py-1 text-[11.5px] text-muted-foreground hover:text-foreground">
                        <MessageSquare className="size-3" /> {a.comments}
                      </button>
                      {a.status === "aguardando" && (
                        <>
                          <button className="inline-flex items-center gap-1 rounded-md bg-emerald-400/10 px-2.5 py-1 text-[11.5px] text-emerald-300 hover:bg-emerald-400/20">
                            <CheckCircle2 className="size-3" /> Aprovar
                          </button>
                          <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background/50 px-2.5 py-1 text-[11.5px] text-muted-foreground hover:text-foreground">
                            <RefreshCw className="size-3" /> Alteração
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WorkspaceShell>
  );
}
