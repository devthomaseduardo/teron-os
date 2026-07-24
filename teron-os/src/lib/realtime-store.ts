/**
 * Engine de Sincronização em Tempo Real (Real-Time Store)
 * Gerencia o estado ao vivo de Leads, Propostas, Assinaturas OTP e Pagamentos Mercado Pago / Stripe
 */

export interface RealtimeLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address?: string;
  projectType: string;
  briefing: string;
  deadline: string;
  totalInvestment: number;
  entryPayment: number;
  status: "novo_lead" | "proposta_enviada" | "contrato_assinado" | "entrada_paga" | "workstation_ativa";
  paymentProvider?: "mercadopago" | "stripe";
  paymentId?: string | number;
  qrCodePix?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "teron_realtime_b2b_leads";

export const initialLeadsList: RealtimeLead[] = [
  {
    id: "acme-corp-98214",
    name: "Carlos Eduardo",
    company: "Acme Corp B2B",
    email: "carlos@acmecorp.com.br",
    phone: "(11) 99887-7665",
    address: "São Paulo, SP",
    projectType: "Portal Dealer B2B & Plataforma Web",
    briefing: "Desenvolvimento de portal de vendas B2B integrado ao ERP com gestão de representantes e catálogo interativo.",
    deadline: "15 Dias Úteis",
    totalInvestment: 2800,
    entryPayment: 1400,
    status: "workstation_ativa",
    paymentProvider: "mercadopago",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "nordica-motors-44912",
    name: "Bruno Kern",
    company: "Nordica Motors",
    email: "bruno@nordica.com",
    phone: "(41) 98877-6655",
    address: "Curitiba, PR",
    projectType: "Portal Dealer B2B",
    briefing: "Portal de catálogo interativo para concessionárias com área restrita de clientes.",
    deadline: "20 Dias Úteis",
    totalInvestment: 8400,
    entryPayment: 4200,
    status: "contrato_assinado",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

/**
 * Lê a lista completa de leads em tempo real
 */
export function getRealtimeLeads(): RealtimeLead[] {
  if (typeof window === "undefined") return initialLeadsList;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return initialLeadsList;
}

/**
 * Salva ou atualiza um lead na loja em tempo real
 */
export function saveRealtimeLead(lead: Partial<RealtimeLead> & { id: string }): RealtimeLead {
  const current = getRealtimeLeads();
  const existingIdx = current.findIndex((l) => l.id === lead.id);

  const updatedLead: RealtimeLead = {
    id: lead.id,
    name: lead.name || (existingIdx >= 0 ? current[existingIdx].name : "Cliente B2B"),
    company: lead.company || (existingIdx >= 0 ? current[existingIdx].company : "Empresa Contratante"),
    email: lead.email || (existingIdx >= 0 ? current[existingIdx].email : "cliente@empresa.com.br"),
    phone: lead.phone || (existingIdx >= 0 ? current[existingIdx].phone : "(11) 99999-9999"),
    address: lead.address || (existingIdx >= 0 ? current[existingIdx].address : "São Paulo, SP"),
    projectType: lead.projectType || (existingIdx >= 0 ? current[existingIdx].projectType : "Portal Dealer B2B"),
    briefing: lead.briefing || (existingIdx >= 0 ? current[existingIdx].briefing : "Desenvolvimento de portal web."),
    deadline: lead.deadline || (existingIdx >= 0 ? current[existingIdx].deadline : "15 Dias Úteis"),
    totalInvestment: lead.totalInvestment || (existingIdx >= 0 ? current[existingIdx].totalInvestment : 2800),
    entryPayment: lead.entryPayment || (existingIdx >= 0 ? current[existingIdx].entryPayment : 1400),
    status: lead.status || (existingIdx >= 0 ? current[existingIdx].status : "proposta_enviada"),
    paymentProvider: lead.paymentProvider || (existingIdx >= 0 ? current[existingIdx].paymentProvider : undefined),
    paymentId: lead.paymentId || (existingIdx >= 0 ? current[existingIdx].paymentId : undefined),
    qrCodePix: lead.qrCodePix || (existingIdx >= 0 ? current[existingIdx].qrCodePix : undefined),
    createdAt: existingIdx >= 0 ? current[existingIdx].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  let newList: RealtimeLead[];
  if (existingIdx >= 0) {
    newList = [...current];
    newList[existingIdx] = updatedLead;
  } else {
    newList = [updatedLead, ...current];
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      // Broadcast evento de atualização em tempo real para todas as abas abertas
      window.dispatchEvent(new CustomEvent("teron_realtime_update", { detail: updatedLead }));
    } catch (e) {}
  }

  return updatedLead;
}
