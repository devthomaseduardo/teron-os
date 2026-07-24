import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Filter, Plus, Search } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { prisma } from "@/lib/prisma";

export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  const projs = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return projs.map((p) => {
    // TODO: Extrair do clientPortal ou de outra tabela quando implementado
    const progress = 0;
    const nextMilestone = "Nenhum marco definido";
    const hoursThisWeek = 0;
    const blockedBy = null;

    return {
      id: p.id,
      name: p.title,
      client: p.clientName,
      status: p.status,
      progress,
      nextMilestone,
      hoursThisWeek,
      blockedBy,
    };
  });
});

export const Route = createFileRoute("/app/projetos")({
  head: () => ({ meta: [{ title: "Projetos — TERON Studio" }] }),
  loader: () => getProjects(),
  component: ProjectsPage,
});

const statusMap: Record<string, { label: string; tone: "success" | "info" | "warning" | "neutral" | "danger" }> = {
  onboarding: { label: "Onboarding", tone: "info" },
  em_andamento: { label: "Em execução", tone: "success" },
  pausado: { label: "Pausado", tone: "warning" },
  concluido: { label: "Concluído", tone: "neutral" },
  cancelado: { label: "Cancelado", tone: "danger" },
};

function ProjectsPage() {
  const projects = Route.useLoaderData();

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
              const s = statusMap[p.status] || { label: p.status, tone: "neutral" };
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
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-muted-foreground">
                  Nenhum projeto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </WorkspaceShell>
  );
}