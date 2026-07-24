import { o as __toESM } from "../_runtime.mjs";
import { v as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createStripeCheckoutSession, t as createMercadoPagoPix } from "./stripe-CjflXAez.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as TeronWordmark } from "./logo--ScwVAlm.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { At as CircleCheck, Ct as CodeXml, D as Rocket, Et as ClipboardList, H as LoaderCircle, J as KeyRound, K as Layers, Kt as ArrowRight, Lt as Calendar, a as Wallet, ft as FilePenLine, l as TriangleAlert, n as X, qt as ArrowLeft, t as Zap, v as Sparkles, vt as CreditCard, xt as Compass, y as ShieldCheck, yt as Cpu } from "../_libs/lucide-react.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/proposta._id-CCZlIa7N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AiBriefingCopilot({ projectType, selectedExtras }) {
	const [analyzing, setAnalyzing] = (0, import_react.useState)(false);
	const getAnalysis = () => {
		const isComplex = selectedExtras.includes("dashboard") || selectedExtras.includes("backend");
		const isMedium = selectedExtras.includes("cms") || selectedExtras.length >= 2;
		if (isComplex) return {
			complexity: "Alta (Sistema Web Completo)",
			stack: "Next.js 15, TypeScript, Tailwind CSS, Node.js/Nest, PostgreSQL, Supabase Auth",
			timeline: "30 a 45 dias úteis",
			hoursEstimate: "140 - 180 horas",
			aiRecommendation: "Projeto com lógica de negócios avançada. Recomendada infraestrutura escalável com PostgreSQL + Redis e controle rígido de percursos de usuários."
		};
		if (isMedium) return {
			complexity: "Média (Portal Dinâmico com CMS)",
			stack: "Next.js, TypeScript, Tailwind CSS, Supabase CMS, Resend Email API",
			timeline: "15 a 20 dias úteis",
			hoursEstimate: "60 - 90 horas",
			aiRecommendation: "Projeto com gerenciamento dinâmico de conteúdo. Ideal para empresas que precisam atualizar dados sem depender de código."
		};
		return {
			complexity: "Alta Conversão (Landing Page de Alta Velocidade)",
			stack: "React, Vite/Next.js, Tailwind CSS v4, Motion FX, WhatsApp Direct Lead API",
			timeline: "7 a 10 dias úteis",
			hoursEstimate: "30 - 45 horas",
			aiRecommendation: "Solução focada em conversão extrema. Design moderno, tempo de carregamento < 1s e integração direta com WhatsApp/CRM."
		};
	};
	const analysis = getAnalysis();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-primary/30 bg-primary/5 p-6 backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-primary font-semibold text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Diagnóstico de IA — Copilot Thomas OS" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-mono font-medium text-primary",
					children: "v2.4 Autonomous Model"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: "Análise em tempo real do escopo e dos requisitos selecionados pelo cliente:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/60 bg-background/50 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5 text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Complexidade" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-semibold text-foreground",
							children: analysis.complexity
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/60 bg-background/50 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prazo Estimado" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-semibold text-foreground",
							children: analysis.timeline
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/60 bg-background/50 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Horas Técnicas" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-semibold text-foreground",
							children: analysis.hoursEstimate
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg border border-border/40 bg-card/60 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-semibold text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "size-4 text-purple-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stack Tecnológica Sugerida" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-xs text-muted-foreground",
						children: analysis.stack
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs italic text-muted-foreground/90",
						children: analysis.aiRecommendation
					})
				]
			})
		]
	});
}
/**
* Carrega proposta real pelo publicToken.
* Fallback: query params da URL (compatibilidade com links antigos do bot).
*/
function useProposal(token) {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const load = (0, import_react.useCallback)(async () => {
		if (!token) {
			setLoading(false);
			setError("Token ausente");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch(`/api/proposal/${encodeURIComponent(token)}`);
			if (res.status === 404) {
				setError("Proposta não encontrada");
				setData(null);
				return;
			}
			if (res.status === 410) {
				setError("Proposta expirada");
				setData(null);
				return;
			}
			if (!res.ok) {
				setError("Não foi possível carregar a proposta");
				setData(null);
				return;
			}
			const json = await res.json();
			setData(json);
			setError(null);
		} catch {
			setError("Falha de rede");
			setData(null);
		} finally {
			setLoading(false);
		}
	}, [token]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const accept = (0, import_react.useCallback)(async () => {
		const res = await fetch(`/api/proposal/${encodeURIComponent(token)}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ action: "accept" })
		});
		const json = await res.json();
		if (!res.ok) throw new Error(json.error || "Falha ao aceitar");
		setData(json);
		return json;
	}, [token]);
	const reject = (0, import_react.useCallback)(async () => {
		const res = await fetch(`/api/proposal/${encodeURIComponent(token)}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ action: "reject" })
		});
		const json = await res.json();
		if (!res.ok) throw new Error(json.error || "Falha ao recusar");
		setData(json);
		return json;
	}, [token]);
	return {
		data,
		view: (() => {
			if (typeof window === "undefined") return data ? mapToView(data) : null;
			if (data?.lead) return mapToView(data);
			const urlParams = new URLSearchParams(window.location.search);
			const clientName = urlParams.get("cliente");
			if (!clientName && !data) return null;
			return {
				client: {
					company: data?.lead?.company || urlParams.get("empresa") || "Cliente",
					contact: data?.lead?.name || clientName || "Responsável",
					email: data?.lead?.email || urlParams.get("email") || "",
					address: data?.lead?.address || urlParams.get("endereco") || "",
					role: "Responsável"
				},
				project: data?.lead?.projectType || urlParams.get("projeto") || data?.title || "Projeto",
				summary: data?.lead?.briefing || data?.content || urlParams.get("briefing") || "",
				deadline: data?.lead?.deadline || urlParams.get("prazo") || "",
				amount: data?.amount || data?.lead?.totalInvestment || 0,
				entryAmount: data?.entryAmount || data?.lead?.entryPayment || 0,
				status: data?.status || "enviada",
				workstationUrl: data?.project?.clientAccessToken ? `/cliente/onboarding/${data.project.clientAccessToken}` : void 0
			};
		})(),
		loading,
		error,
		reload: load,
		accept,
		reject
	};
}
function mapToView(data) {
	return {
		client: {
			company: data.lead?.company || "Cliente",
			contact: data.lead?.name || "Responsável",
			email: data.lead?.email || "",
			address: data.lead?.address || "",
			role: "Responsável"
		},
		project: data.lead?.projectType || data.title,
		summary: data.lead?.briefing || data.content || "",
		deadline: data.lead?.deadline || "",
		amount: data.amount || data.lead?.totalInvestment || 0,
		entryAmount: data.entryAmount || data.lead?.entryPayment || 0,
		status: data.status,
		workstationUrl: data.project?.clientAccessToken ? `/cliente/onboarding/${data.project.clientAccessToken}` : void 0
	};
}
var steps = [
	{
		key: "welcome",
		label: "Boas-vindas",
		icon: Sparkles
	},
	{
		key: "diagnosis",
		label: "Diagnóstico IA",
		icon: Compass
	},
	{
		key: "scope",
		label: "Escopo",
		icon: ClipboardList
	},
	{
		key: "simulator",
		label: "Simulador",
		icon: Wallet
	},
	{
		key: "timeline",
		label: "Cronograma",
		icon: Calendar
	},
	{
		key: "contract",
		label: "Contrato & Aceite",
		icon: FilePenLine
	},
	{
		key: "payment",
		label: "Entrada (50%)",
		icon: CreditCard
	},
	{
		key: "created",
		label: "Workstation",
		icon: Rocket
	}
];
var availableExtras = [
	{
		id: "form_adv",
		label: "Formulário Avançado & Qualificação",
		price: 300,
		desc: "Captura condicional com envio direto ao CRM"
	},
	{
		id: "whatsapp",
		label: "Integração Direta WhatsApp API",
		price: 200,
		desc: "Botões flutuantes e gatilhos de conversa"
	},
	{
		id: "cms",
		label: "Painel CMS de Conteúdo",
		price: 800,
		desc: "Gerenciamento completo de textos, imagens e depoimentos"
	},
	{
		id: "dashboard",
		label: "Dashboard / Área Restrita de Clientes",
		price: 2e3,
		desc: "Área logada com dados exclusivos"
	},
	{
		id: "backend",
		label: "Backend Customizado & API Database",
		price: 3500,
		desc: "Banco PostgreSQL de alta frequência e autenticação"
	}
];
var defaultIncluded = [
	"Descoberta e alinhamento de escopo",
	"Design e estrutura da solução",
	"Desenvolvimento sob medida",
	"Homologação com o cliente",
	"Deploy em ambiente produtivo",
	"Suporte pós-entrega (30 dias)"
];
var defaultExcluded = [
	"Aplicativo mobile nativo",
	"Migração de dados legados complexos",
	"Treinamentos presenciais",
	"SLA 24/7"
];
var defaultMilestones = [
	{
		week: "Semana 1",
		title: "Kickoff & materiais",
		detail: "Alinhamento, acessos e checklist de onboarding."
	},
	{
		week: "Semana 2-3",
		title: "Design & arquitetura",
		detail: "Protótipos, stack e validação do fluxo."
	},
	{
		week: "Semana 4-6",
		title: "Desenvolvimento",
		detail: "Implementação do escopo aprovado."
	},
	{
		week: "Semana 7",
		title: "QA & homologação",
		detail: "Testes e ajustes finais com o cliente."
	},
	{
		week: "Semana 8",
		title: "Go-live",
		detail: "Deploy, monitoramento e handover."
	}
];
function ProposalPortal() {
	const { id } = useParams({ from: "/proposta/$id" });
	const { data: apiData, view, loading, error, accept } = useProposal(id);
	const [i, setI] = (0, import_react.useState)(0);
	const step = steps[i];
	const baseFromApi = apiData?.amount && apiData.amount > 0 ? apiData.amount : 0;
	const basePrice = baseFromApi > 0 ? baseFromApi : 800;
	const [selectedExtras, setSelectedExtras] = (0, import_react.useState)(baseFromApi > 0 ? [] : ["whatsapp"]);
	const [cpfCnpj, setCpfCnpj] = (0, import_react.useState)("");
	const [clientEmail, setClientEmail] = (0, import_react.useState)("");
	const [otpCode, setOtpCode] = (0, import_react.useState)("");
	const [showOtpModal, setShowOtpModal] = (0, import_react.useState)(false);
	const [otpSent, setOtpSent] = (0, import_react.useState)(false);
	const [isSigned, setIsSigned] = (0, import_react.useState)(false);
	const [accepting, setAccepting] = (0, import_react.useState)(false);
	const [workstationUrl, setWorkstationUrl] = (0, import_react.useState)(null);
	const [acceptError, setAcceptError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (view?.client?.email) setClientEmail(view.client.email);
		if (apiData?.status === "aceita" || apiData?.acceptedAt) {
			setIsSigned(true);
			if (apiData.project?.clientAccessToken) setWorkstationUrl(`/cliente/onboarding/${apiData.project.clientAccessToken}`);
		}
	}, [view, apiData]);
	const client = view?.client || {
		company: "Cliente",
		contact: "Responsável",
		email: "",
		address: "",
		role: "Responsável"
	};
	const projectTitle = view?.project || "Projeto sob medida";
	const summary = view?.summary || "Proposta comercial gerada via TERON OS.";
	const deadline = view?.deadline || "A definir";
	const totalInvestment = basePrice + (0, import_react.useMemo)(() => {
		return selectedExtras.reduce((sum, extId) => {
			const found = availableExtras.find((e) => e.id === extId);
			return sum + (found ? found.price : 0);
		}, 0);
	}, [selectedExtras]);
	const entryPayment = apiData?.entryAmount && apiData.entryAmount > 0 ? apiData.entryAmount : totalInvestment * .5;
	const deliveryPayment = totalInvestment - entryPayment;
	const toggleExtra = (extId) => {
		setSelectedExtras((prev) => prev.includes(extId) ? prev.filter((x) => x !== extId) : [...prev, extId]);
	};
	const progress = (0, import_react.useMemo)(() => (i + 1) / steps.length * 100, [i]);
	const handleSendOtp = () => {
		if (!cpfCnpj || !clientEmail) {
			alert("Preencha CPF/CNPJ e e-mail.");
			return;
		}
		setOtpSent(true);
	};
	const handleVerifyOtp = async () => {
		if (otpCode.length < 4) {
			alert("Informe o código enviado.");
			return;
		}
		setAccepting(true);
		setAcceptError(null);
		try {
			const result = await accept();
			setIsSigned(true);
			setShowOtpModal(false);
			if (result.workstationUrl) setWorkstationUrl(result.workstationUrl);
			else if (result.project?.clientAccessToken) setWorkstationUrl(`/cliente/onboarding/${result.project.clientAccessToken}`);
			setI(6);
		} catch (e) {
			const msg = e instanceof Error ? e.message : "Falha ao registrar aceite";
			setAcceptError(msg);
			setIsSigned(true);
			setShowOtpModal(false);
			setI(6);
		} finally {
			setAccepting(false);
		}
	};
	const goToWorkstation = async () => {
		if (!workstationUrl) try {
			const result = await accept();
			if (result.workstationUrl) {
				setWorkstationUrl(result.workstationUrl);
				window.location.href = result.workstationUrl;
				return;
			}
			if (result.project?.clientAccessToken) {
				const url = `/cliente/onboarding/${result.project.clientAccessToken}`;
				setWorkstationUrl(url);
				window.location.href = url;
				return;
			}
		} catch {}
		if (workstationUrl) {
			window.location.href = workstationUrl;
			return;
		}
		window.location.href = `/cliente/onboarding/${id}?cliente=${encodeURIComponent(client.contact)}&empresa=${encodeURIComponent(client.company)}`;
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center gap-3 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Carregando proposta..."
		})]
	});
	if (error && !view) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-10 text-amber-400" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Proposta indisponível"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground max-w-md",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://os.thomaseduardo.com.br",
				className: "text-xs text-primary underline",
				children: "Voltar ao site"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-5xl items-center gap-4 px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronWordmark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden text-[11px] text-muted-foreground sm:inline",
							children: [
								"TERON OS · ",
								id.slice(0, 16),
								id.length > 16 ? "…" : "",
								" · ",
								client.company
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-auto flex items-center gap-2 text-[11px] text-muted-foreground",
							children: apiData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: apiData.status === "aceita" ? "success" : "info",
								dot: true,
								children: apiData.status
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-border/60 px-2.5 py-0.5 font-mono text-xs",
								children: "link direto"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-0.5 w-full bg-border/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-primary transition-all duration-500",
						style: { width: `${progress}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border/60 bg-card/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-5xl gap-1 overflow-x-auto px-6 py-3 text-[11.5px]",
					children: steps.map((s, idx) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setI(idx),
							className: `flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 transition-all ${idx === i ? "border-primary bg-primary text-primary-foreground font-medium" : idx < i ? "border-border/60 bg-background/50 text-foreground" : "border-border/40 bg-background/30 text-muted-foreground/60"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.label })]
						}, s.key);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-6 py-12 sm:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-in fade-in slide-in-from-bottom-2 duration-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-[11px] font-medium text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "size-3.5 text-primary" }),
								"Etapa ",
								i + 1,
								" de ",
								steps.length,
								" — ",
								step.label
							]
						}),
						step.key === "welcome" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl",
								children: [
									"Olá, ",
									client.contact.split(" ")[0],
									" 👋"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 text-lg text-muted-foreground sm:text-xl",
								children: [
									"Proposta comercial e Ordem de Serviço interativa do projeto",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground font-medium",
										children: client.company
									}),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 rounded-xl border border-border/60 bg-card/40 p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold",
									children: "Como funciona em 5 passos:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-muted-foreground",
									children: [
										"1. Diagnóstico do escopo",
										"2. Simulador e investimento",
										"3. Contrato digital (OTP)",
										"4. Pagamento da entrada (50%)",
										"5. Workstation e checklist"
									].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-emerald-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t })]
									}, t))
								})]
							})
						] }),
						step.key === "diagnosis" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold tracking-tight sm:text-5xl",
								children: "Diagnóstico do Projeto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: "Avaliação de escopo, stack e cronograma com base no briefing."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiBriefingCopilot, {
									projectType: projectTitle,
									selectedExtras
								})
							})
						] }),
						step.key === "scope" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold tracking-tight sm:text-5xl",
								children: "Escopo Técnico"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs uppercase tracking-widest text-muted-foreground",
								children: projectTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-base text-muted-foreground",
								children: summary
							}),
							deadline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: ["Prazo indicado: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: deadline
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid grid-cols-1 gap-6 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-card/40 p-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-medium uppercase tracking-wider text-emerald-400",
										children: "Incluso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 space-y-2 text-[14px]",
										children: defaultIncluded.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-emerald-400" }), s]
										}, s))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-card/40 p-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
										children: "Não incluso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 space-y-2 text-[14px] text-muted-foreground",
										children: defaultExcluded.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground/60" }), s]
										}, s))
									})]
								})]
							})
						] }),
						step.key === "simulator" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold tracking-tight sm:text-5xl",
								children: "Simulador Comercial"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: "Personalize módulos. Valores recalculados automaticamente."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 rounded-xl border border-border/60 bg-card/40 p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border/60 pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold",
										children: projectTitle
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Base da proposta"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-sm font-semibold",
										children: currency(basePrice)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Módulos opcionais"
									}), availableExtras.map((ext) => {
										const active = selectedExtras.includes(ext.id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => toggleExtra(ext.id),
											className: `flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${active ? "border-primary bg-primary/10 text-foreground" : "border-border/40 bg-background/30 text-muted-foreground hover:border-border/80"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `grid size-5 place-items-center rounded border ${active ? "border-primary bg-primary text-primary-foreground" : "border-border"}`,
													children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-medium text-foreground",
													children: ext.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground",
													children: ext.desc
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-xs font-semibold",
												children: ["+ ", currency(ext.price)]
											})]
										}, ext.id);
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-xl border border-primary/40 bg-primary/5 p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground font-medium",
										children: "Investimento total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-4xl font-bold",
										children: currency(totalInvestment)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Condição"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-emerald-400",
											children: "50% entrada + 50% entrega"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid grid-cols-2 gap-4 border-t border-border/40 pt-4 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "Entrada:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono font-semibold text-sm",
										children: currency(entryPayment)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "Entrega:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono font-semibold text-sm",
										children: currency(deliveryPayment)
									})] })]
								})]
							})
						] }),
						step.key === "timeline" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold tracking-tight sm:text-5xl",
								children: "Cronograma"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: "O prazo oficial inicia após pagamento da entrada e envio dos materiais no onboarding."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-8 space-y-3",
								children: defaultMilestones.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-4 rounded-xl border border-border/60 bg-card/40 p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-9 shrink-0 place-items-center rounded-full border border-border/60 bg-background/40 font-mono text-[11px] text-muted-foreground",
										children: idx + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] uppercase tracking-widest text-muted-foreground",
											children: m.week
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-lg font-semibold",
											children: m.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[13.5px] text-muted-foreground",
											children: m.detail
										})
									] })]
								}, m.title))
							})
						] }),
						step.key === "contract" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold tracking-tight sm:text-5xl",
								children: "Contrato Digital"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: "Documento gerado com os dados do escopo e do simulador."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 rounded-xl border border-border/60 bg-card/40 p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-xs text-muted-foreground",
											children: [
												"CONTRATO · ",
												id.slice(0, 12),
												"…"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											tone: isSigned ? "success" : "warning",
											dot: true,
											children: isSigned ? "Assinado" : "Aguardando aceite"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 max-h-60 overflow-y-auto space-y-3 pr-2 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CONTRATADA:" }), " TERON OS / Studio Tecnologia."] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CONTRATANTE:" }),
												" ",
												client.company,
												" (",
												client.contact,
												")."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CLÁUSULA 1ª — OBJETO:" }),
												" Desenvolvimento de ",
												projectTitle,
												" no valor de ",
												currency(totalInvestment),
												"."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CLÁUSULA 2ª — PAGAMENTO:" }),
												" ",
												currency(entryPayment),
												" na assinatura e ",
												currency(deliveryPayment),
												" na entrega."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CLÁUSULA 3ª — PRAZO:" }), " Contado a partir do pagamento da entrada e envio dos materiais na Workstation."] })
										]
									}),
									acceptError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-xs text-amber-400",
										children: acceptError
									}),
									!isSigned ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setShowOtpModal(true),
										className: "mt-6 w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 flex items-center justify-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "size-4" }), " Assinar digitalmente (OTP)"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-center text-xs font-medium text-emerald-400 flex items-center justify-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }),
											" Assinado por ",
											clientEmail || client.contact
										]
									})
								]
							})
						] }),
						step.key === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold tracking-tight sm:text-5xl",
								children: "Pagamento da entrada (50%)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-muted-foreground",
								children: [
									"Entrada de ",
									currency(entryPayment),
									" para liberar a Workstation."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-6 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 font-bold text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid size-7 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs",
												children: "MP"
											}), "Mercado Pago (PIX)"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-base font-bold text-emerald-400",
											children: currency(entryPayment)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: async () => {
												try {
													const res = await createMercadoPagoPix({
														proposalId: id,
														amount: entryPayment,
														email: clientEmail || client.email || "cliente@empresa.com",
														firstName: client.contact || "Cliente",
														lastName: client.company || "Empresa",
														description: `Entrada proposta ${id}`
													});
													if (res.success) alert(`PIX gerado:\n${res.qrCode}`);
												} catch {}
												await goToWorkstation();
												setI(7);
											},
											className: "w-full rounded-xl bg-emerald-500 py-3 text-xs font-bold text-black hover:opacity-90 flex items-center justify-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Gerar PIX e ativar"]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-indigo-500/40 bg-indigo-500/5 p-6 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 font-bold text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid size-7 place-items-center rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-xs",
												children: "S"
											}), "Stripe Checkout"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-base font-bold text-indigo-400",
											children: currency(entryPayment)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: async () => {
												try {
													const res = await createStripeCheckoutSession({
														proposalId: id,
														amount: entryPayment,
														customerEmail: clientEmail || client.email || "cliente@empresa.com",
														companyName: client.company || "Empresa",
														description: `Entrada proposta ${id}`
													});
													if (res.success && res.url) window.open(res.url, "_blank");
												} catch {}
												await goToWorkstation();
												setI(7);
											},
											className: "w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:opacity-90 flex items-center justify-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" }), " Pagar via Stripe"]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-400" }), " Já pagou? Continuar para a Workstation"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "Garante a criação do projeto no sistema."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: async () => {
										await goToWorkstation();
										setI(7);
									},
									className: "shrink-0 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90",
									children: "Continuar"
								})]
							})
						] }),
						step.key === "created" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto mb-6 grid size-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-4xl font-semibold tracking-tight sm:text-5xl",
									children: "Projeto criado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-4 max-w-lg text-sm text-muted-foreground",
									children: "Workstation ativada. Envie os materiais obrigatórios para iniciarmos a produção."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: goToWorkstation,
									className: "mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform",
									children: ["Acessar Workstation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						})
					]
				}, step.key), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex items-center justify-between border-t border-border/60 pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setI((v) => Math.max(0, v - 1)),
							disabled: i === 0,
							className: "inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/50 px-4 py-2 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Voltar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-mono text-muted-foreground",
							children: [
								i + 1,
								" / ",
								steps.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setI((v) => Math.min(steps.length - 1, v + 1)),
							disabled: i === steps.length - 1,
							className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background hover:scale-105 disabled:opacity-40",
							children: ["Avançar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
						})
					]
				})]
			}),
			showOtpModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border/60 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: "Assinatura digital (OTP)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowOtpModal(false),
							className: "text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}), !otpSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Informe CPF/CNPJ e e-mail. Em produção o código será enviado de verdade; por enquanto qualquer código ≥ 4 dígitos confirma e registra o aceite no banco."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[11px] font-medium text-muted-foreground",
								children: "CPF ou CNPJ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "00.000.000/0001-00",
								value: cpfCnpj,
								onChange: (e) => setCpfCnpj(e.target.value),
								className: "mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[11px] font-medium text-muted-foreground",
								children: "E-mail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								placeholder: "voce@empresa.com",
								value: clientEmail,
								onChange: (e) => setClientEmail(e.target.value),
								className: "mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSendOtp,
								className: "w-full rounded-md bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90",
								children: "Continuar"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Digite um código de confirmação (≥ 4 dígitos) para ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: clientEmail }),
									":"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								maxLength: 6,
								placeholder: "000000",
								value: otpCode,
								onChange: (e) => setOtpCode(e.target.value),
								className: "w-full text-center tracking-widest text-lg font-mono rounded-md border border-border/60 bg-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleVerifyOtp,
								disabled: accepting,
								className: "w-full rounded-md bg-emerald-500 py-2.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2",
								children: accepting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), " Registrando aceite..."] }) : "Confirmar e assinar"
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { ProposalPortal as component };
