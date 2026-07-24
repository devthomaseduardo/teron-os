import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TeronWordmark } from "./logo--ScwVAlm.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { Bt as ArrowUpRight, C as Scale, D as Receipt, Dt as CircleCheck, F as MessageSquare, J as Heart, Lt as BookOpen, St as Clock, Vt as ArrowRight, f as Timer, g as Sparkles, h as SquareCheckBig, j as Pause, lt as FilePenLine, ot as FileText, rt as FolderKanban, t as Zap, yt as Command } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-evK-dmk7.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground selection:bg-primary/25",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BgGrid, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Manifesto, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalComercial, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulesGrid, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntelligentTimeline, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AISection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeforeAfter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCta, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function BgGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 -z-10 opacity-[0.35]",
		style: { backgroundImage: "radial-gradient(circle at 20% 0%, oklch(0.28 0.06 260 / 0.35), transparent 55%), radial-gradient(circle at 90% 10%, oklch(0.3 0.08 320 / 0.25), transparent 50%)" }
	});
}
function TopNav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center gap-6 px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronWordmark, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-6 text-sm text-muted-foreground md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#portal",
							className: "hover:text-foreground",
							children: "Portal Comercial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#modulos",
							className: "hover:text-foreground",
							children: "Módulos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#ia",
							className: "hover:text-foreground",
							children: "IA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#processo",
							className: "hover:text-foreground",
							children: "Processo"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/login",
						className: "hidden text-[13px] text-muted-foreground hover:text-foreground sm:inline-flex",
						children: "Entrar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/proposta/$id",
						params: { id: "abc123" },
						className: "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90",
						children: ["Ver proposta demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
					})]
				})
			]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-emerald-400" }), "TERON OS · v1 em construção"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl",
					children: ["O sistema operacional para empresas que constroem ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent",
						children: "produtos digitais."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl",
					children: "Chega de WhatsApp, PDFs, planilhas e cobranças manuais. TERON OS unifica proposta, contrato, onboarding, execução, aprovações, escopo, financeiro e comunicação em uma única plataforma inteligente."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/proposta/$id",
							params: { id: "abc123" },
							className: "group inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:gap-3",
							children: ["Abrir uma proposta interativa ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app",
							className: "inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-4 py-2.5 text-sm text-foreground backdrop-blur hover:bg-card",
							children: "Ver o Workspace"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-2 hidden items-center gap-1.5 text-[12px] text-muted-foreground sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "size-3" }), " K para abrir a paleta"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroPreview, {})
			]
		})
	});
}
function HeroPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-16 overflow-hidden rounded-xl border border-border bg-card/60 shadow-2xl shadow-black/40 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border/60 px-4 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-muted-foreground/25" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-muted-foreground/25" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-muted-foreground/25" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex items-center gap-1.5 rounded-md border border-border/60 bg-background/50 px-3 py-1 text-[11px] text-muted-foreground",
				children: "teron.os / workspace / hoje"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 p-5 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreviewCard, {
					title: "Cronograma pausado",
					tone: "warning",
					icon: Pause,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] text-muted-foreground",
						children: "Pallas Studio · 7 dias sem enviar materiais."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-muted-foreground/70",
						children: "Retomará automaticamente após aprovação."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreviewCard, {
					title: "Fora do escopo detectado",
					tone: "info",
					icon: Scale,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] text-muted-foreground",
						children: "Meridian · Módulo de simulação."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-primary",
						children: "IA sugere: gerar orçamento complementar"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreviewCard, {
					title: "Fatura vencida há 3 dias",
					tone: "danger",
					icon: Receipt,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] text-muted-foreground",
						children: "Aurora Health · R$ 12.400"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-muted-foreground/70",
						children: "Multa + juros aplicados automaticamente"
					})]
				})
			]
		})]
	});
}
function PreviewCard({ title, tone, icon: Icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border/70 bg-background/40 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-2 text-[12px] font-medium text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }),
					" ",
					title
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
				tone,
				dot: true,
				children: tone === "danger" ? "crítico" : tone === "warning" ? "pausado" : "IA"
			})]
		}), children]
	});
}
function Manifesto() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border/60 bg-card/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground",
					children: "Manifesto"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl",
					children: "Estamos substituindo tudo o que empresas de serviço digital ainda fazem à mão."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-muted-foreground",
					children: "Toda a operação — do primeiro contato ao pós-venda — acontece dentro do TERON OS. Sem improvisos, sem retrabalho, sem \"onde foi que eu salvei aquilo?\"."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: [
						"WhatsApp para gestão de projetos",
						"PDFs por e-mail",
						"Contratos manuais",
						"Planilhas",
						"Cobranças no dedo",
						"Cronogramas em post-its",
						"Arquivos espalhados",
						"Aprovações por mensagem"
					].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "group relative rounded-lg border border-border/60 bg-background/40 p-4 text-[13px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute right-3 top-3 text-[10px] font-medium uppercase tracking-wider text-emerald-400/80",
							children: "Eliminado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "line-through decoration-red-400/40 decoration-2",
							children: k
						})]
					}, k))
				})
			]
		})
	});
}
function PortalComercial() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "portal",
		className: "border-t border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-6 py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground",
						children: "Portal Comercial"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl",
						children: "Uma proposta nunca mais será um PDF."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground",
						children: "Envie apenas um link. O cliente entra em uma jornada guiada, elegante, com identidade da sua empresa — não em um anexo esquecido no e-mail."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-3 text-[14px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
								icon: FilePenLine,
								title: "Aceite digital",
								children: "Contrato assinado sem impressora, sem PDF, sem fricção."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
								icon: Receipt,
								title: "Pagamento em um clique",
								children: "Cartão, PIX ou boleto. Projeto criado automaticamente após confirmação."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
								icon: Sparkles,
								title: "Experiência premium",
								children: "Cada etapa parece o onboarding de um produto SaaS internacional."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/proposta/$id",
						params: { id: "abc123" },
						className: "mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90",
						children: ["Abrir proposta demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border/70 bg-card/60 p-6 backdrop-blur",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground",
						children: "Jornada do cliente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 space-y-2",
						children: [
							"Boas-vindas",
							"Sobre a TERON",
							"Como trabalhamos",
							"Escopo",
							"Incluso / Não incluso",
							"Cronograma",
							"Área do cliente",
							"Investimento",
							"Políticas",
							"FAQ",
							"Aceite",
							"Contrato",
							"Pagamento",
							"Projeto criado"
						].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-md border border-border/40 bg-background/40 px-3 py-2 text-[13px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-6 shrink-0 place-items-center rounded-full bg-muted/60 font-mono text-[10px] text-muted-foreground",
									children: String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1",
									children: s
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 text-muted-foreground/40" })
							]
						}, s))
					})]
				})]
			})
		})
	});
}
function Feature({ icon: Icon, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid size-8 shrink-0 place-items-center rounded-md border border-border/60 bg-card/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children
		})] })]
	});
}
function ModulesGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "modulos",
		className: "border-t border-border/60 bg-card/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground",
					children: "Módulos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl",
					children: "Doze módulos. Uma operação inteira."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/50 md:grid-cols-2 lg:grid-cols-3",
					children: [
						{
							icon: FileText,
							title: "Portal Comercial",
							desc: "Proposta interativa. Aceite digital. Contrato assinado. Pagamento. Projeto criado — tudo em um link."
						},
						{
							icon: SquareCheckBig,
							title: "Onboarding do Cliente",
							desc: "Checklist obrigatório. Cronograma pausado até receber todos os materiais."
						},
						{
							icon: FolderKanban,
							title: "Centro de Aprovações",
							desc: "Versões, comentários, aprovar ou solicitar alteração. Histórico completo. Nada por WhatsApp."
						},
						{
							icon: Scale,
							title: "Controle de Escopo",
							desc: "Detecta pedidos fora do contrato e gera orçamento complementar automaticamente."
						},
						{
							icon: Clock,
							title: "Controle de Horas",
							desc: "Previstas vs executadas. Produtividade. Cliente enxerga o consumo em tempo real."
						},
						{
							icon: Timer,
							title: "Diário do Projeto",
							desc: "Timeline automática de tudo o que aconteceu. Contrato, pagamento, deploy, entrega."
						},
						{
							icon: MessageSquare,
							title: "Central de Comunicação",
							desc: "Chat por projeto. Mensagens, arquivos, comentários, solicitações. WhatsApp não entra."
						},
						{
							icon: BookOpen,
							title: "Base de Conhecimento",
							desc: "Domínio, servidor, deploy, banco, APIs, licenças, acessos. Nunca mais perca uma senha."
						},
						{
							icon: Heart,
							title: "Health Score do Cliente",
							desc: "Cada cliente recebe uma pontuação. Pagamento, resposta, entrega, risco. Aja antes que quebre."
						},
						{
							icon: Receipt,
							title: "Cobrança Automática",
							desc: "Lembretes antes, no dia e depois. Multa e juros aplicados automaticamente."
						},
						{
							icon: Zap,
							title: "Pós-venda 30/60/90",
							desc: "Satisfação, avaliação, manutenção, upsell. Automatizado do jeito certo."
						},
						{
							icon: Sparkles,
							title: "Assistente de IA",
							desc: "Age como gerente de projetos. Sugere ações. Não apenas responde."
						}
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group bg-background/70 p-6 transition-colors hover:bg-card/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 inline-grid size-9 place-items-center rounded-md border border-border/60 bg-card/60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold tracking-tight text-foreground",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground",
								children: m.desc
							})
						]
					}, m.title))
				})
			]
		})
	});
}
function IntelligentTimeline() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground",
					children: "Cronogramas inteligentes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl",
					children: "O cronograma pausa sozinho quando a bola é do cliente."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-2xl text-muted-foreground",
					children: "Nada de brigar por prazo. O sistema entende automaticamente quem está bloqueando o projeto e comunica isso com clareza — sem ninguém precisar defender atraso."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 rounded-xl border border-border/70 bg-card/60 p-6 backdrop-blur",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Projeto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-semibold",
								children: "Pallas Studio — Rebrand digital"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: "warning",
								dot: true,
								children: "Pausado — aguarda cliente"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-2 overflow-hidden rounded-full bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 w-[44%] bg-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-[44%] w-[6%] bg-amber-400/70" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineStep, {
									label: "Contrato assinado",
									tone: "done",
									when: "há 21 dias"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineStep, {
									label: "Descoberta",
									tone: "done",
									when: "há 12 dias"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineStep, {
									label: "Onboarding",
									tone: "paused",
									when: "7 dias parado",
									note: "Aguardando textos institucionais"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-[13px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: "O prazo será iniciado apenas após o recebimento de todos os materiais."
							}), " Enquanto isso, o projeto permanece no status \"Aguardando Cliente\"."]
						})
					]
				})
			]
		})
	});
}
function TimelineStep({ label, tone, when, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border/50 bg-background/40 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[13px] font-medium",
				children: [tone === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4 text-amber-400" }), label]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11.5px] text-muted-foreground",
				children: when
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11.5px] text-amber-300/80",
				children: note
			})
		]
	});
}
function AISection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "ia",
		className: "border-t border-border/60 bg-card/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-6 py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-16 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground",
						children: "Assistente de IA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl",
						children: "Um gerente de projetos que nunca dorme."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground",
						children: "A IA acompanha todos os projetos, todos os clientes, todos os contratos. Ela não espera você perguntar — ela sugere a próxima ação."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "É o cérebro por trás do TERON OS."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: [
						"O cliente está há 7 dias sem enviar os materiais.",
						"O cronograma será impactado em 5 dias.",
						"A próxima parcela vence amanhã.",
						"Essa solicitação parece estar fora do escopo. Gerar orçamento complementar?",
						"Deseja enviar uma cobrança?",
						"Health Score da Aurora caiu para 62."
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 p-4 backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-primary/15 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[14px] leading-relaxed text-foreground",
							children: s
						})]
					}, s))
				})]
			})
		})
	});
}
function ProcessSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "processo",
		className: "border-t border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground",
					children: "Processo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl",
					children: "Do link enviado à entrega final — tudo dentro do sistema."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2",
					children: [
						"Cliente abre a proposta",
						"Aceita digitalmente",
						"Assina o contrato",
						"Paga a entrada",
						"Recebe acesso ao workspace",
						"Passa pelo onboarding",
						"Envia todos os materiais",
						"Cronograma inicia automaticamente",
						"Executa com aprovações",
						"Recebe entrega + pós-venda automatizado"
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-4 rounded-lg border border-border/60 bg-card/40 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 shrink-0 place-items-center rounded-full border border-border/60 bg-background/60 font-mono text-[11px] text-muted-foreground",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[14px]",
							children: s
						})]
					}, s))
				})
			]
		})
	});
}
function BeforeAfter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border/60 bg-card/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground",
					children: "Antes → Depois"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl",
					children: "A operação inteira, reorganizada."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid grid-cols-1 gap-6 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/60 bg-background/30 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
							children: "Antes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-[14px] text-muted-foreground",
							children: [
								"Proposta em PDF que ninguém abre",
								"WhatsApp com 4 pessoas discutindo escopo",
								"Cronograma no Notion, desatualizado",
								"Cliente cobra prazo mesmo sem enviar material",
								"Fatura esquecida na gaveta",
								"Aprovação por 'ok' no áudio"
							].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-400/70",
									children: "—"
								}), b]
							}, b))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/60 bg-background/60 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium uppercase tracking-wider text-primary",
							children: "Depois"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-[14px] text-foreground",
							children: [
								"Proposta interativa com aceite digital",
								"Chat único por projeto, com histórico",
								"Cronograma vivo, pausa e retoma sozinho",
								"Sistema mostra quem está bloqueando",
								"Cobrança automática com multa e juros",
								"Aprovação registrada, versionada, auditável"
							].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-3.5 shrink-0 text-emerald-400" }), a]
							}, a))
						})]
					})]
				})
			]
		})
	});
}
function FinalCta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-6 py-32 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-semibold tracking-tight sm:text-6xl",
					children: "Pare de operar no improviso."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-6 max-w-xl text-lg text-muted-foreground",
					children: "TERON OS é um novo padrão de operação para empresas de serviços digitais. Feito para durar. Feito para escalar."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/proposta/$id",
						params: { id: "abc123" },
						className: "inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90",
						children: ["Ver proposta interativa ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app",
						className: "inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm hover:bg-card",
						children: "Entrar no workspace"
					})]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border/60 bg-card/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronWordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-muted-foreground",
				children: "© 2026 TERON OS · O sistema operacional para empresas de produto digital."
			})]
		})
	});
}
//#endregion
export { Landing as component };
