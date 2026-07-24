import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { c as marketplaceApps } from "./teron-os-data-COajroCu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.marketplace-2_wWVLU7.js
var import_jsx_runtime = require_jsx_runtime();
var categoryLabels = {
	comunicação: "Comunicação",
	pagamentos: "Pagamentos",
	dev: "Desenvolvimento",
	design: "Design",
	produtividade: "Produtividade",
	dados: "Dados"
};
function MarketplacePage() {
	const grouped = Object.entries(categoryLabels).map(([key, label]) => ({
		key,
		label,
		apps: marketplaceApps.filter((a) => a.category === key)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Empresa",
		title: "Marketplace",
		description: "Instale módulos e integrações em um clique. WhatsApp, Google Calendar, Stripe, GitHub, Figma, Notion e mais.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-wider text-muted-foreground",
				children: "Em beta"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-[13px] text-foreground",
				children: [
					marketplaceApps.filter((a) => a.installed).length,
					" de ",
					marketplaceApps.length,
					" apps disponíveis já ativos no seu workspace."
				]
			})]
		}), grouped.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
				children: cat.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3",
				children: cat.apps.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-10 place-items-center rounded-md bg-gradient-to-br from-muted to-background text-[11px] font-semibold uppercase",
							children: a.name.slice(0, 2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[13px] font-medium",
									children: a.name
								}), a.installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: "success",
									children: "Instalado"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[12px] text-muted-foreground",
								children: a.description
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `shrink-0 rounded-md px-2.5 py-1 text-[12px] ${a.installed ? "border border-border bg-background text-muted-foreground hover:text-foreground" : "bg-foreground text-background hover:opacity-90"}`,
							children: a.installed ? "Configurar" : "Instalar"
						})
					]
				}, a.id))
			})]
		}, cat.key))]
	});
}
//#endregion
export { MarketplacePage as component };
