import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/teron/coming-soon";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
export const Route = createFileRoute("/app/atendimento")({
  head: () => ({ meta: [{ title: "Atendimento — TERON" }] }),
  component: () => (
    <WorkspaceShell eyebrow="Operação" title="Atendimento" description="Solicitações abertas pelos clientes através dos portais.">
      <ComingSoon title="Atendimento em breve" description="Este módulo já está no roadmap da TERON e será liberado nas próximas semanas." />
    </WorkspaceShell>
  ),
});
