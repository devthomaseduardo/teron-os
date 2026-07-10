import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Package, Rocket, Timer, Upload, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { journalEvents } from "@/lib/teron-data";

export const Route = createFileRoute("/app/diario")({
  head: () => ({ meta: [{ title: "Diário do projeto — TERON OS" }] }),
  component: JournalPage,
});

const iconMap: Record<string, LucideIcon> = {
  contrato: CheckCircle2,
  pagamento: CreditCard,
  material: Upload,
  deploy: Rocket,
  solicitacao: Zap,
  aprovacao: CheckCircle2,
  onboarding: Package,
};

function JournalPage() {
  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Diário do projeto"
      description="Cada evento registrado automaticamente. Contrato, pagamento, material, deploy, aprovação — tudo aqui."
    >
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-border/60" aria-hidden />
        <ul className="space-y-4">
          {journalEvents.map((e) => {
            const Icon = iconMap[e.type] ?? Timer;
            return (
              <li key={e.id} className="relative flex gap-4 pl-0">
                <div className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-border bg-card">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1 rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[13.5px] text-foreground">{e.message}</p>
                    <p className="text-[11px] text-muted-foreground">{e.when}</p>
                  </div>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">{e.project}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </WorkspaceShell>
  );
}
