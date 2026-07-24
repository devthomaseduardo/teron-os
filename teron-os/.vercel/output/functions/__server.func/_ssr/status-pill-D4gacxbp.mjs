import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as cn } from "./logo--ScwVAlm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-pill-D4gacxbp.js
var import_jsx_runtime = require_jsx_runtime();
var tones = {
	neutral: "bg-muted/60 text-muted-foreground ring-border",
	primary: "bg-primary/10 text-primary ring-primary/20",
	success: "bg-[oklch(0.72_0.15_155_/_12%)] text-[oklch(0.82_0.15_155)] ring-[oklch(0.72_0.15_155_/_25%)]",
	warning: "bg-[oklch(0.8_0.14_78_/_12%)] text-[oklch(0.88_0.14_78)] ring-[oklch(0.8_0.14_78_/_25%)]",
	danger: "bg-[oklch(0.65_0.2_22_/_14%)] text-[oklch(0.78_0.18_22)] ring-[oklch(0.65_0.2_22_/_28%)]",
	info: "bg-[oklch(0.7_0.14_250_/_12%)] text-[oklch(0.82_0.13_250)] ring-[oklch(0.7_0.14_250_/_25%)]"
};
function StatusPill({ tone = "neutral", dot = false, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset", tones[tone], className),
		children: [dot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current" }), children]
	});
}
//#endregion
export { StatusPill as t };
