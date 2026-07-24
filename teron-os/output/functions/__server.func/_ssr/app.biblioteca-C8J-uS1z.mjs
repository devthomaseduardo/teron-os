import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { at as Film, c as Type, nt as Folder, ot as FileText, q as Image } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { s as libraryFolders } from "./teron-os-data-COajroCu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.biblioteca-C8J-uS1z.js
var import_jsx_runtime = require_jsx_runtime();
function BibliotecaPage() {
	const totalSize = libraryFolders.reduce((s, f) => s + f.sizeMB, 0);
	const totalFiles = libraryFolders.reduce((s, f) => s + f.logos + f.fotos + f.videos + f.docs + f.fontes, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Biblioteca",
		description: "Nunca mais perder arquivos. Cada cliente tem sua pasta com logos, fotos, vídeos, fontes e documentos.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
			children: "+ Enviar arquivo"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Clientes",
					value: String(libraryFolders.length),
					hint: "com biblioteca"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Arquivos",
					value: String(totalFiles),
					hint: "+ 47 esta semana"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Armazenamento",
					value: `${(totalSize / 1024).toFixed(2)} GB`,
					hint: "de 100 GB"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Backup",
					value: "Diário",
					hint: "às 03:00 UTC-3"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: libraryFolders.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "flex items-start justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-semibold",
							children: f.client
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: [
							(f.sizeMB / 1024).toFixed(2),
							" GB · ",
							f.logos + f.fotos + f.videos + f.docs + f.fontes,
							" arquivos"
						]
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-5 gap-2 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileType, {
							icon: Image,
							label: "Logos",
							count: f.logos
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileType, {
							icon: Image,
							label: "Fotos",
							count: f.fotos
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileType, {
							icon: Film,
							label: "Vídeos",
							count: f.videos
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileType, {
							icon: FileText,
							label: "Docs",
							count: f.docs
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileType, {
							icon: Type,
							label: "Fontes",
							count: f.fontes
						})
					]
				})]
			}, f.client))
		})]
	});
}
function FileType({ icon: Icon, label, count }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-background/60 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto size-3.5 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-[11px] text-foreground",
				children: count
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[9.5px] uppercase tracking-wider text-muted-foreground",
				children: label
			})
		]
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
export { BibliotecaPage as component };
