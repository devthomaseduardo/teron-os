import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency } from "@/lib/teron-data";

export const Route = createFileRoute("/app/projetos")({
  head: () => ({ meta: [{ title: "Projetos — TERON OS" }] }),
  component: ProjectsPage,
});

interface ApiProject {
  id: string;
  title: string;
  clientName: string;
  clientCompany: string | null;
  status: string;
  deadline: string | null;
  budget: number;
  progress: number;
  clientAccessToken: string | null;
  checklistDone: number;
  checklistTotal: number;
  updatedAt: string;
}

const statusMap: Record<string, { label: string; tone: "info" | "warning" | "success" | "neutral" | "danger" }> = {
  onboarding: { label: "Onboarding", tone: "warning" },
  em_andamento: { label: "Em andamento", tone: "success" },
  pausado: { label: "Pausado", tone: "danger" },
  concluido: { label: "Concluído", tone: "neutral" },
  cancelado: { label: "Cancelado", tone: "danger" },
};

function ProjectsPage() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects || []);
        setError(null);
      } else {
        setError(data.error || "Falha");
        setProjects([]);
      }
    } catch {
      setError("API indisponível");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 20000);
    return () => clearInterval(t);
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.clientName.toLowerCase().includes(s) ||
        (p.clientCompany || "").toLowerCase().includes(s)
    );
  }, [projects, q]);

  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Projetos"
      description="Projetos reais criados após aceite da proposta. Lista vazia até o primeiro fechamento."
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-input bg-card px-3 py-1.5">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar projeto ou cliente…"
            className="w-full bg-transparent text-[13px] outline-none"
          />
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-[12px] text-muted-foreground">
          <Filter className="size-3.5" /> Filtros
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Carregando...
          </div>
        ) : error ? (
          <div className="py-16 text-center text-sm text-amber-400">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground px-4">
            Nenhum projeto ainda. Quando o cliente aceitar uma proposta, o Project aparece aqui com link da workstation.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-2.5 text-left font-medium">Projeto</th>
                <th className="px-4 py-2.5 text-left font-medium">Cliente</th>
                <th className="px-4 py-2.5 text-left font-medium">Status</th>
                <th className="px-4 py-2.5 text-left font-medium">Checklist</th>
                <th className="px-4 py-2.5 text-right font-medium">Budget</th>
                <th className="px-4 py-2.5 text-right font-medium">Workstation</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const s = statusMap[p.status] || { label: p.status, tone: "neutral" as const };
                return (
                  <tr key={p.id} className="border-b border-border/70 text-[13px] last:border-0 hover:bg-muted/20">
                    <td className="px-5 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.clientCompany || p.clientName}</td>
                    <td className="px-4 py-3">
                      <StatusPill tone={s.tone} dot>
                        {s.label}
                      </StatusPill>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex w-36 items-center gap-2">
                        <div className="h-1 flex-1 rounded-full bg-muted">
                          <div className="h-full rounded-full bg-foreground" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {p.checklistDone}/{p.checklistTotal}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-[12px]">{currency(p.budget)}</td>
                    <td className="px-4 py-3 text-right">
                      {p.clientAccessToken && (
                        <a
                          href={`/cliente/onboarding/${p.clientAccessToken}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary font-medium hover:underline"
                        >
                          Abrir
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </WorkspaceShell>
  );
}
