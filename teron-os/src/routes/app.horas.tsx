import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/teron/coming-soon";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
export const Route = createFileRoute("/app/horas")({
  head: () => ({ meta: [{ title: "Horas — TERON" }] }),
  component: () => (
    <WorkspaceShell eyebrow="Operação" title="Horas" description="Registro de horas por projeto, cliente e responsável.">
      <ComingSoon title="Horas em breve" description="Este módulo já está no roadmap da TERON e será liberado nas próximas semanas." />
    </WorkspaceShell>
  ),
});
