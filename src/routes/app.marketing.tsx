import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BarChart3, FileText, Globe, Radar } from "lucide-react";
import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { blogPosts, landingPages } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/marketing")({
  head: () => ({ meta: [{ title: "Marketing — TERON OS" }] }),
  component: MarketingPage,
});

function MarketingPage() {
  const totalVisits = landingPages.reduce((s, p) => s + p.visits, 0);
  const avgConversion =
    landingPages.filter((p) => p.status === "publicada").reduce((s, p) => s + p.conversion, 0) /
    landingPages.filter((p) => p.status === "publicada").length;

  return (
    <WorkspaceShell
      eyebrow="Aquisição"
      title="Marketing"
      description="Landing pages, blog, portfólio e formulários — a porta de entrada dos leads da sua empresa."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          + Nova landing
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card icon={Globe} label="Landing pages" value={String(landingPages.length)} hint="publicadas + rascunhos" />
        <Card icon={BarChart3} label="Visitas · 30d" value={totalVisits.toLocaleString("pt-BR")} hint="+18% vs mês anterior" />
        <Card icon={Radar} label="Conversão média" value={`${avgConversion.toFixed(1)}%`} hint="landing → lead" />
        <Card icon={FileText} label="Posts publicados" value={String(blogPosts.filter((b) => b.status === "publicado").length)} hint="+ 1 em rascunho" />
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
          <h3 className="text-[13px] font-semibold">Landing pages e portfólio</h3>
          <span className="text-[11px] text-muted-foreground">Pixel Manager · Analytics ativos</span>
        </header>
        <table className="w-full text-[13px]">
          <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-2 font-medium">Página</th>
              <th className="px-5 py-2 font-medium">Rota</th>
              <th className="px-5 py-2 text-right font-medium">Visitas</th>
              <th className="px-5 py-2 text-right font-medium">Conversão</th>
              <th className="px-5 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {landingPages.map((lp) => (
              <tr key={lp.id} className="hover:bg-muted/30">
                <td className="px-5 py-3 font-medium">{lp.name}</td>
                <td className="px-5 py-3 font-mono text-[12px] text-muted-foreground">{lp.slug}</td>
                <td className="px-5 py-3 text-right font-mono text-[12px]">{lp.visits.toLocaleString("pt-BR")}</td>
                <td className="px-5 py-3 text-right font-mono text-[12px]">{lp.conversion}%</td>
                <td className="px-5 py-3">
                  <StatusPill tone={lp.status === "publicada" ? "success" : "neutral"}>{lp.status}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border px-5 py-3">
            <h3 className="text-[13px] font-semibold">Blog</h3>
            <button className="text-[12px] text-muted-foreground hover:text-foreground">Novo post <ArrowUpRight className="ml-0.5 inline size-3" /></button>
          </header>
          <ul className="divide-y divide-border">
            {blogPosts.map((b) => (
              <li key={b.id} className="flex items-center gap-3 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{b.title}</p>
                  <p className="text-[11px] text-muted-foreground">{b.author} · {b.date} · {b.views.toLocaleString("pt-BR")} views</p>
                </div>
                <StatusPill tone={b.status === "publicado" ? "success" : "neutral"}>{b.status}</StatusPill>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card p-5">
          <h3 className="text-[13px] font-semibold">Chat IA de captura</h3>
          <p className="mt-1 text-[12.5px] text-muted-foreground">
            Assistente que qualifica visitantes em tempo real e cria leads automaticamente no CRM.
          </p>
          <div className="mt-4 space-y-2 rounded-lg border border-border bg-background p-3 text-[12.5px]">
            <div className="rounded bg-muted/50 p-2 text-muted-foreground">
              <strong className="text-foreground">Visitante:</strong> Preciso de um SaaS de gestão financeira, quanto custa?
            </div>
            <div className="rounded bg-primary/10 p-2 text-foreground">
              <strong>TERON AI:</strong> Nossos projetos partem de R$ 60k para MVP. Posso agendar uma call com o Thomas amanhã às 14h?
            </div>
          </div>
          <button className="mt-4 w-full rounded-md border border-border bg-background py-1.5 text-[12.5px] hover:bg-accent">
            Configurar prompts do chat
          </button>
        </div>
      </section>
    </WorkspaceShell>
  );
}

function Card({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Globe;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}
