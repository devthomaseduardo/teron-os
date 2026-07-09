import { createFileRoute } from "@tanstack/react-router";
import { Download, FileSignature } from "lucide-react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";

export const Route = createFileRoute("/app/contratos")({
  head: () => ({ meta: [{ title: "Contratos — TERON Studio" }] }),
  component: ContractsPage,
});

const contracts = [
  { id: "CT-2026-014", client: "Meridian Capital", version: "v3", signedAt: "22/06/2026", tone: "success" as const, label: "Assinado" },
  { id: "CT-2026-013", client: "Aurora Health", version: "v1", signedAt: "24/06/2026", tone: "success" as const, label: "Assinado" },
  { id: "CT-2026-015", client: "Nordica Motors", version: "v1", signedAt: "—", tone: "warning" as const, label: "Aguardando assinatura" },
  { id: "CT-2026-012", client: "Pallas Studio", version: "v2", signedAt: "18/06/2026", tone: "success" as const, label: "Assinado" },
  { id: "CT-2026-011", client: "Lyra Labs", version: "v1", signedAt: "12/05/2026", tone: "neutral" as const, label: "Encerrado" },
];

function ContractsPage() {
  return (
    <WorkspaceShell
      eyebrow="Comercial"
      title="Contratos"
      description="Assinatura digital, versões e histórico auditável."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          <FileSignature className="size-3.5" /> Novo contrato
        </button>
      }
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <ul className="divide-y divide-border">
          {contracts.map((c) => (
            <li key={c.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-5 py-4">
              <div className="grid size-9 place-items-center rounded-md border border-border bg-background">
                <FileSignature className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[13.5px] font-medium">{c.client}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{c.id} · {c.version}</p>
              </div>
              <span className="text-[12px] text-muted-foreground">Assinado {c.signedAt}</span>
              <StatusPill tone={c.tone} dot>{c.label}</StatusPill>
              <button className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-2.5 py-1 text-[11.5px] text-muted-foreground hover:text-foreground">
                <Download className="size-3" /> PDF
              </button>
            </li>
          ))}
        </ul>
      </div>
    </WorkspaceShell>
  );
}