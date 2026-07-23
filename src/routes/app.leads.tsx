import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Bot,
  DollarSign,
  FileText,
  ShieldCheck,
  Send,
  Sparkles,
  MessageSquare,
  X,
  MapPin,
  Mail,
  Phone,
  Building,
  Rocket,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";
import { currency } from "@/lib/teron-data";
import { RealtimeLead, getRealtimeLeads } from "@/lib/realtime-store";

export const Route = createFileRoute("/app/leads")({
  head: () => ({ meta: [{ title: "Gestão de Leads & Bot — Thomas OS" }] }),
  component: AdminLeadsDashboard,
});

interface LeadItem {
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
  entryPaid: boolean;
  contractSigned: boolean;
  materialsComplete: boolean;
  createdAt: string;
  source: string;
}

const mockLeads: LeadItem[] = [
  {
    id: "b2b-lead",
    name: "Carlos Eduardo",
    company: "Acme Corp B2B",
    phone: "11998877665",
    email: "carlos@acmecorp.com.br",
    address: "São Paulo, SP",
    projectType: "Portal Dealer B2B & Plataforma Web",
    briefing: "Desenvolvimento de portal de vendas B2B integrado ao ERP com gestão de leads e controle de representantes.",
    deadline: "15 Dias Úteis",
    estimatedValue: 2800,
    entryPaid: true,
    contractSigned: true,
    materialsComplete: false,
    createdAt: "Hoje, 14:10",
    source: "Chatbot WhatsApp B2B",
  },
  {
    id: "empresa-x-82931",
    name: "João Silva",
    company: "Empresa X LTDA",
    phone: "11999887766",
    email: "joao@empresax.com.br",
    address: "Campinas, SP",
    projectType: "Landing Page + Bot",
    briefing: "Criação de landing page de alta velocidade para captação de leads B2B.",
    deadline: "7 Dias Úteis",
    estimatedValue: 1500,
    entryPaid: true,
    contractSigned: true,
    materialsComplete: false,
    createdAt: "Hoje, 12:35",
    source: "Docker Bot WhatsApp",
  },
  {
    id: "nordica-motors-44912",
    name: "Bruno Kern",
    company: "Nordica Motors",
    phone: "41988776655",
    email: "bruno@nordica.com",
    address: "Curitiba, PR",
    projectType: "Portal Dealer B2B",
    briefing: "Portal de catálogo interativo para concessionárias.",
    deadline: "20 Dias Úteis",
    estimatedValue: 8400,
    entryPaid: false,
    contractSigned: true,
    materialsComplete: false,
    createdAt: "Ontem, 16:20",
    source: "Docker Bot WhatsApp",
  },
];

function AdminLeadsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [realtimeLeads, setRealtimeLeads] = useState<RealtimeLead[]>([]);

  useEffect(() => {
    const sync = () => {
      setRealtimeLeads(getRealtimeLeads());
    };
    sync();

    const interval = setInterval(sync, 2000);
    window.addEventListener("teron_realtime_update", sync);
    window.addEventListener("storage", sync);

    return () => {
      clearInterval(interval);
      window.removeEventListener("teron_realtime_update", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const allLeads = useMemo(() => {
    const convertedRealtime: LeadItem[] = realtimeLeads.map((r) => ({
      id: r.id,
      name: r.name,
      company: r.company,
      phone: r.phone,
      email: r.email,
      address: r.address,
      projectType: r.projectType,
      briefing: r.briefing,
      deadline: r.deadline,
      estimatedValue: r.totalInvestment,
      entryPaid: r.status === "entrada_paga" || r.status === "workstation_ativa",
      contractSigned: r.status !== "novo_lead" && r.status !== "proposta_enviada",
      materialsComplete: r.status === "workstation_ativa",
      createdAt: new Date(r.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      source: "Chatbot WhatsApp (Tempo Real)",
    }));

    return convertedRealtime;
  }, [realtimeLeads]);

  const filtered = allLeads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <TeronWordmark />
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Gestão de Leads do Bot & Propostas B2B
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-medium text-emerald-400 flex items-center gap-1.5">
              <Bot className="size-3.5" /> Bot Teron Studio Online
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Painel de Leads & Briefings Recebidos</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acompanhe em tempo real os clientes qualificados pelo chatbot no WhatsApp, briefings enviados e propostas geradas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar lead ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border border-border/60 bg-card/60 pl-9 pr-4 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-64"
              />
            </div>
          </div>
        </div>

        {/* METRICS METERS */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Total de Leads</span>
              <Users className="size-4 text-blue-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold">{allLeads.length}</p>
          </div>

          <div className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Contratos Assinados</span>
              <ShieldCheck className="size-4 text-emerald-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold">
              {allLeads.filter((l) => l.contractSigned).length}
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Entradas Pagas (50%)</span>
              <DollarSign className="size-4 text-amber-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold">
              {allLeads.filter((l) => l.entryPaid).length}
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Pipeline em Aberto</span>
              <Sparkles className="size-4 text-purple-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold">
              {currency(allLeads.reduce((s, l) => s + l.estimatedValue, 0))}
            </p>
          </div>
        </div>

        {/* LEADS TABLE */}
        <div className="mt-8 rounded-xl border border-border/60 bg-card/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/60 bg-card/80 text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Cliente / Empresa</th>
                  <th className="px-5 py-3 font-semibold">Projeto / Origem</th>
                  <th className="px-5 py-3 font-semibold">Valor Total</th>
                  <th className="px-5 py-3 font-semibold">Status do Funil</th>
                  <th className="px-5 py-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-card/60 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">{lead.company}</p>
                      <p className="text-muted-foreground text-[11px]">{lead.name} · {lead.email}</p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">{lead.projectType}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                        <Bot className="size-3 text-primary" /> {lead.source}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-mono font-semibold text-foreground">
                      {currency(lead.estimatedValue)}
                      <p className="text-[10px] text-emerald-400 font-normal">Entrada: {currency(lead.estimatedValue * 0.5)}</p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        <StatusPill tone={lead.contractSigned ? "success" : "warning"} dot>
                          {lead.contractSigned ? "Contrato Assinado" : "Aguardando Assinatura"}
                        </StatusPill>

                        <StatusPill tone={lead.entryPaid ? "success" : "info"} dot>
                          {lead.entryPaid ? "50% Pago" : "Aguardando PIX"}
                        </StatusPill>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background px-2.5 py-1.5 text-[11px] font-medium hover:border-primary cursor-pointer"
                        >
                          Briefing <FileText className="size-3" />
                        </button>

                        <a
                          href={`/cliente/onboarding/${lead.id}?cliente=${encodeURIComponent(lead.name)}&empresa=${encodeURIComponent(lead.company)}&email=${encodeURIComponent(lead.email)}&endereco=${encodeURIComponent(lead.address || "")}&projeto=${encodeURIComponent(lead.projectType)}&briefing=${encodeURIComponent(lead.briefing || "")}&prazo=${encodeURIComponent(lead.deadline || "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground hover:opacity-90"
                        >
                          Workstation
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ── MODAL DE DETALHES DO BRIEFING DO LEAD ── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Building className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground">{selectedLead.company}</h3>
                  <p className="text-xs text-muted-foreground">Lead Qualificado pelo Bot Teron Studio</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Contato / Responsável</span>
                <p className="font-semibold text-foreground">{selectedLead.name}</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Mail className="size-3" /> {selectedLead.email}
                </p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Phone className="size-3" /> {selectedLead.phone}
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Valores & Prazos</span>
                <p className="font-mono font-bold text-emerald-400">{currency(selectedLead.estimatedValue)}</p>
                <p className="text-[10px] text-muted-foreground">Prazo: {selectedLead.deadline || "15 Dias Úteis"}</p>
                <p className="text-[10px] text-emerald-400">Entrada 50% Recebida</p>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 bg-background/40 p-4 space-y-2 text-xs">
              <span className="text-[10px] font-mono text-primary font-bold uppercase">Briefing Enviado no WhatsApp</span>
              <p className="text-foreground text-xs leading-relaxed italic">{selectedLead.briefing || "Nenhum detalhe extra informado."}</p>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              <a
                href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black hover:opacity-90 transition-opacity"
              >
                <MessageSquare className="size-4" /> Falar no WhatsApp com o Lead
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Fechar Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
