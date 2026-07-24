import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  Clock,
  Command,
  FileSignature,
  FileText,
  FolderKanban,
  Heart,
  MessageSquare,
  Pause,
  Receipt,
  Scale,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TERON OS — O sistema operacional para empresas que constroem produtos digitais" },
      { name: "description", content: "TERON OS substitui WhatsApp, PDFs, planilhas e contratos manuais por um único sistema operacional. Propostas interativas, onboarding, aprovações, escopo, cobranças e IA — em um só lugar." },
      { property: "og:title", content: "TERON OS — O sistema operacional para empresas de produto digital" },
      { property: "og:description", content: "Substitua WhatsApp, PDFs e planilhas por um sistema operacional único. Portal comercial interativo, cronogramas inteligentes e IA que age como gerente de projetos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/25">
      <BgGrid />
      <TopNav />
      <Hero />
      <Manifesto />
      <PortalComercial />
      <ModulesGrid />
      <IntelligentTimeline />
      <AISection />
      <ProcessSection />
      <BeforeAfter />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------ */

function BgGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 0%, oklch(0.28 0.06 260 / 0.35), transparent 55%), radial-gradient(circle at 90% 10%, oklch(0.3 0.08 320 / 0.25), transparent 50%)",
      }}
    />
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        <Link to="/"><TeronWordmark /></Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#portal" className="hover:text-foreground">Portal Comercial</a>
          <a href="#modulos" className="hover:text-foreground">Módulos</a>
          <a href="#ia" className="hover:text-foreground">IA</a>
          <a href="#processo" className="hover:text-foreground">Processo</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a href="/login" className="hidden text-[13px] text-muted-foreground hover:text-foreground sm:inline-flex">Entrar</a>
          <Link to="/proposta/$id" params={{ id: "abc123" }} className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
            Ver proposta demo <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          TERON OS · v1 em construção
        </div>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          O sistema operacional para empresas que constroem <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">produtos digitais.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Chega de WhatsApp, PDFs, planilhas e cobranças manuais. TERON OS unifica proposta, contrato, onboarding, execução, aprovações, escopo, financeiro e comunicação em uma única plataforma inteligente.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link to="/proposta/$id" params={{ id: "abc123" }} className="group inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:gap-3">
            Abrir uma proposta interativa <ArrowRight className="size-4" />
          </Link>
          <Link to="/app" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-4 py-2.5 text-sm text-foreground backdrop-blur hover:bg-card">
            Ver o Workspace
          </Link>
          <div className="ml-2 hidden items-center gap-1.5 text-[12px] text-muted-foreground sm:flex">
            <Command className="size-3" /> K para abrir a paleta
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="mt-16 overflow-hidden rounded-xl border border-border bg-card/60 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border/60 bg-background/50 px-3 py-1 text-[11px] text-muted-foreground">
          teron.os / workspace / hoje
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
        <PreviewCard title="Cronograma pausado" tone="warning" icon={Pause}>
          <p className="text-[12.5px] text-muted-foreground">Pallas Studio · 7 dias sem enviar materiais.</p>
          <p className="mt-1 text-[11px] text-muted-foreground/70">Retomará automaticamente após aprovação.</p>
        </PreviewCard>
        <PreviewCard title="Fora do escopo detectado" tone="info" icon={Scale}>
          <p className="text-[12.5px] text-muted-foreground">Meridian · Módulo de simulação.</p>
          <p className="mt-1 text-[11px] text-primary">IA sugere: gerar orçamento complementar</p>
        </PreviewCard>
        <PreviewCard title="Fatura vencida há 3 dias" tone="danger" icon={Receipt}>
          <p className="text-[12.5px] text-muted-foreground">Aurora Health · R$ 12.400</p>
          <p className="mt-1 text-[11px] text-muted-foreground/70">Multa + juros aplicados automaticamente</p>
        </PreviewCard>
      </div>
    </div>
  );
}

function PreviewCard({ title, tone, icon: Icon, children }: { title: string; tone: "warning" | "info" | "danger"; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/70 bg-background/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-[12px] font-medium text-foreground">
          <Icon className="size-3.5" /> {title}
        </div>
        <StatusPill tone={tone} dot>{tone === "danger" ? "crítico" : tone === "warning" ? "pausado" : "IA"}</StatusPill>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ */

function Manifesto() {
  const kills = [
    "WhatsApp para gestão de projetos",
    "PDFs por e-mail",
    "Contratos manuais",
    "Planilhas",
    "Cobranças no dedo",
    "Cronogramas em post-its",
    "Arquivos espalhados",
    "Aprovações por mensagem",
  ];
  return (
    <section className="border-t border-border/60 bg-card/20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Manifesto</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Estamos substituindo tudo o que empresas de serviço digital ainda fazem à mão.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Toda a operação — do primeiro contato ao pós-venda — acontece dentro do TERON OS. Sem improvisos, sem retrabalho, sem "onde foi que eu salvei aquilo?".
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {kills.map((k) => (
            <li key={k} className="group relative rounded-lg border border-border/60 bg-background/40 p-4 text-[13px] text-muted-foreground">
              <span className="absolute right-3 top-3 text-[10px] font-medium uppercase tracking-wider text-emerald-400/80">Eliminado</span>
              <span className="line-through decoration-red-400/40 decoration-2">{k}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */

function PortalComercial() {
  const steps = [
    "Boas-vindas", "Sobre a TERON", "Como trabalhamos", "Escopo",
    "Incluso / Não incluso", "Cronograma", "Área do cliente",
    "Investimento", "Políticas", "FAQ", "Aceite", "Contrato", "Pagamento", "Projeto criado",
  ];
  return (
    <section id="portal" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Portal Comercial</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Uma proposta nunca mais será um PDF.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Envie apenas um link. O cliente entra em uma jornada guiada, elegante, com identidade da sua empresa — não em um anexo esquecido no e-mail.
            </p>
            <div className="mt-6 space-y-3 text-[14px]">
              <Feature icon={FileSignature} title="Aceite digital">Contrato assinado sem impressora, sem PDF, sem fricção.</Feature>
              <Feature icon={Receipt} title="Pagamento em um clique">Cartão, PIX ou boleto. Projeto criado automaticamente após confirmação.</Feature>
              <Feature icon={Sparkles} title="Experiência premium">Cada etapa parece o onboarding de um produto SaaS internacional.</Feature>
            </div>
            <Link to="/proposta/$id" params={{ id: "abc123" }} className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90">
              Abrir proposta demo <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/60 p-6 backdrop-blur">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Jornada do cliente</p>
            <ol className="mt-4 space-y-2">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 rounded-md border border-border/40 bg-background/40 px-3 py-2 text-[13px]">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted/60 font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{s}</span>
                  <ArrowRight className="size-3.5 text-muted-foreground/40" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid size-8 shrink-0 place-items-center rounded-md border border-border/60 bg-card/60">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ */

function ModulesGrid() {
  const mods = [
    { icon: FileText, title: "Portal Comercial", desc: "Proposta interativa. Aceite digital. Contrato assinado. Pagamento. Projeto criado — tudo em um link." },
    { icon: CheckSquare, title: "Onboarding do Cliente", desc: "Checklist obrigatório. Cronograma pausado até receber todos os materiais." },
    { icon: FolderKanban, title: "Centro de Aprovações", desc: "Versões, comentários, aprovar ou solicitar alteração. Histórico completo. Nada por WhatsApp." },
    { icon: Scale, title: "Controle de Escopo", desc: "Detecta pedidos fora do contrato e gera orçamento complementar automaticamente." },
    { icon: Clock, title: "Controle de Horas", desc: "Previstas vs executadas. Produtividade. Cliente enxerga o consumo em tempo real." },
    { icon: Timer, title: "Diário do Projeto", desc: "Timeline automática de tudo o que aconteceu. Contrato, pagamento, deploy, entrega." },
    { icon: MessageSquare, title: "Central de Comunicação", desc: "Chat por projeto. Mensagens, arquivos, comentários, solicitações. WhatsApp não entra." },
    { icon: BookOpen, title: "Base de Conhecimento", desc: "Domínio, servidor, deploy, banco, APIs, licenças, acessos. Nunca mais perca uma senha." },
    { icon: Heart, title: "Health Score do Cliente", desc: "Cada cliente recebe uma pontuação. Pagamento, resposta, entrega, risco. Aja antes que quebre." },
    { icon: Receipt, title: "Cobrança Automática", desc: "Lembretes antes, no dia e depois. Multa e juros aplicados automaticamente." },
    { icon: Zap, title: "Pós-venda 30/60/90", desc: "Satisfação, avaliação, manutenção, upsell. Automatizado do jeito certo." },
    { icon: Sparkles, title: "Assistente de IA", desc: "Age como gerente de projetos. Sugere ações. Não apenas responde." },
  ];
  return (
    <section id="modulos" className="border-t border-border/60 bg-card/20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Módulos</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Doze módulos. Uma operação inteira.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/50 md:grid-cols-2 lg:grid-cols-3">
          {mods.map((m) => (
            <div key={m.title} className="group bg-background/70 p-6 transition-colors hover:bg-card/70">
              <div className="mb-4 inline-grid size-9 place-items-center rounded-md border border-border/60 bg-card/60">
                <m.icon className="size-4" />
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{m.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */

function IntelligentTimeline() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Cronogramas inteligentes</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          O cronograma pausa sozinho quando a bola é do cliente.
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Nada de brigar por prazo. O sistema entende automaticamente quem está bloqueando o projeto e comunica isso com clareza — sem ninguém precisar defender atraso.
        </p>
        <div className="mt-12 rounded-xl border border-border/70 bg-card/60 p-6 backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Projeto</p>
              <p className="font-display text-lg font-semibold">Pallas Studio — Rebrand digital</p>
            </div>
            <StatusPill tone="warning" dot>Pausado — aguarda cliente</StatusPill>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-muted">
            <div className="absolute inset-y-0 left-0 w-[44%] bg-foreground" />
            <div className="absolute inset-y-0 left-[44%] w-[6%] bg-amber-400/70" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <TimelineStep label="Contrato assinado" tone="done" when="há 21 dias" />
            <TimelineStep label="Descoberta" tone="done" when="há 12 dias" />
            <TimelineStep label="Onboarding" tone="paused" when="7 dias parado" note="Aguardando textos institucionais" />
          </div>
          <p className="mt-6 text-[13px] text-muted-foreground">
            <span className="text-foreground">O prazo será iniciado apenas após o recebimento de todos os materiais.</span> Enquanto isso, o projeto permanece no status "Aguardando Cliente".
          </p>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ label, tone, when, note }: { label: string; tone: "done" | "paused"; when: string; note?: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-background/40 p-4">
      <div className="flex items-center gap-2 text-[13px] font-medium">
        {tone === "done" ? <CheckCircle2 className="size-4 text-emerald-400" /> : <Pause className="size-4 text-amber-400" />}
        {label}
      </div>
      <p className="mt-1 text-[11.5px] text-muted-foreground">{when}</p>
      {note && <p className="mt-1 text-[11.5px] text-amber-300/80">{note}</p>}
    </div>
  );
}

/* ------------------------------------------------------------ */

function AISection() {
  const suggestions = [
    "O cliente está há 7 dias sem enviar os materiais.",
    "O cronograma será impactado em 5 dias.",
    "A próxima parcela vence amanhã.",
    "Essa solicitação parece estar fora do escopo. Gerar orçamento complementar?",
    "Deseja enviar uma cobrança?",
    "Health Score da Aurora caiu para 62.",
  ];
  return (
    <section id="ia" className="border-t border-border/60 bg-card/20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Assistente de IA</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Um gerente de projetos que nunca dorme.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              A IA acompanha todos os projetos, todos os clientes, todos os contratos. Ela não espera você perguntar — ela sugere a próxima ação.
            </p>
            <p className="mt-4 text-muted-foreground">
              É o cérebro por trás do TERON OS.
            </p>
          </div>
          <div className="space-y-3">
            {suggestions.map((s) => (
              <div key={s} className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 p-4 backdrop-blur">
                <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                  <Sparkles className="size-3" />
                </div>
                <p className="text-[14px] leading-relaxed text-foreground">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */

function ProcessSection() {
  const steps = [
    "Cliente abre a proposta", "Aceita digitalmente", "Assina o contrato",
    "Paga a entrada", "Recebe acesso ao workspace", "Passa pelo onboarding",
    "Envia todos os materiais", "Cronograma inicia automaticamente", "Executa com aprovações",
    "Recebe entrega + pós-venda automatizado",
  ];
  return (
    <section id="processo" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Processo</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Do link enviado à entrega final — tudo dentro do sistema.
        </h2>
        <ol className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-lg border border-border/60 bg-card/40 px-4 py-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border/60 bg-background/60 font-mono text-[11px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[14px]">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */

function BeforeAfter() {
  const before = [
    "Proposta em PDF que ninguém abre",
    "WhatsApp com 4 pessoas discutindo escopo",
    "Cronograma no Notion, desatualizado",
    "Cliente cobra prazo mesmo sem enviar material",
    "Fatura esquecida na gaveta",
    "Aprovação por 'ok' no áudio",
  ];
  const after = [
    "Proposta interativa com aceite digital",
    "Chat único por projeto, com histórico",
    "Cronograma vivo, pausa e retoma sozinho",
    "Sistema mostra quem está bloqueando",
    "Cobrança automática com multa e juros",
    "Aprovação registrada, versionada, auditável",
  ];
  return (
    <section className="border-t border-border/60 bg-card/20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Antes → Depois</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          A operação inteira, reorganizada.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-background/30 p-6">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Antes</p>
            <ul className="mt-3 space-y-2 text-[14px] text-muted-foreground">
              {before.map((b) => <li key={b} className="flex gap-2"><span className="text-red-400/70">—</span>{b}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/60 p-6">
            <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Depois</p>
            <ul className="mt-3 space-y-2 text-[14px] text-foreground">
              {after.map((a) => <li key={a} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-400" />{a}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-4xl px-6 py-32 text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          Pare de operar no improviso.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          TERON OS é um novo padrão de operação para empresas de serviços digitais. Feito para durar. Feito para escalar.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/proposta/$id" params={{ id: "abc123" }} className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90">
            Ver proposta interativa <ArrowRight className="size-4" />
          </Link>
          <Link to="/app" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm hover:bg-card">
            Entrar no workspace
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <TeronWordmark />
        <p className="text-[12px] text-muted-foreground">© 2026 TERON OS · O sistema operacional para empresas de produto digital.</p>
      </div>
    </footer>
  );
}
