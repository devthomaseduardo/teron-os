import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { $ as GraduationCap, Dt as CirclePlay, Wt as Award } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.academia-BzSIJ3TS.js
var import_jsx_runtime = require_jsx_runtime();
var trilhas = [
	{
		title: "Fundamentos TERON",
		modules: 6,
		hours: "3h20",
		level: "Onboarding"
	},
	{
		title: "Squad de Produto",
		modules: 8,
		hours: "5h10",
		level: "Time"
	},
	{
		title: "Product Ops · Cronogramas",
		modules: 4,
		hours: "2h00",
		level: "Especialista"
	},
	{
		title: "Comunicação com clientes",
		modules: 5,
		hours: "1h40",
		level: "Time"
	}
];
function AcademiaPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Empresa",
		title: "Academia TERON",
		description: "Trilhas internas para novos membros. Ele entra → faz cursos → aprende processos → recebe certificado interno.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
			tone: "info",
			children: "Beta fechado"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-dashed border-border bg-card/40 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid size-10 place-items-center rounded-md bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4 text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 text-center font-display text-lg font-semibold",
					children: "Cursos internos com certificação automática"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground",
					children: "Cada novo membro do time entra em uma trilha pré-definida, assiste vídeos, faz exercícios e recebe um certificado interno gerado pela TERON OS. O owner acompanha o progresso em tempo real."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-1 gap-3 md:grid-cols-2",
			children: trilhas.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13.5px] font-medium",
						children: t.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: [
							t.modules,
							" módulos · ",
							t.hours
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
						tone: "neutral",
						children: t.level
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-[12px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-3.5" }), " Preview"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1 text-[12px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3.5" }), " Certificado"]
					})]
				})]
			}, t.title))
		})]
	});
}
//#endregion
export { AcademiaPage as component };
