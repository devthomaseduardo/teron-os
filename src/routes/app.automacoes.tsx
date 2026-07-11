import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Workflow, Zap } from "lucide-react";
import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { automations } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/automacoes")({
  head: () => ({ meta: [{ title: "Automações — TERON OS" }] }),
  component: AutomacoesPage,
});

const statusTone = { ativa: "success", pausada: "warning", rascunho: "neutral" } as const;

function AutomacoesPage() {
  const runs = automations.reduce((s, a) => s + a.runsThisMonth, 0);

  return (
    <WorkspaceShell
      eyebrow="Command"
      title="Automações"
      description="Fluxos sem código que fazem a empresa rodar sozinha. Pagamento confirmado → cria projeto → workspace → cronograma → e-mail. Tudo automático."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          <Zap className="size-3.5" /> Nova automação
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label="Automações ativas" value={String(automations.filter((a) => a.status === "ativa").length)} hint={`${automations.length} no total`} />
        <Kpi label="Execuções no mês" value={String(runs)} hint="tempo poupado: 58h" />
        <Kpi label="Taxa de sucesso" value="98.4%" hint="1 falha em 62 runs" />
        <Kpi label="Média de passos" value="5" hint="por fluxo" />
      </div>

      <section className="mt-6 space-y-4">
        {automations.map((a) => (
          <div key={a.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <div className="flex items-center gap-2">
                <Workflow className="size-4 text-muted-foreground" />
                <h3 className="text-[13.5px] font-medium">{a.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground">{a.runsThisMonth} runs · 30d</span>
                <StatusPill tone={statusTone[a.status]} dot>{a.status}</StatusPill>
              </div>
            </header>
            <div className="px-5 py-4">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Trigger</p>
              <p className="mt-1 text-[13px] font-medium">{a.trigger}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {a.steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="rounded-md border border-border bg-background px-2.5 py-1 text-[12px]">
                      {step}
                    </div>
                    {i < a.steps.length - 1 && <ChevronRight className="size-3 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </WorkspaceShell>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}
