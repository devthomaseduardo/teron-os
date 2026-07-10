export type Priority = "critical" | "high" | "medium" | "low";
export type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

export function currency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

/* ============================================================
 * ATTENTION / DASHBOARD
 * ============================================================ */

export type AttentionItem = {
  id: string;
  kind: "payment" | "proposal" | "client" | "meeting" | "deploy" | "delivery" | "scope" | "approval";
  title: string;
  meta: string;
  priority: Priority;
  blockedBy?: "cliente" | "teron";
  dueLabel?: string;
};

export const attentionItems: AttentionItem[] = [
  { id: "a1", kind: "payment", title: "Fatura #0284 — Aurora Health", meta: "R$ 12.400 · vencida há 3 dias", priority: "critical", dueLabel: "Vencida" },
  { id: "a2", kind: "client", title: "Pallas Studio — 7 dias sem enviar materiais", meta: "Cronograma pausado · onboarding 6/10", priority: "high", blockedBy: "cliente", dueLabel: "Pausado" },
  { id: "a3", kind: "scope", title: "Solicitação fora do escopo — Meridian", meta: "IA sugere orçamento complementar", priority: "high", dueLabel: "Ação IA" },
  { id: "a4", kind: "approval", title: "V2 do wireframe — Órion Commerce", meta: "Aguardando aprovação do cliente há 2 dias", priority: "medium", blockedBy: "cliente", dueLabel: "Aprovação" },
  { id: "a5", kind: "proposal", title: "Proposta aberta — Nordica Motors", meta: "Cliente visualizou 3x · sem aceite", priority: "medium", dueLabel: "Aguarda" },
  { id: "a6", kind: "delivery", title: "Entrega Lyra Insights MVP", meta: "Sexta · 12/07", priority: "low", dueLabel: "3 dias" },
];

/* ============================================================
 * PROJECTS
 * ============================================================ */

export type Project = {
  id: string;
  name: string;
  client: string;
  status: "descoberta" | "onboarding" | "execucao" | "revisao" | "entregue" | "pausado";
  progress: number;
  nextMilestone: string;
  hoursThisWeek: number;
  hoursPlanned: number;
  hoursUsed: number;
  blockedBy?: "cliente" | "teron";
  healthScore?: number;
};

export const projects: Project[] = [
  { id: "p1", name: "Meridian Wealth", client: "Meridian Capital", status: "execucao", progress: 62, nextMilestone: "Beta interna · 18/07", hoursThisWeek: 34, hoursPlanned: 320, hoursUsed: 198, healthScore: 88 },
  { id: "p2", name: "Aurora — Portal do paciente", client: "Aurora Health", status: "revisao", progress: 88, nextMilestone: "Aprovação final", hoursThisWeek: 12, hoursPlanned: 210, hoursUsed: 194, healthScore: 62 },
  { id: "p3", name: "Pallas Studio — Rebrand digital", client: "Pallas Studio", status: "pausado", progress: 44, nextMilestone: "Aguardando material", hoursThisWeek: 0, hoursPlanned: 140, hoursUsed: 61, blockedBy: "cliente", healthScore: 41 },
  { id: "p4", name: "Órion Commerce v2", client: "Órion Retail", status: "execucao", progress: 71, nextMilestone: "Deploy v2.4", hoursThisWeek: 28, hoursPlanned: 480, hoursUsed: 342, healthScore: 79 },
  { id: "p5", name: "Lyra Insights — MVP", client: "Lyra Labs", status: "execucao", progress: 55, nextMilestone: "Entrega 12/07", hoursThisWeek: 40, hoursPlanned: 260, hoursUsed: 148, healthScore: 84 },
  { id: "p6", name: "Kite CRM — Automação", client: "Kite SaaS", status: "onboarding", progress: 12, nextMilestone: "Materiais do cliente", hoursThisWeek: 6, hoursPlanned: 180, hoursUsed: 8, blockedBy: "cliente", healthScore: 58 },
  { id: "p7", name: "Nordica Motors — Portal dealer", client: "Nordica Motors", status: "descoberta", progress: 0, nextMilestone: "Aprovação proposta", hoursThisWeek: 0, hoursPlanned: 0, hoursUsed: 0, healthScore: 50 },
];

/* ============================================================
 * CLIENTS
 * ============================================================ */

export type Client = {
  id: string;
  name: string;
  contact: string;
  initials: string;
  projects: number;
  mrr: number;
  since: string;
  status: "ativo" | "onboarding" | "pausado";
  healthScore: number;
};

export const clients: Client[] = [
  { id: "c1", name: "Meridian Capital", contact: "Helena Vasques", initials: "MC", projects: 2, mrr: 18500, since: "Jan 2024", status: "ativo", healthScore: 88 },
  { id: "c2", name: "Aurora Health", contact: "Diego Salles", initials: "AH", projects: 1, mrr: 9800, since: "Mar 2025", status: "ativo", healthScore: 62 },
  { id: "c3", name: "Pallas Studio", contact: "Marina Prado", initials: "PS", projects: 1, mrr: 0, since: "Mai 2026", status: "onboarding", healthScore: 41 },
  { id: "c4", name: "Órion Retail", contact: "Ricardo Amado", initials: "OR", projects: 1, mrr: 14200, since: "Fev 2025", status: "ativo", healthScore: 79 },
  { id: "c5", name: "Lyra Labs", contact: "Camila Rufino", initials: "LL", projects: 1, mrr: 7600, since: "Abr 2026", status: "ativo", healthScore: 84 },
  { id: "c6", name: "Nordica Motors", contact: "Bruno Kern", initials: "NM", projects: 0, mrr: 0, since: "Jul 2026", status: "onboarding", healthScore: 50 },
  { id: "c7", name: "Kite SaaS", contact: "Isabela Cordeiro", initials: "KT", projects: 1, mrr: 4200, since: "Jun 2026", status: "ativo", healthScore: 58 },
];

/* ============================================================
 * PROPOSALS
 * ============================================================ */

export type Proposal = {
  id: string;
  client: string;
  scope: string;
  amount: number;
  status: "rascunho" | "enviada" | "aprovada" | "recusada";
  sentAt: string;
  expiresIn: string;
  publicLink?: string;
};

export const proposals: Proposal[] = [
  { id: "PR-042", client: "Nordica Motors", scope: "Portal dealer + integração ERP", amount: 84000, status: "enviada", sentAt: "04/07", expiresIn: "5 dias", publicLink: "abc123" },
  { id: "PR-041", client: "Kite SaaS", scope: "Automação onboarding + CRM", amount: 32000, status: "enviada", sentAt: "02/07", expiresIn: "3 dias", publicLink: "kt2025" },
  { id: "PR-040", client: "Aurora Health", scope: "Módulo agenda + telemetria", amount: 47500, status: "aprovada", sentAt: "24/06", expiresIn: "—" },
  { id: "PR-039", client: "Pallas Studio", scope: "Rebrand digital + guidelines", amount: 28000, status: "aprovada", sentAt: "18/06", expiresIn: "—" },
  { id: "PR-038", client: "Helvetia Legal", scope: "Portal cliente jurídico", amount: 62000, status: "recusada", sentAt: "10/06", expiresIn: "—" },
  { id: "PR-043", client: "Solstice Foods", scope: "E-commerce headless", amount: 118000, status: "rascunho", sentAt: "—", expiresIn: "—" },
];

/* Mock full public proposal (Portal Comercial) */
export const publicProposalDemo = {
  id: "abc123",
  code: "PR-042",
  client: {
    company: "Nordica Motors",
    contact: "Bruno Kern",
    role: "Diretor de Tecnologia",
  },
  project: "Portal do concessionário + integração com ERP",
  summary:
    "Plataforma unificada para gestão de leads, estoque de veículos e comunicação com concessionários, integrada ao ERP legado.",
  amount: 84000,
  installments: [
    { label: "Entrada (30%)", value: 25200, when: "Na assinatura" },
    { label: "Marco 1 — Descoberta", value: 16800, when: "+15 dias" },
    { label: "Marco 2 — Beta interna", value: 25200, when: "+45 dias" },
    { label: "Marco 3 — Go-live", value: 16800, when: "+75 dias" },
  ],
  timelineWeeks: 12,
  scope: {
    included: [
      "Descoberta guiada com stakeholders",
      "Design system + protótipos navegáveis",
      "Portal web responsivo",
      "Integração com ERP via API",
      "Painel administrativo",
      "Autenticação SSO",
      "Deploy em ambiente produtivo",
      "30 dias de suporte pós-entrega",
    ],
    excluded: [
      "Aplicativo mobile nativo",
      "Migração de dados legados",
      "Treinamentos presenciais",
      "SLA 24/7",
    ],
  },
  milestones: [
    { week: "Semana 1-2", title: "Descoberta & alinhamento", detail: "Entrevistas, benchmarks e escopo final." },
    { week: "Semana 3-5", title: "Design & prototipação", detail: "Design system, wireframes e aprovações." },
    { week: "Semana 6-9", title: "Desenvolvimento", detail: "Front-end, back-end e integração ERP." },
    { week: "Semana 10-11", title: "QA & beta", detail: "Testes automatizados, correções e homologação." },
    { week: "Semana 12", title: "Go-live", detail: "Deploy, monitoramento e handover." },
  ],
  policies: [
    "Cronograma pausa automaticamente quando aguardarmos materiais ou aprovações do cliente.",
    "Alterações fora do escopo geram orçamento complementar antes da execução.",
    "Cancelamento após início: 50% do valor executado até a data.",
    "Contrato regido pelas leis brasileiras.",
  ],
  faqs: [
    { q: "Como funciona a comunicação durante o projeto?", a: "Todo o projeto acontece no TERON OS. Você tem chat interno, aprovações, cronograma, materiais e faturas em um único lugar. Nada por WhatsApp." },
    { q: "E se eu precisar de algo fora do escopo?", a: "O sistema identifica automaticamente e gera um orçamento complementar. Você aprova em um clique." },
    { q: "Como é o pagamento?", a: "Assinatura + entrada + parcelas por marcos. Boleto, PIX ou cartão. Emitimos NF-e automaticamente." },
    { q: "Quem é o responsável pelo projeto?", a: "Um Product Lead dedicado + squad com designer, dev e QA. Você fala com uma pessoa só." },
  ],
};

/* ============================================================
 * INVOICES
 * ============================================================ */

export type Invoice = {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: "paga" | "aberta" | "vencida" | "prevista";
  daysOverdue?: number;
  penalty?: number;
};

export const invoices: Invoice[] = [
  { id: "#0284", client: "Aurora Health", amount: 12400, dueDate: "05/07", status: "vencida", daysOverdue: 3, penalty: 248 },
  { id: "#0285", client: "Meridian Capital", amount: 18500, dueDate: "10/07", status: "aberta" },
  { id: "#0286", client: "Órion Retail", amount: 14200, dueDate: "12/07", status: "aberta" },
  { id: "#0283", client: "Lyra Labs", amount: 7600, dueDate: "02/07", status: "paga" },
  { id: "#0282", client: "Kite SaaS", amount: 4200, dueDate: "01/07", status: "paga" },
  { id: "#0287", client: "Pallas Studio", amount: 9200, dueDate: "22/07", status: "prevista" },
];

export const revenueSeries = [
  { month: "Jan", value: 32 }, { month: "Fev", value: 28 }, { month: "Mar", value: 35 },
  { month: "Abr", value: 41 }, { month: "Mai", value: 38 }, { month: "Jun", value: 46 }, { month: "Jul", value: 48 },
];

export const activity = [
  { id: "ac1", who: "Helena Vasques", what: "aprovou a proposta PR-040", when: "há 12min", tone: "success" as const },
  { id: "ac2", who: "Você", what: "enviou o contrato para Nordica Motors", when: "há 1h", tone: "neutral" as const },
  { id: "ac3", who: "Marina Prado", what: "solicitou alteração no cronograma", when: "há 2h", tone: "warning" as const },
  { id: "ac4", who: "Deploy bot", what: "publicou Órion Commerce v2.4-rc.1 em staging", when: "há 3h", tone: "info" as const },
  { id: "ac5", who: "Diego Salles", what: "pagou a fatura #0283", when: "há 5h", tone: "success" as const },
  { id: "ac6", who: "Você", what: "registrou 4h em Lyra Insights", when: "hoje 09:12", tone: "neutral" as const },
];

/* ============================================================
 * ONBOARDING (Cliente)
 * ============================================================ */

export type OnboardingItem = {
  id: string;
  label: string;
  hint: string;
  status: "pendente" | "enviado" | "aprovado";
  required: boolean;
};

export const onboardingItems: OnboardingItem[] = [
  { id: "logo", label: "Logotipo", hint: "SVG ou PNG em alta resolução", status: "aprovado", required: true },
  { id: "brand", label: "Manual da marca", hint: "Cores, tipografia, aplicações", status: "enviado", required: true },
  { id: "texts", label: "Textos institucionais", hint: "Sobre, missão, valores, produtos", status: "pendente", required: true },
  { id: "images", label: "Banco de imagens", hint: "Fotos oficiais em alta", status: "pendente", required: true },
  { id: "videos", label: "Vídeos", hint: "Institucional, produto, tutoriais", status: "pendente", required: false },
  { id: "access", label: "Acessos", hint: "Redes sociais, analytics, admin", status: "pendente", required: true },
  { id: "domain", label: "Domínio", hint: "Registro e DNS", status: "aprovado", required: true },
  { id: "hosting", label: "Hospedagem", hint: "Servidor atual ou preferência", status: "enviado", required: true },
  { id: "refs", label: "Referências", hint: "Sites, apps ou marcas inspiradoras", status: "pendente", required: false },
  { id: "goals", label: "Objetivos do projeto", hint: "KPIs e metas de negócio", status: "pendente", required: true },
];

/* ============================================================
 * APPROVALS
 * ============================================================ */

export type Approval = {
  id: string;
  project: string;
  title: string;
  version: string;
  status: "aguardando" | "aprovado" | "alteracao";
  sentAt: string;
  comments: number;
};

export const approvals: Approval[] = [
  { id: "ap1", project: "Órion Commerce v2", title: "Wireframes — Checkout", version: "v2", status: "aguardando", sentAt: "há 2 dias", comments: 3 },
  { id: "ap2", project: "Meridian Wealth", title: "Design system — Componentes", version: "v1", status: "aprovado", sentAt: "há 4 dias", comments: 1 },
  { id: "ap3", project: "Aurora — Portal", title: "Fluxo de agendamento", version: "v3", status: "alteracao", sentAt: "há 6 dias", comments: 7 },
  { id: "ap4", project: "Lyra Insights", title: "Dashboard beta", version: "v1", status: "aguardando", sentAt: "hoje 10:12", comments: 0 },
  { id: "ap5", project: "Órion Commerce v2", title: "Design final — PDP", version: "v1", status: "aprovado", sentAt: "há 8 dias", comments: 2 },
];

/* ============================================================
 * SCOPE
 * ============================================================ */

export type ScopeRequest = {
  id: string;
  project: string;
  request: string;
  detectedAt: string;
  status: "detectado" | "orcamento_enviado" | "aprovado" | "rejeitado";
  estimatedHours: number;
  estimatedValue: number;
};

export const scopeRequests: ScopeRequest[] = [
  { id: "s1", project: "Meridian Wealth", request: "Adicionar módulo de simulação de aposentadoria", detectedAt: "hoje 14:20", status: "detectado", estimatedHours: 42, estimatedValue: 8400 },
  { id: "s2", project: "Órion Commerce v2", request: "Integração com marketplace B2B", detectedAt: "há 2 dias", status: "orcamento_enviado", estimatedHours: 80, estimatedValue: 16000 },
  { id: "s3", project: "Aurora — Portal", request: "Notificações push para pacientes", detectedAt: "há 5 dias", status: "aprovado", estimatedHours: 24, estimatedValue: 4800 },
];

/* ============================================================
 * JOURNAL
 * ============================================================ */

export type JournalEvent = {
  id: string;
  project: string;
  type: "contrato" | "pagamento" | "material" | "deploy" | "solicitacao" | "aprovacao" | "onboarding";
  message: string;
  when: string;
};

export const journalEvents: JournalEvent[] = [
  { id: "j1", project: "Meridian Wealth", type: "deploy", message: "Deploy v0.4.2 em staging concluído", when: "há 12min" },
  { id: "j2", project: "Órion Commerce v2", type: "aprovacao", message: "Cliente aprovou design final da PDP", when: "há 1h" },
  { id: "j3", project: "Pallas Studio", type: "onboarding", message: "Cronograma pausado — aguardando textos institucionais", when: "há 3h" },
  { id: "j4", project: "Aurora — Portal", type: "solicitacao", message: "Nova solicitação: notificações push", when: "há 5h" },
  { id: "j5", project: "Lyra Insights", type: "pagamento", message: "Pagamento do marco 2 recebido (R$ 18.500)", when: "ontem 16:22" },
  { id: "j6", project: "Órion Commerce v2", type: "material", message: "Cliente enviou banco de imagens (48 arquivos)", when: "ontem 11:04" },
  { id: "j7", project: "Meridian Wealth", type: "contrato", message: "Contrato digital assinado por Helena Vasques", when: "há 3 dias" },
];

/* ============================================================
 * AI SUGGESTIONS
 * ============================================================ */

export type AISuggestion = {
  id: string;
  kind: "risco" | "cobranca" | "escopo" | "cronograma" | "comunicacao";
  title: string;
  body: string;
  project?: string;
  actions: { label: string; primary?: boolean }[];
};

export const aiSuggestions: AISuggestion[] = [
  {
    id: "ai1",
    kind: "cronograma",
    title: "Cronograma da Pallas Studio impactado em 5 dias",
    body: "O cliente está há 7 dias sem enviar os materiais obrigatórios (textos, imagens, acessos). Se não recebermos até 15/07, a entrega será reagendada.",
    project: "Pallas Studio",
    actions: [{ label: "Enviar lembrete gentil", primary: true }, { label: "Agendar ligação" }],
  },
  {
    id: "ai2",
    kind: "escopo",
    title: "Solicitação parece fora do escopo — Meridian",
    body: "Detectei que a solicitação 'módulo de simulação de aposentadoria' não está no contrato PR-040. Estimativa: 42h · R$ 8.400.",
    project: "Meridian Wealth",
    actions: [{ label: "Gerar orçamento complementar", primary: true }, { label: "Rejeitar" }],
  },
  {
    id: "ai3",
    kind: "cobranca",
    title: "Fatura #0285 vence amanhã — Meridian",
    body: "R$ 18.500. Cliente com histórico impecável. Recomendo lembrete gentil 24h antes.",
    project: "Meridian Wealth",
    actions: [{ label: "Enviar lembrete", primary: true }, { label: "Ignorar" }],
  },
  {
    id: "ai4",
    kind: "risco",
    title: "Health Score da Aurora caiu para 62",
    body: "3 atrasos consecutivos em aprovações + fatura #0284 vencida. Sugiro reunião de alinhamento esta semana.",
    project: "Aurora Health",
    actions: [{ label: "Agendar 1:1", primary: true }, { label: "Ver histórico" }],
  },
  {
    id: "ai5",
    kind: "comunicacao",
    title: "Órion Commerce sem interação há 4 dias",
    body: "Nenhuma mensagem, aprovação ou atividade do cliente. Projeto em execução ativa.",
    project: "Órion Commerce v2",
    actions: [{ label: "Enviar update semanal", primary: true }],
  },
];

/* ============================================================
 * KNOWLEDGE BASE
 * ============================================================ */

export type KnowledgeEntry = {
  id: string;
  project: string;
  category: "dominio" | "servidor" | "deploy" | "banco" | "api" | "integracao" | "licenca" | "acesso";
  label: string;
  value: string;
  updatedAt: string;
};

export const knowledgeEntries: KnowledgeEntry[] = [
  { id: "k1", project: "Meridian Wealth", category: "dominio", label: "Domínio principal", value: "meridian.wealth", updatedAt: "há 2 dias" },
  { id: "k2", project: "Meridian Wealth", category: "servidor", label: "Servidor de produção", value: "AWS us-east-1 · t3.xlarge", updatedAt: "há 2 dias" },
  { id: "k3", project: "Meridian Wealth", category: "deploy", label: "Pipeline CI/CD", value: "GitHub Actions → Vercel", updatedAt: "hoje" },
  { id: "k4", project: "Meridian Wealth", category: "banco", label: "Banco de dados", value: "PostgreSQL 15 · Supabase", updatedAt: "há 5 dias" },
  { id: "k5", project: "Meridian Wealth", category: "api", label: "API de mercado", value: "Bloomberg API v3 · rate 1000/h", updatedAt: "há 1 semana" },
  { id: "k6", project: "Meridian Wealth", category: "integracao", label: "SSO corporativo", value: "Okta SAML 2.0", updatedAt: "há 1 semana" },
  { id: "k7", project: "Meridian Wealth", category: "licenca", label: "Licença Highcharts", value: "Enterprise · vence 12/2026", updatedAt: "há 30 dias" },
];
