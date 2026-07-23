import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  CircleDollarSign,
  Download,
  FileSignature,
  FileText,
  MessageSquare,
  Rocket,
  Upload,
  ExternalLink,
  Github,
  GitBranch,
  Layers,
  Activity,
  Code2,
  Globe,
  Cpu,
  ShieldCheck,
  Check,
  FolderGit2,
  Clock,
  X,
  UploadCloud,
  FileCheck,
  ShieldAlert,
  KeyRound,
  Terminal,
  GitCommit,
} from "lucide-react";
import { useMemo, useState } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";
import { currency } from "@/lib/teron-data";

export const Route = createFileRoute("/cliente")({
  head: () => ({
    meta: [
      { title: "Portal do Cliente B2B · Teron Studio" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ClientPortal,
});

const repoCommits = [
  { hash: "8f2a1b9", message: "feat(b2b): inicializa arquitetura base no repositório teron-studio", author: "Thomas Squad Lead", time: "há 10 min", branch: "main" },
  { hash: "4c9d8e7", message: "chore(config): configura rotas, vite server e pipeline CI/CD", author: "Dev Team", time: "há 1 hora", branch: "main" },
  { hash: "1a3b5c7", message: "docs(readme): adiciona especificações da Workstation B2B", author: "Product Owner", time: "há 3 horas", branch: "main" },
];

function ClientPortal() {
  const repoUrl = "https://github.com/teron-studio/teron-studio.git";
  const repoWebUrl = "https://github.com/teron-studio/teron-studio";

  // Modals state
  const [showRepoModal, setShowRepoModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showOsModal, setShowOsModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedMaterials, setUploadedMaterials] = useState<string[]>([]);

  // Read active client profile from URL params or localStorage
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
      const briefing = urlParams.get("briefing") || stored?.briefing || "Desenvolvimento de portal web de alta performance integrado ao GitHub.";
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

  const proposalUrl = `/proposta/b2b-lead?cliente=${encodeURIComponent(clientProfile?.name || "")}&empresa=${encodeURIComponent(clientProfile?.company || "")}&email=${encodeURIComponent(clientProfile?.email || "")}&endereco=${encodeURIComponent(clientProfile?.address || "")}&projeto=${encodeURIComponent(clientProfile?.projectType || "")}&briefing=${encodeURIComponent(clientProfile?.briefing || "")}&prazo=${encodeURIComponent(clientProfile?.deadline || "")}`;
  const workstationUrl = `/cliente/onboarding/b2b-lead?cliente=${encodeURIComponent(clientProfile?.name || "")}&empresa=${encodeURIComponent(clientProfile?.company || "")}&email=${encodeURIComponent(clientProfile?.email || "")}&endereco=${encodeURIComponent(clientProfile?.address || "")}&projeto=${encodeURIComponent(clientProfile?.projectType || "")}&briefing=${encodeURIComponent(clientProfile?.briefing || "")}&prazo=${encodeURIComponent(clientProfile?.deadline || "")}`;

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/70 bg-background/80 px-6 backdrop-blur">
        <Link to="/">
          <TeronWordmark />
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSupportModal(true)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
          >
            <Bell className="size-4" />
          </button>
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-[12px]">
            <div className="grid size-6 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">TS</div>
            <span className="font-medium text-foreground">{clientProfile?.name || "Cliente B2B"} · {clientProfile?.company || "Teron Studio"}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* HERO TITLE & REPOSITORY ACCESS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FolderGit2 className="size-3.5" />
              Teron Studio B2B · Portal do Cliente
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Plataforma do Cliente & Gestão B2B
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
              Acompanhe seu projeto em tempo real, envie os materiais obrigatórios na Workstation e consulte os códigos-fonte no GitHub Oficial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/cliente/onboarding/$projeto"
              params={{ projeto: "b2b-lead" }}
              search={{
                cliente: clientProfile?.name || "",
                empresa: clientProfile?.company || "",
                email: clientProfile?.email || "",
                endereco: clientProfile?.address || "",
                projeto: clientProfile?.projectType || "",
                briefing: clientProfile?.briefing || "",
                prazo: clientProfile?.deadline || "",
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Rocket className="size-4" />
              Acessar Workstation B2B
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* GITHUB REPOSITORY BANNER CARD */}
        <div
          onClick={() => setShowRepoModal(true)}
          className="rounded-2xl border border-primary/30 bg-card/60 p-6 backdrop-blur-md relative overflow-hidden cursor-pointer hover:border-primary/60 transition-all group"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Github className="size-5 text-primary group-hover:rotate-12 transition-transform" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Repositório Oficial do Seu Projeto no GitHub
                </span>
              </div>
              <p className="font-mono text-base font-bold text-foreground break-all group-hover:text-primary transition-colors">
                {repoUrl}
              </p>
              <p className="text-xs text-muted-foreground">
                Toda a estrutura de código, entregáveis e commits do seu projeto B2B são versionados de forma transparente.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 min-w-[320px]">
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 text-center">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Branch</span>
                <p className="mt-1 font-mono text-xs font-bold text-foreground flex items-center justify-center gap-1">
                  <GitBranch className="size-3 text-primary" /> main
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 text-center">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">CI/CD Pipeline</span>
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

        {/* CLIENT DETAILS & BRIEFING SUMMARY */}
        {clientProfile && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <FileText className="size-4" />
                <span>Dados Cadastrais do Cliente & Briefing do Projeto</span>
              </div>
              <StatusPill tone="success" dot>Contrato Assinado por OTP & Entrada Pago (50%)</StatusPill>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Empresa / Contratante</span>
                <p className="font-semibold text-foreground text-sm">{clientProfile.company}</p>
                <p className="text-[11px] text-muted-foreground">Resp: {clientProfile.name}</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">E-mail & Endereço</span>
                <p className="font-mono text-[11px] text-foreground">{clientProfile.email}</p>
                <p className="text-[11px] text-muted-foreground">{clientProfile.address}</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Projeto & Cronograma</span>
                <p className="font-semibold text-primary">{clientProfile.projectType}</p>
                <p className="text-[11px] text-muted-foreground">Prazo: {clientProfile.deadline}</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Investimento Ajustado</span>
                <p className="font-mono font-bold text-emerald-400 text-sm">{currency(clientProfile.totalInvestment)}</p>
                <p className="text-[10px] text-emerald-400">50% Entrada Confirmada</p>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 bg-background/40 p-4 space-y-1 text-xs">
              <span className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Briefing / Escopo do Projeto</span>
              <p className="text-foreground text-xs leading-relaxed italic">{clientProfile.briefing}</p>
            </div>
          </div>
        )}

        {/* WORKSTATION ACTION BANNER — AMBER CHECKLIST BANNER (CORRIGIDO) */}
        <section className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-md shadow-lg shadow-amber-500/5">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-5 text-amber-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">Ação Obrigatória na Workstation</span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">Envio dos Materiais da Marca (Checklist Bloqueante)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              Envie o logotipo vetorizado, fotos e conteúdos para que a equipe de engenharia inicie o desenvolvimento. O prazo contratual de 15 dias úteis inicia imediatamente após 100% do envio.
            </p>
            {uploadedMaterials.length > 0 && (
              <p className="text-[11px] font-mono text-emerald-400 pt-1 flex items-center gap-1">
                <Check className="size-3.5" /> Arquivos recebidos: {uploadedMaterials.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setUploadFileName("logotipo-vetorizado.svg");
                setShowUploadModal(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-black hover:bg-amber-400 transition-colors shadow-md cursor-pointer"
            >
              <Upload className="size-4" /> Enviar no Modal Agora
            </button>

            <Link
              to="/cliente/onboarding/$projeto"
              params={{ projeto: "b2b-lead" }}
              search={{
                cliente: clientProfile?.name || "",
                empresa: clientProfile?.company || "",
                email: clientProfile?.email || "",
                endereco: clientProfile?.address || "",
                projeto: clientProfile?.projectType || "",
                briefing: clientProfile?.briefing || "",
                prazo: clientProfile?.deadline || "",
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-background/60 px-5 py-3 text-xs font-semibold text-foreground hover:bg-card transition-colors cursor-pointer"
            >
              <Rocket className="size-4" /> Ir para Workstation
            </Link>
          </div>
        </section>

        {/* TWO-COLUMN GRID: TIMELINE & REPO ACTIVITY */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          
          {/* LEFT: REAL 15-DAY TIMELINE */}
          <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Clock className="size-4 text-primary" /> Cronograma de Execução (15 Dias Úteis)
              </h3>
              <span className="font-mono text-xs text-primary font-bold">5 Estágios</span>
            </div>

            <div className="space-y-4">
              {[
                { s: "1. Briefing & Checklist de Materiais", v: uploadedMaterials.length > 0 ? 100 : 50, d: "Materiais obrigatórios" },
                { s: "2. UI/UX Design & Wireframes", v: 60, d: "Protótipo navegável" },
                { s: "3. Codificação Frontend & Backend GitHub", v: 25, d: "Desenvolvimento ativo" },
                { s: "4. Homologação & QA", v: 0, d: "Testes automatizados" },
                { s: "5. Deploy & Handover B2B", v: 0, d: "Publicação no domínio" },
              ].map((r) => (
                <div key={r.s} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">{r.s}</span>
                    <span className="font-mono text-muted-foreground text-[11px]">{r.d}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${r.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: REPO ACTIVITY & SUPPORT */}
          <div className="space-y-6">
            
            {/* REPO COMMITS */}
            <section className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="text-xs font-semibold text-foreground flex items-center gap-2">
                  <Activity className="size-4 text-primary" /> Atividade no Teron Studio
                </h3>
                <span className="font-mono text-[10px] text-muted-foreground">Git Log</span>
              </div>

              <div className="space-y-3">
                {repoCommits.map((c) => (
                  <div key={c.hash} className="rounded-lg border border-border/40 bg-background/40 p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono font-semibold text-primary flex items-center gap-1">
                        <Code2 className="size-3" /> #{c.hash}
                      </span>
                      <span className="text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="font-medium text-foreground text-[11.5px] leading-snug">{c.message}</p>
                    <p className="text-[10px] text-muted-foreground">{c.author}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* QUICK SUPPORT */}
            <section className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3">
              <h3 className="text-xs font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="size-4 text-primary" /> Suporte Prioritário B2B
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fale diretamente com a equipe de desenvolvimento e acompanhe chamados abertos.
              </p>
              <button
                onClick={() => setShowSupportModal(true)}
                className="w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="size-3.5" /> Abrir Chamado no Modal
              </button>
            </section>

          </div>
        </div>

        {/* ── 3 QUICK CARDS SOLICITADOS PELO USUÁRIO ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          
          {/* CARD 1: PROPOSTAS & OS */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                  <FileText className="size-4" />
                  <h3 className="text-xs font-bold text-foreground">Propostas & OS</h3>
                </div>
                <StatusPill tone="success" dot>Aprovada</StatusPill>
              </div>
              <p className="text-xs text-muted-foreground">Proposta B2B Ativa & Aprovada</p>
            </div>
            <button
              onClick={() => setShowOsModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all self-start cursor-pointer shadow-sm"
            >
              Ver Ordem de Serviço <ArrowRight className="size-3.5" />
            </button>
          </div>

          {/* CARD 2: CONTRATO DIGITAL */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                  <FileSignature className="size-4" />
                  <h3 className="text-xs font-bold text-foreground">Contrato Digital</h3>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  Assinado OTP
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Assinado por OTP via E-mail</p>
            </div>
            <button
              onClick={() => setShowContractModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary transition-all self-start cursor-pointer"
            >
              Ver Cláusulas do Contrato <ArrowRight className="size-3.5" />
            </button>
          </div>

          {/* CARD 3: SUPORTE B2B */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                  <MessageSquare className="size-4" />
                  <h3 className="text-xs font-bold text-foreground">Suporte B2B</h3>
                </div>
                <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                  Respostas &lt; 2h
                </span>
              </div>
              <p className="text-xs text-muted-foreground">SLA de Resposta &lt; 2 Horas</p>
            </div>
            <button
              onClick={() => setShowSupportModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary transition-all self-start cursor-pointer"
            >
              Abrir Chamado no Modal <ArrowRight className="size-3.5" />
            </button>
          </div>

        </div>
      </main>

      {/* ── MODAL 1: UPLOAD DE MATERIAIS INTERATIVO (NOVISSIMO) ── */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-amber-500/40 bg-card p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Enviar Material Obrigatório</h3>
                  <p className="text-[11px] text-muted-foreground">Checklist Teron Studio B2B</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground">Nome do Arquivo / Material</label>
              <input
                type="text"
                placeholder="Ex: logotipo-oficial-empresa.svg"
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>

            <div className="rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 p-6 text-center space-y-2">
              <UploadCloud className="mx-auto size-8 text-amber-400 animate-bounce" />
              <p className="text-xs font-medium text-foreground">Clique para selecionar seu arquivo ou solte aqui</p>
              <p className="text-[10px] text-muted-foreground">Formatos suportados: .AI, .SVG, .PNG, .PDF, .ZIP (máx 50MB)</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={isUploading}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <span className="size-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Validando e Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4" /> Enviar Arquivo no Modal
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: ORDEM DE SERVIÇO & PROPOSTA B2B ── */}
      {showOsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <FileText className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground">Ordem de Serviço (OS-2026-B2B)</h3>
                  <p className="text-xs font-mono text-muted-foreground">Teron Studio B2B Platform</p>
                </div>
              </div>
              <button
                onClick={() => setShowOsModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Cliente</span>
                <p className="font-semibold text-foreground">{clientProfile?.name}</p>
                <p className="text-[11px] text-muted-foreground">{clientProfile?.company}</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">Investimento</span>
                <p className="font-mono font-bold text-emerald-400">{currency(clientProfile?.totalInvestment || 2800)}</p>
                <p className="text-[10px] text-emerald-400">50% Entrada Confirmada</p>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 bg-background/40 p-4 space-y-2 text-xs">
              <span className="text-[10px] font-mono text-primary font-bold uppercase">Especificações do Escopo</span>
              <p className="text-foreground font-semibold">{clientProfile?.projectType}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{clientProfile?.briefing}</p>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              <a
                href={proposalUrl}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Abrir Portal de Proposta Interativo <ExternalLink className="size-3.5" />
              </a>
              <button
                onClick={() => setShowOsModal(false)}
                className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Fechar Modal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 3: CONTRATO DIGITAL & CLÁUSULAS ── */}
      {showContractModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <FileSignature className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground">Minuta do Contrato Digital B2B</h3>
                  <p className="text-xs font-mono text-emerald-400">Assinado Digitalmente por OTP via E-mail</p>
                </div>
              </div>
              <button
                onClick={() => setShowContractModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1 text-xs">
              <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="size-4" /> Assinatura Válida e Autenticada
              </p>
              <p className="text-muted-foreground text-[11px]">
                Signatário: <strong>{clientProfile?.email}</strong> · Empresa: <strong>{clientProfile?.company}</strong>
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-background/50 p-4 space-y-3 max-h-60 overflow-y-auto text-xs text-muted-foreground leading-relaxed">
              <p><strong>CONTRATADA:</strong> Teron Studio / Software & Agência B2B.</p>
              <p><strong>CONTRATANTE:</strong> {clientProfile?.company} ({clientProfile?.name}).</p>
              <p><strong>CLÁUSULA 1ª — OBJETO:</strong> Desenvolvimento do projeto <em>{clientProfile?.projectType}</em> com valor total ajustado de {currency(clientProfile?.totalInvestment || 2800)}.</p>
              <p><strong>CLÁUSULA 2ª — PAGAMENTO:</strong> 50% de entrada na assinatura deste instrumento e 50% na entrega e homologação final.</p>
              <p><strong>CLÁUSULA 3ª — PRAZO E MATERIAIS:</strong> O prazo contratual de {clientProfile?.deadline} é contado estritamente a partir da confirmação do recebimento de 100% dos materiais do checklist na Workstation B2B.</p>
              <p><strong>CLÁUSULA 4ª — PROPRIEDADE INTELECTUAL:</strong> Todo o código-fonte desenvolvido será hospedado no repositório GitHub {repoUrl} e transferido ao CONTRATANTE.</p>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              <button
                onClick={() => alert("Gerando PDF do contrato assinado...")}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:border-primary transition-colors cursor-pointer"
              >
                <Download className="size-3.5" /> Baixar Cópia em PDF
              </button>
              <button
                onClick={() => setShowContractModal(false)}
                className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
              >
                Fechar Modal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 4: DETALHES DO REPOSITÓRIO GITHUB TERON STUDIO ── */}
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
                  <Globe className="size-3.5 text-blue-400" /> Online
                </p>
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

      {/* ── MODAL 5: ATENDIMENTO & SUPORTE B2B ── */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Suporte Direto B2B (SLA &lt; 2h)</h3>
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

            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground">Qual a sua dúvida?</label>
              <textarea
                rows={3}
                placeholder="Ex: Gostaria de tirar uma dúvida sobre o prazo de entrega..."
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
                  alert("Solicitação enviada com sucesso! Nosso Product Lead responderá em breve.");
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