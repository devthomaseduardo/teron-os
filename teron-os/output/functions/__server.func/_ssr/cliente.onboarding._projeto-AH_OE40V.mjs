import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { m as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TeronWordmark } from "./logo--ScwVAlm.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { Dt as CircleCheck, F as MessageSquare, St as Clock, l as TriangleAlert, n as X, s as Upload, ut as FileCheck, v as ShieldAlert, xt as CloudUpload, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cliente.onboarding._projeto-AH_OE40V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WorkstationPage() {
	const { projeto } = useParams({ from: "/cliente/onboarding/$projeto" });
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [activeUpload, setActiveUpload] = (0, import_react.useState)(null);
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [showSupport, setShowSupport] = (0, import_react.useState)(false);
	const load = (0, import_react.useCallback)(async () => {
		try {
			const res = await fetch(`/api/project/${encodeURIComponent(projeto)}`);
			if (res.status === 404) {
				setError("Projeto não encontrado. Use o link enviado na proposta.");
				setData(null);
				return;
			}
			if (!res.ok) {
				setError("Não foi possível carregar a workstation.");
				setData(null);
				return;
			}
			const json = await res.json();
			setData(json);
			setError(null);
		} catch {
			setError("Falha de rede");
			setData(null);
		} finally {
			setLoading(false);
		}
	}, [projeto]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const markDone = async () => {
		if (!activeUpload) return;
		setSaving(true);
		try {
			if ((await fetch(`/api/project/${encodeURIComponent(projeto)}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					checklistItemId: activeUpload.id,
					done: true,
					fileName: fileName || `arquivo-${activeUpload.id}`
				})
			})).ok) {
				await load();
				setActiveUpload(null);
				setFileName("");
			}
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center gap-3 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Carregando workstation..."
		})]
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-10 text-amber-400" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Workstation indispon\\u00edvel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground max-w-md",
				children: error
			})
		]
	});
	const checklist = data.portal.checklist || [];
	const required = checklist.filter((c) => c.required !== false);
	const requiredDone = required.filter((c) => c.done).length;
	const isBlocked = data.requiredProgress < 100;
	const company = data.clientCompany || data.lead?.company || data.clientName;
	const contact = data.clientName || data.lead?.name || "Cliente";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronWordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden text-xs text-muted-foreground sm:inline",
							children: ["Workstation · ", data.title]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
						tone: isBlocked ? "warning" : "success",
						dot: true,
						children: data.status
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-6 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-bold tracking-tight sm:text-4xl",
						children: data.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground max-w-2xl",
						children: "Envie os materiais obrigat\\u00f3rios. Quando 100% estiverem ok, o cronograma segue em andamento — e o painel admin v\\u00ea a mesma atualiza\\u00e7\\u00e3o."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-2xl border border-primary/30 bg-card/80 p-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/60 pb-3 flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary font-bold text-sm",
									children: "Cliente e briefing"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: "info",
									dot: true,
									children: data.proposal?.status || data.status
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										label: "Respons\\u00e1vel",
										value: contact,
										sub: company
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										label: "E-mail",
										value: data.clientEmail || data.lead?.email || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										label: "Escopo",
										value: data.lead?.projectType || data.title,
										sub: data.deadline || data.lead?.deadline || ""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										label: "Investimento",
										value: currency(data.budget || data.proposal?.amount || 0),
										sub: "Registrado no contrato"
									})
								]
							}),
							(data.description || data.lead?.briefing) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/40 bg-background/40 p-4 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono text-muted-foreground uppercase",
									children: "Briefing"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 leading-relaxed",
									children: data.description || data.lead?.briefing
								})]
							})
						]
					}),
					isBlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/20 text-amber-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-semibold text-base",
										children: [
											"Aguardando materiais (",
											data.requiredProgress,
											"%)"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-xs text-muted-foreground",
										children: "O prazo oficial conta a partir de 100% dos itens obrigat\\u00f3rios enviados."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex-1 h-2.5 rounded-full bg-background/80 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-amber-400 transition-all rounded-full",
												style: { width: `${data.requiredProgress}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs font-bold text-amber-400",
											children: [
												requiredDone,
												"/",
												required.length
											]
										})]
									})
								]
							})]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-6 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "Materiais completos — projeto em andamento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Checklist sincronizado com o painel admin."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-2 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-xl font-bold flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "size-5 text-primary" }), " Checklist de materiais"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: checklist.map((item) => {
									const done = Boolean(item.done);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-5 ${done ? "border-emerald-500/30 bg-card/40" : "border-border/60 bg-card/80"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `grid size-8 shrink-0 place-items-center rounded-full border mt-0.5 ${done ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-400" : "border-border/60 bg-background text-muted-foreground"}`,
												children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 flex-wrap",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm font-semibold",
														children: item.label
													}), item.required !== false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-amber-400",
														children: "Obrigat\\u00f3rio"
													})]
												}),
												item.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-xs text-muted-foreground",
													children: item.hint
												}),
												item.fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-2 font-mono text-[11px] text-emerald-400",
													children: ["Arquivo: ", item.fileName]
												})
											] })]
										}), !done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveUpload(item);
												setFileName(`material-${item.id}`);
											},
											className: "inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground self-end sm:self-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), " Marcar enviado"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											tone: "success",
											dot: true,
											children: "OK"
										})]
									}, item.id);
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border/60 bg-card/40 p-5 space-y-3 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-sm border-b border-border/60 pb-3",
										children: "Resumo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Status",
										v: data.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Progresso",
										v: `${data.progress}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Prazo",
										v: data.deadline || data.lead?.deadline || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Or\\u00e7amento",
										v: currency(data.budget || 0)
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-semibold text-sm flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4 text-primary" }), " Precisa de ajuda?"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Fale com o time sobre materiais ou prazos."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setShowSupport(true),
										className: "w-full rounded-lg bg-primary py-2.5 text-xs font-semibold text-primary-foreground",
										children: "Abrir suporte"
									})
								]
							})]
						})]
					})
				]
			}),
			activeUpload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-sm",
									children: "Registrar material"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Sincroniza com o painel admin"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveUpload(null),
								className: "p-1.5 text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold",
							children: activeUpload.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Nome do arquivo",
							value: fileName,
							onChange: (e) => setFileName(e.target.value),
							className: "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs font-mono"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveUpload(null),
								className: "text-xs text-muted-foreground px-4 py-2",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: markDone,
								disabled: saving,
								className: "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50",
								children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), "Confirmar envio"]
							})]
						})
					]
				})
			}),
			showSupport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-primary/30 bg-card p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "Suporte"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Em produ\\u00e7\\u00e3o este modal abre chamado. Por enquanto use o WhatsApp do time ou o bot."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowSupport(false),
							className: "w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground",
							children: "Fechar"
						})
					]
				})
			})
		]
	});
}
function Info({ label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-sm",
				children: value
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: sub
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between border-b border-border/30 pb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: v
		})]
	});
}
//#endregion
export { WorkstationPage as component };
