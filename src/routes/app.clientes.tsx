import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { clients, currency } from "@/lib/teron-data";

export const Route = createFileRoute("/app/clientes")({
  head: () => ({ meta: [{ title: "Clientes — TERON Studio" }] }),
  component: ClientsPage,
});

const statusMap = {
  ativo: { label: "Ativo", tone: "success" as const },
  onboarding: { label: "Onboarding", tone: "info" as const },
  pausado: { label: "Pausado", tone: "warning" as const },
};

function ClientsPage() {
  return (
    <WorkspaceShell
      eyebrow="Comercial"
      title="Clientes"
      description="Empresas, contatos e histórico completo em um só lugar."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          <Plus className="size-3.5" /> Novo cliente
        </button>
      }
    >
      <div className="mb-4 flex items-center gap-2 rounded-md border border-input bg-card px-3 py-1.5">
        <Search className="size-3.5 text-muted-foreground" />
        <input placeholder="Buscar cliente…" className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/60" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((c) => {
          const s = statusMap[c.status];
          return (
            <div key={c.id} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-md bg-gradient-to-br from-[oklch(0.7_0.14_250)] to-[oklch(0.68_0.2_320)] text-[13px] font-semibold text-white">
                    {c.initials}
                  </div>
                  <div>
                    <p className="font-display text-[15px] font-semibold">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground">{c.contact}</p>
                  </div>
                </div>
                <StatusPill tone={s.tone} dot>{s.label}</StatusPill>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Projetos</p>
                  <p className="mt-0.5 font-display text-base font-semibold">{c.projects}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">MRR</p>
                  <p className="mt-0.5 font-display text-base font-semibold">{currency(c.mrr)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Desde</p>
                  <p className="mt-0.5 font-display text-base font-semibold">{c.since}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </WorkspaceShell>
  );
}