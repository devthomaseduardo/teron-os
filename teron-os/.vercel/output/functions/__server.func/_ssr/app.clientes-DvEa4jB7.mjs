import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { H as LoaderCircle, w as Search } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.clientes-DvEa4jB7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientsPage() {
	const [clients, setClients] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const load = async () => {
			try {
				const [projRes, leadRes] = await Promise.all([fetch("/api/projects"), fetch("/api/leads")]);
				const projData = await projRes.json();
				const leadData = await leadRes.json();
				const map = /* @__PURE__ */ new Map();
				for (const p of projData.projects || []) {
					const key = (p.clientCompany || p.clientName || p.id).toLowerCase();
					const existing = map.get(key);
					const name = p.clientCompany || p.clientName || "Cliente";
					const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
					if (existing) {
						existing.projects += 1;
						existing.budget += p.budget || 0;
					} else map.set(key, {
						key,
						name,
						contact: p.clientName || "",
						email: p.clientEmail || p.lead?.email || "",
						projects: 1,
						budget: p.budget || 0,
						status: p.status === "onboarding" ? "onboarding" : "ativo",
						initials,
						token: p.clientAccessToken
					});
				}
				for (const l of leadData.leads || []) {
					if (l.status !== "aceita" && l.intent === "recrutador") continue;
					const company = l.company || l.name;
					const key = company.toLowerCase();
					if (map.has(key)) continue;
					if (!l.company && l.status === "novo") continue;
					if (!l.proposal && l.status !== "aceita") continue;
					map.set(key, {
						key,
						name: company,
						contact: l.name,
						email: l.email || "",
						projects: 0,
						budget: l.estimatedValue || 0,
						status: l.status === "aceita" ? "ativo" : "onboarding",
						initials: company.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
					});
				}
				setClients(Array.from(map.values()));
			} catch {
				setClients([]);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		const s = q.toLowerCase();
		return clients.filter((c) => c.name.toLowerCase().includes(s) || c.contact.toLowerCase().includes(s) || c.email.toLowerCase().includes(s));
	}, [clients, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: "Comercial",
		title: "Clientes",
		description: "Derivados de projetos e leads reais. Lista vazia até o primeiro fechamento.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2 rounded-md border border-input bg-card px-3 py-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Buscar cliente…",
				className: "w-full bg-transparent text-[13px] outline-none"
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Carregando..."]
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-16 text-center text-sm text-muted-foreground",
			children: "Nenhum cliente ainda. Eles aparecem quando houver projeto ou proposta aceita."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3",
			children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 place-items-center rounded-md bg-gradient-to-br from-[oklch(0.7_0.14_250)] to-[oklch(0.68_0.2_320)] text-[13px] font-semibold text-white",
								children: c.initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-[15px] font-semibold",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: c.contact
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: c.status === "ativo" ? "success" : "info",
							dot: true,
							children: c.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Projetos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 font-display text-base font-semibold",
								children: c.projects
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Budget"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 font-display text-base font-semibold",
								children: currency(c.budget)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Contato"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[11px] truncate",
								children: c.email || "—"
							})] })
						]
					}),
					c.token && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `/cliente/onboarding/${c.token}`,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-4 block text-center text-xs text-primary font-medium hover:underline",
						children: "Abrir workstation"
					})
				]
			}, c.key))
		})]
	});
}
//#endregion
export { ClientsPage as component };
