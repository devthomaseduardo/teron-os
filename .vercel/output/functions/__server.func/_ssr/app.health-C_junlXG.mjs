import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { J as Heart, d as TrendingDown, u as TrendingUp } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { i as currency, r as clients } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.health-C_junlXG.js
var import_jsx_runtime = require_jsx_runtime();
function scoreTone(v) {
	if (v >= 80) return {
		tone: "success",
		label: "Saudável"
	};
	if (v >= 60) return {
		tone: "warning",
		label: "Atenção"
	};
	return {
		tone: "danger",
		label: "Em risco"
	};
}
function HealthPage() {
	const sorted = [...clients].sort((a, b) => a.healthScore - b.healthScore);
	const avg = Math.round(clients.reduce((a, c) => a + c.healthScore, 0) / clients.length);
	const atRisk = clients.filter((c) => c.healthScore < 60).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Cliente",
		title: "Health Score",
		description: "Cada cliente recebe uma pontuação. Pagamento, resposta, entrega, risco — visível antes de virar crise.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Score médio",
					value: avg.toString(),
					icon: Heart,
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Em risco",
					value: atRisk.toString(),
					icon: TrendingDown,
					tone: "danger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Saudáveis",
					value: clients.filter((c) => c.healthScore >= 80).length.toString(),
					icon: TrendingUp,
					tone: "success"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2.5 text-left font-medium",
							children: "Cliente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Score"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "MRR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-right font-medium",
							children: "Projetos"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sorted.map((c) => {
					const t = scoreTone(c.healthScore);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 text-[13px] last:border-0 hover:bg-muted/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-8 place-items-center rounded-md bg-muted/50 text-[11px] font-semibold",
										children: c.initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: c.contact
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 w-32 overflow-hidden rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `h-full ${c.healthScore >= 80 ? "bg-emerald-400" : c.healthScore >= 60 ? "bg-amber-400" : "bg-red-400"}`,
											style: { width: `${c.healthScore}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[12px]",
										children: c.healthScore
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: t.tone,
									dot: true,
									children: t.label
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-[12.5px] text-foreground",
								children: currency(c.mrr)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right text-muted-foreground",
								children: c.projects
							})
						]
					}, c.id);
				}) })]
			})
		})]
	});
}
function StatCard({ label, value, icon: Icon, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid size-7 place-items-center rounded-md ${tone === "danger" ? "bg-red-400/10 text-red-300" : tone === "success" ? "bg-emerald-400/10 text-emerald-300" : "bg-primary/10 text-primary"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl font-semibold",
			children: value
		})]
	});
}
//#endregion
export { HealthPage as component };
