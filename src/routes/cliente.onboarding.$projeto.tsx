import { createFileRoute, useParams } from "@tanstack/react-router";
import { CheckCircle2, Clock, MessageSquare, Pause, Upload } from "lucide-react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";
import { onboardingItems } from "@/lib/teron-data";

export const Route = createFileRoute("/cliente/onboarding/$projeto")({
  head: () => ({ meta: [{ title: "Onboarding — TERON OS" }, { name: "robots", content: "noindex" }] }),
  component: OnboardingPage,
});

const statusMap = {
  pendente: { label: "Pendente", tone: "warning" as const },
  enviado: { label: "Em revisão", tone: "info" as const },
  aprovado: { label: "Aprovado", tone: "success" as const },
};

function OnboardingPage() {
  const { projeto } = useParams({ from: "/cliente/onboarding/$projeto" });
  const total = onboardingItems.length;
  const done = onboardingItems.filter((i) => i.status === "aprovado").length;
  const percent = Math.round((done / total) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center px-6">
          <TeronWordmark />
          <span className="ml-auto text-[11px] text-muted-foreground">Projeto {projeto}</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Bem-vindo à TERON</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Vamos preparar tudo antes de começar.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Precisamos de alguns materiais para iniciar o projeto com precisão. Você pode enviar aos poucos — nada de e-mail com anexos gigantes.
        </p>

        <div className="mt-10 rounded-xl border border-amber-400/25 bg-amber-400/5 p-5">
          <div className="flex items-start gap-3">
            <div className="grid size-9 place-items-center rounded-md bg-amber-400/15 text-amber-300">
              <Pause className="size-4" />
            </div>
            <div className="flex-1">
              <p className="text-[13.5px] font-medium text-foreground">Cronograma pausado — aguardando cliente</p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                O prazo será iniciado apenas após o recebimento de todos os materiais obrigatórios.
              </p>
            </div>
            <StatusPill tone="warning" dot>Aguardando cliente</StatusPill>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between text-[12px] text-muted-foreground">
              <span>{done} de {total} itens concluídos</span>
              <span>{percent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>

        <ul className="mt-10 space-y-2.5">
          {onboardingItems.map((it) => {
            const s = statusMap[it.status];
            return (
              <li key={it.id} className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/40 px-5 py-4 transition-colors hover:bg-card/70">
                <div className={`grid size-9 shrink-0 place-items-center rounded-full border ${it.status === "aprovado" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400" : "border-border/60 bg-background/50 text-muted-foreground"}`}>
                  {it.status === "aprovado" ? <CheckCircle2 className="size-4" /> : <Clock className="size-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-medium text-foreground">{it.label}</p>
                    {it.required && <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">obrigatório</span>}
                  </div>
                  <p className="text-[12.5px] text-muted-foreground">{it.hint}</p>
                </div>
                <StatusPill tone={s.tone} dot>{s.label}</StatusPill>
                <div className="hidden gap-1.5 sm:flex">
                  <button className="grid size-8 place-items-center rounded-md border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground" aria-label="Enviar arquivo">
                    <Upload className="size-3.5" />
                  </button>
                  <button className="grid size-8 place-items-center rounded-md border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground" aria-label="Comentar">
                    <MessageSquare className="size-3.5" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
