import { createFileRoute, useParams } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  Pause,
  Upload,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Layers,
  FileCheck,
  ExternalLink,
  Github,
  GitBranch,
  Code2,
  Activity,
  Globe,
  Server,
  Cpu,
  Sparkles,
  Terminal,
  HelpCircle,
  FolderGit2,
  Check,
  X,
  UploadCloud,
  FileText,
  ShieldCheck,
  GitCommit,
} from "lucide-react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";

export const Route = createFileRoute("/cliente/onboarding/$projeto")({
  head: () => ({
    meta: [
      { title: "Workstation B2B · Teron Studio — Thomas OS" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WorkstationPage,
});

interface MaterialItem {
  id: string;
  label: string;
  hint: string;
  required: boolean;
  status: "pendente" | "enviado" | "aprovado";
  fileUploaded?: string;
}

const initialMaterials: MaterialItem[] = [
  {
    id: "m1",
    label: "Logotipo em alta resolução (.AI, .SVG ou PNG transparente)",
    hint: "Marca vetorizada ou arquivo com fundo transparente para aplicação no design.",
    required: true,
    status: "aprovado",
    fileUploaded: "logo-empresa-v2.svg",
  },
  {
    id: "m2",
    label: "Manual de Marca / Identidade Visual (Cores, Fontes)",
    hint: "Códigos de cor HEX/RGB e fontes oficiais da empresa.",
    required: true,
    status: "pendente",
  },
  {
    id: "m3",
    label: "Imagens e Fotos Oficiais de Produtos / Serviços",
    hint: "Fotos em boa resolução da equipe, produtos ou sede.",
    required: true,
    status: "pendente",
  },
  {
    id: "m4",
    label: "Textos e Conteúdos das Páginas (Copywriting)",
    hint: "Descrições de serviços, sobre a empresa, depoimentos e dados de contato.",
    required: true,
    status: "pendente",
  },
  {
    id: "m5",
    label: "Acessos ao Domínio / Registro.br / DNS",
    hint: "Dados para apontamento de servidor na publicação final.",
    required: false,
    status: "pendente",
  },
];

const projectPhases = [
  { step: 1, label: "1. Briefing & Materiais", desc: "Envio e validação dos materiais obrigatórios", active: true, done: false },
  { step: 2, label: "2. UI/UX Design", desc: "Criação dos layouts e protótipos navegáveis", active: false, done: false },
  { step: 3, label: "3. Desenvolvimento GitHub", desc: "Codificação na plataforma Teron Studio", active: false, done: false },
  { step: 4, label: "4. Homologação & Testes", desc: "Validação final e aprovação do cliente", active: false, done: false },
  { step: 5, label: "5. Deploy & Lançamento", desc: "Publicação no domínio oficial B2B", active: false, done: false },
];

const repoCommits = [
  { hash: "8f2a1b9", message: "feat(b2b): inicializa arquitetura base no repositório teron-studio", author: "Thomas Squad Lead", time: "há 10 min", branch: "main" },
  { hash: "4c9d8e7", message: "chore(config): configura rotas, vite server e pipeline CI/CD", author: "Dev Team", time: "há 1 hora", branch: "main" },
  { hash: "1a3b5c7", message: "docs(readme): adiciona especificações da Workstation B2B", author: "Product Owner", time: "há 3 horas", branch: "main" },
];

function WorkstationPage() {
  const { projeto } = useParams({ from: "/cliente/onboarding/$projeto" });
  const [materials, setMaterials] = useState<MaterialItem[]>(initialMaterials);
  
  // Interactive Modals State
  const [activeUploadItem, setActiveUploadItem] = useState<MaterialItem | null>(null);
  const [showRepoModal, setShowRepoModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const repoUrl = "https://github.com/teron-studio/teron-studio.git";
  const repoWebUrl = "https://github.com/teron-studio/teron-studio";

  const totalRequired = materials.filter((m) => m.required).length;
  const approvedRequired = materials.filter((m) => m.required && m.status === "aprovado").length;
  const percentReady = Math.round((approvedRequired / totalRequired) * 100);
  const isBlocked = percentReady < 100;

  const handleConfirmUpload = () => {
    if (!activeUploadItem) return;
    setIsUploading(true);

    setTimeout(() => {
      setMaterials((prev) =>
        prev.map((m) =>
          m.id === activeUploadItem.id
            ? { ...m, status: "aprovado", fileUploaded: uploadFileName || `arquivo-${activeUploadItem.id}.pdf` }
            : m
        )
      );
      setIsUploading(false);
      setActiveUploadItem(null);
      setUploadFileName("");
    }, 800);
  };

  const clientProfile = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const raw = localStorage.getItem("teron_b2b_client_profile");
      const stored = raw ? JSON.parse(raw) : null;

      const name = urlParams.get("cliente") || stored?.name || "Cliente B2B";
      const company = urlParams.get("empresa") || stored?.company || "Empresa Contratante";
      const email = urlParams.get("email") || stored?.email || "cliente@empresa.com.br";
      const address = urlParams.get("endereco") || stored?.address || "São Paulo, SP";
      const projectType = urlParams.get("projeto") || stored?.projectType || "Portal Dealer B2B & Plataforma Web";
      const briefing = urlParams.get("briefing") || stored?.briefing || "Desenvolvimento web de alta performance com design moderno e integração B2B.";
      const deadline = urlParams.get("prazo") || stored?.deadline || "15 Dias Úteis";
      const totalInvestment = stored?.totalInvestment || 2800;

      return {
        name,
        company,
        email,
        address,
        projectType,
        briefing,
        deadline,
        totalInvestment,
        isSigned: stored?.isSigned ?? true,
      };
    } catch (e) {
      return null;
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <TeronWordmark />
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Workstation B2B · Projeto #{projeto}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRepoModal(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
            >
              <Github className="size-3.5" />
              <span>GitHub Teron Studio</span>
              <ExternalLink className="size-3 opacity-70" />
            </button>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-mono text-emerald-400 font-medium hidden sm:inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Plataforma Ativa
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* HERO TITLE & TERON STUDIO PLATFORM BANNER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FolderGit2 className="size-3.5" />
              Plataforma Teron Studio B2B
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Workstation do Projeto #{projeto}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Acompanhe o desenvolvimento em tempo real, veja o progresso no GitHub Teron Studio,
              envie os materiais obrigatórios e consulte todas as informações técnicas da sua entrega B2B.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowRepoModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Github className="size-4" />
              Ver Repositório & Modais
              <ExternalLink className="size-4" />
            </button>
          </div>
        </div>

        {/* CLIENT PROFILE & BOT BRIEFING SUMMARY CARD */}
        {clientProfile && (
          <div className="mt-8 rounded-2xl border border-primary/30 bg-card/80 p-6 shadow-xl space-y-4 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <FileText className="size-4" />
                <span>Dados Completos do Cliente & Briefing Coletado no Bot</span>
              </div>
              <StatusPill tone="success" dot>Contrato Assinado & Entrada (50%) Paga</StatusPill>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Cliente / Responsável</span>
                <p className="font-semibold text-foreground text-sm">{clientProfile.name}</p>
                <p className="text-[11px] text-muted-foreground">{clientProfile.company}</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Contato & Localização</span>
                <p className="font-mono text-[11px] text-foreground">{clientProfile.email}</p>
                <p className="text-[11px] text-muted-foreground">{clientProfile.address}</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Projeto & Escopo</span>
                <p className="font-semibold text-primary">{clientProfile.projectType}</p>
                <p className="text-[11px] text-muted-foreground">Prazo: {clientProfile.deadline}</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Investimento Total</span>
                <p className="font-mono font-bold text-emerald-400 text-sm">R$ {clientProfile.totalInvestment.toLocaleString("pt-BR")}</p>
                <p className="text-[10px] text-emerald-400">Entrada 50% Confirmada</p>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 bg-background/40 p-4 space-y-1 text-xs">
              <span className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Briefing / Especificações Enviadas</span>
              <p className="text-foreground text-xs leading-relaxed italic">{clientProfile.briefing}</p>
            </div>
          </div>
        )}

        {/* REPOSITORY & PLATFORM CARD BANNER */}
        <div
          onClick={() => setShowRepoModal(true)}
          className="mt-6 rounded-2xl border border-primary/30 bg-card/60 p-6 backdrop-blur-md relative overflow-hidden cursor-pointer hover:border-primary/60 transition-all group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Github className="size-5 text-primary group-hover:rotate-12 transition-transform" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Repositório Oficial & Plataforma (Clique para abrir Modal)
                </span>
              </div>
              <p className="font-mono text-base font-bold text-foreground break-all group-hover:text-primary transition-colors">
                {repoUrl}
              </p>
              <p className="text-xs text-muted-foreground">
                Toda a estrutura, códigos-fonte e atualizações do seu projeto B2B são versionados de forma transparente nesta plataforma.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 min-w-[320px]">
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 text-center">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Branch Principal</span>
                <p className="mt-1 font-mono text-xs font-bold text-foreground flex items-center justify-center gap-1">
                  <GitBranch className="size-3 text-primary" /> main
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 text-center">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Build Status</span>
                <p className="mt-1 font-mono text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                  <Check className="size-3" /> Passing
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Ambiente Staging</span>
                <p className="mt-1 font-mono text-xs font-bold text-primary flex items-center justify-center gap-1">
                  <Globe className="size-3" /> Online
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT PIPELINE STAGES */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Layers className="size-4 text-primary" /> Estágios de Desenvolvimento da Workstation B2B
            </h2>
            <span className="text-xs font-mono text-primary font-semibold">
              Fase Atual: {isBlocked ? "Aguardando Materiais" : "UI/UX & Protótipo"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {projectPhases.map((phase) => (
              <div
                key={phase.step}
                className={`rounded-xl border p-4 text-left transition-all relative overflow-hidden ${
                  phase.active
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/40 shadow-sm"
                    : phase.done
                      ? "border-emerald-500/40 bg-emerald-500/10 text-foreground"
                      : "border-border/40 bg-card/20 text-muted-foreground/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    Etapa {phase.step}
                  </span>
                  {phase.active && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  )}
                  {phase.done && <CheckCircle2 className="size-3.5 text-emerald-400" />}
                </div>
                <p className="mt-2 text-xs font-bold text-foreground">{phase.label}</p>
                <p className="mt-1 text-[10.5px] text-muted-foreground leading-snug line-clamp-2">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BLOCKING ALERT BANNER */}
        {isBlocked ? (
          <div className="mt-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 backdrop-blur-md shadow-lg shadow-amber-500/5">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <ShieldAlert className="size-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold text-base text-foreground">
                    Cronograma Pausado — Aguardando Materiais Obrigatórios do Cliente ({percentReady}%)
                  </h3>
                  <StatusPill tone="warning" dot>Pausado</StatusPill>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Para garantir a qualidade, pontualidade e integridade da sua entrega na plataforma <strong>Teron Studio</strong>,
                  o prazo contratual de <strong>15 dias úteis</strong> entra em contagem regressiva ativa imediatamente após o envio de
                  <strong> 100% dos materiais obrigatórios</strong> abaixo.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-2.5 rounded-full bg-background/80 overflow-hidden border border-amber-500/20">
                    <div className="h-full bg-amber-400 transition-all duration-500 rounded-full" style={{ width: `${percentReady}%` }} />
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {approvedRequired}/{totalRequired} Obrigatórios Recebidos
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground">
                  Materiais 100% Entregues — Cronograma Ativo no Teron Studio!
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Todos os requisitos foram recebidos e validados pela equipe. O desenvolvimento na plataforma GitHub está em andamento.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TWO-COLUMN GRID: MATERIALS CHECKLIST & CLIENT TRACKING SUMMARY */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: MATERIALS CHECKLIST (2 COLS) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <FileCheck className="size-5 text-primary" /> Checklist de Materiais & Envio
              </h2>
              <span className="text-xs text-muted-foreground">
                Envio rápido via Modal Interativa
              </span>
            </div>

            <div className="space-y-3">
              {materials.map((item) => {
                const isDone = item.status === "aprovado";

                return (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-5 transition-all ${
                      isDone
                        ? "border-emerald-500/30 bg-card/40"
                        : "border-border/60 bg-card/80 hover:border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`grid size-8 shrink-0 place-items-center rounded-full border mt-0.5 ${
                          isDone
                            ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                            : "border-border/60 bg-background text-muted-foreground"
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="size-4" /> : <Clock className="size-4" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          {item.required ? (
                            <span className="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400">
                              Obrigatório
                            </span>
                          ) : (
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                              Opcional
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>

                        {item.fileUploaded && (
                          <p className="mt-2 font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                            <Check className="size-3" /> Arquivo recebido: {item.fileUploaded}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {!isDone ? (
                        <button
                          onClick={() => {
                            setActiveUploadItem(item);
                            setUploadFileName(`material-${item.id}.pdf`);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer shadow-sm"
                        >
                          <Upload className="size-3.5" /> Enviar no Modal
                        </button>
                      ) : (
                        <StatusPill tone="success" dot>Validação OK</StatusPill>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: CLIENT TRACKING & REPO INFO (1 COL) */}
          <div className="space-y-6">
            
            {/* CARD 1: REPOSITORY & RECENT COMMITS */}
            <div className="rounded-2xl border border-border/60 bg-card/40 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Activity className="size-4 text-primary" /> Atividade no Teron Studio
                </h3>
                <span className="font-mono text-[10px] text-muted-foreground">Git Log</span>
              </div>

              <div className="space-y-3">
                {repoCommits.map((commit) => (
                  <div key={commit.hash} className="rounded-lg border border-border/40 bg-background/40 p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold text-primary flex items-center gap-1">
                        <Code2 className="size-3" /> #{commit.hash}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{commit.time}</span>
                    </div>
                    <p className="font-medium text-foreground text-[11.5px] leading-snug">{commit.message}</p>
                    <p className="text-[10px] text-muted-foreground">{commit.author}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowRepoModal(true)}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-background/60 py-2.5 text-xs font-semibold text-foreground hover:border-primary transition-all cursor-pointer"
              >
                Abrir Modal de Detalhes do GitHub <ExternalLink className="size-3.5" />
              </button>
            </div>

            {/* CARD 2: CONTRACT SUMMARY & SPECS */}
            <div className="rounded-2xl border border-border/60 bg-card/40 p-5 space-y-4">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                <Cpu className="size-4 text-primary" /> Ficha Técnica do Projeto B2B
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-muted-foreground">Prazo de Entrega:</span>
                  <span className="font-semibold text-foreground">15 Dias Úteis</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-muted-foreground">Plataforma Base:</span>
                  <span className="font-mono text-primary font-semibold">Teron Studio</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-muted-foreground">Arquitetura:</span>
                  <span className="font-medium text-foreground">React + Vite + TanStack</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-muted-foreground">Suporte Técnico:</span>
                  <span className="font-medium text-emerald-400">30 dias inclusos</span>
                </div>
              </div>
            </div>

            {/* CARD 3: DIRECT SUPPORT & HELP */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <MessageSquare className="size-4 text-primary" /> Precisa de Ajuda no Onboarding?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nosso Product Lead e time de engenharia do Teron Studio estão à disposição para tirar dúvidas sobre o envio de materiais.
              </p>
              <button
                onClick={() => setShowSupportModal(true)}
                className="w-full rounded-lg bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="size-3.5" /> Abrir Modal de Suporte B2B
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* ── MODAL 1: UPLOAD DE MATERIAIS INTERATIVO ── */}
      {activeUploadItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Enviar Material para Validação</h3>
                  <p className="text-[11px] text-muted-foreground">Workstation Teron Studio B2B</p>
                </div>
              </div>
              <button
                onClick={() => setActiveUploadItem(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="rounded-xl border border-border/60 bg-background/50 p-4 space-y-2">
              <span className="text-[10px] font-mono uppercase text-primary font-semibold">Item Selecionado</span>
              <p className="text-sm font-bold text-foreground">{activeUploadItem.label}</p>
              <p className="text-xs text-muted-foreground">{activeUploadItem.hint}</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground">Nome do Arquivo / Anexo</label>
              <input
                type="text"
                placeholder="Ex: logo-oficial-vetorizada.svg"
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>

            <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center space-y-2">
              <UploadCloud className="mx-auto size-8 text-primary animate-bounce" />
              <p className="text-xs font-medium text-foreground">Arraste seu arquivo aqui ou clique para selecionar</p>
              <p className="text-[10px] text-muted-foreground">Formatos suportados: .AI, .SVG, .PNG, .PDF, .ZIP (máx 50MB)</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveUploadItem(null)}
                className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={isUploading}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Validando no Teron Studio...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4" /> Confirmar Envio do Material
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: DETALHES DO REPOSITÓRIO GITHUB TERON STUDIO ── */}
      {showRepoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Github className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground">Repositório Oficial Teron Studio</h3>
                  <p className="text-xs font-mono text-muted-foreground">{repoUrl}</p>
                </div>
              </div>
              <button
                onClick={() => setShowRepoModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-border/60 bg-background/50 p-3">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Branch</span>
                <p className="mt-1 font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                  <GitBranch className="size-3.5" /> main (protected)
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/50 p-3">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">CI/CD Pipeline</span>
                <p className="mt-1 font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" /> Build Success
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/50 p-3">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Ambiente Staging</span>
                <p className="mt-1 font-mono text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Globe className="size-3.5 text-blue-400" /> Vercel / Cloud
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Terminal className="size-4 text-primary" /> Visualizador de Código do Repositório (Live GitHub Sync)
              </h4>

              <div className="rounded-xl border border-border/80 bg-zinc-950 p-4 font-mono text-[11px] text-zinc-300 space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[10px] text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-red-500/80" />
                    <span className="size-2.5 rounded-full bg-yellow-500/80" />
                    <span className="size-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-semibold text-zinc-200">teron-studio / src / App.tsx</span>
                  </div>
                  <span className="text-emerald-400">● GitHub Main Sync</span>
                </div>
                <pre className="overflow-x-auto text-[11px] leading-relaxed text-zinc-300">
                  <code>{`// Teron Studio B2B Platform Base
import { TeronOSProvider } from "@teron/sdk";

export default function B2BApp() {
  return (
    <TeronOSProvider projectId="teron-studio-b2b">
      <WorkstationHeader repo="teron-studio/teron-studio.git" />
      <ClientOnboardingFlow />
    </TeronOSProvider>
  );
}`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <GitCommit className="size-4 text-primary" /> Histórico Recente de Commits
              </h4>

              <div className="space-y-2 font-mono text-xs">
                {repoCommits.map((c) => (
                  <div key={c.hash} className="rounded-xl border border-border/60 bg-background/60 p-3.5 space-y-1">
                    <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                      <span className="text-primary font-bold">#{c.hash} · branch {c.branch}</span>
                      <span>{c.time}</span>
                    </div>
                    <p className="text-foreground font-sans font-medium text-xs">{c.message}</p>
                    <p className="text-[10px] text-muted-foreground font-sans">Autor: {c.author}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              <a
                href={repoWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-primary font-semibold hover:underline"
              >
                Abrir Repositório no GitHub <ExternalLink className="size-3.5" />
              </a>
              <button
                onClick={() => setShowRepoModal(false)}
                className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
              >
                Fechar Modal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 3: ATENDIMENTO & SUPORTE B2B ── */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Suporte Direto B2B</h3>
                  <p className="text-[11px] text-muted-foreground">Teron Studio Engineering Squad</p>
                </div>
              </div>
              <button
                onClick={() => setShowSupportModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1">
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="size-4" /> SLA de Resposta: Menos de 2 Horas
              </p>
              <p className="text-[11px] text-muted-foreground">
                Seu projeto tem atendimento prioritário diretamente com o Product Lead responsável.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground">Qual a sua dúvida ou necessidade?</label>
              <textarea
                rows={3}
                placeholder="Ex: Gostaria de tirar uma dúvida sobre o formato da logo vetorizada..."
                className="w-full rounded-lg border border-border bg-background p-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSupportModal(false)}
                className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert("Solicitação de suporte enviada! Nosso engenheiro entrará em contato em breve.");
                  setShowSupportModal(false);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
              >
                <MessageSquare className="size-4" /> Enviar Chamado no Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
