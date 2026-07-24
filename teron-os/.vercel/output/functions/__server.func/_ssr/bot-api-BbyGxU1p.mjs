import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./logo--ScwVAlm.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bot-api-BbyGxU1p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
/**
* Cliente API tipado para o ecossistema Teron OS Bot.
* Conecta o frontend React ao backend HTTP do Bot (porta 8787 ou /api).
*/
var BOT_API_BASE = typeof window !== "undefined" && window.location.port === "3005" ? "http://localhost:8787" : "";
function getAdminToken() {
	if (typeof window === "undefined") return "admin-dev";
	return localStorage.getItem("admin_token") || localStorage.getItem("panel_token") || "admin-dev";
}
function getOwnerToken() {
	if (typeof window === "undefined") return "teron-dev";
	return localStorage.getItem("panel_token") || "teron-dev";
}
async function request(path, options = {}, tokenType = "owner") {
	const token = tokenType === "admin" ? getAdminToken() : getOwnerToken();
	const url = `${BOT_API_BASE}${path}`;
	const res = await fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			...options.headers || {}
		}
	});
	if (!res.ok) {
		const errorText = await res.text().catch(() => res.statusText);
		throw new Error(errorText || `Erro na requisição HTTP ${res.status}`);
	}
	return res.json();
}
async function fetchPlatformOverview() {
	return request("/api/admin/overview", {}, "admin");
}
async function createTenant(data) {
	return request("/api/admin/tenants", {
		method: "POST",
		body: JSON.stringify(data)
	}, "admin");
}
async function updateTenant(id, patch) {
	return request(`/api/admin/tenants/${id}`, {
		method: "PATCH",
		body: JSON.stringify(patch)
	}, "admin");
}
async function deleteTenant(id) {
	return request(`/api/admin/tenants/${id}`, { method: "DELETE" }, "admin");
}
async function fetchShopConfig() {
	return request("/api/admin/shop-config", {}, "owner");
}
async function saveShopConfig(config) {
	return request("/api/setup/shop", {
		method: "POST",
		body: JSON.stringify(config)
	}, "owner");
}
async function fetchWaStatus() {
	return request("/api/wa/status", {}, "owner");
}
async function fetchMessages(chatId) {
	return request(`/api/messages${chatId ? `?chatId=${encodeURIComponent(chatId)}` : ""}`, {}, "owner");
}
async function sendOwnerMessage(chatId, text) {
	return request("/api/teron/send-message", {
		method: "POST",
		body: JSON.stringify({
			chatId,
			text
		})
	}, "owner");
}
async function fetchOwnerDashboard() {
	return request("/api/me", {}, "owner");
}
//#endregion
export { deleteTenant as a, fetchPlatformOverview as c, saveShopConfig as d, sendOwnerMessage as f, createTenant as i, fetchShopConfig as l, Input as n, fetchMessages as o, updateTenant as p, Label as r, fetchOwnerDashboard as s, Button as t, fetchWaStatus as u };
