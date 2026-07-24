import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { Lt as BookOpen, X as GraduationCap, ct as FilePlay, r as Wrench } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { i as docs } from "./teron-os-data-COajroCu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.documentacao-i3N2IP13.js
var import_jsx_runtime = require_jsx_runtime();
var areaIcon = {
	processos: Wrench,
	SOP: BookOpen,
	manual: BookOpen,
	tutorial: GraduationCap,
	"vídeo": FilePlay
};
function DocsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: "Empresa",
		title: "Centro de Documentação",
		description: "Processos, SOPs, tutoriais e vídeos. O conhecimento da empresa vive aqui — não na cabeça de uma pessoa.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
			children: "+ Novo documento"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3",
			children: docs.map((d) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border bg-card p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-md border border-border bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(areaIcon[d.area] ?? BookOpen, { className: "size-4 text-muted-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-[13px] font-medium",
										children: d.title
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-2 text-[11px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone: "neutral",
										children: d.area
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Atualizado ", d.updatedAt] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-[11px] text-muted-foreground",
									children: ["Owner: ", d.owner]
								})
							]
						})]
					})
				}, d.id);
			})
		})
	});
}
//#endregion
export { DocsPage as component };
