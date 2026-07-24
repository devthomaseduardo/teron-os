import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { _t as Download, ft as FilePenLine } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.contratos-BmiMvhgu.js
var import_jsx_runtime = require_jsx_runtime();
var contracts = [
	{
		id: "CT-2026-014",
		client: "Meridian Capital",
		version: "v3",
		signedAt: "22/06/2026",
		tone: "success",
		label: "Assinado"
	},
	{
		id: "CT-2026-013",
		client: "Aurora Health",
		version: "v1",
		signedAt: "24/06/2026",
		tone: "success",
		label: "Assinado"
	},
	{
		id: "CT-2026-015",
		client: "Nordica Motors",
		version: "v1",
		signedAt: "—",
		tone: "warning",
		label: "Aguardando assinatura"
	},
	{
		id: "CT-2026-012",
		client: "Pallas Studio",
		version: "v2",
		signedAt: "18/06/2026",
		tone: "success",
		label: "Assinado"
	},
	{
		id: "CT-2026-011",
		client: "Lyra Labs",
		version: "v1",
		signedAt: "12/05/2026",
		tone: "neutral",
		label: "Encerrado"
	}
];
function ContractsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: "Comercial",
		title: "Contratos",
		description: "Assinatura digital, versões e histórico auditável.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "size-3.5" }), " Novo contrato"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: contracts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-md border border-border bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "size-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13.5px] font-medium",
							children: c.client
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-muted-foreground",
							children: [
								c.id,
								" · ",
								c.version
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[12px] text-muted-foreground",
							children: ["Assinado ", c.signedAt]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: c.tone,
							dot: true,
							children: c.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex items-center gap-1 rounded-md border border-input bg-background px-2.5 py-1 text-[11.5px] text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), " PDF"]
						})
					]
				}, c.id))
			})
		})
	});
}
//#endregion
export { ContractsPage as component };
