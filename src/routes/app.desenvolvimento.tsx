import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/teron/coming-soon";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
export const Route = createFileRoute("/app/desenvolvimento")({
  head: () => ({ meta: [{ title: "Desenvolvimento — TERON" }] }),
  component: () => (
    <WorkspaceShell eyebrow="Operação" title="Desenvolvimento" description="Deploys, ambientes e status dos pipelines.">
      <ComingSoon title="Desenvolvimento em breve" description="Este módulo já está no roadmap da TERON e será liberado nas próximas semanas." />
    </WorkspaceShell>
  ),
});
