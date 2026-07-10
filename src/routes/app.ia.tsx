import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { aiSuggestions } from "@/lib/teron-data";

export const Route = createFileRoute("/app/ia")({
  head: () => ({ meta: [{ title: "Assistente IA — TERON OS" }] }),
  component: AiPage,
});

const kindLabel = {
  cronograma: "Cronograma",
  cobranca: "Cobrança",
  escopo: "Escopo",
  risco: "Risco",
  comunicacao: "Comunicação",
} as const;

function AiPage() {
  return (
    <WorkspaceShell
      eyebrow="Workspace"
      title="Assistente IA"
      description="Age como um gerente de projetos. Não espera você perguntar — sugere a próxima ação."
    >
      <div className="space-y-3">
        {aiSuggestions.map((s) => (
          <div key={s.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start gap-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{kindLabel[s.kind]}</span>
                  {s.project && <span className="text-[11px] text-muted-foreground">{s.project}</span>}
                </div>
                <p className="mt-2 text-[14.5px] font-medium text-foreground">{s.title}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.actions.map((a) => (
                    <button key={a.label} className={
                      a.primary
                        ? "rounded-md bg-foreground px-3 py-1.5 text-[12.5px] font-medium text-background hover:opacity-90"
                        : "rounded-md border border-border bg-background/50 px-3 py-1.5 text-[12.5px] text-muted-foreground hover:text-foreground"
                    }>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WorkspaceShell>
  );
}
