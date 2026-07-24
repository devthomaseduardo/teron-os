import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { H as LoaderCircle, it as Funnel, w as Search } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.projetos-JGhuJSJz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusMap = {
	onboarding: {
		label: "Onboarding",
		tone: "warning"
	},
	em_andamento: {
		label: "Em andamento",
		tone: "success"
	},
	pausado: {
		label: "Pausado",
		tone: "danger"
	},
	concluido: {
		label: "Concluído",
		tone: "neutral"
	},
	cancelado: {
		label: "Cancelado",
		tone: "danger"
	}
};
function ProjectsPage() {
	const [projects, setProjects] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [q, setQ] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const load = async () => {
		try {
			const data = await (await fetch("/api/projects")).json();
			if (data.success) {
				setProjects(data.projects || []);
				setError(null);
			} else {
				setError(data.error || "Falha");
				setProjects([]);
			}
		} catch {
			setError("API indisponível");
			setProjects([]);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
		const t = setInterval(load, 2e4);
		return () => clearInterval(t);
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		const s = q.toLowerCase();
		return projects.filter((p) => p.title.toLowerCase().includes(s) || p.clientName.toLowerCase().includes(s) || (p.clientCompany || "").toLowerCase().includes(s));
	}, [projects, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Operação",
		title: "Projetos",
		description: "Projetos reais criados após aceite da proposta. Lista vazia até o primeiro fechamento.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 items-center gap-2 rounded-md border border-input bg-card px-3 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar projeto ou cliente…",
					className: "w-full bg-transparent text-[13px] outline-none"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-[12px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-3.5" }), " Filtros"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-card",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Carregando..."]
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-16 text-center text-sm text-amber-400",
				children: error
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-16 text-center text-sm text-muted-foreground px-4",
				children: "Nenhum projeto ainda. Quando o cliente aceitar uma proposta, o Project aparece aqui com link da workstation."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2.5 text-left font-medium",
							children: "Projeto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Cliente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "Checklist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-right font-medium",
							children: "Budget"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-right font-medium",
							children: "Workstation"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((p) => {
					const s = statusMap[p.status] || {
						label: p.status,
						tone: "neutral"
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70 text-[13px] last:border-0 hover:bg-muted/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-3 font-medium",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: p.clientCompany || p.clientName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: s.tone,
									dot: true,
									children: s.label
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex w-36 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1 flex-1 rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-foreground",
											style: { width: `${p.progress}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: [
											p.checklistDone,
											"/",
											p.checklistTotal
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right font-mono text-[12px]",
								children: currency(p.budget)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right",
								children: p.clientAccessToken && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `/cliente/onboarding/${p.clientAccessToken}`,
									target: "_blank",
									rel: "noreferrer",
									className: "text-xs text-primary font-medium hover:underline",
									children: "Abrir"
								})
							})
						]
					}, p.id);
				}) })]
			})
		})]
	});
}
//#endregion
export { ProjectsPage as component };
