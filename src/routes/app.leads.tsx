import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Search,
  Bot,
  DollarSign,
  FileText,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  X,
  Mail,
  Phone,
  Building,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";
import { currency } from "@/lib/teron-data";

export const Route = createFileRoute("/app/leads")({
  head: () => ({ meta: [{ title: "Leads — TERON OS" }] }),
  component: AdminLeadsDashboard,
});

interface ApiLead {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  address?: string;
  projectType: string;
  briefing?: string;
  deadline?: string;
  estimatedValue: number;
  status: string;
  source: string;
  intent?: string;
  createdAt: string;
  proposal: {
    id: string;
    publicToken: string;
    status: string;
    amount: number;
    viewedAt: string | null;
    acceptedAt: string | null;
  } | null;
}

function AdminLeadsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<ApiLead | null>(null);
  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
        setError(null);
      } else {
        setLeads([]);
        setError(data.error || "Falha ao carregar");
      }
    } catch {
      setLeads([]);
      setError("API indisponível — confira o banco e a migration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.company || "").toLowerCase().includes(q) ||
        (l.email || "").toLowerCase().includes(q)
    );
  }, [leads, searchTerm]);

  const signed = leads.filter((l) => l.proposal?.status === "aceita" || l.status === "aceita").length;
  const viewed = leads.filter((l) => l.proposal?.viewedAt).length;
  const pipeline = leads.reduce((s, l) => s + (l.estimatedValue || 0), 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <TeronWordmark />
            <span className="text-xs text-muted-foreground hidden sm:inline">Leads reais do bot e da OS</span>
          </div>
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-medium text-emerald-400 flex items-center gap-1.5">
            <Bot className="size-3.5" /> Fonte: PostgreSQL
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Leads</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Dados vindos do WhatsApp e da API. Lista vazia até o primeiro lead real.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border border-border/60 bg-card/60 pl-9 pr-4 py-2 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Metric label="Total de leads" value={String(leads.length)} icon={<Users className="size-4 text-blue-400" />} />
          <Metric label="Propostas visualizadas" value={String(viewed)} icon={<FileText className="size-4 text-amber-400" />} />
          <Metric label="Aceitas" value={String(signed)} icon={<ShieldCheck className="size-4 text-emerald-400" />} />
          <Metric label="Pipeline" value={currency(pipeline)} icon={<Sparkles className="size-4 text-purple-400" />} />
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card/40 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Carregando leads...
            </div>
          ) : error ? (
            <div className="py-16 text-center text-sm text-amber-400">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Nenhum lead ainda. Quando o bot enviar o primeiro orçamento, ele aparece aqui.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border/60 bg-card/80 text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Cliente</th>
                    <th className="px-5 py-3 font-semibold">Projeto / Intent</th>
                    <th className="px-5 py-3 font-semibold">Valor</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="hover:bg-card/60 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold">{lead.company || lead.name}</p>
                        <p className="text-muted-foreground text-[11px]">
                          {lead.name} · {lead.email || "sem e-mail"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium">{lead.projectType || "—"}</p>
                        <span className="text-[10px] text-muted-foreground">
                          {lead.intent || lead.source} · {new Date(lead.createdAt).toLocaleString("pt-BR")}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono font-semibold">{currency(lead.estimatedValue)}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          <StatusPill tone="info" dot>
                            {lead.status}
                          </StatusPill>
                          {lead.proposal && (
                            <StatusPill
                              tone={
                                lead.proposal.status === "aceita"
                                  ? "success"
                                  : lead.proposal.viewedAt
                                    ? "warning"
                                    : "neutral"
                              }
                              dot
                            >
                              {lead.proposal.status}
                            </StatusPill>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2.5 py-1.5 text-[11px] hover:border-primary"
                          >
                            Detalhes <FileText className="size-3" />
                          </button>
                          {lead.proposal?.publicToken && (
                            <a
                              href={`/proposta/${lead.proposal.publicToken}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground"
                            >
                              Proposta
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-xl rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Building className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedLead.company || selectedLead.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedLead.intent || selectedLead.source}</p>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1.5 text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-border/60 p-3 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase">Contato</span>
                <p className="font-semibold">{selectedLead.name}</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Mail className="size-3" /> {selectedLead.email || "—"}
                </p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Phone className="size-3" /> {selectedLead.phone || "—"}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 p-3 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase">Valor / prazo</span>
                <p className="font-mono font-bold text-emerald-400">{currency(selectedLead.estimatedValue)}</p>
                <p className="text-[10px] text-muted-foreground">Prazo: {selectedLead.deadline || "—"}</p>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 p-4 text-xs">
              <span className="text-[10px] font-mono text-primary font-bold uppercase">Briefing</span>
              <p className="mt-2 leading-relaxed">{selectedLead.briefing || "Sem detalhes."}</p>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              {selectedLead.phone ? (
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black"
                >
                  <MessageSquare className="size-4" /> WhatsApp
                </a>
              ) : (
                <span />
              )}
              <button onClick={() => setSelectedLead(null)} className="text-xs text-muted-foreground">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        {icon}
      </div>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}
