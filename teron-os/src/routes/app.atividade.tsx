import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/teron/coming-soon";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
export const Route = createFileRoute("/app/atividade")({
  head: () => ({ meta: [{ title: "Atividade — TERON" }] }),
  component: () => (
    <WorkspaceShell eyebrow="Workspace" title="Atividade" description="Timeline auditável de tudo o que aconteceu no estúdio.">
      <ComingSoon title="Atividade em breve" description="Este módulo já está no roadmap da TERON e será liberado nas próximas semanas." />
    </WorkspaceShell>
  ),
});
