import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Copy, Eye, EyeOff, Search } from "lucide-react";
import { useState } from "react";

import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { knowledgeEntries } from "@/lib/teron-data";

export const Route = createFileRoute("/app/base")({
  head: () => ({ meta: [{ title: "Base de conhecimento — TERON OS" }] }),
  component: KnowledgePage,
});

const categoryLabel: Record<string, string> = {
  dominio: "Domínio",
  servidor: "Servidor",
  deploy: "Deploy",
  banco: "Banco de dados",
  api: "API",
  integracao: "Integração",
  licenca: "Licença",
  acesso: "Acesso",
};

function KnowledgePage() {
  const [reveal, setReveal] = useState<Record<string, boolean>>({});

  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Base de conhecimento"
      description="Domínio, servidor, deploy, banco, APIs, licenças. Nunca mais 'onde estava aquela senha?'."
    >
      <div className="mb-4 flex items-center gap-2 rounded-md border border-input bg-card px-3 py-1.5">
        <Search className="size-3.5 text-muted-foreground" />
        <input placeholder="Buscar por projeto, categoria ou valor…" className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/60" />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5 text-left font-medium">Categoria</th>
              <th className="px-4 py-2.5 text-left font-medium">Item</th>
              <th className="px-4 py-2.5 text-left font-medium">Valor</th>
              <th className="px-4 py-2.5 text-left font-medium">Projeto</th>
              <th className="px-4 py-2.5 text-right font-medium">Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {knowledgeEntries.map((k) => (
              <tr key={k.id} className="border-b border-border/60 text-[13px] last:border-0 hover:bg-muted/20">
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                    <BookOpen className="size-3" /> {categoryLabel[k.category] ?? k.category}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{k.label}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted/50 px-2 py-0.5 font-mono text-[12px]">
                      {reveal[k.id] ? k.value : "•".repeat(Math.min(k.value.length, 24))}
                    </code>
                    <button onClick={() => setReveal((s) => ({ ...s, [k.id]: !s[k.id] }))} className="text-muted-foreground hover:text-foreground" aria-label="Alternar">
                      {reveal[k.id] ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                    </button>
                    <button className="text-muted-foreground hover:text-foreground" aria-label="Copiar"><Copy className="size-3" /></button>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{k.project}</td>
                <td className="px-4 py-3 text-right text-[11.5px] text-muted-foreground">{k.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WorkspaceShell>
  );
}
