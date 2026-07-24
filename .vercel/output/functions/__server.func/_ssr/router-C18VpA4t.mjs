import { t as prisma } from "./prisma-CpXuewPn.mjs";
import { c as createServerFn } from "./createServerFn-aZmUlApV.mjs";
import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as Outlet, d as createRootRouteWithContext, f as Link, h as useRouter, i as HeadContent, l as lazyRouteComponent, r as Scripts, s as createRouter, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createSsrRpc, t as Route$46 } from "./createSsrRpc-SZ3llWob.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C18VpA4t.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Brt4tID9.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$45 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TERON Studio — Sistema operacional para estúdios de software" },
			{
				name: "description",
				content: "TERON centraliza clientes, propostas, contratos, projetos, pagamentos e comunicação em um só lugar. O sistema operacional para engenheiros e agências."
			},
			{
				name: "author",
				content: "TERON Studio"
			},
			{
				property: "og:title",
				content: "TERON Studio — Sistema operacional para estúdios de software"
			},
			{
				property: "og:description",
				content: "Substitua WhatsApp, planilhas e documentos soltos por uma plataforma única para gerenciar toda a experiência do cliente."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#0a0a0b"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-background text-foreground antialiased",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$45.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$44 = () => import("./routes-evK-dmk7.mjs");
var Route$44 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "TERON OS — O sistema operacional para empresas que constroem produtos digitais" },
		{
			name: "description",
			content: "TERON OS substitui WhatsApp, PDFs, planilhas e contratos manuais por um único sistema operacional. Propostas interativas, onboarding, aprovações, escopo, cobranças e IA — em um só lugar."
		},
		{
			property: "og:title",
			content: "TERON OS — O sistema operacional para empresas de produto digital"
		},
		{
			property: "og:description",
			content: "Substitua WhatsApp, PDFs e planilhas por um sistema operacional único. Portal comercial interativo, cronogramas inteligentes e IA que age como gerente de projetos."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$44, "component")
});
var $$splitComponentImporter$43 = () => import("./app-DpnSEiVG.mjs");
var Route$43 = createFileRoute("/app")({ component: lazyRouteComponent($$splitComponentImporter$43, "component") });
var $$splitComponentImporter$42 = () => import("./cliente-Bf4XkmFe.mjs");
var Route$42 = createFileRoute("/cliente")({
	head: () => ({ meta: [{ title: "Portal do Cliente B2B · Teron Studio" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
var $$splitComponentImporter$41 = () => import("./api.dashboard-7J2QP6-I.mjs");
/** GET /api/dashboard — métricas reais para o Command Center */
var Route$41 = createFileRoute("/api/dashboard")({
	server: { handlers: { GET: async () => {
		try {
			const [leadsTotal, leadsRecrutador, proposals, projects, recentLeads, recentProposals, recentProjects] = await Promise.all([
				prisma.lead.count(),
				prisma.lead.count({ where: { intent: "recrutador" } }),
				prisma.proposal.findMany({ select: {
					id: true,
					status: true,
					amount: true,
					viewedAt: true,
					acceptedAt: true,
					publicToken: true,
					title: true,
					createdAt: true,
					lead: { select: {
						name: true,
						company: true
					} }
				} }),
				prisma.project.findMany({ select: {
					id: true,
					title: true,
					status: true,
					budget: true,
					clientName: true,
					clientCompany: true,
					clientAccessToken: true,
					clientPortal: true,
					updatedAt: true
				} }),
				prisma.lead.findMany({
					orderBy: { createdAt: "desc" },
					take: 5,
					select: {
						id: true,
						name: true,
						company: true,
						status: true,
						intent: true,
						createdAt: true
					}
				}),
				prisma.proposal.findMany({
					orderBy: { createdAt: "desc" },
					take: 5,
					select: {
						id: true,
						title: true,
						status: true,
						amount: true,
						publicToken: true,
						createdAt: true,
						lead: { select: {
							name: true,
							company: true
						} }
					}
				}),
				prisma.project.findMany({
					orderBy: { updatedAt: "desc" },
					take: 5,
					select: {
						id: true,
						title: true,
						status: true,
						budget: true,
						clientName: true,
						clientCompany: true,
						clientAccessToken: true,
						clientPortal: true
					}
				})
			]);
			const proposalsOpen = proposals.filter((p) => [
				"enviada",
				"visualizada",
				"rascunho"
			].includes(p.status)).length;
			const proposalsAccepted = proposals.filter((p) => p.status === "aceita").length;
			const proposalsViewed = proposals.filter((p) => p.viewedAt).length;
			const pipeline = proposals.filter((p) => !["recusada", "expirada"].includes(p.status)).reduce((s, p) => s + (p.amount || 0), 0);
			const acceptedValue = proposals.filter((p) => p.status === "aceita").reduce((s, p) => s + (p.amount || 0), 0);
			const projectsActive = projects.filter((p) => ["onboarding", "em_andamento"].includes(p.status)).length;
			const projectsOnboarding = projects.filter((p) => p.status === "onboarding").length;
			const risks = [];
			for (const p of projects) {
				if (p.status === "onboarding") {
					const portal = p.clientPortal || {};
					const required = (Array.isArray(portal.checklist) ? portal.checklist : []).filter((c) => c.required !== false);
					const done = required.filter((c) => c.done).length;
					if (required.length && done < required.length) risks.push({
						text: `${p.clientCompany || p.clientName} — checklist ${done}/${required.length}`,
						tag: "Aguarda materiais"
					});
				}
				if (p.status === "pausado") risks.push({
					text: `${p.title} — pausado`,
					tag: "Pausado"
				});
			}
			for (const p of proposals) if (p.status === "visualizada" && !p.acceptedAt) risks.push({
				text: `${p.lead?.company || p.lead?.name || p.title} — proposta vista sem aceite`,
				tag: "Follow-up"
			});
			const insights = [
				{
					id: "leads",
					kind: "cliente",
					label: "Leads",
					value: String(leadsTotal),
					hint: leadsRecrutador ? `${leadsRecrutador} recrutador` : "Via bot e site",
					tone: "info",
					href: "/app/leads"
				},
				{
					id: "propostas-abertas",
					kind: "proposta",
					label: "Propostas abertas",
					value: String(proposalsOpen),
					hint: `${proposalsViewed} visualizadas`,
					tone: "warning",
					href: "/app/propostas"
				},
				{
					id: "aceitas",
					kind: "contrato",
					label: "Propostas aceitas",
					value: String(proposalsAccepted),
					hint: acceptedValue ? `R$ ${acceptedValue.toLocaleString("pt-BR")}` : "Nenhuma ainda",
					tone: "success",
					href: "/app/propostas"
				},
				{
					id: "projetos",
					kind: "projeto",
					label: "Projetos ativos",
					value: String(projectsActive),
					hint: `${projectsOnboarding} em onboarding`,
					tone: "info",
					href: "/app/projetos"
				},
				{
					id: "pipeline",
					kind: "receita",
					label: "Pipeline",
					value: pipeline,
					hint: "Valor em propostas abertas/aceitas",
					tone: "primary",
					href: "/app/financeiro"
				},
				{
					id: "pagamentos",
					kind: "pagamento",
					label: "Valor aceito",
					value: acceptedValue,
					hint: "Soma das propostas aceitas",
					tone: "success",
					href: "/app/pagamentos"
				}
			];
			const deliveries = recentProjects.map((p) => {
				const portal = p.clientPortal || {};
				const checklist = Array.isArray(portal.checklist) ? portal.checklist : [];
				const done = checklist.filter((c) => c.done).length;
				const total = checklist.length || 1;
				return {
					id: p.id,
					name: p.title,
					client: p.clientCompany || p.clientName,
					progress: Math.round(done / total * 100),
					status: p.status,
					token: p.clientAccessToken
				};
			});
			return Response.json({
				success: true,
				empty: leadsTotal === 0 && proposals.length === 0 && projects.length === 0,
				insights,
				kpis: {
					leadsTotal,
					proposalsOpen,
					proposalsAccepted,
					projectsActive,
					pipeline,
					acceptedValue
				},
				risks: risks.slice(0, 6),
				deliveries,
				recentLeads,
				recentProposals
			});
		} catch (err) {
			console.error("[api/dashboard]", err);
			return Response.json({
				success: false,
				empty: true,
				insights: [],
				kpis: {
					leadsTotal: 0,
					proposalsOpen: 0,
					proposalsAccepted: 0,
					projectsActive: 0,
					pipeline: 0,
					acceptedValue: 0
				},
				risks: [],
				deliveries: [],
				error: "Banco indisponível — rode npm run db:migrate"
			}, { status: 500 });
		}
	} } },
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./api.lead-Bn-rp1jN.mjs");
async function processLeadCreation(data) {
	const intent = data.intent || data.answers && typeof data.answers === "object" && data.answers.intent || "proposta";
	const clientName = data.name || "Contato";
	const companyName = data.company || null;
	const clientEmail = data.email || null;
	const clientPhone = data.phone || null;
	const whatsappId = data.whatsappId || data.phone || null;
	const clientAddress = data.address || data.city || null;
	const typeOfProject = data.projectType || data.project_type || (intent === "recrutador" ? "Recrutamento" : "Projeto sob medida");
	const projectDeadline = data.deadline || null;
	const projectBriefing = data.briefing || data.project_details || null;
	const total = data.totalInvestment || 0;
	const entry = total > 0 ? total * .5 : 0;
	const leadStatus = intent === "recrutador" ? "recrutador" : "proposta_enviada";
	const lead = await prisma.lead.create({ data: {
		name: clientName,
		company: companyName,
		email: clientEmail,
		phone: clientPhone,
		whatsappId,
		address: clientAddress,
		projectType: typeOfProject,
		deadline: projectDeadline,
		briefing: projectBriefing,
		answers: data.answers || {
			name: clientName,
			company: companyName,
			intent
		},
		totalInvestment: total,
		entryPayment: entry,
		status: leadStatus,
		source: "whatsapp",
		intent: String(intent)
	} });
	if (intent === "recrutador") return {
		success: true,
		leadId: lead.id,
		proposalId: null,
		publicToken: null,
		url: null,
		message: "Lead de recrutamento registrado"
	};
	const validUntil = /* @__PURE__ */ new Date();
	validUntil.setDate(validUntil.getDate() + 7);
	const titlePrefix = intent === "produto_teron" ? "TERON OS Sob Medida" : "Proposta";
	const proposal = await prisma.proposal.create({ data: {
		leadId: lead.id,
		title: `${titlePrefix} — ${companyName || clientName}`,
		content: projectBriefing,
		amount: total,
		entryAmount: entry,
		status: "enviada",
		validUntil,
		version: 1
	} });
	const proposalUrlWithParams = `${`${(process.env.APP_URL || "https://os.thomaseduardo.com.br").replace(/\/$/, "")}/proposta/${proposal.publicToken}`}?${new URLSearchParams({
		cliente: clientName,
		empresa: companyName || "",
		email: clientEmail || "",
		endereco: clientAddress || "",
		projeto: typeOfProject,
		briefing: projectBriefing || "",
		prazo: projectDeadline || ""
	}).toString()}`;
	return {
		success: true,
		leadId: lead.id,
		proposalId: proposal.id,
		publicToken: proposal.publicToken,
		url: proposalUrlWithParams,
		proposalUrl: proposalUrlWithParams,
		lead: {
			id: lead.id,
			name: lead.name,
			company: lead.company,
			email: lead.email,
			status: lead.status,
			intent: lead.intent
		},
		message: "Proposta gerada com sucesso via TERON OS"
	};
}
createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a547668f53ddf64526109de74976ac7c496cb70c2c0c56958a07d1c0c2599ecd"));
var Route$40 = createFileRoute("/api/lead")({
	server: { handlers: { POST: async ({ request }) => {
		try {
			const result = await processLeadCreation(await request.json());
			return Response.json(result);
		} catch (err) {
			console.error("[api/lead] error:", err);
			return Response.json({
				success: false,
				error: "Failed to create lead"
			}, { status: 500 });
		}
	} } },
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./api.leads-xeEAXWU5.mjs");
/**
* GET /api/leads
* Lista leads reais do banco (mais recentes primeiro).
* Sem dados de demo.
*/
var Route$39 = createFileRoute("/api/leads")({
	server: { handlers: { GET: async () => {
		try {
			const items = (await prisma.lead.findMany({
				orderBy: { createdAt: "desc" },
				take: 200,
				include: { proposals: {
					orderBy: { createdAt: "desc" },
					take: 1,
					select: {
						id: true,
						publicToken: true,
						status: true,
						amount: true,
						viewedAt: true,
						acceptedAt: true
					}
				} }
			})).map((l) => {
				const lastProposal = l.proposals[0] || null;
				return {
					id: l.id,
					name: l.name,
					company: l.company || "",
					email: l.email || "",
					phone: l.phone || "",
					whatsappId: l.whatsappId || "",
					address: l.address || "",
					projectType: l.projectType || "",
					briefing: l.briefing || "",
					deadline: l.deadline || "",
					estimatedValue: l.totalInvestment || lastProposal?.amount || 0,
					status: l.status,
					source: l.source,
					intent: l.intent || "proposta",
					createdAt: l.createdAt.toISOString(),
					proposal: lastProposal ? {
						id: lastProposal.id,
						publicToken: lastProposal.publicToken,
						status: lastProposal.status,
						amount: lastProposal.amount,
						viewedAt: lastProposal.viewedAt?.toISOString() || null,
						acceptedAt: lastProposal.acceptedAt?.toISOString() || null
					} : null
				};
			});
			return Response.json({
				success: true,
				leads: items,
				total: items.length
			});
		} catch (err) {
			console.error("[api/leads]", err);
			return Response.json({
				success: false,
				leads: [],
				error: "Erro ao listar leads"
			}, { status: 500 });
		}
	} } },
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./api.payment-DBdLZg_8.mjs");
createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("2247ffda656ca3d621612e8e6a320b96f3b3cd3c0b71cfa91ecea0218926b064"));
createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ce5b78001f3c0ccd36ae21b217a65162c427476dd718afb472264b7790fa5cdc"));
/** Confirma pagamento: aceita proposta + garante Project */
var processPaymentWebhookFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("baef1c7e38560abc8d0e21212351c96555d68b647fd0f0a189a255fd860d4fe8"));
var Route$38 = createFileRoute("/api/payment")({
	server: { handlers: { POST: async ({ request }) => {
		try {
			const result = await processPaymentWebhookFn({ data: await request.json() });
			return Response.json(result);
		} catch (err) {
			console.error("[api/payment]", err);
			return Response.json({
				success: false,
				error: "Erro"
			}, { status: 500 });
		}
	} } },
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./api.projects-DGiWqc0j.mjs");
/** GET /api/projects — lista projetos reais (admin) */
var Route$37 = createFileRoute("/api/projects")({
	server: { handlers: { GET: async () => {
		try {
			const items = (await prisma.project.findMany({
				orderBy: { updatedAt: "desc" },
				take: 200,
				include: {
					proposal: { select: {
						publicToken: true,
						status: true,
						amount: true
					} },
					lead: { select: {
						name: true,
						company: true,
						email: true,
						phone: true
					} }
				}
			})).map((p) => {
				const portal = p.clientPortal || {};
				const checklist = Array.isArray(portal.checklist) ? portal.checklist : [];
				const done = checklist.filter((c) => c.done).length;
				const total = checklist.length || 1;
				return {
					id: p.id,
					title: p.title,
					clientName: p.clientName,
					clientCompany: p.clientCompany,
					clientEmail: p.clientEmail,
					status: p.status,
					deadline: p.deadline,
					budget: p.budget,
					description: p.description,
					clientAccessToken: p.clientAccessToken,
					progress: Math.round(done / total * 100),
					checklistDone: done,
					checklistTotal: checklist.length,
					createdAt: p.createdAt.toISOString(),
					updatedAt: p.updatedAt.toISOString(),
					proposalToken: p.proposal?.publicToken || null,
					lead: p.lead
				};
			});
			return Response.json({
				success: true,
				projects: items,
				total: items.length
			});
		} catch (err) {
			console.error("[api/projects]", err);
			return Response.json({
				success: false,
				projects: [],
				error: "Erro ao listar"
			}, { status: 500 });
		}
	} } },
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./api.proposals-C9yCJgrJ.mjs");
/**
* GET /api/proposals
* Lista propostas reais do banco.
*/
var Route$36 = createFileRoute("/api/proposals")({
	server: { handlers: { GET: async () => {
		try {
			const proposals = await prisma.proposal.findMany({
				orderBy: { createdAt: "desc" },
				take: 200,
				include: { lead: { select: {
					id: true,
					name: true,
					company: true,
					email: true,
					projectType: true
				} } }
			});
			const appUrl = (process.env.APP_URL || "https://os.thomaseduardo.com.br").replace(/\/$/, "");
			const items = proposals.map((p) => ({
				id: p.id,
				publicToken: p.publicToken,
				title: p.title,
				client: p.lead?.company || p.lead?.name || "—",
				contact: p.lead?.name || "",
				scope: p.lead?.projectType || p.title,
				amount: p.amount,
				entryAmount: p.entryAmount,
				status: p.status,
				validUntil: p.validUntil?.toISOString() || null,
				viewedAt: p.viewedAt?.toISOString() || null,
				acceptedAt: p.acceptedAt?.toISOString() || null,
				createdAt: p.createdAt.toISOString(),
				publicLink: `${appUrl}/proposta/${p.publicToken}`,
				leadId: p.leadId
			}));
			return Response.json({
				success: true,
				proposals: items,
				total: items.length
			});
		} catch (err) {
			console.error("[api/proposals]", err);
			return Response.json({
				success: false,
				proposals: [],
				error: "Erro ao listar propostas"
			}, { status: 500 });
		}
	} } },
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./app.index-BL9i5m-V.mjs");
var Route$35 = createFileRoute("/app/")({
	head: () => ({ meta: [{ title: "Command Center — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./app.academia-BzSIJ3TS.mjs");
var Route$34 = createFileRoute("/app/academia")({
	head: () => ({ meta: [{ title: "Academia — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./app.analytics-BS4IBbaQ.mjs");
var Route$33 = createFileRoute("/app/analytics")({
	head: () => ({ meta: [{ title: "Analytics — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./app.aprovacoes-CsdTYFSL.mjs");
var Route$32 = createFileRoute("/app/aprovacoes")({
	head: () => ({ meta: [{ title: "Aprovações — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./app.atendimento-Cag4oK2W.mjs");
var Route$31 = createFileRoute("/app/atendimento")({
	head: () => ({ meta: [{ title: "Atendimento — TERON" }] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./app.atividade-hiFKZqOm.mjs");
var Route$30 = createFileRoute("/app/atividade")({
	head: () => ({ meta: [{ title: "Atividade — TERON" }] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./app.automacoes--zjJkhcu.mjs");
var Route$29 = createFileRoute("/app/automacoes")({
	head: () => ({ meta: [{ title: "Automações — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./app.base-DMMtogza.mjs");
var Route$28 = createFileRoute("/app/base")({
	head: () => ({ meta: [{ title: "Base de conhecimento — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./app.biblioteca-C8J-uS1z.mjs");
var Route$27 = createFileRoute("/app/biblioteca")({
	head: () => ({ meta: [{ title: "Biblioteca — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./app.chat-qdmeE4v1.mjs");
var Route$26 = createFileRoute("/app/chat")({
	head: () => ({ meta: [{ title: "Comunicação — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./app.clientes-DvEa4jB7.mjs");
var Route$25 = createFileRoute("/app/clientes")({
	head: () => ({ meta: [{ title: "Clientes — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./app.configuracoes-Bk8kcQgA.mjs");
var Route$24 = createFileRoute("/app/configuracoes")({
	head: () => ({ meta: [{ title: "Configurações de Pagamentos & API — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./app.contratos-BmiMvhgu.mjs");
var Route$23 = createFileRoute("/app/contratos")({
	head: () => ({ meta: [{ title: "Contratos — TERON Studio" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./app.crm-Dy_5w6Sq.mjs");
var Route$22 = createFileRoute("/app/crm")({
	head: () => ({ meta: [{ title: "CRM — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./app.desenvolvimento-DKuAzCjF.mjs");
var Route$21 = createFileRoute("/app/desenvolvimento")({
	head: () => ({ meta: [{ title: "Desenvolvimento — TERON" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./app.diario-D5TN8EfM.mjs");
var Route$20 = createFileRoute("/app/diario")({
	head: () => ({ meta: [{ title: "Diário do projeto — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./app.documentacao-i3N2IP13.mjs");
var Route$19 = createFileRoute("/app/documentacao")({
	head: () => ({ meta: [{ title: "Documentação — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./app.escopo-X7aekteT.mjs");
var Route$18 = createFileRoute("/app/escopo")({
	head: () => ({ meta: [{ title: "Escopo — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./app.financeiro-eUayqpxt.mjs");
var Route$17 = createFileRoute("/app/financeiro")({
	head: () => ({ meta: [{ title: "Financeiro — TERON Studio" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./app.health-C_junlXG.mjs");
var Route$16 = createFileRoute("/app/health")({
	head: () => ({ meta: [{ title: "Health Score — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./app.horas-ampm8k6w.mjs");
var Route$15 = createFileRoute("/app/horas")({
	head: () => ({ meta: [{ title: "Horas — TERON" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./app.ia-Ba3koGVn.mjs");
var Route$14 = createFileRoute("/app/ia")({
	head: () => ({ meta: [{ title: "Assistente IA — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./app.inbox-WsjYtkZa.mjs");
var Route$13 = createFileRoute("/app/inbox")({
	head: () => ({ meta: [{ title: "Inbox — TERON" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./app.leads-DgsjQfi_.mjs");
var Route$12 = createFileRoute("/app/leads")({
	head: () => ({ meta: [{ title: "Leads — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./app.marketing-Pd2qOqz4.mjs");
var Route$11 = createFileRoute("/app/marketing")({
	head: () => ({ meta: [{ title: "Marketing — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./app.marketplace-2_wWVLU7.mjs");
var Route$10 = createFileRoute("/app/marketplace")({
	head: () => ({ meta: [{ title: "Marketplace — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./app.pagamentos-C9_zFYjh.mjs");
var Route$9 = createFileRoute("/app/pagamentos")({
	head: () => ({ meta: [{ title: "Pagamentos — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./app.projetos-JGhuJSJz.mjs");
var Route$8 = createFileRoute("/app/projetos")({
	head: () => ({ meta: [{ title: "Projetos — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./app.propostas-DRkINo03.mjs");
var Route$7 = createFileRoute("/app/propostas")({
	head: () => ({ meta: [{ title: "Propostas — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./app.suporte-CaZ6Qf7i.mjs");
var Route$6 = createFileRoute("/app/suporte")({
	head: () => ({ meta: [{ title: "Suporte — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./app.templates-Dxodr9mx.mjs");
var Route$5 = createFileRoute("/app/templates")({
	head: () => ({ meta: [{ title: "Templates — TERON OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./proposta._id-CCZlIa7N.mjs");
var Route$4 = createFileRoute("/proposta/$id")({
	head: () => ({ meta: [
		{ title: "Proposta comercial — TERON OS" },
		{
			name: "description",
			content: "Proposta e Ordem de Serviço interativa da TERON OS."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./api.payment.webhook-CrtL2XLk.mjs");
/**
* Webhook unificado:
* POST /api/payment/webhook?provider=mercadopago|stripe
*
* Mercado Pago envia topic=payment & id=...
* Stripe envia evento checkout.session.completed (raw body em produção com signature)
*/
async function ensureProjectFromProposal(proposalIdOrToken, meta) {
	const proposal = await prisma.proposal.findFirst({
		where: { OR: [{ publicToken: proposalIdOrToken }, { id: proposalIdOrToken }] },
		include: {
			lead: true,
			project: true
		}
	});
	if (!proposal) return null;
	await prisma.proposal.update({
		where: { id: proposal.id },
		data: {
			status: "aceita",
			acceptedAt: proposal.acceptedAt || /* @__PURE__ */ new Date()
		}
	});
	if (proposal.leadId) await prisma.lead.update({
		where: { id: proposal.leadId },
		data: { status: "aceita" }
	});
	if (proposal.project) {
		const portal = proposal.project.clientPortal || {};
		await prisma.project.update({
			where: { id: proposal.project.id },
			data: { clientPortal: {
				...portal,
				payment: {
					method: meta?.method || "webhook",
					amount: meta?.amount || proposal.amount,
					transactionId: meta?.transactionId || null,
					paidAt: (/* @__PURE__ */ new Date()).toISOString()
				}
			} }
		});
		return proposal.project;
	}
	return prisma.project.create({ data: {
		title: proposal.title,
		clientName: proposal.lead?.name || "Cliente",
		clientEmail: proposal.lead?.email || null,
		clientCompany: proposal.lead?.company || null,
		status: "onboarding",
		deadline: proposal.lead?.deadline || null,
		budget: meta?.amount || proposal.amount,
		description: proposal.content || proposal.lead?.briefing || null,
		leadId: proposal.leadId,
		proposalId: proposal.id,
		clientPortal: {
			checklist: [
				{
					id: "logo",
					label: "Logotipo",
					done: false,
					required: true
				},
				{
					id: "texts",
					label: "Textos",
					done: false,
					required: true
				},
				{
					id: "images",
					label: "Imagens",
					done: false,
					required: true
				},
				{
					id: "access",
					label: "Acessos",
					done: false,
					required: false
				}
			],
			notes: [],
			payment: {
				method: meta?.method || "webhook",
				amount: meta?.amount || proposal.amount,
				transactionId: meta?.transactionId || null,
				paidAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		}
	} });
}
var Route$3 = createFileRoute("/api/payment/webhook")({
	server: { handlers: {
		POST: async ({ request }) => {
			try {
				const url = new URL(request.url);
				const provider = url.searchParams.get("provider") || "generic";
				let body = {};
				if ((request.headers.get("content-type") || "").includes("application/json")) body = await request.json();
				else {
					const text = await request.text();
					try {
						body = JSON.parse(text);
					} catch {
						body = Object.fromEntries(new URLSearchParams(text));
					}
				}
				if (provider === "mercadopago" || body.action?.includes("payment") || body.type === "payment") {
					const paymentId = body.data?.id || body.id || url.searchParams.get("data.id") || url.searchParams.get("id");
					const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
					if (paymentId && accessToken && !accessToken.includes("YOUR_")) {
						const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
						if (res.ok) {
							const payment = await res.json();
							if (payment.status === "approved") {
								const project = await ensureProjectFromProposal(String(payment.external_reference || ""), {
									method: "mercadopago",
									amount: payment.transaction_amount,
									transactionId: String(payment.id)
								});
								return Response.json({
									success: true,
									provider: "mercadopago",
									projectId: project?.id,
									token: project?.clientAccessToken
								});
							}
							return Response.json({
								success: true,
								ignored: true,
								status: payment.status
							});
						}
					}
					if (body.external_reference && body.status === "approved") {
						const project = await ensureProjectFromProposal(String(body.external_reference), {
							method: "mercadopago",
							amount: body.transaction_amount,
							transactionId: String(body.id || "")
						});
						return Response.json({
							success: true,
							projectId: project?.id
						});
					}
				}
				if (provider === "stripe" || body.type?.startsWith("checkout.") || body.type?.startsWith("payment_intent.")) {
					const eventType = body.type;
					if (eventType === "checkout.session.completed" || eventType === "payment_intent.succeeded") {
						const obj = body.data?.object || body;
						const ref = String(obj.client_reference_id || obj.metadata?.proposalId || "");
						if (ref) {
							const project = await ensureProjectFromProposal(ref, {
								method: "stripe",
								amount: (obj.amount_total || obj.amount || 0) / (obj.currency === "brl" || !obj.currency ? 100 : 100),
								transactionId: String(obj.id || "")
							});
							return Response.json({
								success: true,
								provider: "stripe",
								projectId: project?.id,
								token: project?.clientAccessToken
							});
						}
					}
					return Response.json({
						success: true,
						ignored: true,
						type: eventType
					});
				}
				if (body.proposalId && body.status === "paid") {
					const project = await ensureProjectFromProposal(String(body.proposalId), {
						method: body.paymentMethod || "manual",
						amount: body.amount,
						transactionId: body.transactionId
					});
					return Response.json({
						success: true,
						workstationUrl: project ? `/cliente/onboarding/${project.clientAccessToken}` : null
					});
				}
				return Response.json({
					success: true,
					message: "Webhook recebido, sem ação"
				});
			} catch (err) {
				console.error("[webhook payment]", err);
				return Response.json({
					success: false,
					error: "Erro no webhook"
				}, { status: 500 });
			}
		},
		GET: async () => Response.json({
			ok: true,
			service: "teron-payment-webhook"
		})
	} },
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./api.project._token-DEetTqvW.mjs");
var DEFAULT_CHECKLIST = [
	{
		id: "logo",
		label: "Logotipo (SVG/PNG)",
		hint: "Alta resolução, fundo transparente",
		required: true,
		done: false
	},
	{
		id: "brand",
		label: "Manual de marca / cores",
		hint: "HEX e tipografia",
		required: true,
		done: false
	},
	{
		id: "texts",
		label: "Textos institucionais",
		hint: "Sobre, serviços, contato",
		required: true,
		done: false
	},
	{
		id: "images",
		label: "Banco de imagens",
		hint: "Fotos oficiais",
		required: true,
		done: false
	},
	{
		id: "access",
		label: "Acessos (domínio/DNS)",
		hint: "Registro e painel",
		required: false,
		done: false
	}
];
function ensurePortal(raw) {
	const portal = raw && typeof raw === "object" ? raw : {};
	let checklist = Array.isArray(portal.checklist) ? portal.checklist : [];
	if (checklist.length === 0) checklist = DEFAULT_CHECKLIST;
	return {
		checklist,
		notes: Array.isArray(portal.notes) ? portal.notes : []
	};
}
var Route$2 = createFileRoute("/api/project/$token")({
	server: { handlers: {
		/** Cliente: carrega workstation pelo clientAccessToken */
		GET: async ({ params }) => {
			try {
				const token = params.token;
				if (!token || token.length < 8) return Response.json({ error: "Token inválido" }, { status: 400 });
				const project = await prisma.project.findFirst({
					where: { OR: [{ clientAccessToken: token }, { id: token }] },
					include: {
						lead: true,
						proposal: true
					}
				});
				if (!project) return Response.json({ error: "Projeto não encontrado" }, { status: 404 });
				const portal = ensurePortal(project.clientPortal);
				if (!project.clientPortal?.checklist?.length) await prisma.project.update({
					where: { id: project.id },
					data: { clientPortal: portal }
				});
				const done = portal.checklist.filter((c) => c.done).length;
				const required = portal.checklist.filter((c) => c.required !== false);
				const requiredDone = required.filter((c) => c.done).length;
				return Response.json({
					id: project.id,
					title: project.title,
					clientName: project.clientName,
					clientCompany: project.clientCompany,
					clientEmail: project.clientEmail,
					status: project.status,
					deadline: project.deadline,
					budget: project.budget,
					description: project.description,
					clientAccessToken: project.clientAccessToken,
					portal,
					progress: portal.checklist.length ? Math.round(done / portal.checklist.length * 100) : 0,
					requiredProgress: required.length ? Math.round(requiredDone / required.length * 100) : 100,
					lead: project.lead ? {
						name: project.lead.name,
						company: project.lead.company,
						email: project.lead.email,
						phone: project.lead.phone,
						briefing: project.lead.briefing,
						projectType: project.lead.projectType,
						deadline: project.lead.deadline
					} : null,
					proposal: project.proposal ? {
						publicToken: project.proposal.publicToken,
						status: project.proposal.status,
						amount: project.proposal.amount
					} : null,
					createdAt: project.createdAt.toISOString(),
					updatedAt: project.updatedAt.toISOString()
				});
			} catch (err) {
				console.error("[api/project GET]", err);
				return Response.json({ error: "Erro interno" }, { status: 500 });
			}
		},
		/** Atualiza checklist / notas do clientPortal */
		PATCH: async ({ params, request }) => {
			try {
				const token = params.token;
				const body = await request.json();
				const project = await prisma.project.findFirst({ where: { OR: [{ clientAccessToken: token }, { id: token }] } });
				if (!project) return Response.json({ error: "Projeto não encontrado" }, { status: 404 });
				const portal = ensurePortal(project.clientPortal);
				if (body.checklistItemId) portal.checklist = portal.checklist.map((c) => {
					if (c.id !== body.checklistItemId) return c;
					return {
						...c,
						done: body.done ?? true,
						fileName: body.fileName || c.fileName,
						updatedAt: (/* @__PURE__ */ new Date()).toISOString()
					};
				});
				if (body.note) portal.notes = [...portal.notes, {
					text: body.note,
					at: (/* @__PURE__ */ new Date()).toISOString()
				}];
				const allRequiredDone = portal.checklist.filter((c) => c.required !== false).every((c) => c.done);
				let status = project.status;
				if (body.status) status = body.status;
				else if (allRequiredDone && status === "onboarding") status = "em_andamento";
				const updated = await prisma.project.update({
					where: { id: project.id },
					data: {
						clientPortal: portal,
						status
					}
				});
				return Response.json({
					success: true,
					status: updated.status,
					portal
				});
			} catch (err) {
				console.error("[api/project PATCH]", err);
				return Response.json({ error: "Erro interno" }, { status: 500 });
			}
		}
	} },
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./api.proposal._token-BOCMIiFC.mjs");
async function getProposalByToken(token) {
	return prisma.proposal.findUnique({
		where: { publicToken: token },
		include: {
			lead: { select: {
				id: true,
				name: true,
				company: true,
				email: true,
				phone: true,
				address: true,
				projectType: true,
				deadline: true,
				briefing: true,
				totalInvestment: true,
				entryPayment: true,
				status: true,
				intent: true
			} },
			project: { select: {
				id: true,
				title: true,
				status: true,
				clientAccessToken: true
			} }
		}
	});
}
function publicPayload(proposal) {
	return {
		id: proposal.id,
		publicToken: proposal.publicToken,
		title: proposal.title,
		content: proposal.content,
		amount: proposal.amount,
		entryAmount: proposal.entryAmount,
		status: proposal.status,
		validUntil: proposal.validUntil?.toISOString() || null,
		version: proposal.version,
		viewedAt: proposal.viewedAt?.toISOString() || null,
		acceptedAt: proposal.acceptedAt?.toISOString() || null,
		lead: proposal.lead ? {
			name: proposal.lead.name,
			company: proposal.lead.company,
			email: proposal.lead.email,
			phone: proposal.lead.phone,
			address: proposal.lead.address,
			projectType: proposal.lead.projectType,
			deadline: proposal.lead.deadline,
			briefing: proposal.lead.briefing,
			totalInvestment: proposal.lead.totalInvestment,
			entryPayment: proposal.lead.entryPayment,
			intent: proposal.lead.intent
		} : null,
		hasProject: Boolean(proposal.project),
		project: proposal.project ? {
			id: proposal.project.id,
			status: proposal.project.status,
			clientAccessToken: proposal.project.clientAccessToken
		} : null
	};
}
var Route$1 = createFileRoute("/api/proposal/$token")({
	server: { handlers: {
		GET: async ({ params }) => {
			try {
				const token = params.token;
				if (!token || token.length < 8) return Response.json({ error: "Token inválido" }, { status: 400 });
				const proposal = await getProposalByToken(token);
				if (!proposal) return Response.json({ error: "Proposta não encontrada" }, { status: 404 });
				if (proposal.validUntil && proposal.validUntil < /* @__PURE__ */ new Date()) {
					if (proposal.status !== "expirada" && proposal.status !== "aceita") await prisma.proposal.update({
						where: { id: proposal.id },
						data: { status: "expirada" }
					});
					return Response.json({ error: "Proposta expirada" }, { status: 410 });
				}
				if (!proposal.viewedAt) {
					await prisma.proposal.update({
						where: { id: proposal.id },
						data: {
							viewedAt: /* @__PURE__ */ new Date(),
							status: proposal.status === "enviada" ? "visualizada" : proposal.status
						}
					});
					proposal.viewedAt = /* @__PURE__ */ new Date();
					if (proposal.status === "enviada") proposal.status = "visualizada";
				}
				return Response.json(publicPayload(proposal));
			} catch (err) {
				console.error("[api/proposal GET]", err);
				return Response.json({ error: "Erro interno" }, { status: 500 });
			}
		},
		/** Aceitar proposta → cria Project + clientAccessToken */
		POST: async ({ params, request }) => {
			try {
				const token = params.token;
				if (!token || token.length < 8) return Response.json({ error: "Token inválido" }, { status: 400 });
				let body = {};
				try {
					body = await request.json();
				} catch {
					body = {};
				}
				const action = body.action || "accept";
				const proposal = await getProposalByToken(token);
				if (!proposal) return Response.json({ error: "Proposta não encontrada" }, { status: 404 });
				if (proposal.validUntil && proposal.validUntil < /* @__PURE__ */ new Date() && proposal.status !== "aceita") return Response.json({ error: "Proposta expirada" }, { status: 410 });
				if (action === "accept") {
					if (proposal.status === "aceita" && proposal.project) return Response.json({
						success: true,
						alreadyAccepted: true,
						...publicPayload(proposal),
						workstationUrl: `/cliente/onboarding/${proposal.project.clientAccessToken}`
					});
					await prisma.proposal.update({
						where: { id: proposal.id },
						data: {
							status: "aceita",
							acceptedAt: /* @__PURE__ */ new Date()
						}
					});
					if (proposal.leadId) await prisma.lead.update({
						where: { id: proposal.leadId },
						data: { status: "aceita" }
					});
					let project = proposal.project;
					if (!project) {
						const created = await prisma.project.create({ data: {
							title: proposal.title,
							clientName: proposal.lead?.name || "Cliente",
							clientEmail: proposal.lead?.email || null,
							clientCompany: proposal.lead?.company || null,
							status: "onboarding",
							deadline: proposal.lead?.deadline || null,
							budget: proposal.amount,
							description: proposal.content || proposal.lead?.briefing || null,
							leadId: proposal.leadId,
							proposalId: proposal.id,
							clientPortal: {
								checklist: [
									{
										id: "logo",
										label: "Logotipo",
										done: false
									},
									{
										id: "texts",
										label: "Textos institucionais",
										done: false
									},
									{
										id: "images",
										label: "Imagens",
										done: false
									},
									{
										id: "access",
										label: "Acessos",
										done: false
									}
								],
								notes: []
							}
						} });
						project = {
							id: created.id,
							title: created.title,
							status: created.status,
							clientAccessToken: created.clientAccessToken
						};
					}
					const fresh = await getProposalByToken(token);
					return Response.json({
						success: true,
						...publicPayload(fresh),
						workstationUrl: `/cliente/onboarding/${project.clientAccessToken}`
					});
				}
				if (action === "reject") {
					await prisma.proposal.update({
						where: { id: proposal.id },
						data: { status: "recusada" }
					});
					if (proposal.leadId) await prisma.lead.update({
						where: { id: proposal.leadId },
						data: { status: "perdida" }
					});
					const fresh = await getProposalByToken(token);
					return Response.json({
						success: true,
						...publicPayload(fresh)
					});
				}
				return Response.json({ error: "Ação inválida" }, { status: 400 });
			} catch (err) {
				console.error("[api/proposal POST]", err);
				return Response.json({ error: "Erro interno" }, { status: 500 });
			}
		}
	} },
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./cliente.onboarding._projeto-AH_OE40V.mjs");
var Route = createFileRoute("/cliente/onboarding/$projeto")({
	head: () => ({ meta: [{ title: "Workstation · TERON OS" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$44.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$45
});
var AppRoute = Route$43.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$45
});
var ClienteRoute = Route$42.update({
	id: "/cliente",
	path: "/cliente",
	getParentRoute: () => Route$45
});
var LoginRoute = Route$46.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$45
});
var ApiDashboardRoute = Route$41.update({
	id: "/api/dashboard",
	path: "/api/dashboard",
	getParentRoute: () => Route$45
});
var ApiLeadRoute = Route$40.update({
	id: "/api/lead",
	path: "/api/lead",
	getParentRoute: () => Route$45
});
var ApiLeadsRoute = Route$39.update({
	id: "/api/leads",
	path: "/api/leads",
	getParentRoute: () => Route$45
});
var ApiPaymentRoute = Route$38.update({
	id: "/api/payment",
	path: "/api/payment",
	getParentRoute: () => Route$45
});
var ApiProjectsRoute = Route$37.update({
	id: "/api/projects",
	path: "/api/projects",
	getParentRoute: () => Route$45
});
var ApiProposalsRoute = Route$36.update({
	id: "/api/proposals",
	path: "/api/proposals",
	getParentRoute: () => Route$45
});
var AppIndexRoute = Route$35.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppAcademiaRoute = Route$34.update({
	id: "/academia",
	path: "/academia",
	getParentRoute: () => AppRoute
});
var AppAnalyticsRoute = Route$33.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AppRoute
});
var AppAprovacoesRoute = Route$32.update({
	id: "/aprovacoes",
	path: "/aprovacoes",
	getParentRoute: () => AppRoute
});
var AppAtendimentoRoute = Route$31.update({
	id: "/atendimento",
	path: "/atendimento",
	getParentRoute: () => AppRoute
});
var AppAtividadeRoute = Route$30.update({
	id: "/atividade",
	path: "/atividade",
	getParentRoute: () => AppRoute
});
var AppAutomacoesRoute = Route$29.update({
	id: "/automacoes",
	path: "/automacoes",
	getParentRoute: () => AppRoute
});
var AppBaseRoute = Route$28.update({
	id: "/base",
	path: "/base",
	getParentRoute: () => AppRoute
});
var AppBibliotecaRoute = Route$27.update({
	id: "/biblioteca",
	path: "/biblioteca",
	getParentRoute: () => AppRoute
});
var AppChatRoute = Route$26.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => AppRoute
});
var AppClientesRoute = Route$25.update({
	id: "/clientes",
	path: "/clientes",
	getParentRoute: () => AppRoute
});
var AppConfiguracoesRoute = Route$24.update({
	id: "/configuracoes",
	path: "/configuracoes",
	getParentRoute: () => AppRoute
});
var AppContratosRoute = Route$23.update({
	id: "/contratos",
	path: "/contratos",
	getParentRoute: () => AppRoute
});
var AppCrmRoute = Route$22.update({
	id: "/crm",
	path: "/crm",
	getParentRoute: () => AppRoute
});
var AppDesenvolvimentoRoute = Route$21.update({
	id: "/desenvolvimento",
	path: "/desenvolvimento",
	getParentRoute: () => AppRoute
});
var AppDiarioRoute = Route$20.update({
	id: "/diario",
	path: "/diario",
	getParentRoute: () => AppRoute
});
var AppDocumentacaoRoute = Route$19.update({
	id: "/documentacao",
	path: "/documentacao",
	getParentRoute: () => AppRoute
});
var AppEscopoRoute = Route$18.update({
	id: "/escopo",
	path: "/escopo",
	getParentRoute: () => AppRoute
});
var AppFinanceiroRoute = Route$17.update({
	id: "/financeiro",
	path: "/financeiro",
	getParentRoute: () => AppRoute
});
var AppHealthRoute = Route$16.update({
	id: "/health",
	path: "/health",
	getParentRoute: () => AppRoute
});
var AppHorasRoute = Route$15.update({
	id: "/horas",
	path: "/horas",
	getParentRoute: () => AppRoute
});
var AppIaRoute = Route$14.update({
	id: "/ia",
	path: "/ia",
	getParentRoute: () => AppRoute
});
var AppInboxRoute = Route$13.update({
	id: "/inbox",
	path: "/inbox",
	getParentRoute: () => AppRoute
});
var AppLeadsRoute = Route$12.update({
	id: "/leads",
	path: "/leads",
	getParentRoute: () => AppRoute
});
var AppMarketingRoute = Route$11.update({
	id: "/marketing",
	path: "/marketing",
	getParentRoute: () => AppRoute
});
var AppMarketplaceRoute = Route$10.update({
	id: "/marketplace",
	path: "/marketplace",
	getParentRoute: () => AppRoute
});
var AppPagamentosRoute = Route$9.update({
	id: "/pagamentos",
	path: "/pagamentos",
	getParentRoute: () => AppRoute
});
var AppProjetosRoute = Route$8.update({
	id: "/projetos",
	path: "/projetos",
	getParentRoute: () => AppRoute
});
var AppPropostasRoute = Route$7.update({
	id: "/propostas",
	path: "/propostas",
	getParentRoute: () => AppRoute
});
var AppSuporteRoute = Route$6.update({
	id: "/suporte",
	path: "/suporte",
	getParentRoute: () => AppRoute
});
var AppTemplatesRoute = Route$5.update({
	id: "/templates",
	path: "/templates",
	getParentRoute: () => AppRoute
});
var PropostaIdRoute = Route$4.update({
	id: "/proposta/$id",
	path: "/proposta/$id",
	getParentRoute: () => Route$45
});
var ApiPaymentWebhookRoute = Route$3.update({
	id: "/webhook",
	path: "/webhook",
	getParentRoute: () => ApiPaymentRoute
});
var ApiProjectTokenRoute = Route$2.update({
	id: "/api/project/$token",
	path: "/api/project/$token",
	getParentRoute: () => Route$45
});
var ApiProposalTokenRoute = Route$1.update({
	id: "/api/proposal/$token",
	path: "/api/proposal/$token",
	getParentRoute: () => Route$45
});
var ClienteOnboardingProjetoRoute = Route.update({
	id: "/onboarding/$projeto",
	path: "/onboarding/$projeto",
	getParentRoute: () => ClienteRoute
});
var AppRouteChildren = {
	AppAcademiaRoute,
	AppAnalyticsRoute,
	AppAprovacoesRoute,
	AppAtendimentoRoute,
	AppAtividadeRoute,
	AppAutomacoesRoute,
	AppBaseRoute,
	AppBibliotecaRoute,
	AppChatRoute,
	AppClientesRoute,
	AppConfiguracoesRoute,
	AppContratosRoute,
	AppCrmRoute,
	AppDesenvolvimentoRoute,
	AppDiarioRoute,
	AppDocumentacaoRoute,
	AppEscopoRoute,
	AppFinanceiroRoute,
	AppHealthRoute,
	AppHorasRoute,
	AppIaRoute,
	AppInboxRoute,
	AppLeadsRoute,
	AppMarketingRoute,
	AppMarketplaceRoute,
	AppPagamentosRoute,
	AppProjetosRoute,
	AppPropostasRoute,
	AppSuporteRoute,
	AppTemplatesRoute,
	AppIndexRoute
};
var AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
var ClienteRouteChildren = { ClienteOnboardingProjetoRoute };
var ClienteRouteWithChildren = ClienteRoute._addFileChildren(ClienteRouteChildren);
var ApiPaymentRouteChildren = { ApiPaymentWebhookRoute };
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRouteWithChildren,
	ClienteRoute: ClienteRouteWithChildren,
	LoginRoute,
	ApiDashboardRoute,
	ApiLeadRoute,
	ApiLeadsRoute,
	ApiPaymentRoute: ApiPaymentRoute._addFileChildren(ApiPaymentRouteChildren),
	ApiProjectsRoute,
	ApiProposalsRoute,
	PropostaIdRoute,
	ApiProjectTokenRoute,
	ApiProposalTokenRoute
};
var routeTree = Route$45._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
