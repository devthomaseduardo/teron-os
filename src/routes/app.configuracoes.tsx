import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/teron/coming-soon";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — TERON" }] }),
  component: () => (
    <WorkspaceShell eyebrow="Workspace" title="Configurações" description="Membros, integrações, marca e permissões.">
      <ComingSoon title="Configurações em breve" description="Este módulo já está no roadmap da TERON e será liberado nas próximas semanas." />
    </WorkspaceShell>
  ),
});
