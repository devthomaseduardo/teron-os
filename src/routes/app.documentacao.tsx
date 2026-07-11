import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, FileVideo, GraduationCap, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { docs } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/documentacao")({
  head: () => ({ meta: [{ title: "Documentação — TERON OS" }] }),
  component: DocsPage,
});

const areaIcon: Record<string, LucideIcon> = {
  processos: Wrench,
  SOP: BookOpen,
  manual: BookOpen,
  tutorial: GraduationCap,
  "vídeo": FileVideo,
};

function DocsPage() {
  return (
    <WorkspaceShell
      eyebrow="Empresa"
      title="Centro de Documentação"
      description="Processos, SOPs, tutoriais e vídeos. O conhecimento da empresa vive aqui — não na cabeça de uma pessoa."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          + Novo documento
        </button>
      }
    >
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {docs.map((d) => {
          const Icon = areaIcon[d.area] ?? BookOpen;
          return (
            <div key={d.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="grid size-9 place-items-center rounded-md border border-border bg-background">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[13px] font-medium">{d.title}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <StatusPill tone="neutral">{d.area}</StatusPill>
                    <span>Atualizado {d.updatedAt}</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">Owner: {d.owner}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </WorkspaceShell>
  );
}
