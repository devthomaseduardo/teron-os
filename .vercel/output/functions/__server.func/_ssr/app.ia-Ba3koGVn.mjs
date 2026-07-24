import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Sparkles } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { t as aiSuggestions } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.ia-Ba3koGVn.js
var import_jsx_runtime = require_jsx_runtime();
var kindLabel = {
	cronograma: "Cronograma",
	cobranca: "Cobrança",
	escopo: "Escopo",
	risco: "Risco",
	comunicacao: "Comunicação"
};
function AiPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: "Workspace",
		title: "Assistente IA",
		description: "Age como um gerente de projetos. Não espera você perguntar — sugere a próxima ação.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: aiSuggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
									children: kindLabel[s.kind]
								}), s.project && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground",
									children: s.project
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[14.5px] font-medium text-foreground",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[13px] text-muted-foreground",
								children: s.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: s.actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: a.primary ? "rounded-md bg-foreground px-3 py-1.5 text-[12.5px] font-medium text-background hover:opacity-90" : "rounded-md border border-border bg-background/50 px-3 py-1.5 text-[12.5px] text-muted-foreground hover:text-foreground",
									children: a.label
								}, a.label))
							})
						]
					})]
				})
			}, s.id))
		})
	});
}
//#endregion
export { AiPage as component };
