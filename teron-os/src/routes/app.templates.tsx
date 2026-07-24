import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  FileSignature,
  FileText,
  Layout,
  Mail,
  MessageCircle,
  Receipt,
  Scale,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { templates } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/templates")({
  head: () => ({ meta: [{ title: "Templates — TERON OS" }] }),
  component: TemplatesPage,
});

const kindIcon: Record<string, LucideIcon> = {
  proposta: FileText,
  contrato: FileSignature,
  cobrança: Receipt,
  whatsapp: MessageCircle,
  email: Mail,
  escopo: Scale,
  cronograma: Calendar,
  landing: Layout,
};

function TemplatesPage() {
  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Templates"
      description="Nunca mais escreva do zero. Modelos prontos para propostas, contratos, cobranças, WhatsApp, e-mail e mais."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          + Novo template
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label="Templates" value={String(templates.length)} hint="em 8 categorias" />
        <Kpi label="Mais usado" value="Cobrança amigável" hint="214 usos" />
        <Kpi label="Tempo poupado (30d)" value="42h" hint="vs escrever do zero" />
        <Kpi label="Última atualização" value="há 1 dia" hint="por Thomas" />
      </div>

      <section className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => {
          const Icon = kindIcon[t.kind] ?? BookOpen;
          return (
            <div
              key={t.id}
              className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/30"
            >
              <div className="grid size-9 place-items-center rounded-md border border-border bg-background">
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-[13px] font-medium">{t.name}</p>
                </div>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{t.kind}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{t.usedCount} usos</span>
                  <span>Atualizado {t.updatedAt}</span>
                </div>
              </div>
            </div>
          );
        })}
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
