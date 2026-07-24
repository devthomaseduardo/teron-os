import { createFileRoute } from "@tanstack/react-router";
import { FilePlus2, Loader2, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency } from "@/lib/teron-data";

export const Route = createFileRoute("/app/propostas")({
  head: () => ({ meta: [{ title: "Propostas — TERON OS" }] }),
  component: ProposalsPage,
});

interface ApiProposal {
  id: string;
  publicToken: string;
  title: string;
  client: string;
  contact: string;
  scope: string;
  amount: number;
  status: string;
  createdAt: string;
  publicLink: string;
  viewedAt: string | null;
  acceptedAt: string | null;
}

const statusMap: Record<string, { label: string; tone: "neutral" | "warning" | "success" | "danger" | "info" }> = {
  rascunho: { label: "Rascunho", tone: "neutral" },
  enviada: { label: "Enviada", tone: "warning" },
  visualizada: { label: "Visualizada", tone: "info" },
  aceita: { label: "Aceita", tone: "success" },
  recusada: { label: "Recusada", tone: "danger" },
  expirada: { label: "Expirada", tone: "danger" },
};

function ProposalsPage() {
  const [proposals, setProposals] = useState<ApiProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ApiProposal | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/proposals");
      const data = await res.json();
      if (data.success) {
        setProposals(data.proposals || []);
        setError(null);
        if (!selected && data.proposals?.length) setSelected(data.proposals[0]);
      } else {
        setProposals([]);
        setError(data.error || "Falha ao carregar");
      }
    } catch {
      setProposals([]);
      setError("API indisponível — rode a migration e confira o DATABASE_URL");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <WorkspaceShell
      eyebrow="Comercial"
      title="Propostas"
      description="Propostas reais geradas pelo bot e pela OS. Lista vazia até a primeira proposta."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background opacity-50 cursor-not-allowed" disabled>
          <FilePlus2 className="size-3.5" /> Nova proposta (em breve)
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Carregando...
            </div>
          ) : error ? (
            <div className="py-16 text-center text-sm text-amber-400 px-4">{error}</div>
          ) : proposals.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground px-4">
              Nenhuma proposta ainda. Quando o bot concluir um orçamento, ela aparece aqui automaticamente.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {proposals.map((p) => {
                const s = statusMap[p.status] || { label: p.status, tone: "neutral" as const };
                return (
                  <li
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className={`grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-muted/20 ${
                      selected?.id === p.id ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium">{p.client}</p>
                      <p className="truncate text-[12px] text-muted-foreground">{p.scope}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-[14px] font-semibold">{currency(p.amount)}</span>
                      <StatusPill tone={s.tone} dot>
                        {s.label}
                      </StatusPill>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <aside className="rounded-xl border border-border bg-card p-5">
          {!selected ? (
            <p className="text-sm text-muted-foreground">Selecione uma proposta para ver detalhes.</p>
          ) : (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {selected.publicToken.slice(0, 12)}...
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold">{selected.title || selected.scope}</h3>
              <p className="mt-1 text-[12.5px] text-muted-foreground">
                {selected.client}
                {selected.contact ? ` · ${selected.contact}` : ""}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Criada em {new Date(selected.createdAt).toLocaleString("pt-BR")}
              </p>

              <div className="mt-5 space-y-3 text-[13px]">
                <Row k="Status" v={selected.status} />
                <Row k="Investimento" v={currency(selected.amount)} />
                <Row k="Visualizada" v={selected.viewedAt ? new Date(selected.viewedAt).toLocaleString("pt-BR") : "Ainda não"} />
                <Row k="Aceita" v={selected.acceptedAt ? new Date(selected.acceptedAt).toLocaleString("pt-BR") : "—"} />
              </div>

              <a
                href={selected.publicLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground"
              >
                Abrir link público <ExternalLink className="size-3.5" />
              </a>
            </>
          )}
        </aside>
      </div>
    </WorkspaceShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}
