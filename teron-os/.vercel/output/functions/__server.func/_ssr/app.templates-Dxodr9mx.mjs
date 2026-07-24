import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { Ht as BookOpen, I as PanelsTopLeft, Lt as Calendar, T as Scale, V as Mail, ft as FilePenLine, k as Receipt, lt as FileText, z as MessageCircle } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { d as templates } from "./teron-os-data-COajroCu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.templates-Dxodr9mx.js
var import_jsx_runtime = require_jsx_runtime();
var kindIcon = {
	proposta: FileText,
	contrato: FilePenLine,
	cobrança: Receipt,
	whatsapp: MessageCircle,
	email: Mail,
	escopo: Scale,
	cronograma: Calendar,
	landing: PanelsTopLeft
};
function TemplatesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Templates",
		description: "Nunca mais escreva do zero. Modelos prontos para propostas, contratos, cobranças, WhatsApp, e-mail e mais.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
			children: "+ Novo template"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Templates",
					value: String(templates.length),
					hint: "em 8 categorias"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Mais usado",
					value: "Cobrança amigável",
					hint: "214 usos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Tempo poupado (30d)",
					value: "42h",
					hint: "vs escrever do zero"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Última atualização",
					value: "há 1 dia",
					hint: "por Thomas"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3",
			children: templates.map((t) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-9 place-items-center rounded-md border border-border bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(kindIcon[t.kind] ?? BookOpen, { className: "size-4 text-muted-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[13px] font-medium",
									children: t.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground",
								children: t.kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center justify-between text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t.usedCount, " usos"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Atualizado ", t.updatedAt] })]
							})
						]
					})]
				}, t.id);
			})
		})]
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
export { TemplatesPage as component };
