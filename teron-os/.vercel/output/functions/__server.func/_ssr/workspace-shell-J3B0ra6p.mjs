import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as cn, t as TeronWordmark } from "./logo--ScwVAlm.mjs";
import { $ as GraduationCap, B as Megaphone, Bt as Boxes, G as LayoutDashboard, Ht as BookOpen, Jt as Activity, Ot as CircleGauge, Q as HeartHandshake, R as MessageSquare, S as Server, St as Command, T as Scale, Tt as Clock, U as LifeBuoy, Ut as Bell, W as LibraryBig, Y as Inbox, Z as Heart, _ as SquareCheckBig, ft as FilePenLine, g as Store, i as Workflow, kt as CircleDollarSign, lt as FileText, m as Target, o as Users, ot as FolderKanban, p as Timer, v as Sparkles, vt as CreditCard, w as Search, x as Settings, zt as Building2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-shell-J3B0ra6p.js
var import_jsx_runtime = require_jsx_runtime();
var groups = [
	{
		label: "Command",
		items: [
			{
				label: "Command Center",
				to: "/app",
				icon: LayoutDashboard
			},
			{
				label: "Inbox",
				to: "/app/inbox",
				icon: Inbox,
				badge: "4"
			},
			{
				label: "Assistente IA",
				to: "/app/ia",
				icon: Sparkles,
				badge: "5"
			},
			{
				label: "Automações",
				to: "/app/automacoes",
				icon: Workflow
			},
			{
				label: "Atividade",
				to: "/app/atividade",
				icon: Activity
			}
		]
	},
	{
		label: "Aquisição",
		items: [{
			label: "Marketing",
			to: "/app/marketing",
			icon: Megaphone
		}, {
			label: "CRM",
			to: "/app/crm",
			icon: Target,
			badge: "9"
		}]
	},
	{
		label: "Vendas",
		items: [
			{
				label: "Propostas",
				to: "/app/propostas",
				icon: FileText,
				badge: "2"
			},
			{
				label: "Contratos",
				to: "/app/contratos",
				icon: FilePenLine
			},
			{
				label: "Pagamentos",
				to: "/app/pagamentos",
				icon: CreditCard
			},
			{
				label: "Clientes",
				to: "/app/clientes",
				icon: Users
			}
		]
	},
	{
		label: "Entrega",
		items: [
			{
				label: "Projetos",
				to: "/app/projetos",
				icon: FolderKanban
			},
			{
				label: "Aprovações",
				to: "/app/aprovacoes",
				icon: SquareCheckBig,
				badge: "2"
			},
			{
				label: "Escopo",
				to: "/app/escopo",
				icon: Scale,
				badge: "1"
			},
			{
				label: "Horas",
				to: "/app/horas",
				icon: Clock
			},
			{
				label: "Diário",
				to: "/app/diario",
				icon: Timer
			},
			{
				label: "Comunicação",
				to: "/app/chat",
				icon: MessageSquare
			}
		]
	},
	{
		label: "Operação",
		items: [
			{
				label: "Financeiro",
				to: "/app/financeiro",
				icon: CircleDollarSign,
				badge: "1"
			},
			{
				label: "Analytics",
				to: "/app/analytics",
				icon: CircleGauge
			},
			{
				label: "Biblioteca",
				to: "/app/biblioteca",
				icon: LibraryBig
			},
			{
				label: "Base Técnica",
				to: "/app/base",
				icon: Server
			},
			{
				label: "Suporte",
				to: "/app/suporte",
				icon: LifeBuoy,
				badge: "5"
			},
			{
				label: "Templates",
				to: "/app/templates",
				icon: BookOpen
			},
			{
				label: "Health Score",
				to: "/app/health",
				icon: Heart
			}
		]
	},
	{
		label: "Empresa",
		items: [
			{
				label: "Documentação",
				to: "/app/documentacao",
				icon: Building2
			},
			{
				label: "Academia",
				to: "/app/academia",
				icon: GraduationCap
			},
			{
				label: "Marketplace",
				to: "/app/marketplace",
				icon: Store
			},
			{
				label: "Atendimento",
				to: "/app/atendimento",
				icon: HeartHandshake
			},
			{
				label: "Configurações",
				to: "/app/configuracoes",
				icon: Settings
			}
		]
	}
];
function WorkspaceShell({ title, eyebrow, description, action, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border/70 bg-sidebar md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-14 items-center border-b border-sidebar-border/70 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronWordmark, {})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "mx-3 mt-3 flex items-center gap-2 rounded-md border border-sidebar-border/80 bg-background/40 px-2.5 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: "Buscar em tudo…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-0.5 rounded border border-sidebar-border/80 bg-muted/40 px-1 py-px font-mono text-[10px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "size-2.5" }), "K"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mt-4 flex-1 overflow-y-auto px-2 pb-4",
					children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70",
							children: g.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-0.5",
							children: g.items.map((item) => {
								const active = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("size-4 shrink-0", active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 truncate",
											children: item.label
										}),
										item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-muted/70 px-1.5 py-px text-[10px] font-medium text-muted-foreground",
											children: item.badge
										})
									]
								}) }, item.to);
							})
						})]
					}, g.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-sidebar-border/70 p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2 rounded-md px-2 py-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-7 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.14_250)] to-[oklch(0.68_0.2_320)] text-[11px] font-semibold text-white",
								children: "TR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[12px] font-medium text-foreground",
									children: "Thomas Reis"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[10px] text-muted-foreground",
									children: "TERON OS · Owner"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "size-3.5 text-muted-foreground" })
						]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-border/70 bg-background/80 px-6 backdrop-blur-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
						children: eyebrow
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground",
					"aria-label": "Notificações",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-7xl flex-1 px-6 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold tracking-tight text-foreground",
						children: title
					}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: description
					})] }), action]
				}), children]
			})]
		})]
	});
}
//#endregion
export { WorkspaceShell as t };
