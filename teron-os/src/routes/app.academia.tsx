import { createFileRoute } from "@tanstack/react-router";
import { Award, GraduationCap, PlayCircle } from "lucide-react";
import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";

export const Route = createFileRoute("/app/academia")({
  head: () => ({ meta: [{ title: "Academia — TERON OS" }] }),
  component: AcademiaPage,
});

const trilhas = [
  { title: "Fundamentos TERON", modules: 6, hours: "3h20", level: "Onboarding" },
  { title: "Squad de Produto", modules: 8, hours: "5h10", level: "Time" },
  { title: "Product Ops · Cronogramas", modules: 4, hours: "2h00", level: "Especialista" },
  { title: "Comunicação com clientes", modules: 5, hours: "1h40", level: "Time" },
];

function AcademiaPage() {
  return (
    <WorkspaceShell
      eyebrow="Empresa"
      title="Academia TERON"
      description="Trilhas internas para novos membros. Ele entra → faz cursos → aprende processos → recebe certificado interno."
      action={<StatusPill tone="info">Beta fechado</StatusPill>}
    >
      <section className="rounded-xl border border-dashed border-border bg-card/40 p-6">
        <div className="mx-auto grid size-10 place-items-center rounded-md bg-muted">
          <GraduationCap className="size-4 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-center font-display text-lg font-semibold">
          Cursos internos com certificação automática
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
          Cada novo membro do time entra em uma trilha pré-definida, assiste vídeos, faz exercícios e recebe um certificado interno gerado pela TERON OS. O owner acompanha o progresso em tempo real.
        </p>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {trilhas.map((t) => (
          <div key={t.title} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[13.5px] font-medium">{t.title}</h3>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {t.modules} módulos · {t.hours}
                </p>
              </div>
              <StatusPill tone="neutral">{t.level}</StatusPill>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-[12px] text-muted-foreground">
                <PlayCircle className="size-3.5" /> Preview
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1 text-[12px] text-muted-foreground">
                <Award className="size-3.5" /> Certificado
              </button>
            </div>
          </div>
        ))}
      </section>
    </WorkspaceShell>
  );
}
