import { createFileRoute } from "@tanstack/react-router";
import { Filter, Plus, Search } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { projects } from "@/lib/teron-data";

export const Route = createFileRoute("/app/projetos")({
  head: () => ({ meta: [{ title: "Projetos — TERON Studio" }] }),
  component: ProjectsPage,
});

const statusMap = {
  descoberta: { label: "Descoberta", tone: "info" as const },
  execucao: { label: "Em execução", tone: "success" as const },
  revisao: { label: "Em revisão", tone: "warning" as const },
  entregue: { label: "Entregue", tone: "neutral" as const },
  pausado: { label: "Pausado", tone: "danger" as const },
};

function ProjectsPage() {
  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Projetos"
      description="Todos os projetos ativos do estúdio, com status, progresso e responsáveis."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          <Plus className="size-3.5" /> Novo projeto
        </button>
      }
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-input bg-card px-3 py-1.5">
          <Search className="size-3.5 text-muted-foreground" />
          <input placeholder="Buscar projeto, cliente ou responsável…" className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/60" />
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">
          <Filter className="size-3.5" /> Filtros
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5 text-left font-medium">Projeto</th>
              <th className="px-4 py-2.5 text-left font-medium">Cliente</th>
              <th className="px-4 py-2.5 text-left font-medium">Status</th>
              <th className="px-4 py-2.5 text-left font-medium">Progresso</th>
              <th className="px-4 py-2.5 text-left font-medium">Próx. marco</th>
              <th className="px-4 py-2.5 text-right font-medium">Horas/sem</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => {
              const s = statusMap[p.status];
              return (
                <tr key={p.id} className="border-b border-border/70 text-[13px] transition-colors last:border-0 hover:bg-muted/20">
                  <td className="px-5 py-3 font-medium text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.client}</td>
                  <td className="px-4 py-3">
                    <StatusPill tone={s.tone} dot>{s.label}</StatusPill>
                    {p.blockedBy === "cliente" && (
                      <StatusPill tone="warning" className="ml-2">Aguarda cliente</StatusPill>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex w-40 items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-foreground" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="w-8 text-right font-mono text-[11px] text-muted-foreground">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.nextMilestone}</td>
                  <td className="px-4 py-3 text-right font-mono text-[12px] text-foreground">{p.hoursThisWeek}h</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WorkspaceShell>
  );
}