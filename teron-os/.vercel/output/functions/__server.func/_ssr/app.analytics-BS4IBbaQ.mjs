import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
import { r as companyKpis, u as receitaVsCusto } from "./teron-os-data-COajroCu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.analytics-BS4IBbaQ.js
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsPage() {
	const max = Math.max(...receitaVsCusto.map((d) => d.receita));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Analytics",
		description: "A saúde da empresa em uma tela. Receita, lucro, horas, projetos e conversão.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Receita do mês",
						value: currency(companyKpis.receitaMes)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Lucro",
						value: currency(companyKpis.lucroMes),
						tone: "text-[oklch(0.82_0.15_155)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Margem",
						value: `${companyKpis.margem}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Ticket médio",
						value: currency(companyKpis.ticketMedio)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "LTV médio",
						value: currency(companyKpis.ltvMedio)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "mb-4 flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold",
							children: "Receita vs Custo · últimos 7 meses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[11px] text-muted-foreground",
							children: "valores em milhares (R$)"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 gap-3",
						children: receitaVsCusto.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex h-40 w-full items-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 rounded-t bg-foreground",
									style: { height: `${d.receita / max * 100}%` },
									title: `Receita ${d.receita}k`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 rounded-t bg-muted-foreground/40",
									style: { height: `${d.custo / max * 100}%` },
									title: `Custo ${d.custo}k`
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground",
								children: d.month
							})]
						}, d.month))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-4 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-sm bg-foreground" }), " Receita"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-sm bg-muted-foreground/40" }), " Custo"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold",
							children: "Horas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "Vendidas vs trabalhadas neste mês"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									label: "Vendidas",
									value: companyKpis.horasVendidas,
									max: 400,
									tone: "bg-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									label: "Trabalhadas",
									value: companyKpis.horasTrabalhadas,
									max: 400,
									tone: "bg-muted-foreground/50"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									label: "Faturadas",
									value: 296,
									max: 400,
									tone: "bg-[oklch(0.72_0.15_155)]"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold",
							children: "Conversão do funil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "Últimos 90 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelStep, {
									label: "Leads",
									value: 148,
									tone: "bg-muted-foreground/30"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelStep, {
									label: "Qualificados",
									value: 92,
									tone: "bg-muted-foreground/50"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelStep, {
									label: "Propostas",
									value: 51,
									tone: "bg-primary/40"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelStep, {
									label: "Fechados",
									value: 17,
									tone: "bg-foreground"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-[12px] text-muted-foreground",
							children: [
								"Taxa geral: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium text-foreground",
									children: [companyKpis.taxaConversao, "%"]
								}),
								" lead → cliente"
							]
						})
					]
				})]
			})
		]
	});
}
function Kpi({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 font-display text-xl font-semibold ${tone ?? "text-foreground"}`,
			children: value
		})]
	});
}
function Bar({ label, value, max, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-center justify-between text-[11.5px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-mono text-foreground",
			children: [value, "h"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full rounded-full ${tone}`,
			style: { width: `${value / max * 100}%` }
		})
	})] });
}
function FunnelStep({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-center justify-between text-[11.5px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-foreground",
			children: value
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full rounded-full ${tone}`,
			style: { width: `${value / 148 * 100}%` }
		})
	})] });
}
//#endregion
export { AnalyticsPage as component };
