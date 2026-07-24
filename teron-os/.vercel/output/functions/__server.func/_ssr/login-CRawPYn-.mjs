import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as TeronWordmark } from "./logo--ScwVAlm.mjs";
import { Kt as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as createSsrRpc, t as Route } from "./createSsrRpc-BHO4XINC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CRawPYn-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var loginUserFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("1e7399ac961726409e2b89aebb9a4ad7b568ae81140b88344569fbabf0beeab8"));
var registerUserFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("1671ccb79f47d4902512efc4ee15bd5066fe06fd23ccac9eae33d49f986cca98"));
var verifySessionFn = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("93c407dcab07e0b4d10e9662c000461e960f7aebf301e7f4c28ac76c5d0ce817"));
createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c00304768c0b012991436b094541087a9fd31b5291bd9c159b7cd5e9c26e5c93"));
function safeNext(next) {
	if (!next) return "/app";
	if (!next.startsWith("/") || next.startsWith("//")) return "/app";
	return next;
}
function LoginPage() {
	useNavigate();
	const { next } = Route.useSearch();
	const target = safeNext(next);
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const token = typeof window !== "undefined" ? localStorage.getItem("teron_auth_token") : null;
		if (token) verifySessionFn({ data: { token } }).then((user) => {
			if (!cancelled && user) window.location.replace(target);
		});
		return () => {
			cancelled = true;
		};
	}, [target]);
	async function handleEmail(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		setNotice(null);
		try {
			if (mode === "signup") {
				const res = await registerUserFn({ data: {
					email,
					password
				} });
				if (!res.success) {
					setError(res.error);
					return;
				}
				localStorage.setItem("teron_auth_token", res.token);
				setNotice("Conta criada com sucesso! Redirecionando...");
				setTimeout(() => window.location.replace(target), 800);
			} else {
				const res = await loginUserFn({ data: {
					email,
					password
				} });
				if (!res.success) {
					setError(res.error);
					return;
				}
				localStorage.setItem("teron_auth_token", res.token);
				window.location.replace(target);
				return;
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden overflow-hidden border-r border-border/70 bg-sidebar lg:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 teron-grid opacity-40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 teron-glow opacity-60" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-full flex-col justify-between p-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronWordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md font-display text-2xl font-medium leading-snug text-foreground",
						children: "\"A TERON é a ferramenta que faltava para a gestão de estúdios. Simplifica processos, organiza o fluxo de trabalho e melhora a comunicação com os clientes.\""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "Thomas Eduardo · Desenvolvedor"
					})] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mb-10 inline-block lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronWordmark, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold tracking-tight",
						children: mode === "signin" ? "Bem-vindo de volta" : "Criar sua conta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: mode === "signin" ? "Entre no seu workspace TERON." : "Configure seu workspace TERON em segundos."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "space-y-3",
							onSubmit: handleEmail,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-[12px] font-medium text-foreground",
									children: "E-mail"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "voce@estudio.com",
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/30"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-1.5 flex items-center justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[12px] font-medium text-foreground",
										children: "Senha"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									minLength: 6,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "••••••••",
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
								})] }),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "rounded-md bg-destructive/10 p-2 text-[12px] text-destructive",
									children: error
								}),
								notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-md bg-muted/40 p-2 text-[12px] text-muted-foreground",
									children: notice
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: busy,
									className: "mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90",
									children: [
										mode === "signin" ? "Entrar no workspace" : "Criar workspace",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-center text-[12px] text-muted-foreground",
							children: mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Ainda não tem conta?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setMode("signup"),
									className: "text-foreground hover:underline",
									children: "Criar workspace"
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Já tem uma conta?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setMode("signin"),
									className: "text-foreground hover:underline",
									children: "Entrar"
								})
							] })
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { LoginPage as component };
