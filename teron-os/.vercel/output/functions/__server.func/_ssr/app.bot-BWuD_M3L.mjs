import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as cn } from "./logo--ScwVAlm.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { At as CircleCheck, C as Send, Lt as Calendar, M as Plus, O as RefreshCw, R as MessageSquare, Tt as Clock, Vt as Bot, g as Store, h as Tag, j as QrCode, o as Users, v as Sparkles, vt as CreditCard } from "../_libs/lucide-react.mjs";
import { t as WorkspaceShell } from "./workspace-shell-J3B0ra6p.mjs";
import { d as saveShopConfig, f as sendOwnerMessage, l as fetchShopConfig, n as Input, o as fetchMessages, r as Label, s as fetchOwnerDashboard, t as Button, u as fetchWaStatus } from "./bot-api-BbyGxU1p.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.bot-BWuD_M3L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var DEFAULT_DAYS = [
	{
		day: 1,
		label: "Segunda-feira",
		enabled: true,
		openTime: "09:00",
		closeTime: "18:00"
	},
	{
		day: 2,
		label: "Terça-feira",
		enabled: true,
		openTime: "09:00",
		closeTime: "18:00"
	},
	{
		day: 3,
		label: "Quarta-feira",
		enabled: true,
		openTime: "09:00",
		closeTime: "18:00"
	},
	{
		day: 4,
		label: "Quinta-feira",
		enabled: true,
		openTime: "09:00",
		closeTime: "18:00"
	},
	{
		day: 5,
		label: "Sexta-feira",
		enabled: true,
		openTime: "09:00",
		closeTime: "18:00"
	},
	{
		day: 6,
		label: "Sábado",
		enabled: true,
		openTime: "09:00",
		closeTime: "14:00"
	},
	{
		day: 0,
		label: "Domingo",
		enabled: false,
		openTime: "09:00",
		closeTime: "13:00"
	}
];
function WeeklyScheduleEditor({ daysOpen = [
	1,
	2,
	3,
	4,
	5,
	6
], onChange }) {
	const [schedule, setSchedule] = (0, import_react.useState)(() => DEFAULT_DAYS.map((d) => ({
		...d,
		enabled: daysOpen.includes(d.day)
	})));
	const toggleDay = (dayIndex) => {
		const next = schedule.map((d) => d.day === dayIndex ? {
			...d,
			enabled: !d.enabled
		} : d);
		setSchedule(next);
		if (onChange) onChange(next.filter((d) => d.enabled).map((d) => d.day));
	};
	const updateTime = (dayIndex, field, val) => {
		const next = schedule.map((d) => d.day === dayIndex ? {
			...d,
			[field]: val
		} : d);
		setSchedule(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 rounded-xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-sm font-semibold text-foreground",
				children: "Horários de Funcionamento Semanal"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-2.5",
			children: schedule.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3 transition-colors ${item.enabled ? "border-border bg-background" : "border-border/40 bg-muted/20 opacity-60"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: item.enabled,
						onCheckedChange: () => toggleDay(item.day),
						id: `day-switch-${item.day}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: `day-switch-${item.day}`,
						className: "cursor-pointer text-[13px] font-medium",
						children: item.label
					})]
				}), item.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: item.openTime,
							onChange: (e) => updateTime(item.day, "openTime", e.target.value),
							className: "h-8 w-24 text-[12px]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[12px] text-muted-foreground",
							children: "até"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: item.closeTime,
							onChange: (e) => updateTime(item.day, "closeTime", e.target.value),
							className: "h-8 w-24 text-[12px]"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[12px] italic text-muted-foreground",
					children: "Fechado"
				})]
			}, item.day))
		})]
	});
}
function TenantOwnerPage() {
	const [tab, setTab] = (0, import_react.useState)("dashboard");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [dash, setDash] = (0, import_react.useState)(null);
	const [shopConfig, setShopConfig] = (0, import_react.useState)(null);
	const [waStatus, setWaStatus] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [chatInput, setChatInput] = (0, import_react.useState)("");
	const [activeChatId, setActiveChatId] = (0, import_react.useState)("");
	const loadData = async () => {
		try {
			setLoading(true);
			const res = await fetchOwnerDashboard().catch(() => null);
			if (res) setDash(res);
			const cfg = await fetchShopConfig().catch(() => null);
			if (cfg) setShopConfig(cfg);
			const wa = await fetchWaStatus().catch(() => null);
			if (wa) setWaStatus(wa);
			const msgs = await fetchMessages().catch(() => ({ messages: [] }));
			setMessages(msgs.messages || []);
		} catch (err) {
			toast.error("Erro ao carregar dados do painel do dono.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const handleSaveShop = async () => {
		if (!shopConfig) return;
		try {
			await saveShopConfig(shopConfig);
			toast.success("Configurações da empresa salvas com sucesso!");
			await loadData();
		} catch (err) {
			toast.error(`Erro ao salvar empresa: ${err instanceof Error ? err.message : String(err)}`);
		}
	};
	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!chatInput.trim() || !activeChatId) return;
		try {
			await sendOwnerMessage(activeChatId, chatInput.trim());
			toast.success("Mensagem enviada no WhatsApp!");
			setChatInput("");
			const msgs = await fetchMessages(activeChatId).catch(() => ({ messages: [] }));
			setMessages(msgs.messages || []);
		} catch (err) {
			toast.error(`Erro ao enviar mensagem: ${err instanceof Error ? err.message : String(err)}`);
		}
	};
	const labels = dash?.labels || {
		business: "loja",
		professional: "profissional",
		professionals: "equipe",
		service: "serviço",
		services: "serviços",
		booking: "atendimento",
		bookings: "atendimentos",
		client: "cliente"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceShell, {
		eyebrow: `Painel do Cliente · ${dash?.shop?.name || "Empresa do Cliente"}`,
		title: "Painel de Gestão do Proprietário",
		description: "Gerencie sua equipe, horários de atendimento, serviços oferecidos, chave PIX e personalize a IA do WhatsApp.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
				tone: waStatus?.state === "online" ? "success" : "warning",
				dot: true,
				children: waStatus?.state === "online" ? "WhatsApp Online" : "Desconectado"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: loadData,
				disabled: loading,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }), " Atualizar"]
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap border-b border-border mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab("dashboard"),
						className: `flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${tab === "dashboard" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-3.5" }), " Visão Geral"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab("shop"),
						className: `flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${tab === "shop" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2Icon, { className: "size-3.5" }), " Empresa"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab("schedule"),
						className: `flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${tab === "schedule" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), " Horários"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab("team"),
						className: `flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${tab === "team" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
							" Equipe (",
							shopConfig?.barbers?.length || 0,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab("services"),
						className: `flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${tab === "services" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-3.5" }),
							" Serviços (",
							shopConfig?.services?.length || 0,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab("bot"),
						className: `flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${tab === "bot" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3.5" }), " Bot & IA"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab("payments"),
						className: `flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${tab === "payments" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-3.5" }), " PIX & Pagamentos"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab("agenda"),
						className: `flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${tab === "agenda" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }), " Agenda do Dia"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab("chat"),
						className: `flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${tab === "chat" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }), " Conversas WhatsApp"]
					})
				]
			}),
			tab === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Recebido Hoje",
							value: `R$ ${dash?.dayReport?.revenuePaid?.toFixed(2) || "0,00"}`,
							hint: "Confirmados via PIX"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Pendente Hoje",
							value: `R$ ${dash?.dayReport?.revenuePending?.toFixed(2) || "0,00"}`,
							hint: "Aguardando pagamento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Total de Atendimentos",
							value: String(dash?.dayReport?.total || 0),
							hint: "Agendados para hoje"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Fila de Espera",
							value: String(dash?.dayReport?.inQueue || 0),
							hint: "Clientes aguardando"
						})
					]
				})
			}),
			tab === "shop" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl space-y-4 rounded-xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-foreground",
					children: "Dados da Empresa / Loja"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "sName",
							children: "Nome Fantasia da Empresa"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "sName",
							value: shopConfig?.shop?.name || "",
							onChange: (e) => setShopConfig(shopConfig ? {
								...shopConfig,
								shop: {
									...shopConfig.shop,
									name: e.target.value
								}
							} : null)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "sPhone",
							children: "Telefone WhatsApp Comercial"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "sPhone",
							value: shopConfig?.shop?.phone || "",
							onChange: (e) => setShopConfig(shopConfig ? {
								...shopConfig,
								shop: {
									...shopConfig.shop,
									phone: e.target.value
								}
							} : null)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "sAddress",
							children: "Endereço Completo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "sAddress",
							value: shopConfig?.shop?.address || "",
							onChange: (e) => setShopConfig(shopConfig ? {
								...shopConfig,
								shop: {
									...shopConfig.shop,
									address: e.target.value
								}
							} : null)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleSaveShop,
							className: "mt-2",
							children: "Salvar Alterações"
						})
					]
				})]
			}),
			tab === "schedule" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeeklyScheduleEditor, {
					daysOpen: shopConfig?.shop?.daysOpen || [
						1,
						2,
						3,
						4,
						5,
						6
					],
					onChange: (days) => {
						if (shopConfig) setShopConfig({
							...shopConfig,
							shop: {
								...shopConfig.shop,
								daysOpen: days
							}
						});
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSaveShop,
					children: "Salvar Grade de Horários"
				})]
			}),
			tab === "team" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Profissionais / Equipe"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => {
							if (!shopConfig) return;
							const newBarber = {
								id: `b${Date.now()}`,
								name: "Novo Profissional",
								nickname: "Pro",
								specialty: "Geral",
								schedule: { "1": ["09:00", "18:00"] },
								onDuty: true
							};
							setShopConfig({
								...shopConfig,
								barbers: [...shopConfig.barbers, newBarber]
							});
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }),
							" Adicionar ",
							labels.professional
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3 md:grid-cols-3",
					children: (shopConfig?.barbers || []).map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: b.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: b.onDuty !== false ? "success" : "neutral",
								children: b.onDuty !== false ? "Em Expediente" : "Ausente"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Especialidade: ", b.specialty]
						})]
					}, b.id || i))
				})]
			}),
			tab === "services" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Catálogo de Serviços / Ofertas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => {
							if (!shopConfig) return;
							const newServ = {
								id: `s${Date.now()}`,
								name: "Novo Serviço",
								price: 50,
								durationMin: 30
							};
							setShopConfig({
								...shopConfig,
								services: [...shopConfig.services, newServ]
							});
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }),
							" Adicionar ",
							labels.service
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl border border-border bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-muted/30 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Serviço / Procedimento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Duração"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Valor (R$)"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: (shopConfig?.services || []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-medium text-foreground",
									children: s.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: [s.durationMin, " min"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 font-semibold text-foreground",
									children: ["R$ ", s.price.toFixed(2)]
								})
							] }, s.id))
						})]
					})
				})]
			}),
			tab === "bot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-semibold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4 text-primary" }), " Conexão WhatsApp"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-6 text-center",
						children: waStatus?.state === "online" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-10 text-emerald-500 mx-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: "Conectado ao WhatsApp"
							})]
						}) : waStatus?.qrDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: waStatus.qrDataUrl,
							alt: "QR Code",
							className: "size-48 rounded-md"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Carregando status do WhatsApp..."
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), " Personalidade da IA"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "aiPrompt",
							children: "Prompt / Instruções da IA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "aiPrompt",
							rows: 6,
							placeholder: "Ex: Você é o assistente virtual da empresa Thomas. Seja muito cortês, tire dúvidas sobre serviços e ofereça agendamento...",
							className: "text-xs"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => toast.success("Prompt da IA atualizado!"),
							children: "Salvar Prompt"
						})
					]
				})]
			}),
			tab === "payments" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl rounded-xl border border-border bg-card p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Configurar Recebimento via PIX"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "pixKey",
						children: "Chave PIX da Empresa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "pixKey",
						value: shopConfig?.shop?.pixKey || "",
						onChange: (e) => setShopConfig(shopConfig ? {
							...shopConfig,
							shop: {
								...shopConfig.shop,
								pixKey: e.target.value
							}
						} : null)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "pixName",
						children: "Nome do Favorecido (Como aparece no banco)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "pixName",
						value: shopConfig?.shop?.pixName || "",
						onChange: (e) => setShopConfig(shopConfig ? {
							...shopConfig,
							shop: {
								...shopConfig.shop,
								pixName: e.target.value
							}
						} : null)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleSaveShop,
						children: "Salvar Chave PIX"
					})
				]
			}),
			tab === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-semibold text-foreground uppercase tracking-wider",
						children: "Conversas Recentes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1",
						children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground py-4 text-center",
							children: "Nenhuma mensagem gravada ainda."
						}) : Array.from(new Set(messages.map((m) => m.chatId))).map((chatId) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveChatId(chatId),
							className: `w-full rounded-lg p-2.5 text-left text-xs transition-colors ${activeChatId === chatId ? "bg-muted font-medium" : "hover:bg-muted/40"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: chatId
							})
						}, chatId))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2 rounded-xl border border-border bg-card p-4 flex flex-col justify-between h-[450px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 overflow-y-auto pr-2",
						children: messages.filter((m) => !activeChatId || m.chatId === activeChatId).map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `max-w-[80%] rounded-lg p-3 text-xs ${m.sender === "client" ? "bg-muted text-foreground self-start" : "bg-primary text-primary-foreground self-end ml-auto"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-[10px] opacity-70",
								children: m.timestamp ? new Date(m.timestamp).toLocaleTimeString() : ""
							})]
						}, m.id || i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSendMessage,
						className: "flex items-center gap-2 pt-3 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Digite uma mensagem para responder no WhatsApp...",
							value: chatInput,
							onChange: (e) => setChatInput(e.target.value),
							className: "text-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" })
						})]
					})]
				})]
			})
		]
	});
}
function KpiCard({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-2xl font-semibold text-foreground",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: hint
			})
		]
	});
}
function Building2Icon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className });
}
//#endregion
export { TenantOwnerPage as component };
