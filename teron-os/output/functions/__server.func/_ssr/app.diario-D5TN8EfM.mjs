import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Dt as CircleCheck, P as Package, T as Rocket, f as Timer, ht as CreditCard, s as Upload, t as Zap } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { o as journalEvents } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.diario-D5TN8EfM.js
var import_jsx_runtime = require_jsx_runtime();
var iconMap = {
	contrato: CircleCheck,
	pagamento: CreditCard,
	material: Upload,
	deploy: Rocket,
	solicitacao: Zap,
	aprovacao: CircleCheck,
	onboarding: Package
};
function JournalPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Diário do projeto",
		description: "Cada evento registrado automaticamente. Contrato, pagamento, material, deploy, aprovação — tudo aqui.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-4 top-0 h-full w-px bg-border/60",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: journalEvents.map((e) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative flex gap-4 pl-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-border bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(iconMap[e.type] ?? Timer, { className: "size-4 text-muted-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 rounded-xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[13.5px] text-foreground",
									children: e.message
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: e.when
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[12px] text-muted-foreground",
								children: e.project
							})]
						})]
					}, e.id);
				})
			})]
		})
	});
}
//#endregion
export { JournalPage as component };
