import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { Bt as ArrowUpRight, Dt as CircleCheck, Et as CircleDollarSign, St as Clock, et as Gauge, kt as ChevronRight, lt as FilePenLine, o as Users, ot as FileText, rt as FolderKanban, t as Zap, u as TrendingUp, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.index-BL9i5m-V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var kindIcon = {
	proposta: FileText,
	contrato: FilePenLine,
	cliente: Users,
	pagamento: CircleDollarSign,
	projeto: FolderKanban,
	horas: Clock,
	receita: TrendingUp
};
function CommandCenter() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const load = async () => {
			try {
				const json = await (await fetch("/api/dashboard")).json();
				setData(json);
			} catch {
				setData({
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
					error: "Falha ao carregar dashboard"
				});
			} finally {
				setLoading(false);
			}
		};
		load();
		const t = setInterval(load, 3e4);
		return () => clearInterval(t);
	}, []);
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const greet = hour < 5 ? "Boa madrugada" : hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
	const date = (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
		weekday: "long",
		day: "2-digit",
		month: "long"
	});
	const kpis = data?.kpis;
	const insights = data?.insights || [];
	const risks = data?.risks || [];
	const deliveries = data?.deliveries || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: date,
		title: `${greet}.`,
		description: "Pulso real da TERON OS — leads, propostas e projetos do banco.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/leads",
				className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-[13px] text-foreground hover:bg-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), " Leads"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/propostas",
				className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), " Propostas"]
			})]
		}),
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-2 py-24 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }), " Carregando métricas..."]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			data?.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400",
				children: data.error
			}),
			data?.empty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 rounded-xl border border-border bg-card/60 p-6 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-foreground",
					children: "Sistema zerado — pronto para dados reais"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: "Quando o bot enviar o primeiro orçamento, leads e propostas aparecem aqui automaticamente."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border bg-gradient-to-br from-card to-background p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Hoje no sistema"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-lg font-semibold",
						children: "O que precisa de atenção"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
						tone: "info",
						dot: true,
						children: "PostgreSQL"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
					children: insights.map((ci) => {
						const Icon = kindIcon[ci.kind] ?? FolderKanban;
						const display = typeof ci.value === "number" && (ci.kind === "receita" || ci.kind === "pagamento") ? currency(ci.value) : String(ci.value);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: ci.href,
							className: "group flex items-start gap-3 rounded-lg border border-border bg-card/60 p-3.5 transition-colors hover:border-foreground/30 hover:bg-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-9 place-items-center rounded-md border border-border bg-background",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[12px] text-muted-foreground",
											children: ci.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 flex items-baseline gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-xl font-semibold text-foreground",
												children: display
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 truncate text-[11px] text-muted-foreground",
											children: ci.hint
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "mt-1 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" })
							]
						}, ci.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceHeader, {
					title: "Próximas entregas / projetos",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/projetos",
						className: "text-[12px] text-muted-foreground hover:text-foreground",
						children: "Ver todos"
					})
				}), deliveries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-5 py-10 text-center text-sm text-muted-foreground",
					children: "Nenhum projeto ativo ainda."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: deliveries.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-5 py-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[13px] font-medium",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-[11px] text-muted-foreground",
									children: [
										p.client,
										" · ",
										p.status
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-32 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1 flex-1 rounded-full bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-foreground",
										style: { width: `${p.progress}%` }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-8 text-right font-mono text-[11px] text-muted-foreground",
									children: [p.progress, "%"]
								})]
							})
						]
					}, p.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceHeader, {
						title: "Pulso",
						hint: "Dados reais do banco"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-px overflow-hidden rounded-b-xl bg-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Pipeline",
								value: currency(kpis?.pipeline || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Aceito",
								value: currency(kpis?.acceptedValue || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Leads",
								value: String(kpis?.leadsTotal || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Propostas abertas",
								value: String(kpis?.proposalsOpen || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Aceitas",
								value: String(kpis?.proposalsAccepted || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Projetos ativos",
								value: String(kpis?.projectsActive || 0)
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Surface, {
						tone: "warning",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "mt-0.5 size-5 text-[oklch(0.88_0.14_78)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.88_0.14_78)]",
									children: "Radar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-display text-base font-semibold",
									children: "Sinais reais"
								})] })]
							}), risks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-[12.5px] text-muted-foreground",
								children: "Nenhum alerta no momento."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2",
								children: risks.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2 text-[12.5px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-[oklch(0.88_0.14_78)]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 truncate",
											children: r.text
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											tone: "warning",
											children: r.tag
										})
									]
								}, r.text))
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceHeader, { title: "Acesso rápido" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-px overflow-hidden rounded-b-xl bg-border sm:grid-cols-3",
					children: [
						{
							label: "Leads",
							to: "/app/leads"
						},
						{
							label: "Propostas",
							to: "/app/propostas"
						},
						{
							label: "Projetos",
							to: "/app/projetos"
						},
						{
							label: "Clientes",
							to: "/app/clientes"
						},
						{
							label: "Financeiro",
							to: "/app/financeiro"
						},
						{
							label: "Configurações",
							to: "/app/configuracoes"
						}
					].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: q.to,
						className: "flex items-center justify-between bg-card p-4 text-[13px] hover:bg-muted/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: q.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5 text-muted-foreground" })]
					}, q.label))
				})] })
			})
		] })
	});
}
function Kpi({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-lg font-semibold tracking-tight text-foreground",
			children: value
		})]
	});
}
function Surface({ children, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `overflow-hidden rounded-xl border bg-card ${tone === "warning" ? "border-[oklch(0.8_0.14_78_/_25%)] bg-[oklch(0.8_0.14_78_/_5%)]" : "border-border"}`,
		children
	});
}
function SurfaceHeader({ title, hint, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex items-center justify-between gap-4 border-b border-border px-5 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-[13px] font-semibold text-foreground",
			children: title
		}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-[11px] text-muted-foreground",
			children: hint
		})] }), action]
	});
}
//#endregion
export { CommandCenter as component };
