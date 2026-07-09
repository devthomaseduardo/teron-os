export type Priority = "critical" | "high" | "medium" | "low";
export type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

export function currency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export type AttentionItem = {
  id: string;
  kind: "payment" | "proposal" | "client" | "meeting" | "deploy" | "delivery";
  title: string;
  meta: string;
  priority: Priority;
  blockedBy?: "cliente" | "teron";
  dueLabel?: string;
};

export const attentionItems: AttentionItem[] = [
  {
    id: "a1",
    kind: "payment",
    title: "Fatura #0284 — Aurora Health",
    meta: "R$ 12.400 • vencida há 3 dias",
    priority: "critical",
    dueLabel: "Vencida",
  },
  {
    id: "a2",
    kind: "proposal",
    title: "Proposta enviada — Nordica Motors",
    meta: "Aguardando aprovação • enviada em 04/07",
    priority: "high",
    blockedBy: "cliente",
    dueLabel: "Aguarda cliente",
  },
  {
    id: "a3",
    kind: "client",
    title: "Aguardando imagens da marca — Pallas Studio",
    meta: "Cronograma pausado desde 06/07",
    priority: "high",
    blockedBy: "cliente",
    dueLabel: "Bloqueado",
  },
  {
    id: "a4",
    kind: "meeting",
    title: "Kickoff Meridian Finance",
    meta: "Hoje • 14:30 • Google Meet",
    priority: "medium",
    dueLabel: "Hoje",
  },
  {
    id: "a5",
    kind: "deploy",
    title: "Deploy pendente — Órion Commerce v2.4",
    meta: "Aprovação de QA concluída",
    priority: "medium",
    dueLabel: "Pronto",
  },
  {
    id: "a6",
    kind: "delivery",
    title: "Entrega prevista — Lyra Insights MVP",
    meta: "Sexta-feira, 12/07",
    priority: "low",
    dueLabel: "3 dias",
  },
];

export type Project = {
  id: string;
  name: string;
  client: string;
  status: "descoberta" | "execucao" | "revisao" | "entregue" | "pausado";
  progress: number;
  nextMilestone: string;
  hoursThisWeek: number;
  blockedBy?: "cliente" | "teron";
};

export const projects: Project[] = [
  { id: "p1", name: "Meridian Finance — Plataforma Wealth", client: "Meridian Capital", status: "execucao", progress: 62, nextMilestone: "Beta interna • 18/07", hoursThisWeek: 34 },
  { id: "p2", name: "Aurora Health — Portal do paciente", client: "Aurora Health", status: "revisao", progress: 88, nextMilestone: "Aprovação final", hoursThisWeek: 12 },
  { id: "p3", name: "Pallas Studio — Rebrand digital", client: "Pallas Studio", status: "pausado", progress: 44, nextMilestone: "Aguardando material", hoursThisWeek: 0, blockedBy: "cliente" },
  { id: "p4", name: "Órion Commerce v2", client: "Órion Retail", status: "execucao", progress: 71, nextMilestone: "Deploy v2.4", hoursThisWeek: 28 },
  { id: "p5", name: "Lyra Insights — MVP", client: "Lyra Labs", status: "execucao", progress: 55, nextMilestone: "Entrega 12/07", hoursThisWeek: 40 },
  { id: "p6", name: "Kite CRM — Automação", client: "Kite SaaS", status: "descoberta", progress: 12, nextMilestone: "Escopo final", hoursThisWeek: 6 },
  { id: "p7", name: "Nordica Motors — Portal dealer", client: "Nordica Motors", status: "descoberta", progress: 0, nextMilestone: "Aprovação proposta", hoursThisWeek: 0, blockedBy: "cliente" },
];

export type Client = {
  id: string;
  name: string;
  contact: string;
  initials: string;
  projects: number;
  mrr: number;
  since: string;
  status: "ativo" | "onboarding" | "pausado";
};

export const clients: Client[] = [
  { id: "c1", name: "Meridian Capital", contact: "Helena Vasques", initials: "MC", projects: 2, mrr: 18500, since: "Jan 2024", status: "ativo" },
  { id: "c2", name: "Aurora Health", contact: "Diego Salles", initials: "AH", projects: 1, mrr: 9800, since: "Mar 2025", status: "ativo" },
  { id: "c3", name: "Pallas Studio", contact: "Marina Prado", initials: "PS", projects: 1, mrr: 0, since: "Mai 2026", status: "onboarding" },
  { id: "c4", name: "Órion Retail", contact: "Ricardo Amado", initials: "OR", projects: 1, mrr: 14200, since: "Fev 2025", status: "ativo" },
  { id: "c5", name: "Lyra Labs", contact: "Camila Rufino", initials: "LL", projects: 1, mrr: 7600, since: "Abr 2026", status: "ativo" },
  { id: "c6", name: "Nordica Motors", contact: "Bruno Kern", initials: "NM", projects: 0, mrr: 0, since: "Jul 2026", status: "onboarding" },
  { id: "c7", name: "Kite SaaS", contact: "Isabela Cordeiro", initials: "KT", projects: 1, mrr: 4200, since: "Jun 2026", status: "ativo" },
];

export type Proposal = {
  id: string;
  client: string;
  scope: string;
  amount: number;
  status: "rascunho" | "enviada" | "aprovada" | "recusada";
  sentAt: string;
  expiresIn: string;
};

export const proposals: Proposal[] = [
  { id: "PR-042", client: "Nordica Motors", scope: "Portal dealer + integração ERP", amount: 84000, status: "enviada", sentAt: "04/07", expiresIn: "5 dias" },
  { id: "PR-041", client: "Kite SaaS", scope: "Automação onboarding + CRM", amount: 32000, status: "enviada", sentAt: "02/07", expiresIn: "3 dias" },
  { id: "PR-040", client: "Aurora Health", scope: "Módulo agenda + telemetria", amount: 47500, status: "aprovada", sentAt: "24/06", expiresIn: "—" },
  { id: "PR-039", client: "Pallas Studio", scope: "Rebrand digital + guidelines", amount: 28000, status: "aprovada", sentAt: "18/06", expiresIn: "—" },
  { id: "PR-038", client: "Helvetia Legal", scope: "Portal cliente jurídico", amount: 62000, status: "recusada", sentAt: "10/06", expiresIn: "—" },
  { id: "PR-043", client: "Solstice Foods", scope: "E-commerce headless", amount: 118000, status: "rascunho", sentAt: "—", expiresIn: "—" },
];

export type Invoice = {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: "paga" | "aberta" | "vencida" | "prevista";
};

export const invoices: Invoice[] = [
  { id: "#0284", client: "Aurora Health", amount: 12400, dueDate: "05/07", status: "vencida" },
  { id: "#0285", client: "Meridian Capital", amount: 18500, dueDate: "10/07", status: "aberta" },
  { id: "#0286", client: "Órion Retail", amount: 14200, dueDate: "12/07", status: "aberta" },
  { id: "#0283", client: "Lyra Labs", amount: 7600, dueDate: "02/07", status: "paga" },
  { id: "#0282", client: "Kite SaaS", amount: 4200, dueDate: "01/07", status: "paga" },
  { id: "#0287", client: "Pallas Studio", amount: 9200, dueDate: "22/07", status: "prevista" },
];

export const revenueSeries = [
  { month: "Jan", value: 32 },
  { month: "Fev", value: 28 },
  { month: "Mar", value: 35 },
  { month: "Abr", value: 41 },
  { month: "Mai", value: 38 },
  { month: "Jun", value: 46 },
  { month: "Jul", value: 48 },
];

export const activity = [
  { id: "ac1", who: "Helena Vasques", what: "aprovou a proposta PR-040", when: "há 12min", tone: "success" as const },
  { id: "ac2", who: "Você", what: "enviou o contrato para Nordica Motors", when: "há 1h", tone: "neutral" as const },
  { id: "ac3", who: "Marina Prado", what: "solicitou alteração no cronograma", when: "há 2h", tone: "warning" as const },
  { id: "ac4", who: "Deploy bot", what: "publicou Órion Commerce v2.4-rc.1 em staging", when: "há 3h", tone: "info" as const },
  { id: "ac5", who: "Diego Salles", what: "pagou a fatura #0283", when: "há 5h", tone: "success" as const },
  { id: "ac6", who: "Você", what: "registrou 4h em Lyra Insights", when: "hoje 09:12", tone: "neutral" as const },
];