import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo--ScwVAlm.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var teron_logo_png_asset_default = {
	asset_id: "d0592cd4-0871-4236-8a64-bb376c6242e6",
	content_type: "image/png",
	created_at: "2026-07-09T23:41:08Z",
	original_filename: "teron-logo.png",
	project_id: "32d861c8-e3dc-4895-a60f-b016e7eaaf23",
	r2_key: "a/v1/32d861c8-e3dc-4895-a60f-b016e7eaaf23/d0592cd4-0871-4236-8a64-bb376c6242e6/teron-logo.png",
	size: 283820,
	url: "/__l5e/assets-v1/d0592cd4-0871-4236-8a64-bb376c6242e6/teron-logo.png",
	version: 1
};
function TeronMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: teron_logo_png_asset_default.url,
		alt: "TERON",
		className: cn("h-7 w-7 rounded-md object-contain", className)
	});
}
function TeronWordmark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-display text-[15px] font-semibold tracking-tight text-foreground",
			children: ["TERON", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground/70",
				children: " OS"
			})]
		})]
	});
}
//#endregion
export { cn as n, TeronWordmark as t };
