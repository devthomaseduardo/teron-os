import { createFileRoute } from "@tanstack/react-router";
import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { marketplaceApps } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace — TERON OS" }] }),
  component: MarketplacePage,
});

const categoryLabels = {
  comunicação: "Comunicação",
  pagamentos: "Pagamentos",
  dev: "Desenvolvimento",
  design: "Design",
  produtividade: "Produtividade",
  dados: "Dados",
} as const;

function MarketplacePage() {
  const grouped = Object.entries(categoryLabels).map(([key, label]) => ({
    key,
    label,
    apps: marketplaceApps.filter((a) => a.category === key),
  }));

  return (
    <WorkspaceShell
      eyebrow="Empresa"
      title="Marketplace"
      description="Instale módulos e integrações em um clique. WhatsApp, Google Calendar, Stripe, GitHub, Figma, Notion e mais."
    >
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Em beta</p>
        <p className="mt-1 text-[13px] text-foreground">
          {marketplaceApps.filter((a) => a.installed).length} de {marketplaceApps.length} apps disponíveis já ativos no seu workspace.
        </p>
      </div>

      {grouped.map((cat) => (
        <section key={cat.key} className="mt-6">
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {cat.label}
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {cat.apps.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/30"
              >
                <div className="grid size-10 place-items-center rounded-md bg-gradient-to-br from-muted to-background text-[11px] font-semibold uppercase">
                  {a.name.slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[13px] font-medium">{a.name}</p>
                    {a.installed && <StatusPill tone="success">Instalado</StatusPill>}
                  </div>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">{a.description}</p>
                </div>
                <button
                  className={`shrink-0 rounded-md px-2.5 py-1 text-[12px] ${
                    a.installed
                      ? "border border-border bg-background text-muted-foreground hover:text-foreground"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  {a.installed ? "Configurar" : "Instalar"}
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </WorkspaceShell>
  );
}
