import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { Vt as ArrowRight, l as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { i as currency, l as scopeRequests } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.escopo-X7aekteT.js
var import_jsx_runtime = require_jsx_runtime();
var statusMap = {
	detectado: {
		label: "Detectado pela IA",
		tone: "warning"
	},
	orcamento_enviado: {
		label: "Orçamento enviado",
		tone: "info"
	},
	aprovado: {
		label: "Aprovado",
		tone: "success"
	},
	rejeitado: {
		label: "Rejeitado",
		tone: "danger"
	}
};
function ScopePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Controle de Escopo",
		description: "Toda solicitação fora do contrato é detectada automaticamente. Nenhum retrabalho não pago.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: scopeRequests.map((r) => {
				const s = statusMap[r.status];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border bg-card p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 shrink-0 place-items-center rounded-md bg-amber-400/10 text-amber-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[14px] font-medium text-foreground",
											children: r.request
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											tone: s.tone,
											dot: true,
											children: s.label
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-[12.5px] text-muted-foreground",
										children: [
											r.project,
											" · detectado ",
											r.detectedAt
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-center gap-4 text-[12.5px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: ["Estimativa: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-medium text-foreground",
												children: [r.estimatedHours, "h"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: ["Valor: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-foreground",
												children: currency(r.estimatedValue)
											})]
										})]
									})
								]
							}),
							r.status === "detectado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
								children: ["Gerar orçamento ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
							})
						]
					})
				}, r.id);
			})
		})
	});
}
//#endregion
export { ScopePage as component };
