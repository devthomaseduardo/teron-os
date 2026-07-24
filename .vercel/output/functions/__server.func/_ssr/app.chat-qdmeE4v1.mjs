import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { M as Paperclip, x as Send } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.chat-qdmeE4v1.js
var import_jsx_runtime = require_jsx_runtime();
var conversations = [
	{
		id: "1",
		name: "Meridian Wealth",
		last: "Helena aprovou o design system",
		when: "12min",
		unread: 2
	},
	{
		id: "2",
		name: "Órion Commerce v2",
		last: "Enviamos os wireframes v2",
		when: "1h",
		unread: 0
	},
	{
		id: "3",
		name: "Aurora — Portal",
		last: "Diego pediu mais 2 dias",
		when: "3h",
		unread: 1
	},
	{
		id: "4",
		name: "Pallas Studio",
		last: "Aguardando materiais…",
		when: "ontem",
		unread: 0
	},
	{
		id: "5",
		name: "Lyra Insights",
		last: "Deploy staging ok",
		when: "2d",
		unread: 0
	}
];
var thread = [
	{
		who: "them",
		name: "Helena Vasques",
		body: "Boa tarde! Podemos revisar o dashboard hoje?",
		when: "14:02"
	},
	{
		who: "me",
		name: "Você",
		body: "Claro. Acabei de subir a v3 no ambiente de staging. Link no card.",
		when: "14:04"
	},
	{
		who: "them",
		name: "Helena Vasques",
		body: "Perfeito. Acabo de aprovar o design system também.",
		when: "14:22"
	},
	{
		who: "system",
		body: "Aprovação do design system registrada em v1",
		when: "14:22"
	}
];
function ChatPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Central de Comunicação",
		description: "Um chat por projeto. Mensagens, arquivos e histórico centralizados. WhatsApp fica para o pessoal.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid h-[70vh] grid-cols-1 gap-0 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[280px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border-b border-border md:border-b-0 md:border-r",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Projetos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: conversations.map((c, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: `cursor-pointer border-b border-border/60 px-4 py-3 last:border-0 hover:bg-muted/30 ${idx === 0 ? "bg-muted/20" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] font-medium text-foreground",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground",
							children: c.when
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-0.5 flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-[12px] text-muted-foreground",
							children: c.last
						}), c.unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/20 px-1.5 text-[10px] text-primary",
							children: c.unread
						})]
					})]
				}, c.id)) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border px-5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] font-medium text-foreground",
							children: "Meridian Wealth"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Helena Vasques · Product Lead: Rafael"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 space-y-3 overflow-y-auto px-5 py-5",
						children: thread.map((m, i) => m.who === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-md rounded-md border border-border/50 bg-background/40 px-3 py-1.5 text-center text-[11.5px] text-muted-foreground",
							children: [
								m.body,
								" · ",
								m.when
							]
						}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `flex ${m.who === "me" ? "justify-end" : "justify-start"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `max-w-md rounded-2xl px-4 py-2.5 text-[13.5px] ${m.who === "me" ? "bg-foreground text-background" : "border border-border bg-background/40 text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.body }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-1 text-[10.5px] ${m.who === "me" ? "text-background/60" : "text-muted-foreground"}`,
									children: m.when
								})]
							})
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border px-5 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-md border border-input bg-background/50 px-3 py-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-muted-foreground hover:text-foreground",
									"aria-label": "Anexar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Escreva uma mensagem…",
									className: "flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground/60"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "grid size-7 place-items-center rounded-md bg-foreground text-background",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" })
								})
							]
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { ChatPage as component };
