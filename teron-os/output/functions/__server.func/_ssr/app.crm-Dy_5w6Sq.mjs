import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
import { o as leads } from "./teron-os-data-COajroCu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.crm-Dy_5w6Sq.js
var import_jsx_runtime = require_jsx_runtime();
var stages = [
	{
		key: "novo",
		label: "Novo"
	},
	{
		key: "qualificado",
		label: "Qualificado"
	},
	{
		key: "reunião",
		label: "Reunião"
	},
	{
		key: "proposta",
		label: "Proposta"
	},
	{
		key: "ganho",
		label: "Ganho"
	},
	{
		key: "perdido",
		label: "Perdido"
	}
];
var toneByStage = {
	novo: "info",
	qualificado: "info",
	reunião: "warning",
	proposta: "primary",
	ganho: "success",
	perdido: "danger"
};
function CrmPage() {
	const total = leads.reduce((s, l) => s + l.value, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Aquisição",
		title: "CRM",
		description: "Do primeiro contato ao contrato assinado. Funil, follow-ups e próximas ações.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
			children: "+ Novo lead"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Leads no pipeline",
						value: String(leads.filter((l) => l.stage !== "ganho" && l.stage !== "perdido").length),
						hint: "ativos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Valor em pipeline",
						value: currency(total),
						hint: "somatório aberto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Taxa de conversão",
						value: "34%",
						hint: "lead → cliente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Ticket médio",
						value: currency(58500),
						hint: "últimos 90 dias"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6",
				children: stages.map((s) => {
					const cards = leads.filter((l) => l.stage === s.key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex items-center justify-between border-b border-border px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: toneByStage[s.key],
									dot: true,
									children: "·"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[12px] font-medium",
									children: s.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground",
								children: cards.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "min-h-32 space-y-2 p-2",
							children: cards.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-md border border-border bg-background p-2.5 text-[12px] transition-colors hover:border-foreground/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-medium",
										children: l.company
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 truncate text-[11px] text-muted-foreground",
										children: l.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10.5px] text-muted-foreground",
											children: l.lastTouch
										}), l.value > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10.5px]",
											children: currency(l.value)
										})]
									})
								]
							}, l.id))
						})]
					}, s.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 overflow-hidden rounded-xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13px] font-semibold",
						children: "Próximas ações"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted-foreground",
						children: "Priorizado por IA"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: leads.slice(0, 5).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-5 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-8 place-items-center rounded-full bg-muted text-[11px] font-semibold",
								children: l.company.slice(0, 2).toUpperCase()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[13px] font-medium",
									children: l.company
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-[11px] text-muted-foreground",
									children: [
										l.stage === "novo" && "Qualificar via chamada rápida",
										l.stage === "qualificado" && "Agendar reunião de descoberta",
										l.stage === "reunião" && "Enviar resumo e próximos passos",
										l.stage === "proposta" && "Fazer follow-up da proposta",
										l.stage === "ganho" && "Iniciar onboarding do cliente",
										l.stage === "perdido" && "Registrar motivo e mover para nurture"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: toneByStage[l.stage],
								children: l.stage
							})
						]
					}, l.id))
				})]
			})
		]
	});
}
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: label
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
export { CrmPage as component };
