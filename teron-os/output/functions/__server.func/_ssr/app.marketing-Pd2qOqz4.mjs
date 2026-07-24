import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { Bt as ArrowUpRight, O as Radar, Z as Globe, jt as ChartColumn, ot as FileText } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { a as landingPages, n as blogPosts } from "./teron-os-data-COajroCu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.marketing-Pd2qOqz4.js
var import_jsx_runtime = require_jsx_runtime();
function MarketingPage() {
	const totalVisits = landingPages.reduce((s, p) => s + p.visits, 0);
	const avgConversion = landingPages.filter((p) => p.status === "publicada").reduce((s, p) => s + p.conversion, 0) / landingPages.filter((p) => p.status === "publicada").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Aquisição",
		title: "Marketing",
		description: "Landing pages, blog, portfólio e formulários — a porta de entrada dos leads da sua empresa.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
			children: "+ Nova landing"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						icon: Globe,
						label: "Landing pages",
						value: String(landingPages.length),
						hint: "publicadas + rascunhos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						icon: ChartColumn,
						label: "Visitas · 30d",
						value: totalVisits.toLocaleString("pt-BR"),
						hint: "+18% vs mês anterior"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						icon: Radar,
						label: "Conversão média",
						value: `${avgConversion.toFixed(1)}%`,
						hint: "landing → lead"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						icon: FileText,
						label: "Posts publicados",
						value: String(blogPosts.filter((b) => b.status === "publicado").length),
						hint: "+ 1 em rascunho"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 overflow-hidden rounded-xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13px] font-semibold",
						children: "Landing pages e portfólio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted-foreground",
						children: "Pixel Manager · Analytics ativos"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-[13px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-left text-[11px] uppercase tracking-wider text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "Página"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "Rota"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 text-right font-medium",
								children: "Visitas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 text-right font-medium",
								children: "Conversão"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-2 font-medium",
								children: "Status"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: landingPages.map((lp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 font-medium",
									children: lp.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 font-mono text-[12px] text-muted-foreground",
									children: lp.slug
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-right font-mono text-[12px]",
									children: lp.visits.toLocaleString("pt-BR")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-3 text-right font-mono text-[12px]",
									children: [lp.conversion, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone: lp.status === "publicada" ? "success" : "neutral",
										children: lp.status
									})
								})
							]
						}, lp.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between border-b border-border px-5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold",
							children: "Blog"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "text-[12px] text-muted-foreground hover:text-foreground",
							children: ["Novo post ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-0.5 inline size-3" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border",
						children: blogPosts.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-5 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[13px] font-medium",
									children: b.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground",
									children: [
										b.author,
										" · ",
										b.date,
										" · ",
										b.views.toLocaleString("pt-BR"),
										" views"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: b.status === "publicado" ? "success" : "neutral",
								children: b.status
							})]
						}, b.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold",
							children: "Chat IA de captura"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[12.5px] text-muted-foreground",
							children: "Assistente que qualifica visitantes em tempo real e cria leads automaticamente no CRM."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2 rounded-lg border border-border bg-background p-3 text-[12.5px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded bg-muted/50 p-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: "Visitante:"
								}), " Preciso de um SaaS de gestão financeira, quanto custa?"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded bg-primary/10 p-2 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "TERON AI:" }), " Nossos projetos partem de R$ 60k para MVP. Posso agendar uma call com o Thomas amanhã às 14h?"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mt-4 w-full rounded-md border border-border bg-background py-1.5 text-[12.5px] hover:bg-accent",
							children: "Configurar prompts do chat"
						})
					]
				})]
			})
		]
	});
}
function Card({ icon: Icon, label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-medium",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl font-semibold text-foreground",
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
export { MarketingPage as component };
