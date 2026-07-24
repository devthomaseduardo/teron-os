import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/teron/coming-soon";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
export const Route = createFileRoute("/app/inbox")({
  head: () => ({ meta: [{ title: "Inbox — TERON" }] }),
  component: () => (
    <WorkspaceShell eyebrow="Workspace" title="Inbox" description="Notificações, aprovações e mensagens dos clientes em um único lugar.">
      <ComingSoon title="Inbox unificado em beta" description="Estamos costurando notificações de propostas, contratos, pagamentos e mensagens de clientes em uma fila única." />
    </WorkspaceShell>
  ),
});