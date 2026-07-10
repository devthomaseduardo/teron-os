import { createFileRoute } from "@tanstack/react-router";
import { Heart, TrendingDown, TrendingUp } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { clients, currency } from "@/lib/teron-data";

export const Route = createFileRoute("/app/health")({
  head: () => ({ meta: [{ title: "Health Score — TERON OS" }] }),
  component: HealthPage,
});

function scoreTone(v: number) {
  if (v >= 80) return { tone: "success" as const, label: "Saudável" };
  if (v >= 60) return { tone: "warning" as const, label: "Atenção" };
  return { tone: "danger" as const, label: "Em risco" };
}

function HealthPage() {
  const sorted = [...clients].sort((a, b) => a.healthScore - b.healthScore);
  const avg = Math.round(clients.reduce((a, c) => a + c.healthScore, 0) / clients.length);
  const atRisk = clients.filter((c) => c.healthScore < 60).length;

  return (
    <WorkspaceShell
      eyebrow="Cliente"
      title="Health Score"
      description="Cada cliente recebe uma pontuação. Pagamento, resposta, entrega, risco — visível antes de virar crise."
    >
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Score médio" value={avg.toString()} icon={Heart} tone="primary" />
        <StatCard label="Em risco" value={atRisk.toString()} icon={TrendingDown} tone="danger" />
        <StatCard label="Saudáveis" value={clients.filter((c) => c.healthScore >= 80).length.toString()} icon={TrendingUp} tone="success" />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5 text-left font-medium">Cliente</th>
              <th className="px-4 py-2.5 text-left font-medium">Score</th>
              <th className="px-4 py-2.5 text-left font-medium">Status</th>
              <th className="px-4 py-2.5 text-left font-medium">MRR</th>
              <th className="px-4 py-2.5 text-right font-medium">Projetos</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => {
              const t = scoreTone(c.healthScore);
              return (
                <tr key={c.id} className="border-b border-border/60 text-[13px] last:border-0 hover:bg-muted/20">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-8 place-items-center rounded-md bg-muted/50 text-[11px] font-semibold">{c.initials}</div>
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground">{c.contact}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full ${c.healthScore >= 80 ? "bg-emerald-400" : c.healthScore >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                          style={{ width: `${c.healthScore}%` }}
                        />
                      </div>
                      <span className="font-mono text-[12px]">{c.healthScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusPill tone={t.tone} dot>{t.label}</StatusPill></td>
                  <td className="px-4 py-3 font-mono text-[12.5px] text-foreground">{currency(c.mrr)}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{c.projects}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WorkspaceShell>
  );
}

function StatCard({ label, value, icon: Icon, tone }: { label: string; value: string; icon: React.ComponentType<{ className?: string }>; tone: "primary" | "danger" | "success" }) {
  const bg = tone === "danger" ? "bg-red-400/10 text-red-300" : tone === "success" ? "bg-emerald-400/10 text-emerald-300" : "bg-primary/10 text-primary";
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground">{label}</p>
        <div className={`grid size-7 place-items-center rounded-md ${bg}`}><Icon className="size-3.5" /></div>
      </div>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}
