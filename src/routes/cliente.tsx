import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  CircleDollarSign,
  Download,
  FileSignature,
  FileText,
  MessageSquare,
  Rocket,
  Upload,
} from "lucide-react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";
import { currency } from "@/lib/teron-data";

export const Route = createFileRoute("/cliente")({
  head: () => ({
    meta: [{ title: "Portal do cliente — TERON Studio" }],
  }),
  component: ClientPortal,
});

function ClientPortal() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/70 bg-background/80 px-6 backdrop-blur">
        <Link to="/">
          <TeronWordmark />
        </Link>
        <div className="flex items-center gap-3">
          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
            <Bell className="size-4" />
          </button>
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-[12px]">
            <div className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.14_250)] to-[oklch(0.68_0.2_320)] text-[10px] font-semibold text-white">HV</div>
            <span>Helena · Meridian</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Meridian Capital · Projeto</p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Plataforma Wealth</h1>
          </div>
          <StatusPill tone="success" dot>Em execução · sprint 6/12</StatusPill>
        </div>

        <section className="mt-6 rounded-xl border border-[oklch(0.8_0.14_78_/_25%)] bg-[oklch(0.8_0.14_78_/_5%)] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.88_0.14_78)]">Aguardando você</p>
          <h3 className="mt-2 font-display text-lg font-semibold">Envio das imagens da marca</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Enquanto o material não chega, o cronograma está pausado. O novo prazo será recalculado automaticamente após o envio.
          </p>
          <button className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-[13px] font-medium text-background hover:opacity-90">
            <Upload className="size-3.5" /> Enviar arquivos
          </button>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="rounded-xl border border-border bg-card">
            <header className="border-b border-border px-5 py-3">
              <h3 className="text-[13px] font-semibold">Cronograma</h3>
            </header>
            <div className="space-y-4 p-5">
              {[
                { s: "Descoberta", v: 100, d: "10/06 · concluída" },
                { s: "Design system", v: 100, d: "20/06 · concluída" },
                { s: "Onboarding + Auth", v: 80, d: "prevista 12/07" },
                { s: "Wealth core", v: 45, d: "prevista 05/08" },
                { s: "Deploy", v: 0, d: "prevista 20/08" },
              ].map((r) => (
                <div key={r.s}>
                  <div className="mb-1 flex items-center justify-between text-[12.5px]">
                    <span className="font-medium">{r.s}</span>
                    <span className="text-muted-foreground">{r.d}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-foreground" style={{ width: `${r.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="size-4 text-muted-foreground" />
                <h3 className="text-[13px] font-semibold">Fatura em aberto</h3>
              </div>
              <p className="mt-3 font-display text-2xl font-semibold">{currency(18500)}</p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">#0285 · vence em 10/07</p>
              <button className="mt-4 w-full rounded-md bg-foreground px-3 py-2 text-[13px] font-medium text-background hover:opacity-90">
                Pagar agora <ArrowRight className="ml-1 inline size-3.5" />
              </button>
            </section>

            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Rocket className="size-4 text-muted-foreground" />
                <h3 className="text-[13px] font-semibold">Último deploy</h3>
              </div>
              <p className="mt-3 font-mono text-[12px]">v0.14.2 · staging</p>
              <p className="mt-1 text-[12px] text-muted-foreground">Publicado há 3 horas por Deploy bot.</p>
              <a href="#" className="mt-3 inline-flex items-center gap-1 text-[12px] text-foreground hover:underline">
                Abrir preview <ArrowRight className="size-3" />
              </a>
            </section>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <QuickCard icon={FileText} title="Propostas" body="1 aprovada · 0 pendentes" />
          <QuickCard icon={FileSignature} title="Contratos" body="v3 assinado em 22/06" cta="Baixar PDF" iconCta={Download} />
          <QuickCard icon={MessageSquare} title="Solicitações" body="2 abertas · resposta em <2h" cta="Abrir chamado" iconCta={ArrowRight} />
        </div>

        <section className="mt-6 rounded-xl border border-border bg-card p-5">
          <h3 className="text-[13px] font-semibold">Atividade do projeto</h3>
          <ul className="mt-3 divide-y divide-border">
            {[
              { i: "Deploy v0.14.2 publicado em staging", t: "há 3h" },
              { i: "Fatura #0283 marcada como paga", t: "ontem" },
              { i: "Você aprovou a proposta PR-040", t: "24/06" },
              { i: "TERON registrou 12h em Wealth core", t: "23/06" },
            ].map((x, i) => (
              <li key={i} className="flex items-start gap-3 py-2.5">
                <CheckCircle2 className="mt-0.5 size-3.5 text-muted-foreground" />
                <div className="flex-1 text-[12.5px] text-foreground">{x.i}</div>
                <span className="text-[11px] text-muted-foreground">{x.t}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function QuickCard({
  icon: Icon,
  title,
  body,
  cta,
  iconCta: IconCta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  cta?: string;
  iconCta?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        <h3 className="text-[13px] font-semibold text-foreground">{title}</h3>
      </div>
      <p className="mt-2 text-[13px] text-muted-foreground">{body}</p>
      {cta && (
        <button className="mt-4 inline-flex items-center gap-1 rounded-md border border-input bg-background px-2.5 py-1.5 text-[12px] hover:bg-accent">
          {cta} {IconCta && <IconCta className="size-3" />}
        </button>
      )}
    </div>
  );
}