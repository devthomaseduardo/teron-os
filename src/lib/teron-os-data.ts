/**
 * TERON OS — Dados fictícios para os módulos novos da Fase 1
 * (Marketing, CRM, Pagamentos, Biblioteca, Suporte, Templates,
 *  Analytics, Documentação, Automações, Marketplace, Command Center)
 */

export type CommandInsight = {
  id: string;
  kind: "proposta" | "contrato" | "cliente" | "pagamento" | "projeto" | "horas" | "receita";
  label: string;
  value: string;
  hint: string;
  href?: string;
  tone: "danger" | "warning" | "info" | "success" | "neutral";
};

export const commandInsights: CommandInsight[] = [
  { id: "ci1", kind: "proposta", label: "Propostas aguardando envio", value: "2", hint: "Nordica · Solstice", href: "/app/propostas", tone: "warning" },
  { id: "ci2", kind: "contrato", label: "Contratos aguardando assinatura", value: "1", hint: "Aurora Health · 3 dias", href: "/app/contratos", tone: "warning" },
  { id: "ci3", kind: "cliente", label: "Clientes aguardando resposta", value: "3", hint: "Pallas · Kite · Órion", href: "/app/crm", tone: "warning" },
  { id: "ci4", kind: "pagamento", label: "Pagamentos vencendo hoje", value: "1", hint: "Fatura #0285 · R$ 18.500", href: "/app/financeiro", tone: "danger" },
  { id: "ci5", kind: "projeto", label: "Projetos em risco de atraso", value: "2", hint: "Pallas · Aurora", href: "/app/projetos", tone: "danger" },
  { id: "ci6", kind: "horas", label: "Horas planejadas esta semana", value: "142h", hint: "84h executadas · 58% da meta", href: "/app/horas", tone: "info" },
  { id: "ci7", kind: "receita", label: "Receita prevista este mês", value: "R$ 61.400", hint: "R$ 22.100 confirmada", href: "/app/analytics", tone: "success" },
];

export type SmartSuggestion = {
  id: string;
  text: string;
  detail: string;
  action: string;
  tone: "primary" | "warning" | "success" | "info";
};

export const smartSuggestions: SmartSuggestion[] = [
  { id: "s1", text: "Enviar lembrete para Marina sobre materiais pendentes", detail: "Pallas Studio · onboarding pausado há 7 dias", action: "Enviar WhatsApp", tone: "warning" },
  { id: "s2", text: "Gerar cobrança da 2ª parcela do projeto Aurora", detail: "Marco 2 concluído · R$ 25.200", action: "Gerar fatura", tone: "primary" },
  { id: "s3", text: "Cliente João aprovou o layout — iniciar desenvolvimento?", detail: "Órion Commerce · aprovação registrada há 12h", action: "Iniciar sprint", tone: "success" },
  { id: "s4", text: "Você ultrapassou o orçamento em 14h no projeto Órion", detail: "Margem caiu para 18% · gerar aditivo?", action: "Gerar aditivo", tone: "warning" },
  { id: "s5", text: "Relatório semanal do projeto Meridian ainda não enviado", detail: "Prazo: sexta 18h · falta 2h", action: "Preparar relatório", tone: "info" },
];

/* ============================================================
 *  MARKETING
 * ============================================================ */
export type LandingPage = { id: string; name: string; slug: string; visits: number; conversion: number; status: "publicada" | "rascunho" };
export const landingPages: LandingPage[] = [
  { id: "lp1", name: "Home institucional", slug: "/", visits: 8420, conversion: 3.2, status: "publicada" },
  { id: "lp2", name: "Landing — Aurora Health", slug: "/aurora", visits: 2140, conversion: 6.8, status: "publicada" },
  { id: "lp3", name: "Campanha Q3 — SaaS", slug: "/saas-q3", visits: 890, conversion: 4.1, status: "publicada" },
  { id: "lp4", name: "Portfólio 2026", slug: "/portfolio", visits: 3210, conversion: 2.4, status: "publicada" },
  { id: "lp5", name: "Piloto — Financeiro", slug: "/financeiro-pilot", visits: 0, conversion: 0, status: "rascunho" },
];

export type BlogPost = { id: string; title: string; author: string; date: string; views: number; status: "publicado" | "rascunho" };
export const blogPosts: BlogPost[] = [
  { id: "b1", title: "Como substituímos o WhatsApp por um cronograma inteligente", author: "Thomas Reis", date: "02/07", views: 1420, status: "publicado" },
  { id: "b2", title: "Do lead ao lucro: o novo SO da empresa de serviços", author: "Helena V.", date: "24/06", views: 890, status: "publicado" },
  { id: "b3", title: "Escopo travado: quando IA salva o projeto", author: "Camila R.", date: "—", views: 0, status: "rascunho" },
];

/* ============================================================
 *  CRM — Leads e Funil
 * ============================================================ */
export type Lead = {
  id: string;
  name: string;
  company: string;
  source: "landing" | "indicacao" | "linkedin" | "orgânico" | "evento";
  stage: "novo" | "qualificado" | "reunião" | "proposta" | "ganho" | "perdido";
  value: number;
  owner: string;
  lastTouch: string;
};

export const leads: Lead[] = [
  { id: "l1", name: "Camila Herrera", company: "Solstice Foods", source: "landing", stage: "proposta", value: 118000, owner: "Thomas", lastTouch: "há 2h" },
  { id: "l2", name: "Rafael Meneses", company: "Vento Norte Log.", source: "indicacao", stage: "reunião", value: 72000, owner: "Helena", lastTouch: "ontem" },
  { id: "l3", name: "Ana Bertone", company: "Helvetia Legal", source: "linkedin", stage: "qualificado", value: 62000, owner: "Thomas", lastTouch: "há 3 dias" },
  { id: "l4", name: "Diego Salles", company: "Aurora Health", source: "orgânico", stage: "ganho", value: 47500, owner: "Camila", lastTouch: "há 5 dias" },
  { id: "l5", name: "Fernanda Lopes", company: "Nêutron BioTech", source: "evento", stage: "novo", value: 0, owner: "—", lastTouch: "há 1h" },
  { id: "l6", name: "Bruno Kern", company: "Nordica Motors", source: "indicacao", stage: "proposta", value: 84000, owner: "Thomas", lastTouch: "há 4h" },
  { id: "l7", name: "Isabela Cordeiro", company: "Kite SaaS", source: "landing", stage: "ganho", value: 32000, owner: "Helena", lastTouch: "há 8 dias" },
  { id: "l8", name: "Marcos Otero", company: "Fábrica Uno", source: "linkedin", stage: "perdido", value: 0, owner: "Thomas", lastTouch: "há 12 dias" },
  { id: "l9", name: "Julia Prado", company: "Cais 7 Ventures", source: "landing", stage: "novo", value: 0, owner: "—", lastTouch: "há 30min" },
];

/* ============================================================
 *  PAGAMENTOS
 * ============================================================ */
export type Payment = {
  id: string;
  client: string;
  method: "pix" | "cartão" | "boleto";
  amount: number;
  when: string;
  status: "confirmado" | "processando" | "falhou" | "estornado";
  installment?: string;
};

export const payments: Payment[] = [
  { id: "pay1", client: "Aurora Health", method: "pix", amount: 12400, when: "hoje · 09:42", status: "confirmado", installment: "Marco 2 · 3/4" },
  { id: "pay2", client: "Meridian Capital", method: "cartão", amount: 18500, when: "ontem · 22:11", status: "confirmado", installment: "Mensal · Jul" },
  { id: "pay3", client: "Órion Retail", method: "boleto", amount: 14200, when: "há 2 dias", status: "processando" },
  { id: "pay4", client: "Nordica Motors", method: "cartão", amount: 25200, when: "há 3 dias", status: "falhou", installment: "Entrada 1/4" },
  { id: "pay5", client: "Kite SaaS", method: "pix", amount: 4200, when: "há 5 dias", status: "confirmado", installment: "Mensal · Jul" },
  { id: "pay6", client: "Lyra Labs", method: "pix", amount: 7600, when: "há 8 dias", status: "confirmado" },
];

/* ============================================================
 *  BIBLIOTECA — arquivos por cliente
 * ============================================================ */
export type LibraryFolder = { client: string; logos: number; fotos: number; videos: number; docs: number; fontes: number; sizeMB: number };
export const libraryFolders: LibraryFolder[] = [
  { client: "Meridian Capital", logos: 8, fotos: 42, videos: 3, docs: 27, fontes: 4, sizeMB: 812 },
  { client: "Aurora Health", logos: 6, fotos: 128, videos: 12, docs: 34, fontes: 2, sizeMB: 2140 },
  { client: "Pallas Studio", logos: 14, fotos: 86, videos: 4, docs: 18, fontes: 6, sizeMB: 1420 },
  { client: "Órion Retail", logos: 4, fotos: 60, videos: 8, docs: 22, fontes: 3, sizeMB: 980 },
  { client: "Lyra Labs", logos: 3, fotos: 24, videos: 2, docs: 14, fontes: 2, sizeMB: 410 },
  { client: "Kite SaaS", logos: 5, fotos: 18, videos: 1, docs: 12, fontes: 2, sizeMB: 220 },
];

/* ============================================================
 *  SUPORTE — Tickets
 * ============================================================ */
export type Ticket = {
  id: string;
  subject: string;
  client: string;
  priority: "crítica" | "alta" | "média" | "baixa";
  status: "aberto" | "em atendimento" | "aguardando cliente" | "resolvido";
  owner: string;
  sla: string;
  openedAt: string;
};

export const tickets: Ticket[] = [
  { id: "T-142", subject: "Erro no gateway de pagamento (checkout)", client: "Órion Retail", priority: "crítica", status: "em atendimento", owner: "Camila R.", sla: "2h30 restantes", openedAt: "hoje 08:14" },
  { id: "T-141", subject: "Ajustar template de e-mail transacional", client: "Aurora Health", priority: "alta", status: "aberto", owner: "—", sla: "6h", openedAt: "ontem" },
  { id: "T-140", subject: "Solicitação de nova permissão de usuário", client: "Meridian Capital", priority: "média", status: "aguardando cliente", owner: "Helena", sla: "24h", openedAt: "há 2 dias" },
  { id: "T-139", subject: "Dúvida sobre exportação de relatório mensal", client: "Lyra Labs", priority: "baixa", status: "resolvido", owner: "Thomas", sla: "—", openedAt: "há 4 dias" },
  { id: "T-138", subject: "Bug em Safari na área do cliente", client: "Kite SaaS", priority: "alta", status: "em atendimento", owner: "Diego", sla: "1h10", openedAt: "hoje 07:22" },
];

/* ============================================================
 *  TEMPLATES
 * ============================================================ */
export type TemplateItem = { id: string; name: string; kind: "proposta" | "contrato" | "cobrança" | "whatsapp" | "email" | "escopo" | "cronograma" | "landing"; usedCount: number; updatedAt: string };
export const templates: TemplateItem[] = [
  { id: "t1", name: "Proposta padrão · Software House", kind: "proposta", usedCount: 42, updatedAt: "há 3 dias" },
  { id: "t2", name: "Contrato de prestação (CLT-free)", kind: "contrato", usedCount: 38, updatedAt: "há 12 dias" },
  { id: "t3", name: "Cobrança amigável · vencimento", kind: "cobrança", usedCount: 214, updatedAt: "há 1 dia" },
  { id: "t4", name: "Cobrança firme · atraso 5+ dias", kind: "cobrança", usedCount: 87, updatedAt: "há 1 dia" },
  { id: "t5", name: "WhatsApp · boas-vindas cliente", kind: "whatsapp", usedCount: 156, updatedAt: "há 8 dias" },
  { id: "t6", name: "E-mail · kickoff de projeto", kind: "email", usedCount: 62, updatedAt: "há 20 dias" },
  { id: "t7", name: "Escopo modular · MVP SaaS", kind: "escopo", usedCount: 24, updatedAt: "há 6 dias" },
  { id: "t8", name: "Cronograma 12 semanas · discovery-heavy", kind: "cronograma", usedCount: 19, updatedAt: "há 2 dias" },
  { id: "t9", name: "Landing · captura de leads", kind: "landing", usedCount: 11, updatedAt: "há 5 dias" },
];

/* ============================================================
 *  ANALYTICS — visão da empresa
 * ============================================================ */
export const companyKpis = {
  receitaMes: 42000,
  lucroMes: 28000,
  margem: 66.7,
  horasVendidas: 320,
  horasTrabalhadas: 274,
  projetosAtivos: 12,
  propostasAbertas: 18,
  taxaConversao: 34,
  ticketMedio: 58500,
  ltvMedio: 214000,
};

export const receitaVsCusto = [
  { month: "Jan", receita: 32, custo: 18 },
  { month: "Fev", receita: 28, custo: 16 },
  { month: "Mar", receita: 35, custo: 19 },
  { month: "Abr", receita: 41, custo: 22 },
  { month: "Mai", receita: 38, custo: 21 },
  { month: "Jun", receita: 46, custo: 24 },
  { month: "Jul", receita: 42, custo: 14 },
];

/* ============================================================
 *  AUTOMAÇÕES
 * ============================================================ */
export type Automation = {
  id: string;
  name: string;
  trigger: string;
  steps: string[];
  runsThisMonth: number;
  status: "ativa" | "pausada" | "rascunho";
};

export const automations: Automation[] = [
  {
    id: "auto1",
    name: "Pagamento confirmado → cria projeto",
    trigger: "Pagamento de entrada confirmado",
    steps: ["Criar projeto", "Criar workspace", "Gerar cronograma", "Enviar e-mail boas-vindas", "Criar pasta na biblioteca", "Assinar contrato", "Notificar squad"],
    runsThisMonth: 12,
    status: "ativa",
  },
  {
    id: "auto2",
    name: "Onboarding travado → alerta owner",
    trigger: "Onboarding parado por 3+ dias",
    steps: ["Verificar checklist", "Notificar owner", "Enviar lembrete ao cliente", "Registrar no Command Center"],
    runsThisMonth: 4,
    status: "ativa",
  },
  {
    id: "auto3",
    name: "Fatura vencida → cobrança escalonada",
    trigger: "Fatura vencida há 3+ dias",
    steps: ["Notificar financeiro", "Enviar e-mail amigável", "Aguardar 3 dias", "Enviar cobrança firme", "Aplicar multa/juros", "Escalar para owner"],
    runsThisMonth: 3,
    status: "ativa",
  },
  {
    id: "auto4",
    name: "Aprovação recebida → inicia próxima etapa",
    trigger: "Cliente aprova entrega",
    steps: ["Registrar aprovação", "Fechar tarefa", "Abrir próxima sprint", "Notificar responsáveis"],
    runsThisMonth: 27,
    status: "ativa",
  },
  {
    id: "auto5",
    name: "Escopo fora do padrão → gera aditivo",
    trigger: "IA detecta fora de escopo",
    steps: ["Estimar horas", "Calcular valor", "Gerar orçamento complementar", "Enviar para aprovação"],
    runsThisMonth: 5,
    status: "pausada",
  },
];

/* ============================================================
 *  MARKETPLACE
 * ============================================================ */
export type MarketplaceApp = { id: string; name: string; category: "comunicação" | "pagamentos" | "dev" | "design" | "produtividade" | "dados"; installed: boolean; description: string };
export const marketplaceApps: MarketplaceApp[] = [
  { id: "m1", name: "WhatsApp Business", category: "comunicação", installed: true, description: "Sincroniza conversas com o Portal do Cliente." },
  { id: "m2", name: "Google Calendar", category: "produtividade", installed: true, description: "Reuniões e marcos aparecem na agenda." },
  { id: "m3", name: "Stripe", category: "pagamentos", installed: false, description: "Aceite cartão internacional e assinaturas." },
  { id: "m4", name: "Mercado Pago", category: "pagamentos", installed: true, description: "PIX, boleto e cartão no Brasil." },
  { id: "m5", name: "GitHub", category: "dev", installed: true, description: "Vincula repositórios e deploys aos projetos." },
  { id: "m6", name: "Figma", category: "design", installed: true, description: "Aprovações puxam frames diretamente do Figma." },
  { id: "m7", name: "Notion", category: "produtividade", installed: false, description: "Espelha a Base Técnica e SOPs." },
  { id: "m8", name: "Linear", category: "produtividade", installed: false, description: "Sincroniza issues com sprints." },
  { id: "m9", name: "N8N", category: "dados", installed: false, description: "Automações avançadas sem código." },
  { id: "m10", name: "Asaas", category: "pagamentos", installed: false, description: "Boleto, PIX e emissão de NF-e." },
];

/* ============================================================
 *  DOCUMENTAÇÃO INTERNA
 * ============================================================ */
export type DocEntry = { id: string; title: string; area: "processos" | "SOP" | "manual" | "tutorial" | "vídeo"; updatedAt: string; owner: string };
export const docs: DocEntry[] = [
  { id: "d1", title: "SOP · Onboarding de novo cliente", area: "SOP", updatedAt: "há 6 dias", owner: "Helena V." },
  { id: "d2", title: "Processo · Do lead ao contrato", area: "processos", updatedAt: "há 12 dias", owner: "Thomas" },
  { id: "d3", title: "Manual da empresa · 2026", area: "manual", updatedAt: "há 1 mês", owner: "Thomas" },
  { id: "d4", title: "Tutorial · Como usar o Command Center", area: "tutorial", updatedAt: "há 3 dias", owner: "Camila R." },
  { id: "d5", title: "Vídeo · Kickoff de projeto (12min)", area: "vídeo", updatedAt: "há 8 dias", owner: "Diego" },
  { id: "d6", title: "SOP · Fechamento de sprint", area: "SOP", updatedAt: "há 15 dias", owner: "Diego" },
];
