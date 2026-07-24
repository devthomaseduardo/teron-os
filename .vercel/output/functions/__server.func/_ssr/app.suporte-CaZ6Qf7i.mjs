import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { B as LifeBuoy, Ot as CircleAlert, St as Clock } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { f as tickets } from "./teron-os-data-COajroCu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.suporte-CaZ6Qf7i.js
var import_jsx_runtime = require_jsx_runtime();
var priorityTone = {
	crítica: "danger",
	alta: "warning",
	média: "info",
	baixa: "neutral"
};
var statusTone = {
	aberto: "warning",
	"em atendimento": "info",
	"aguardando cliente": "warning",
	resolvido: "success"
};
function SuportePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Central de Suporte",
		description: "Tickets com prioridade, SLA e responsável. Cada solicitação vira histórico rastreável.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
			children: "+ Novo ticket"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Abertos",
						value: String(tickets.filter((t) => t.status !== "resolvido").length),
						hint: "em fila ou atendimento",
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Críticos",
						value: String(tickets.filter((t) => t.priority === "crítica").length),
						hint: "SLA < 4h",
						tone: "danger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Tempo médio 1ª resposta",
						value: "12min",
						hint: "meta: 30min",
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "CSAT (30d)",
						value: "4.8/5",
						hint: "127 avaliações",
						tone: "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 overflow-hidden rounded-xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold",
							children: "Fila de tickets"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted-foreground",
						children: "Ordenado por prioridade + SLA"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-[13px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-left text-[11px] uppercase tracking-wider text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "Ticket"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "Assunto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "Cliente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "Prioridade"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "Responsável"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "SLA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "Status"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 font-mono text-[12px] text-muted-foreground",
									children: t.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 font-medium",
									children: t.subject
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-muted-foreground",
									children: t.client
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone: priorityTone[t.priority],
										dot: true,
										children: t.priority
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-muted-foreground",
									children: t.owner
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-[12px] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
											" ",
											t.sla
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone: statusTone[t.status],
										children: t.status
									})
								})
							]
						}, t.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6 rounded-xl border border-[oklch(0.65_0.2_22_/_25%)] bg-[oklch(0.65_0.2_22_/_5%)] p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-5 text-[oklch(0.78_0.18_22)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13px] font-semibold",
						children: "1 ticket crítico com SLA em risco"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[12.5px] text-muted-foreground",
						children: "T-142 · Órion Retail · restam 2h30 · escale para o owner ou reatribua imediatamente."
					})] })]
				})
			})
		]
	});
}
function Kpi({ label, value, hint, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					tone,
					dot: true,
					children: "·"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-xl font-semibold text-foreground",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: hint
			})
		]
	});
}
//#endregion
export { SuportePage as component };
