import { createFileRoute } from "@tanstack/react-router";
import { FileText, Film, Folder, Image, Type } from "lucide-react";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { libraryFolders } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/biblioteca")({
  head: () => ({ meta: [{ title: "Biblioteca — TERON OS" }] }),
  component: BibliotecaPage,
});

function BibliotecaPage() {
  const totalSize = libraryFolders.reduce((s, f) => s + f.sizeMB, 0);
  const totalFiles = libraryFolders.reduce((s, f) => s + f.logos + f.fotos + f.videos + f.docs + f.fontes, 0);

  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Biblioteca"
      description="Nunca mais perder arquivos. Cada cliente tem sua pasta com logos, fotos, vídeos, fontes e documentos."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          + Enviar arquivo
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label="Clientes" value={String(libraryFolders.length)} hint="com biblioteca" />
        <Kpi label="Arquivos" value={String(totalFiles)} hint="+ 47 esta semana" />
        <Kpi label="Armazenamento" value={`${(totalSize / 1024).toFixed(2)} GB`} hint="de 100 GB" />
        <Kpi label="Backup" value="Diário" hint="às 03:00 UTC-3" />
      </div>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {libraryFolders.map((f) => (
          <div key={f.client} className="rounded-xl border border-border bg-card p-5">
            <header className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Folder className="size-4 text-muted-foreground" />
                  <h3 className="font-display text-base font-semibold">{f.client}</h3>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {(f.sizeMB / 1024).toFixed(2)} GB · {f.logos + f.fotos + f.videos + f.docs + f.fontes} arquivos
                </p>
              </div>
            </header>

            <div className="mt-4 grid grid-cols-5 gap-2 text-center">
              <FileType icon={Image} label="Logos" count={f.logos} />
              <FileType icon={Image} label="Fotos" count={f.fotos} />
              <FileType icon={Film} label="Vídeos" count={f.videos} />
              <FileType icon={FileText} label="Docs" count={f.docs} />
              <FileType icon={Type} label="Fontes" count={f.fontes} />
            </div>
          </div>
        ))}
      </section>
    </WorkspaceShell>
  );
}

function FileType({
  icon: Icon,
  label,
  count,
}: {
  icon: typeof Image;
  label: string;
  count: number;
}) {
  return (
    <div className="rounded-md border border-border bg-background/60 py-2">
      <Icon className="mx-auto size-3.5 text-muted-foreground" />
      <p className="mt-1 font-mono text-[11px] text-foreground">{count}</p>
      <p className="text-[9.5px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
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
