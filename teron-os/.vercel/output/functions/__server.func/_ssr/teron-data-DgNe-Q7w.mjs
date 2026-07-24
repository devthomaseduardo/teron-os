//#region node_modules/.nitro/vite/services/ssr/assets/teron-data-DgNe-Q7w.js
function currency(value) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		maximumFractionDigits: 0
	}).format(value);
}
var clients = [
	{
		id: "c1",
		name: "Meridian Capital",
		contact: "Helena Vasques",
		initials: "MC",
		projects: 2,
		mrr: 18500,
		since: "Jan 2024",
		status: "ativo",
		healthScore: 88
	},
	{
		id: "c2",
		name: "Aurora Health",
		contact: "Diego Salles",
		initials: "AH",
		projects: 1,
		mrr: 9800,
		since: "Mar 2025",
		status: "ativo",
		healthScore: 62
	},
	{
		id: "c3",
		name: "Pallas Studio",
		contact: "Marina Prado",
		initials: "PS",
		projects: 1,
		mrr: 0,
		since: "Mai 2026",
		status: "onboarding",
		healthScore: 41
	},
	{
		id: "c4",
		name: "Órion Retail",
		contact: "Ricardo Amado",
		initials: "OR",
		projects: 1,
		mrr: 14200,
		since: "Fev 2025",
		status: "ativo",
		healthScore: 79
	},
	{
		id: "c5",
		name: "Lyra Labs",
		contact: "Camila Rufino",
		initials: "LL",
		projects: 1,
		mrr: 7600,
		since: "Abr 2026",
		status: "ativo",
		healthScore: 84
	},
	{
		id: "c6",
		name: "Nordica Motors",
		contact: "Bruno Kern",
		initials: "NM",
		projects: 0,
		mrr: 0,
		since: "Jul 2026",
		status: "onboarding",
		healthScore: 50
	},
	{
		id: "c7",
		name: "Kite SaaS",
		contact: "Isabela Cordeiro",
		initials: "KT",
		projects: 1,
		mrr: 4200,
		since: "Jun 2026",
		status: "ativo",
		healthScore: 58
	}
];
var invoices = [
	{
		id: "#0284",
		client: "Aurora Health",
		amount: 12400,
		dueDate: "05/07",
		status: "vencida",
		daysOverdue: 3,
		penalty: 248
	},
	{
		id: "#0285",
		client: "Meridian Capital",
		amount: 18500,
		dueDate: "10/07",
		status: "aberta"
	},
	{
		id: "#0286",
		client: "Órion Retail",
		amount: 14200,
		dueDate: "12/07",
		status: "aberta"
	},
	{
		id: "#0283",
		client: "Lyra Labs",
		amount: 7600,
		dueDate: "02/07",
		status: "paga"
	},
	{
		id: "#0282",
		client: "Kite SaaS",
		amount: 4200,
		dueDate: "01/07",
		status: "paga"
	},
	{
		id: "#0287",
		client: "Pallas Studio",
		amount: 9200,
		dueDate: "22/07",
		status: "prevista"
	}
];
var revenueSeries = [
	{
		month: "Jan",
		value: 32
	},
	{
		month: "Fev",
		value: 28
	},
	{
		month: "Mar",
		value: 35
	},
	{
		month: "Abr",
		value: 41
	},
	{
		month: "Mai",
		value: 38
	},
	{
		month: "Jun",
		value: 46
	},
	{
		month: "Jul",
		value: 48
	}
];
var approvals = [
	{
		id: "ap1",
		project: "Órion Commerce v2",
		title: "Wireframes — Checkout",
		version: "v2",
		status: "aguardando",
		sentAt: "há 2 dias",
		comments: 3
	},
	{
		id: "ap2",
		project: "Meridian Wealth",
		title: "Design system — Componentes",
		version: "v1",
		status: "aprovado",
		sentAt: "há 4 dias",
		comments: 1
	},
	{
		id: "ap3",
		project: "Aurora — Portal",
		title: "Fluxo de agendamento",
		version: "v3",
		status: "alteracao",
		sentAt: "há 6 dias",
		comments: 7
	},
	{
		id: "ap4",
		project: "Lyra Insights",
		title: "Dashboard beta",
		version: "v1",
		status: "aguardando",
		sentAt: "hoje 10:12",
		comments: 0
	},
	{
		id: "ap5",
		project: "Órion Commerce v2",
		title: "Design final — PDP",
		version: "v1",
		status: "aprovado",
		sentAt: "há 8 dias",
		comments: 2
	}
];
var scopeRequests = [
	{
		id: "s1",
		project: "Meridian Wealth",
		request: "Adicionar módulo de simulação de aposentadoria",
		detectedAt: "hoje 14:20",
		status: "detectado",
		estimatedHours: 42,
		estimatedValue: 8400
	},
	{
		id: "s2",
		project: "Órion Commerce v2",
		request: "Integração com marketplace B2B",
		detectedAt: "há 2 dias",
		status: "orcamento_enviado",
		estimatedHours: 80,
		estimatedValue: 16e3
	},
	{
		id: "s3",
		project: "Aurora — Portal",
		request: "Notificações push para pacientes",
		detectedAt: "há 5 dias",
		status: "aprovado",
		estimatedHours: 24,
		estimatedValue: 4800
	}
];
var journalEvents = [
	{
		id: "j1",
		project: "Meridian Wealth",
		type: "deploy",
		message: "Deploy v0.4.2 em staging concluído",
		when: "há 12min"
	},
	{
		id: "j2",
		project: "Órion Commerce v2",
		type: "aprovacao",
		message: "Cliente aprovou design final da PDP",
		when: "há 1h"
	},
	{
		id: "j3",
		project: "Pallas Studio",
		type: "onboarding",
		message: "Cronograma pausado — aguardando textos institucionais",
		when: "há 3h"
	},
	{
		id: "j4",
		project: "Aurora — Portal",
		type: "solicitacao",
		message: "Nova solicitação: notificações push",
		when: "há 5h"
	},
	{
		id: "j5",
		project: "Lyra Insights",
		type: "pagamento",
		message: "Pagamento do marco 2 recebido (R$ 18.500)",
		when: "ontem 16:22"
	},
	{
		id: "j6",
		project: "Órion Commerce v2",
		type: "material",
		message: "Cliente enviou banco de imagens (48 arquivos)",
		when: "ontem 11:04"
	},
	{
		id: "j7",
		project: "Meridian Wealth",
		type: "contrato",
		message: "Contrato digital assinado por Helena Vasques",
		when: "há 3 dias"
	}
];
var aiSuggestions = [
	{
		id: "ai1",
		kind: "cronograma",
		title: "Cronograma da Pallas Studio impactado em 5 dias",
		body: "O cliente está há 7 dias sem enviar os materiais obrigatórios (textos, imagens, acessos). Se não recebermos até 15/07, a entrega será reagendada.",
		project: "Pallas Studio",
		actions: [{
			label: "Enviar lembrete gentil",
			primary: true
		}, { label: "Agendar ligação" }]
	},
	{
		id: "ai2",
		kind: "escopo",
		title: "Solicitação parece fora do escopo — Meridian",
		body: "Detectei que a solicitação 'módulo de simulação de aposentadoria' não está no contrato PR-040. Estimativa: 42h · R$ 8.400.",
		project: "Meridian Wealth",
		actions: [{
			label: "Gerar orçamento complementar",
			primary: true
		}, { label: "Rejeitar" }]
	},
	{
		id: "ai3",
		kind: "cobranca",
		title: "Fatura #0285 vence amanhã — Meridian",
		body: "R$ 18.500. Cliente com histórico impecável. Recomendo lembrete gentil 24h antes.",
		project: "Meridian Wealth",
		actions: [{
			label: "Enviar lembrete",
			primary: true
		}, { label: "Ignorar" }]
	},
	{
		id: "ai4",
		kind: "risco",
		title: "Health Score da Aurora caiu para 62",
		body: "3 atrasos consecutivos em aprovações + fatura #0284 vencida. Sugiro reunião de alinhamento esta semana.",
		project: "Aurora Health",
		actions: [{
			label: "Agendar 1:1",
			primary: true
		}, { label: "Ver histórico" }]
	},
	{
		id: "ai5",
		kind: "comunicacao",
		title: "Órion Commerce sem interação há 4 dias",
		body: "Nenhuma mensagem, aprovação ou atividade do cliente. Projeto em execução ativa.",
		project: "Órion Commerce v2",
		actions: [{
			label: "Enviar update semanal",
			primary: true
		}]
	}
];
var knowledgeEntries = [
	{
		id: "k1",
		project: "Meridian Wealth",
		category: "dominio",
		label: "Domínio principal",
		value: "meridian.wealth",
		updatedAt: "há 2 dias"
	},
	{
		id: "k2",
		project: "Meridian Wealth",
		category: "servidor",
		label: "Servidor de produção",
		value: "AWS us-east-1 · t3.xlarge",
		updatedAt: "há 2 dias"
	},
	{
		id: "k3",
		project: "Meridian Wealth",
		category: "deploy",
		label: "Pipeline CI/CD",
		value: "GitHub Actions → Vercel",
		updatedAt: "hoje"
	},
	{
		id: "k4",
		project: "Meridian Wealth",
		category: "banco",
		label: "Banco de dados",
		value: "PostgreSQL 15 · Supabase",
		updatedAt: "há 5 dias"
	},
	{
		id: "k5",
		project: "Meridian Wealth",
		category: "api",
		label: "API de mercado",
		value: "Bloomberg API v3 · rate 1000/h",
		updatedAt: "há 1 semana"
	},
	{
		id: "k6",
		project: "Meridian Wealth",
		category: "integracao",
		label: "SSO corporativo",
		value: "Okta SAML 2.0",
		updatedAt: "há 1 semana"
	},
	{
		id: "k7",
		project: "Meridian Wealth",
		category: "licenca",
		label: "Licença Highcharts",
		value: "Enterprise · vence 12/2026",
		updatedAt: "há 30 dias"
	}
];
//#endregion
export { invoices as a, revenueSeries as c, currency as i, scopeRequests as l, approvals as n, journalEvents as o, clients as r, knowledgeEntries as s, aiSuggestions as t };
