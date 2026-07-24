import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TeronWordmark } from "./logo--ScwVAlm.mjs";
import { t as StatusPill } from "./status-pill-D4gacxbp.mjs";
import { $ as GitBranch, At as Check, Dt as CircleCheck, F as MessageSquare, Q as Github, Rt as Bell, St as Clock, T as Rocket, Ut as Activity, Vt as ArrowRight, Z as Globe, _ as ShieldCheck, bt as CodeXml, it as FolderGit2, lt as FilePenLine, mt as Download, n as X, ot as FileText, pt as ExternalLink, s as Upload, v as ShieldAlert, xt as CloudUpload } from "../_libs/lucide-react.mjs";
import { i as currency } from "./teron-data-DgNe-Q7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cliente-Bf4XkmFe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var repoCommits = [
	{
		hash: "8f2a1b9",
		message: "feat(b2b): inicializa arquitetura base no repositório teron-studio",
		author: "Thomas Squad Lead",
		time: "há 10 min",
		branch: "main"
	},
	{
		hash: "4c9d8e7",
		message: "chore(config): configura rotas, vite server e pipeline CI/CD",
		author: "Dev Team",
		time: "há 1 hora",
		branch: "main"
	},
	{
		hash: "1a3b5c7",
		message: "docs(readme): adiciona especificações da Workstation B2B",
		author: "Product Owner",
		time: "há 3 horas",
		branch: "main"
	}
];
function ClientPortal() {
	const repoUrl = "https://github.com/teron-studio/teron-studio.git";
	const repoWebUrl = "https://github.com/teron-studio/teron-studio";
	const [showRepoModal, setShowRepoModal] = (0, import_react.useState)(false);
	const [showSupportModal, setShowSupportModal] = (0, import_react.useState)(false);
	const [showOsModal, setShowOsModal] = (0, import_react.useState)(false);
	const [showContractModal, setShowContractModal] = (0, import_react.useState)(false);
	const [showUploadModal, setShowUploadModal] = (0, import_react.useState)(false);
	const [uploadFileName, setUploadFileName] = (0, import_react.useState)("");
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const [uploadedMaterials, setUploadedMaterials] = (0, import_react.useState)([]);
	const clientProfile = (0, import_react.useMemo)(() => {
		if (typeof window === "undefined") return null;
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const raw = localStorage.getItem("teron_b2b_client_profile");
			const stored = raw ? JSON.parse(raw) : null;
			return {
				name: urlParams.get("cliente") || stored?.name || "Cliente B2B",
				company: urlParams.get("empresa") || stored?.company || "Empresa Contratante",
				email: urlParams.get("email") || stored?.email || "cliente@empresa.com.br",
				address: urlParams.get("endereco") || stored?.address || "São Paulo, SP",
				projectType: urlParams.get("projeto") || stored?.projectType || "Portal Dealer B2B & Plataforma Web",
				briefing: urlParams.get("briefing") || stored?.briefing || "Desenvolvimento de portal web de alta performance integrado ao GitHub.",
				deadline: urlParams.get("prazo") || stored?.deadline || "15 Dias Úteis",
				totalInvestment: stored?.totalInvestment || 2800,
				isSigned: stored?.isSigned ?? true
			};
		} catch (e) {
			return null;
		}
	}, []);
	const proposalUrl = `/proposta/b2b-lead?cliente=${encodeURIComponent(clientProfile?.name || "")}&empresa=${encodeURIComponent(clientProfile?.company || "")}&email=${encodeURIComponent(clientProfile?.email || "")}&endereco=${encodeURIComponent(clientProfile?.address || "")}&projeto=${encodeURIComponent(clientProfile?.projectType || "")}&briefing=${encodeURIComponent(clientProfile?.briefing || "")}&prazo=${encodeURIComponent(clientProfile?.deadline || "")}`;
	`${encodeURIComponent(clientProfile?.name || "")}${encodeURIComponent(clientProfile?.company || "")}${encodeURIComponent(clientProfile?.email || "")}${encodeURIComponent(clientProfile?.address || "")}${encodeURIComponent(clientProfile?.projectType || "")}${encodeURIComponent(clientProfile?.briefing || "")}${encodeURIComponent(clientProfile?.deadline || "")}`;
	const handleConfirmUpload = () => {
		setIsUploading(true);
		setTimeout(() => {
			setIsUploading(false);
			setUploadedMaterials((prev) => [...prev, uploadFileName || "logo-empresa-vetorizado.svg"]);
			setShowUploadModal(false);
			setUploadFileName("");
			alert("Material enviado com sucesso para a engenharia da Teron Studio!");
		}, 800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/70 bg-background/80 px-6 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeronWordmark, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowSupportModal(true),
						className: "rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-[12px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-6 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground",
							children: "TS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-foreground",
							children: [
								clientProfile?.name || "Cliente B2B",
								" · ",
								clientProfile?.company || "Teron Studio"
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-6 py-10 space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderGit2, { className: "size-3.5" }), "Teron Studio B2B · Portal do Cliente"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
								children: "Plataforma do Cliente & Gestão B2B"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-muted-foreground max-w-2xl",
								children: "Acompanhe seu projeto em tempo real, envie os materiais obrigatórios na Workstation e consulte os códigos-fonte no GitHub Oficial."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col sm:flex-row gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cliente/onboarding/$projeto",
								params: { projeto: "b2b-lead" },
								search: {
									cliente: clientProfile?.name || "",
									empresa: clientProfile?.company || "",
									email: clientProfile?.email || "",
									endereco: clientProfile?.address || "",
									projeto: clientProfile?.projectType || "",
									briefing: clientProfile?.briefing || "",
									prazo: clientProfile?.deadline || ""
								},
								className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "size-4" }),
									"Acessar Workstation B2B",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						onClick: () => setShowRepoModal(true),
						className: "rounded-2xl border border-primary/30 bg-card/60 p-6 backdrop-blur-md relative overflow-hidden cursor-pointer hover:border-primary/60 transition-all group",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col lg:flex-row lg:items-center justify-between gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-5 text-primary group-hover:rotate-12 transition-transform" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold",
											children: "Repositório Oficial do Seu Projeto no GitHub"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-base font-bold text-foreground break-all group-hover:text-primary transition-colors",
										children: repoUrl
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Toda a estrutura de código, entregáveis e commits do seu projeto B2B são versionados de forma transparente."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 sm:grid-cols-3 gap-3 min-w-[320px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/60 bg-background/50 p-3 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
											children: "Branch"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 font-mono text-xs font-bold text-foreground flex items-center justify-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-3 text-primary" }), " main"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/60 bg-background/50 p-3 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
											children: "CI/CD Pipeline"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 font-mono text-xs font-bold text-emerald-400 flex items-center justify-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Passing"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/60 bg-background/50 p-3 text-center col-span-2 sm:col-span-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
											children: "Ambiente Staging"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 font-mono text-xs font-bold text-primary flex items-center justify-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3" }), " Online"]
										})]
									})
								]
							})]
						})
					}),
					clientProfile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/60 pb-3 flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-primary font-bold text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dados Cadastrais do Cliente & Briefing do Projeto" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: "success",
									dot: true,
									children: "Contrato Assinado por OTP & Entrada Pago (50%)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
												children: "Empresa / Contratante"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-foreground text-sm",
												children: clientProfile.company
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-muted-foreground",
												children: ["Resp: ", clientProfile.name]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
												children: "E-mail & Endereço"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-[11px] text-foreground",
												children: clientProfile.email
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: clientProfile.address
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
												children: "Projeto & Cronograma"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-primary",
												children: clientProfile.projectType
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-muted-foreground",
												children: ["Prazo: ", clientProfile.deadline]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
												children: "Investimento Ajustado"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono font-bold text-emerald-400 text-sm",
												children: currency(clientProfile.totalInvestment)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-emerald-400",
												children: "50% Entrada Confirmada"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/40 bg-background/40 p-4 space-y-1 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono text-muted-foreground uppercase font-semibold",
									children: "Briefing / Escopo do Projeto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-foreground text-xs leading-relaxed italic",
									children: clientProfile.briefing
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-md shadow-lg shadow-amber-500/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400",
										children: "Ação Obrigatória na Workstation"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-foreground",
									children: "Envio dos Materiais da Marca (Checklist Bloqueante)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed max-w-2xl",
									children: "Envie o logotipo vetorizado, fotos e conteúdos para que a equipe de engenharia inicie o desenvolvimento. O prazo contratual de 15 dias úteis inicia imediatamente após 100% do envio."
								}),
								uploadedMaterials.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-mono text-emerald-400 pt-1 flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }),
										" Arquivos recebidos: ",
										uploadedMaterials.join(", ")
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-center gap-3 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setUploadFileName("logotipo-vetorizado.svg");
									setShowUploadModal(true);
								},
								className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-black hover:bg-amber-400 transition-colors shadow-md cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), " Enviar no Modal Agora"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cliente/onboarding/$projeto",
								params: { projeto: "b2b-lead" },
								search: {
									cliente: clientProfile?.name || "",
									empresa: clientProfile?.company || "",
									email: clientProfile?.email || "",
									endereco: clientProfile?.address || "",
									projeto: clientProfile?.projectType || "",
									briefing: clientProfile?.briefing || "",
									prazo: clientProfile?.deadline || ""
								},
								className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-background/60 px-5 py-3 text-xs font-semibold text-foreground hover:bg-card transition-colors cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "size-4" }), " Ir para Workstation"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-2xl border border-border bg-card p-6 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/60 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-semibold text-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-primary" }), " Cronograma de Execução (15 Dias Úteis)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-primary font-bold",
									children: "5 Estágios"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: [
									{
										s: "1. Briefing & Checklist de Materiais",
										v: uploadedMaterials.length > 0 ? 100 : 50,
										d: "Materiais obrigatórios"
									},
									{
										s: "2. UI/UX Design & Wireframes",
										v: 60,
										d: "Protótipo navegável"
									},
									{
										s: "3. Codificação Frontend & Backend GitHub",
										v: 25,
										d: "Desenvolvimento ativo"
									},
									{
										s: "4. Homologação & QA",
										v: 0,
										d: "Testes automatizados"
									},
									{
										s: "5. Deploy & Handover B2B",
										v: 0,
										d: "Publicação no domínio"
									}
								].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: r.s
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-muted-foreground text-[11px]",
											children: r.d
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 rounded-full bg-muted overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-primary transition-all duration-500",
											style: { width: `${r.v}%` }
										})
									})]
								}, r.s))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-2xl border border-border bg-card p-5 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border/60 pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xs font-semibold text-foreground flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-primary" }), " Atividade no Teron Studio"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: "Git Log"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: repoCommits.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border/40 bg-background/40 p-3 text-xs space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-[10px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono font-semibold text-primary flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "size-3" }),
														" #",
														c.hash
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: c.time
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium text-foreground text-[11.5px] leading-snug",
												children: c.message
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: c.author
											})
										]
									}, c.hash))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xs font-semibold text-foreground flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4 text-primary" }), " Suporte Prioritário B2B"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: "Fale diretamente com a equipe de desenvolvimento e acompanhe chamados abertos."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setShowSupportModal(true),
										className: "w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }), " Abrir Chamado no Modal"]
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-primary font-semibold text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xs font-bold text-foreground",
												children: "Propostas & OS"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											tone: "success",
											dot: true,
											children: "Aprovada"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Proposta B2B Ativa & Aprovada"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowOsModal(true),
									className: "inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all self-start cursor-pointer shadow-sm",
									children: ["Ver Ordem de Serviço ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-primary font-semibold text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xs font-bold text-foreground",
												children: "Contrato Digital"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400",
											children: "Assinado OTP"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Assinado por OTP via E-mail"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowContractModal(true),
									className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary transition-all self-start cursor-pointer",
									children: ["Ver Cláusulas do Contrato ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-primary font-semibold text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xs font-bold text-foreground",
												children: "Suporte B2B"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400",
											children: "Respostas < 2h"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "SLA de Resposta < 2 Horas"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowSupportModal(true),
									className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary transition-all self-start cursor-pointer",
									children: ["Abrir Chamado no Modal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
								})]
							})
						]
					})
				]
			}),
			showUploadModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg rounded-2xl border border-amber-500/40 bg-card p-6 shadow-2xl space-y-5 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-sm text-foreground",
									children: "Enviar Material Obrigatório"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Checklist Teron Studio B2B"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowUploadModal(false),
								className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Nome do Arquivo / Material"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Ex: logotipo-oficial-empresa.svg",
								value: uploadFileName,
								onChange: (e) => setUploadFileName(e.target.value),
								className: "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 p-6 text-center space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mx-auto size-8 text-amber-400 animate-bounce" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium text-foreground",
									children: "Clique para selecionar seu arquivo ou solte aqui"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Formatos suportados: .AI, .SVG, .PNG, .PDF, .ZIP (máx 50MB)"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowUploadModal(false),
								className: "rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleConfirmUpload,
								disabled: isUploading,
								className: "inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-opacity disabled:opacity-50 cursor-pointer",
								children: isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" }), "Validando e Enviando..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Enviar Arquivo no Modal"] })
							})]
						})
					]
				})
			}),
			showOsModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-xl rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-base text-foreground",
									children: "Ordem de Serviço (OS-2026-B2B)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-mono text-muted-foreground",
									children: "Teron Studio B2B Platform"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowOsModal(false),
								className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/60 bg-background/50 p-3 space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
										children: "Cliente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground",
										children: clientProfile?.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: clientProfile?.company
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/60 bg-background/50 p-3 space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
										children: "Investimento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono font-bold text-emerald-400",
										children: currency(clientProfile?.totalInvestment || 2800)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-emerald-400",
										children: "50% Entrada Confirmada"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/40 bg-background/40 p-4 space-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono text-primary font-bold uppercase",
									children: "Especificações do Escopo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-foreground font-semibold",
									children: clientProfile?.projectType
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-xs leading-relaxed",
									children: clientProfile?.briefing
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-border/60 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: proposalUrl,
								className: "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity",
								children: ["Abrir Portal de Proposta Interativo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowOsModal(false),
								className: "rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground",
								children: "Fechar Modal"
							})]
						})
					]
				})
			}),
			showContractModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-2xl rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-base text-foreground",
									children: "Minuta do Contrato Digital B2B"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-mono text-emerald-400",
									children: "Assinado Digitalmente por OTP via E-mail"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowContractModal(false),
								className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-bold text-emerald-400 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), " Assinatura Válida e Autenticada"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground text-[11px]",
								children: [
									"Signatário: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: clientProfile?.email }),
									" · Empresa: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: clientProfile?.company })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/60 bg-background/50 p-4 space-y-3 max-h-60 overflow-y-auto text-xs text-muted-foreground leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CONTRATADA:" }), " Teron Studio / Software & Agência B2B."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CONTRATANTE:" }),
									" ",
									clientProfile?.company,
									" (",
									clientProfile?.name,
									")."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CLÁUSULA 1ª — OBJETO:" }),
									" Desenvolvimento do projeto ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: clientProfile?.projectType }),
									" com valor total ajustado de ",
									currency(clientProfile?.totalInvestment || 2800),
									"."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CLÁUSULA 2ª — PAGAMENTO:" }), " 50% de entrada na assinatura deste instrumento e 50% na entrega e homologação final."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CLÁUSULA 3ª — PRAZO E MATERIAIS:" }),
									" O prazo contratual de ",
									clientProfile?.deadline,
									" é contado estritamente a partir da confirmação do recebimento de 100% dos materiais do checklist na Workstation B2B."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CLÁUSULA 4ª — PROPRIEDADE INTELECTUAL:" }),
									" Todo o código-fonte desenvolvido será hospedado no repositório GitHub ",
									repoUrl,
									" e transferido ao CONTRATANTE."
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-border/60 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => alert("Gerando PDF do contrato assinado..."),
								className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:border-primary transition-colors cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Baixar Cópia em PDF"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowContractModal(false),
								className: "rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90",
								children: "Fechar Modal"
							})]
						})
					]
				})
			}),
			showRepoModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-2xl rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-base text-foreground",
									children: "Repositório Oficial Teron Studio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-mono text-muted-foreground",
									children: repoUrl
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowRepoModal(false),
								className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-background/50 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
										children: "Branch"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-mono text-xs font-bold text-primary flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-3.5" }), " main (protected)"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-background/50 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
										children: "CI/CD Pipeline"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Build Success"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-background/50 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase font-mono font-semibold",
										children: "Ambiente Staging"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-mono text-xs font-bold text-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5 text-blue-400" }), " Online"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-border/60 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: repoWebUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-2 text-xs text-primary font-semibold hover:underline",
								children: ["Abrir Repositório no GitHub ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowRepoModal(false),
								className: "rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90",
								children: "Fechar Modal"
							})]
						})
					]
				})
			}),
			showSupportModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-sm text-foreground",
									children: "Suporte Direto B2B (SLA < 2h)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Teron Studio Engineering Squad"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowSupportModal(false),
								className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Qual a sua dúvida?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								placeholder: "Ex: Gostaria de tirar uma dúvida sobre o prazo de entrega...",
								className: "w-full rounded-lg border border-border bg-background p-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowSupportModal(false),
								className: "rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									alert("Solicitação enviada com sucesso! Nosso Product Lead responderá em breve.");
									setShowSupportModal(false);
								},
								className: "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" }), " Enviar Chamado no Modal"]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ClientPortal as component };
