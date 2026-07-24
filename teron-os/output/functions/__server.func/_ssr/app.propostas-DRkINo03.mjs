import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { pt as ExternalLink, st as FilePlusCorner, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.propostas-DRkINo03.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusMap = {
	rascunho: {
		label: "Rascunho",
		tone: "neutral"
	},
	enviada: {
		label: "Enviada",
		tone: "warning"
	},
	visualizada: {
		label: "Visualizada",
		tone: "info"
	},
	aceita: {
		label: "Aceita",
		tone: "success"
	},
	recusada: {
		label: "Recusada",
		tone: "danger"
	},
	expirada: {
		label: "Expirada",
		tone: "danger"
	}
};
function ProposalsPage() {
	const [proposals, setProposals] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const load = async () => {
		try {
			const data = await (await fetch("/api/proposals")).json();
			if (data.success) {
				setProposals(data.proposals || []);
				setError(null);
				if (!selected && data.proposals?.length) setSelected(data.proposals[0]);
			} else {
				setProposals([]);
				setError(data.error || "Falha ao carregar");
			}
		} catch {
			setProposals([]);
			setError("API indisponível — rode a migration e confira o DATABASE_URL");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
		const t = setInterval(load, 15e3);
		return () => clearInterval(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: "Comercial",
		title: "Propostas",
		description: "Propostas reais geradas pelo bot e pela OS. Lista vazia até a primeira proposta.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background opacity-50 cursor-not-allowed",
			disabled: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "size-3.5" }), " Nova proposta (em breve)"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-card",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Carregando..."]
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-16 text-center text-sm text-amber-400 px-4",
					children: error
				}) : proposals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-16 text-center text-sm text-muted-foreground px-4",
					children: "Nenhuma proposta ainda. Quando o bot concluir um orçamento, ela aparece aqui automaticamente."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: proposals.map((p) => {
						const s = statusMap[p.status] || {
							label: p.status,
							tone: "neutral"
						};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							onClick: () => setSelected(p),
							className: `grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-muted/20 ${selected?.id === p.id ? "bg-muted/30" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[14px] font-medium",
									children: p.client
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[12px] text-muted-foreground",
									children: p.scope
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[14px] font-semibold",
									children: currency(p.amount)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: s.tone,
									dot: true,
									children: s.label
								})]
							})]
						}, p.id);
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "rounded-xl border border-border bg-card p-5",
				children: !selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Selecione uma proposta para ver detalhes."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
						children: [selected.publicToken.slice(0, 12), "..."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 font-display text-lg font-semibold",
						children: selected.title || selected.scope
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[12.5px] text-muted-foreground",
						children: [selected.client, selected.contact ? ` · ${selected.contact}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: ["Criada em ", new Date(selected.createdAt).toLocaleString("pt-BR")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3 text-[13px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Status",
								v: selected.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Investimento",
								v: currency(selected.amount)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Visualizada",
								v: selected.viewedAt ? new Date(selected.viewedAt).toLocaleString("pt-BR") : "Ainda não"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Aceita",
								v: selected.acceptedAt ? new Date(selected.acceptedAt).toLocaleString("pt-BR") : "—"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: selected.publicLink,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-6 flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground",
						children: ["Abrir link público ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
					})
				] })
			})]
		})
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between border-b border-border/60 pb-2 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-foreground",
			children: v
		})]
	});
}
//#endregion
export { ProposalsPage as component };
