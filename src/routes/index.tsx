import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Boxes,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CircleDot,
  Clock,
  Code2,
  FileSignature,
  FileText,
  FolderKanban,
  Gauge,
  Github,
  HeartHandshake,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Play,
  Radio,
  Receipt,
  Rocket,
  Shield,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import { TeronMark, TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TERON — Workspace único para empresas de produto digital" },
      { name: "description", content: "Pare de operar no WhatsApp. A TERON substitui planilhas, PDFs e cobranças manuais por um único workspace: propostas, contratos, projetos, financeiro, portal do cliente e automações." },
      { property: "og:title", content: "TERON — Workspace único para empresas de produto digital" },
      { property: "og:description", content: "Pare de operar no WhatsApp. A TERON substitui planilhas, PDFs e cobranças manuais por um único workspace." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <Hero />
      <LogoCloud />
      <BeforeAfterSection />
      <WorkspaceCardsSection />
      <ProcessFlowSection />
      <ClientAreaSection />
      <OperationalIntelligenceSection />
      <WhyTeronSection />
      <AudienceSection />
      <Testimonials />
      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        <Link to="/">
          <TeronWordmark />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#workspace" className="hover:text-foreground">Workspace</a>
          <a href="#processo" className="hover:text-foreground">Processo</a>
          <a href="#cliente" className="hover:text-foreground">Área do cliente</a>
          <a href="#por-que" className="hover:text-foreground">Por que TERON</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/login"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:block"
          >
            Entrar
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Solicitar demonstração
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/70">
      <div className="absolute inset-0 teron-glow opacity-70" />
      <div className="absolute inset-0 teron-grid opacity-40" style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent 80%)" }} />
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
          <Radio className="size-3 text-[oklch(0.72_0.15_155)]" />
          Product Engineering Company · Operação transparente por padrão
        </div>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          Toda a operação da sua empresa de software em <span className="text-muted-foreground">um único workspace</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
          A TERON substitui WhatsApp, planilhas, PDFs, e-mails perdidos e cobranças manuais. Propostas, contratos, projetos, financeiro e portal do cliente — organizados, transparentes e previsíveis.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-px"
          >
            Solicitar demonstração
            <ArrowRight className="size-3.5" />
          </Link>
          <a
            href="#workspace"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <Play className="size-3" /> Ver como funciona
          </a>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="mx-auto mt-16 max-w-5xl">
      <div className="rounded-2xl border border-border bg-gradient-to-b from-card to-background p-2 shadow-[0_40px_120px_-30px_oklch(0.7_0.14_250_/_30%)]">
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <div className="flex items-center gap-1.5 border-b border-border/70 bg-card/40 px-3 py-2">
            <span className="size-2.5 rounded-full bg-[oklch(0.65_0.2_22_/_60%)]" />
            <span className="size-2.5 rounded-full bg-[oklch(0.8_0.14_78_/_60%)]" />
            <span className="size-2.5 rounded-full bg-[oklch(0.72_0.15_155_/_60%)]" />
            <span className="ml-3 font-mono text-[10px] text-muted-foreground">teron.studio/app</span>
          </div>
          <div className="grid grid-cols-[180px_1fr]">
            <div className="hidden border-r border-border/70 bg-sidebar p-3 md:block">
              {["Hoje","Inbox","Projetos","Clientes","Propostas","Contratos","Financeiro"].map((label,i)=>(
                <div key={label} className={`mb-0.5 rounded-md px-2 py-1.5 text-[11px] ${i===0 ? "bg-sidebar-accent text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </div>
              ))}
            </div>
            <div className="p-5 text-left">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Bom dia, Rafael</p>
              <h3 className="mt-1 font-display text-lg font-semibold">O que precisa da sua atenção hoje</h3>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { l: "Pendências críticas", v: "2", t: "danger" as const },
                  { l: "Aguardando cliente", v: "3", t: "warning" as const },
                  { l: "Deploys prontos", v: "1", t: "info" as const },
                ].map(m=>(
                  <div key={m.l} className="rounded-lg border border-border/70 bg-card p-2.5">
                    <p className="text-[10px] text-muted-foreground">{m.l}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-display text-lg font-semibold">{m.v}</span>
                      <StatusPill tone={m.t} dot>ativo</StatusPill>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1.5">
                {[
                  { i: "Fatura #0284 — Aurora Health", m: "R$ 12.400 vencida há 3 dias", t: "danger" as const, tag: "Vencida" },
                  { i: "Aguardando imagens — Pallas Studio", m: "Cronograma pausado desde 06/07", t: "warning" as const, tag: "Aguarda cliente" },
                  { i: "Deploy Órion v2.4", m: "Aprovação de QA concluída", t: "info" as const, tag: "Pronto" },
                ].map(x=>(
                  <div key={x.i} className="flex items-center gap-3 rounded-md border border-border/60 bg-card/60 px-2.5 py-2">
                    <CircleDot className="size-3.5 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-medium">{x.i}</p>
                      <p className="truncate text-[10px] text-muted-foreground">{x.m}</p>
                    </div>
                    <StatusPill tone={x.t}>{x.tag}</StatusPill>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoCloud() {
  const items = ["Meridian", "Aurora Health", "Pallas", "Órion", "Lyra Labs", "Nordica"];
  return (
    <section className="border-b border-border/70 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Estúdios e produtos que rodam na TERON
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-display font-semibold text-muted-foreground/60">
          {items.map((l) => <span key={l}>{l}</span>)}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  const before = [
    "Cliente manda mensagem no WhatsApp",
    "Arquivos ficam espalhados em drives e e-mails",
    "Pagamento atrasa — ninguém cobra",
    "Cronograma quebra sem aviso",
    "Cliente cobra atualização por mensagem",
    "Equipe perde tempo respondendo status",
  ];
  const after = [
    "Cliente solicita proposta pela plataforma",
    "Proposta digital enviada e aprovada em um clique",
    "Contrato assinado com validade jurídica",
    "Pagamento confirmado automaticamente",
    "Projeto iniciado com kickoff registrado",
    "Área exclusiva do cliente criada",
    "Cliente acompanha tudo em tempo real",
    "Entrega organizada, com histórico completo",
  ];
  return (
    <section className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">A operação</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            De uma bagunça reativa para uma operação previsível.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            A maioria das empresas de software ainda opera com ferramentas de bolso. A TERON reorganiza esse fluxo em uma única linha do tempo.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TimelineCard
            tone="danger"
            eyebrow="Como as empresas trabalham hoje"
            title="Reativo, disperso e imprevisível"
            items={before}
            footer="Resultado: cliente inseguro, equipe cansada, margem apertada."
          />
          <TimelineCard
            tone="success"
            eyebrow="Como funciona com a TERON"
            title="Um único fluxo, do contato à entrega"
            items={after}
            footer="Resultado: cliente confiante, equipe focada, previsibilidade financeira."
          />
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  eyebrow,
  title,
  items,
  tone,
  footer,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  tone: "danger" | "success";
  footer: string;
}) {
  const isSuccess = tone === "success";
  const ring = isSuccess
    ? "border-[oklch(0.72_0.15_155_/_25%)] bg-[oklch(0.72_0.15_155_/_4%)]"
    : "border-[oklch(0.65_0.2_22_/_25%)] bg-[oklch(0.65_0.2_22_/_4%)]";
  const dot = isSuccess ? "bg-[oklch(0.72_0.15_155)]" : "bg-[oklch(0.65_0.2_22)]";
  const line = isSuccess ? "bg-[oklch(0.72_0.15_155_/_25%)]" : "bg-[oklch(0.65_0.2_22_/_20%)]";
  return (
    <div className={`rounded-2xl border ${ring} p-6`}>
      <div className="flex items-center justify-between">
        <p className={`text-[11px] font-semibold uppercase tracking-wider ${isSuccess ? "text-[oklch(0.82_0.15_155)]" : "text-[oklch(0.78_0.18_22)]"}`}>
          {eyebrow}
        </p>
        <StatusPill tone={isSuccess ? "success" : "danger"} dot>
          {isSuccess ? "TERON" : "Legado"}
        </StatusPill>
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{title}</h3>
      <ol className="relative mt-6 space-y-3.5 pl-6">
        <span className={`absolute left-[7px] top-1.5 bottom-1.5 w-px ${line}`} />
        {items.map((item, i) => (
          <li key={i} className="relative text-[13.5px] leading-relaxed text-foreground">
            <span className={`absolute -left-6 top-1.5 size-3 rounded-full ${dot} ring-4 ring-background`} />
            {item}
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-border/60 pt-4 text-[12.5px] text-muted-foreground">{footer}</p>
    </div>
  );
}

function WorkspaceCardsSection() {
  const cards = [
    { icon: FolderKanban, t: "Projetos", d: "Cronograma, milestones e status ao vivo." },
    { icon: Building2, t: "Clientes", d: "Ficha completa, histórico e relacionamento." },
    { icon: Users, t: "CRM", d: "Leads, oportunidades e pipeline comercial." },
    { icon: FileText, t: "Propostas", d: "Escopo, valor e aprovação em um clique." },
    { icon: FileSignature, t: "Contratos", d: "Assinatura digital com validade jurídica." },
    { icon: CircleDollarSign, t: "Financeiro", d: "Fluxo de caixa, previstos e realizados." },
    { icon: Receipt, t: "Pagamentos", d: "Boleto, Pix e cartão com conciliação automática." },
    { icon: Boxes, t: "Arquivos", d: "Materiais versionados por projeto." },
    { icon: Clock, t: "Horas", d: "Timesheet, apontamento e faturamento por hora." },
    { icon: Rocket, t: "Deploy", d: "Histórico de releases, aprovações e ambientes." },
    { icon: HeartHandshake, t: "Área do Cliente", d: "Portal exclusivo com tudo do projeto." },
    { icon: Workflow, t: "Automações", d: "Regras que disparam sozinhas conforme eventos." },
  ];
  return (
    <section id="workspace" className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">O produto</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            Tudo em um único workspace.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Doze módulos que trabalham como um só sistema. Cada evento em um módulo aparece nos outros — sem duplicidade, sem retrabalho.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/70 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.t} className="group relative bg-background p-5 transition-colors hover:bg-card">
              <div className="flex items-center justify-between">
                <div className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card">
                  <c.icon className="size-4 text-foreground" />
                </div>
                <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mt-4 text-[14px] font-semibold text-foreground">{c.t}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessFlowSection() {
  const steps = [
    { n: "01", t: "Contato", d: "Primeiro alinhamento, entendimento do desafio.", icon: MessageSquare },
    { n: "02", t: "Diagnóstico", d: "Escopo estruturado, riscos mapeados.", icon: Gauge },
    { n: "03", t: "Proposta", d: "Documento digital, aprovado com um clique.", icon: FileText },
    { n: "04", t: "Contrato", d: "Assinatura digital com validade jurídica.", icon: FileSignature },
    { n: "05", t: "Pagamento", d: "Confirmação automática, sem cobrança manual.", icon: CircleDollarSign },
    { n: "06", t: "Kickoff", d: "Área do cliente criada, cronograma público.", icon: Rocket },
    { n: "07", t: "Desenvolvimento", d: "Sprints visíveis, horas registradas.", icon: Code2 },
    { n: "08", t: "Deploy", d: "Releases versionados e aprovados.", icon: Zap },
    { n: "09", t: "Entrega", d: "Handover documentado, materiais organizados.", icon: CheckCircle2 },
    { n: "10", t: "Suporte", d: "Continuidade com SLA claro e histórico.", icon: HeartHandshake },
  ];
  return (
    <section id="processo" className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Processo</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Um processo que funciona — e é o mesmo em todos os projetos.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Dez etapas registradas na plataforma. Ninguém precisa lembrar do que vem depois: o sistema conduz.
            </p>
          </div>
          <StatusPill tone="info" dot>10 etapas · 100% documentadas</StatusPill>
        </div>

        <div className="mt-14">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.n} className="group relative rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/25">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">{s.n}</span>
                  <s.icon className="size-3.5 text-muted-foreground" />
                </div>
                <h3 className="mt-2.5 font-display text-[15px] font-semibold text-foreground">{s.t}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{s.d}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="absolute -right-2 top-1/2 hidden size-3 -translate-y-1/2 text-muted-foreground/40 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OperationalIntelligenceSection() {
  const cards = [
    {
      tone: "warning" as const,
      title: "Aguardando envio das imagens",
      meta: "Pallas Studio · Rebrand digital",
      body: "Cronograma pausado automaticamente até o cliente enviar o material. O prazo será recalculado sem retrabalho.",
      icon: AlertTriangle,
      chip: "Aguarda cliente",
    },
    {
      tone: "danger" as const,
      title: "Pagamento vencido",
      meta: "Aurora Health · Fatura #0284",
      body: "R$ 12.400 vencidos há 3 dias. Cobrança e lembrete disparados automaticamente pelo módulo financeiro.",
      icon: CircleDollarSign,
      chip: "Ação necessária",
    },
    {
      tone: "info" as const,
      title: "Deploy aguardando aprovação",
      meta: "Órion Commerce v2.4",
      body: "QA concluído, release documentado. Um clique publica em produção e registra no histórico do cliente.",
      icon: Rocket,
      chip: "Pronto",
    },
    {
      tone: "success" as const,
      title: "Aprovação recebida",
      meta: "Meridian Capital · Wealth core",
      body: "Milestone aprovado no portal do cliente. Próxima parcela liberada e sprint seguinte iniciada.",
      icon: CheckCircle2,
      chip: "Concluído",
    },
    {
      tone: "warning" as const,
      title: "Cronograma pausado automaticamente",
      meta: "Nordica Motors · Portal dealer",
      body: "Proposta ainda não assinada. Todo o time sabe que o projeto está no aguardo — sem cobrança injusta.",
      icon: Clock,
      chip: "Pausado",
    },
    {
      tone: "info" as const,
      title: "Nova solicitação do cliente",
      meta: "Kite SaaS · Automação onboarding",
      body: "Solicitação registrada no projeto, com resposta em SLA. Sem WhatsApp, sem retrabalho de contexto.",
      icon: Inbox,
      chip: "Novo",
    },
  ];
  return (
    <section className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Inteligência operacional</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            Projetos nunca mais ficam sem controle.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            A TERON monitora cada projeto e move as peças sozinha. Você entra no workspace e vê exatamente o que exige a sua decisão hoje.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/25">
                <div className="flex items-center justify-between">
                  <div className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-background">
                    <Icon className="size-3.5 text-muted-foreground" />
                  </div>
                  <StatusPill tone={c.tone} dot>{c.chip}</StatusPill>
                </div>
                <h3 className="mt-4 font-display text-[15px] font-semibold text-foreground">{c.title}</h3>
                <p className="mt-0.5 text-[11.5px] font-medium uppercase tracking-wider text-muted-foreground">{c.meta}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyTeronSection() {
  const rows = [
    "Processo documentado, replicável em cada projeto",
    "Cronograma transparente, com pausa automática",
    "Área exclusiva para clientes, com o histórico completo",
    "Contratos digitais com validade jurídica",
    "Controle financeiro com conciliação automática",
    "Registro de horas por projeto, tarefa e pessoa",
    "Comunicação centralizada, sem WhatsApp perdido",
    "Aprovações registradas com autoria e data",
    "Histórico completo de cada decisão e entrega",
    "Organização profissional que o cliente sente",
  ];
  return (
    <section id="por-que" className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Por que TERON</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Por que empresas escolhem a TERON.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Não vendemos código. Vendemos organização, transparência e previsibilidade. Cada linha da plataforma existe para transmitir uma coisa: essa empresa trabalha de forma extremamente profissional.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] text-muted-foreground">
              <Shield className="size-3.5" /> Padrão internacional de operação
            </div>
          </div>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {rows.map((r) => (
              <li key={r} className="flex items-center gap-3 px-5 py-3.5 text-[13.5px] text-foreground">
                <CheckCircle2 className="size-4 shrink-0 text-[oklch(0.72_0.15_155)]" />
                <span className="flex-1">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  const audiences = [
    { t: "Freelancers", d: "Que querem cobrar como empresa e ser tratados como tal." },
    { t: "Desenvolvedores", d: "Que operam sozinhos e não querem virar administrativo." },
    { t: "Software Houses", d: "Que precisam padronizar cada projeto do time." },
    { t: "Agências Digitais", d: "Que atendem múltiplos clientes em paralelo." },
    { t: "Consultorias", d: "Que vendem horas e precisam de registro impecável." },
    { t: "Startups", d: "Que fazem entregas para clientes-âncora e investidores." },
    { t: "Empresas de software", d: "Que querem escalar sem perder controle." },
  ];
  return (
    <section className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Para quem</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            Feita para quem desenvolve software para os outros.
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <div
              key={a.t}
              className={`rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/25 ${
                i === audiences.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <p className="font-display text-[15px] font-semibold text-foreground">{a.t}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientAreaSection() {
  const capabilities = [
    "Acompanhar cronograma e progresso em tempo real",
    "Aprovar propostas e assinar contratos",
    "Enviar arquivos e materiais diretamente ao projeto",
    "Visualizar e pagar faturas dentro da plataforma",
    "Ver horas trabalhadas e deploys realizados",
    "Abrir solicitações e receber notificações",
  ];
  return (
    <section id="cliente" className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Área do cliente</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              O seu cliente entra e sente que contratou uma empresa séria.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Cada cliente ganha um portal próprio, com o histórico completo do projeto. Sem PDFs perdidos, sem cobrança fora do sistema, sem “manda de novo no e-mail”.
            </p>
            <ul className="mt-6 space-y-2.5">
              {capabilities.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[oklch(0.72_0.15_155)]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-2">
            <div className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Portal do cliente</p>
                  <h3 className="mt-1 font-display text-lg font-semibold">Meridian — Plataforma Wealth</h3>
                </div>
                <StatusPill tone="success" dot>Em execução</StatusPill>
              </div>
              <div className="mt-4 rounded-lg border border-[oklch(0.8_0.14_78_/_25%)] bg-[oklch(0.8_0.14_78_/_8%)] p-3">
                <p className="text-[11px] font-semibold text-[oklch(0.88_0.14_78)]">Cronograma pausado</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">Aguardando envio das imagens da marca. O prazo será recalculado automaticamente.</p>
              </div>
              <div className="mt-4 space-y-2">
                <ProgressRow label="Descoberta" v={100} />
                <ProgressRow label="Design system" v={100} />
                <ProgressRow label="Onboarding + Auth" v={80} />
                <ProgressRow label="Wealth core" v={45} />
                <ProgressRow label="Deploy" v={0} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[12px] text-muted-foreground">
                <span>Próxima entrega · <span className="text-foreground">18/07</span></span>
                <span>Fatura em aberto · <span className="text-foreground">R$ 18.500</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressRow({ label, v }: { label: string; v: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">{v}%</span>
      </div>
      <div className="h-1 rounded-full bg-muted">
        <div className="h-full rounded-full bg-foreground" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}

function Differentials() {
  const items = [
    { t: "Cronograma que respeita a realidade", d: "Quando o cliente atrasa material, o prazo pausa e recalcula sozinho. Sem drama, sem cobrança injusta." },
    { t: "Uma única fonte de verdade", d: "Fim das divergências entre WhatsApp, e-mail e planilha. Está na TERON: aconteceu." },
    { t: "Cobrança sem constrangimento", d: "Pagamentos, parcelas e comprovantes rodam na plataforma. Você acompanha, o cliente também." },
  ];
  return (
    <section className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Diferenciais</p>
        <h2 className="mt-2 max-w-2xl font-display text-4xl font-semibold tracking-tight">
          Feita para estúdios que odeiam bagunça operacional.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.t} className="rounded-xl border border-border bg-card p-6">
              <Sparkles className="size-4 text-muted-foreground" />
              <h3 className="mt-4 font-display text-lg font-semibold">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { q: "Os clientes finalmente param de perguntar 'em que pé está'. Tudo está lá, transparente.", a: "Helena Vasques", r: "COO, Meridian Capital" },
    { q: "Reduzimos o tempo de onboarding de proposta a projeto em 70%. A cobrança rodou sem que eu precisasse tocar.", a: "Diego Salles", r: "Head de Produto, Aurora Health" },
    { q: "Parece que contratamos uma empresa de fora do país. O nível de organização é absurdo.", a: "Marina Prado", r: "Founder, Pallas Studio" },
  ];
  return (
    <section className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.map((x, i) => (
            <figure key={i} className="rounded-xl border border-border bg-card p-6">
              <blockquote className="text-[15px] leading-relaxed text-foreground">"{x.q}"</blockquote>
              <figcaption className="mt-5 text-[12px] text-muted-foreground">
                <span className="font-medium text-foreground">{x.a}</span> · {x.r}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    { q: "Como funciona o pagamento?", a: "Cada proposta define o modelo — entrada + parcelas, mensalidade fixa ou por milestone. O cliente paga por boleto, Pix ou cartão dentro da própria plataforma, com conciliação automática. Nada de cobrança manual." },
    { q: "Como acompanho meu projeto?", a: "Cada cliente entra na sua área exclusiva e vê o cronograma, as horas trabalhadas, os deploys, os arquivos, os pagamentos e o contrato — atualizados em tempo real. Sem precisar cobrar status." },
    { q: "Como funciona o contrato?", a: "O contrato é gerado digitalmente na plataforma, com validade jurídica (padrão eIDAS/ICP-Brasil). Assinatura em um clique, versionado e disponível para download a qualquer momento." },
    { q: "Posso solicitar alterações?", a: "Sim. Toda solicitação é registrada no projeto, avaliada pelo time e respeitada dentro do escopo contratado. Alterações fora do escopo geram um adendo com custo e prazo transparentes." },
    { q: "Como funciona o suporte?", a: "Após a entrega, você entra no plano de suporte contratado — com SLA definido, canal único e histórico completo. Nada de suporte informal por mensagem privada." },
    { q: "O cronograma muda se eu atrasar o envio dos materiais?", a: "Sim, automaticamente. Quando a pendência é do cliente, o cronograma pausa e o prazo é recalculado. Todo mundo vê o motivo, ninguém precisa cobrar, e a data de entrega volta a fazer sentido." },
  ];
  return (
    <section id="faq" className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">FAQ</p>
        <h2 className="mt-2 text-center font-display text-4xl font-semibold tracking-tight">Perguntas frequentes</h2>
        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-foreground">
                {f.q}
                <ChevronRight className="size-4 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="cta" className="relative overflow-hidden border-b border-border/70 py-24">
      <div className="absolute inset-0 teron-glow opacity-70" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <TeronMark className="mx-auto h-10 w-10 rounded-lg" />
        <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Pare de administrar projetos no WhatsApp.
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Comece a trabalhar como as empresas de tecnologia de referência. Um workspace único, cronograma transparente e cliente confiante desde o primeiro dia.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/login" className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90">
            Solicitar demonstração <ArrowRight className="size-3.5" />
          </Link>
          <Link to="/app" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent">
            Explorar plataforma
          </Link>
        </div>
        <p className="mt-6 text-[12px] text-muted-foreground">
          Sem cartão de crédito · Onboarding assistido · Migração cliente por cliente
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-[12px] text-muted-foreground">
        <TeronWordmark />
        <p>© {new Date().getFullYear()} TERON Studio · Engenharia de software como produto.</p>
        <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground">
          <Github className="size-3.5" /> github
        </a>
      </div>
    </footer>
  );
}
