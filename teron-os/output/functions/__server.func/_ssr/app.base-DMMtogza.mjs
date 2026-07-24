import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Lt as BookOpen, S as Search, _t as Copy, dt as Eye, ft as EyeOff } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { s as knowledgeEntries } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.base-DMMtogza.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categoryLabel = {
	dominio: "Domínio",
	servidor: "Servidor",
	deploy: "Deploy",
	banco: "Banco de dados",
	api: "API",
	integracao: "Integração",
	licenca: "Licença",
	acesso: "Acesso"
};
function KnowledgePage() {
	const [reveal, setReveal] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Base de conhecimento",
		description: "Domínio, servidor, deploy, banco, APIs, licenças. Nunca mais 'onde estava aquela senha?'.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2 rounded-md border border-input bg-card px-3 py-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				placeholder: "Buscar por projeto, categoria ou valor…",
				className: "w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/60"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2.5 text-left font-medium",
							children: "Categoria"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Item"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Valor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Projeto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-right font-medium",
							children: "Atualizado"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: knowledgeEntries.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/60 text-[13px] last:border-0 hover:bg-muted/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3" }),
									" ",
									categoryLabel[k.category] ?? k.category
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium text-foreground",
							children: k.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "rounded bg-muted/50 px-2 py-0.5 font-mono text-[12px]",
										children: reveal[k.id] ? k.value : "•".repeat(Math.min(k.value.length, 24))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setReveal((s) => ({
											...s,
											[k.id]: !s[k.id]
										})),
										className: "text-muted-foreground hover:text-foreground",
										"aria-label": "Alternar",
										children: reveal[k.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "text-muted-foreground hover:text-foreground",
										"aria-label": "Copiar",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" })
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: k.project
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right text-[11.5px] text-muted-foreground",
							children: k.updatedAt
						})
					]
				}, k.id)) })]
			})
		})]
	});
}
//#endregion
export { KnowledgePage as component };
