import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { Dt as CircleCheck, E as RefreshCw, F as MessageSquare } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { n as approvals } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.aprovacoes-CsdTYFSL.js
var import_jsx_runtime = require_jsx_runtime();
var statusMap = {
	aguardando: {
		label: "Aguardando cliente",
		tone: "warning"
	},
	aprovado: {
		label: "Aprovado",
		tone: "success"
	},
	alteracao: {
		label: "Alteração solicitada",
		tone: "info"
	}
};
function ApprovalsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Centro de Aprovações",
		description: "Cada entrega tem versão, status e histórico. Nada de aprovação por WhatsApp.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2.5 text-left font-medium",
							children: "Entrega"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Projeto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Versão"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Enviado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-right font-medium",
							children: "Ações"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: approvals.map((a) => {
					const s = statusMap[a.status];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 text-[13px] last:border-0 hover:bg-muted/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-3 font-medium text-foreground",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: a.project
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-[12px] text-muted-foreground",
								children: a.version
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: s.tone,
									dot: true,
									children: s.label
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: a.sentAt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "inline-flex items-center gap-1 rounded-md border border-border bg-background/50 px-2.5 py-1 text-[11.5px] text-muted-foreground hover:text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3" }),
											" ",
											a.comments
										]
									}), a.status === "aguardando" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "inline-flex items-center gap-1 rounded-md bg-emerald-400/10 px-2.5 py-1 text-[11.5px] text-emerald-300 hover:bg-emerald-400/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Aprovar"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "inline-flex items-center gap-1 rounded-md border border-border bg-background/50 px-2.5 py-1 text-[11.5px] text-muted-foreground hover:text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" }), " Alteração"]
									})] })]
								})
							})
						]
					}, a.id);
				}) })]
			})
		})
	});
}
//#endregion
export { ApprovalsPage as component };
