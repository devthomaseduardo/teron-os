import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as TeronWordmark } from "./logo--ScwVAlm.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { H as LoaderCircle, N as Phone, R as MessageSquare, Rt as Building, V as Mail, Vt as Bot, lt as FileText, n as X, o as Users, v as Sparkles, w as Search, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.leads-DgsjQfi_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLeadsDashboard() {
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [selectedLead, setSelectedLead] = (0, import_react.useState)(null);
	const [leads, setLeads] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const load = async () => {
		try {
			const data = await (await fetch("/api/leads")).json();
			if (data.success) {
				setLeads(data.leads || []);
				setError(null);
			} else {
				setLeads([]);
				setError(data.error || "Falha ao carregar");
			}
		} catch {
			setLeads([]);
			setError("API indisponível — confira o banco e a migration");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
		const interval = setInterval(load, 15e3);
		return () => clearInterval(interval);
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		const q = searchTerm.toLowerCase();
		return leads.filter((l) => l.name.toLowerCase().includes(q) || (l.company || "").toLowerCase().includes(q) || (l.email || "").toLowerCase().includes(q));
	}, [leads, searchTerm]);
	const signed = leads.filter((l) => l.proposal?.status === "aceita" || l.status === "aceita").length;
	const viewed = leads.filter((l) => l.proposal?.viewedAt).length;
	const pipeline = leads.reduce((s, l) => s + (l.estimatedValue || 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border/60 bg-background/85 backdrop-blur-xl sticky top-0 z-30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronWordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground hidden sm:inline",
							children: "Leads reais do bot e da OS"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-medium text-emerald-400 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3.5" }), " Fonte: PostgreSQL"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-6 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-bold tracking-tight",
							children: "Leads"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Dados vindos do WhatsApp e da API. Lista vazia até o primeiro lead real."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Buscar...",
								value: searchTerm,
								onChange: (e) => setSearchTerm(e.target.value),
								className: "rounded-lg border border-border/60 bg-card/60 pl-9 pr-4 py-2 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-primary"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Total de leads",
								value: String(leads.length),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-blue-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Propostas visualizadas",
								value: String(viewed),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-amber-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Aceitas",
								value: String(signed),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Pipeline",
								value: currency(pipeline),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-purple-400" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-xl border border-border/60 bg-card/40 overflow-hidden",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Carregando leads..."]
						}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-16 text-center text-sm text-amber-400",
							children: error
						}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-16 text-center text-sm text-muted-foreground",
							children: "Nenhum lead ainda. Quando o bot enviar o primeiro orçamento, ele aparece aqui."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border/60 bg-card/80 text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-semibold",
											children: "Cliente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-semibold",
											children: "Projeto / Intent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-semibold",
											children: "Valor"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-semibold",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-semibold text-right",
											children: "Ações"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/60",
									children: filtered.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-card/60 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-5 py-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold",
													children: lead.company || lead.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-muted-foreground text-[11px]",
													children: [
														lead.name,
														" · ",
														lead.email || "sem e-mail"
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-5 py-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium",
													children: lead.projectType || "—"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-muted-foreground",
													children: [
														lead.intent || lead.source,
														" · ",
														new Date(lead.createdAt).toLocaleString("pt-BR")
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-4 font-mono font-semibold",
												children: currency(lead.estimatedValue)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
														tone: "info",
														dot: true,
														children: lead.status
													}), lead.proposal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
														tone: lead.proposal.status === "aceita" ? "success" : lead.proposal.viewedAt ? "warning" : "neutral",
														dot: true,
														children: lead.proposal.status
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-4 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-end gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setSelectedLead(lead),
														className: "inline-flex items-center gap-1 rounded-md border border-border/60 px-2.5 py-1.5 text-[11px] hover:border-primary",
														children: ["Detalhes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3" })]
													}), lead.proposal?.publicToken && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: `/proposta/${lead.proposal.publicToken}`,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground",
														children: "Proposta"
													})]
												})
											})
										]
									}, lead.id))
								})]
							})
						})
					})
				]
			}),
			selectedLead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-xl rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: selectedLead.company || selectedLead.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: selectedLead.intent || selectedLead.source
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedLead(null),
								className: "p-1.5 text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/60 p-3 space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase",
										children: "Contato"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: selectedLead.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }),
											" ",
											selectedLead.email || "—"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3" }),
											" ",
											selectedLead.phone || "—"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/60 p-3 space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase",
										children: "Valor / prazo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono font-bold text-emerald-400",
										children: currency(selectedLead.estimatedValue)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground",
										children: ["Prazo: ", selectedLead.deadline || "—"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/40 p-4 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-mono text-primary font-bold uppercase",
								children: "Briefing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed",
								children: selectedLead.briefing || "Sem detalhes."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-border/60 pt-4",
							children: [selectedLead.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" }), " WhatsApp"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedLead(null),
								className: "text-xs text-muted-foreground",
								children: "Fechar"
							})]
						})
					]
				})
			})
		]
	});
}
function Metric({ label, value, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border/60 bg-card/40 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), icon]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-2xl font-bold",
			children: value
		})]
	});
}
//#endregion
export { AdminLeadsDashboard as component };
