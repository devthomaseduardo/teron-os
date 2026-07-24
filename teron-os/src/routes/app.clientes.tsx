import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency } from "@/lib/teron-data";

export const Route = createFileRoute("/app/clientes")({
  head: () => ({ meta: [{ title: "Clientes — TERON OS" }] }),
  component: ClientsPage,
});

type ClientCard = {
  key: string;
  name: string;
  contact: string;
  email: string;
  projects: number;
  budget: number;
  status: string;
  initials: string;
  token?: string | null;
};

function ClientsPage() {
  const [clients, setClients] = useState<ClientCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [projRes, leadRes] = await Promise.all([fetch("/api/projects"), fetch("/api/leads")]);
        const projData = await projRes.json();
        const leadData = await leadRes.json();

        const map = new Map<string, ClientCard>();

        for (const p of projData.projects || []) {
          const key = (p.clientCompany || p.clientName || p.id).toLowerCase();
          const existing = map.get(key);
          const name = p.clientCompany || p.clientName || "Cliente";
          const initials = name
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          if (existing) {
            existing.projects += 1;
            existing.budget += p.budget || 0;
          } else {
            map.set(key, {
              key,
              name,
              contact: p.clientName || "",
              email: p.clientEmail || p.lead?.email || "",
              projects: 1,
              budget: p.budget || 0,
              status: p.status === "onboarding" ? "onboarding" : "ativo",
              initials,
              token: p.clientAccessToken,
            });
          }
        }

        // Leads aceitos sem projeto ainda
        for (const l of leadData.leads || []) {
          if (l.status !== "aceita" && l.intent === "recrutador") continue;
          const company = l.company || l.name;
          const key = company.toLowerCase();
          if (map.has(key)) continue;
          if (!l.company && l.status === "novo") continue;
          // só mostra leads com proposta ou aceitos
          if (!l.proposal && l.status !== "aceita") continue;
          map.set(key, {
            key,
            name: company,
            contact: l.name,
            email: l.email || "",
            projects: 0,
            budget: l.estimatedValue || 0,
            status: l.status === "aceita" ? "ativo" : "onboarding",
            initials: company
              .split(" ")
              .map((w: string) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
          });
        }

        setClients(Array.from(map.values()));
      } catch {
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.contact.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s)
    );
  }, [clients, q]);

  return (
    <WorkspaceShell
      eyebrow="Comercial"
      title="Clientes"
      description="Derivados de projetos e leads reais. Lista vazia até o primeiro fechamento."
    >
      <div className="mb-4 flex items-center gap-2 rounded-md border border-input bg-card px-3 py-1.5">
        <Search className="size-3.5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar cliente…"
          className="w-full bg-transparent text-[13px] outline-none"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Carregando...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          Nenhum cliente ainda. Eles aparecem quando houver projeto ou proposta aceita.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <div
              key={c.key}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-md bg-gradient-to-br from-[oklch(0.7_0.14_250)] to-[oklch(0.68_0.2_320)] text-[13px] font-semibold text-white">
                    {c.initials}
                  </div>
                  <div>
                    <p className="font-display text-[15px] font-semibold">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground">{c.contact}</p>
                  </div>
                </div>
                <StatusPill tone={c.status === "ativo" ? "success" : "info"} dot>
                  {c.status}
                </StatusPill>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Projetos</p>
                  <p className="mt-0.5 font-display text-base font-semibold">{c.projects}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Budget</p>
                  <p className="mt-0.5 font-display text-base font-semibold">{currency(c.budget)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Contato</p>
                  <p className="mt-0.5 text-[11px] truncate">{c.email || "—"}</p>
                </div>
              </div>
              {c.token && (
                <a
                  href={`/cliente/onboarding/${c.token}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block text-center text-xs text-primary font-medium hover:underline"
                >
                  Abrir workstation
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </WorkspaceShell>
  );
}
