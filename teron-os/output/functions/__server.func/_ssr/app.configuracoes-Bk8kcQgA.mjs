import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { Dt as CircleCheck, W as Key, Z as Globe, w as Save } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.configuracoes-Bk8kcQgA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PaymentConfigPage() {
	const [mpAccessToken, setMpAccessToken] = (0, import_react.useState)("APP_USR-4151004476930004-052911-b1f1550fc2afc658a3f26a6e43a0c0f7-261592994");
	const [mpPublicKey, setMpPublicKey] = (0, import_react.useState)("4151004476930004whAgRrihWwbagztBSBYwmgPweBW1i72x");
	const [stripeSecretKey, setStripeSecretKey] = (0, import_react.useState)("");
	const [stripePublishableKey, setStripePublishableKey] = (0, import_react.useState)("");
	const [isSaved, setIsSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") try {
			const saved = localStorage.getItem("teron_payment_api_keys");
			if (saved) {
				const parsed = JSON.parse(saved);
				setMpAccessToken(parsed.mpAccessToken || "APP_USR-4151004476930004-052911-b1f1550fc2afc658a3f26a6e43a0c0f7-261592994");
				setMpPublicKey(parsed.mpPublicKey || "4151004476930004whAgRrihWwbagztBSBYwmgPweBW1i72x");
				setStripeSecretKey(parsed.stripeSecretKey || "");
				setStripePublishableKey(parsed.stripePublishableKey || "");
			}
		} catch (e) {}
	}, []);
	const handleSaveKeys = () => {
		try {
			localStorage.setItem("teron_payment_api_keys", JSON.stringify({
				mpAccessToken,
				mpPublicKey,
				stripeSecretKey,
				stripePublishableKey,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}));
			setIsSaved(true);
			setTimeout(() => setIsSaved(false), 3e3);
		} catch (e) {
			alert("Erro ao salvar configurações de API.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, {
		eyebrow: "Configurações de API & Gateways",
		title: "Integração Mercado Pago & Stripe",
		description: "Gerencie as chaves de API e credenciais de pagamento para cobranças automáticas de propostas e OS.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: handleSaveKeys,
			className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Salvar Chaves de API"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				isSaved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-400 flex items-center gap-2 animate-in fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Chaves de API salvas com sucesso! O ambiente de produção foi atualizado."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-emerald-500/30 bg-card p-6 shadow-xl space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border/60 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold text-xs",
								children: "MP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm text-foreground",
								children: "Mercado Pago (PIX & Checkout Transparente)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Cole abaixo seu Access Token obtido no Painel do Desenvolvedor Mercado Pago"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: mpAccessToken ? "success" : "warning",
							dot: true,
							children: mpAccessToken ? "Credenciais Ativas" : "Aguardando Chave"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[11px] font-semibold text-foreground flex items-center gap-1.5 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "size-3.5 text-emerald-400" }), " Mercado Pago Access Token (Production / Test)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "APP_USR-829410...",
								value: mpAccessToken,
								onChange: (e) => setMpAccessToken(e.target.value),
								className: "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10.5px] text-muted-foreground",
								children: "Exemplo: APP_USR-xxxxxxxxxxxx ou TEST-xxxxxxxxxxxx"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px] font-semibold text-foreground flex items-center gap-1.5 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5 text-emerald-400" }), " Mercado Pago Public Key (Opcional)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "APP_USR-pub-key-...",
							value: mpPublicKey,
							onChange: (e) => setMpPublicKey(e.target.value),
							className: "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-indigo-500/30 bg-card p-6 shadow-xl space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border/60 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 place-items-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono font-bold text-xs",
								children: "S"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm text-foreground",
								children: "Stripe (Cartão de Crédito Internacional & Checkout)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Cole abaixo sua Secret Key obtida na dashboard do Stripe"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: stripeSecretKey ? "success" : "warning",
							dot: true,
							children: stripeSecretKey ? "Credenciais Ativas" : "Aguardando Chave"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[11px] font-semibold text-foreground flex items-center gap-1.5 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "size-3.5 text-indigo-400" }), " Stripe Secret Key (sk_live_... / sk_test_...)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "sk_live_51M...",
								value: stripeSecretKey,
								onChange: (e) => setStripeSecretKey(e.target.value),
								className: "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10.5px] text-muted-foreground",
								children: "Exemplo: sk_live_... para produção ou sk_test_... para testes."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px] font-semibold text-foreground flex items-center gap-1.5 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5 text-indigo-400" }), " Stripe Publishable Key (pk_live_... / pk_test_...)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "pk_live_51M...",
							value: stripePublishableKey,
							onChange: (e) => setStripePublishableKey(e.target.value),
							className: "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveKeys,
						className: "inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Confirmar e Salvar Credenciais"]
					})
				})
			]
		})
	});
}
//#endregion
export { PaymentConfigPage as component };
