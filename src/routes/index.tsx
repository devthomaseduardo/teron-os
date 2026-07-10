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

function ProductShowcase() {
  const features = [
    { icon: LayoutDashboard, title: "Workspace inteligente", body: "Abre respondendo a única pergunta que importa: o que precisa da minha atenção hoje?" },
    { icon: FileText, title: "Propostas que convertem", body: "Geração profissional com escopo, cronograma, tecnologias e assinatura em um clique." },
    { icon: FileSignature, title: "Contratos e assinaturas", body: "Assinatura digital, versionamento e histórico completo — pronto para download em PDF." },
    { icon: Zap, title: "Pagamentos integrados", body: "Cobrança recorrente, parcelas, multas, juros e reconciliação automática." },
    { icon: MessageSquare, title: "Sem WhatsApp perdido", body: "Toda comunicação dentro do projeto. Nada de conversa importante em outro app." },
    { icon: Shield, title: "Transparência total", body: "Quando a pendência é do cliente, o cronograma pausa. Todo mundo sabe o motivo." },
  ];
  return (
    <section id="produto" className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">O produto</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            Uma plataforma. Toda a experiência do cliente.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Do primeiro contato ao deploy final. Cada tela pensada para reduzir atrito, aumentar clareza e transmitir a organização que o seu preço merece.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border/70 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group bg-background p-6 transition-colors hover:bg-card">
              <div className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card">
                <f.icon className="size-4 text-foreground" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { n: "01", t: "Diagnóstico", d: "Conversa estruturada. Escopo, riscos e objetivos claros antes de qualquer proposta." },
    { n: "02", t: "Proposta assinada", d: "Documento gerado na plataforma, aprovado com um clique, convertido em projeto." },
    { n: "03", t: "Execução com visibilidade", d: "Cronograma, horas, deploys e entregas visíveis em tempo real para o cliente." },
    { n: "04", t: "Handover organizado", d: "Documentação técnica, wiki, credenciais e acompanhamento pós-entrega no mesmo lugar." },
  ];
  return (
    <section id="processo" className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Processo</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Um método claro do primeiro contato à entrega.
            </h2>
          </div>
          <StatusPill tone="info" dot>4 etapas · 100% na plataforma</StatusPill>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-[11px] text-muted-foreground">{s.n}</p>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { t: "MVPs em 6 semanas", d: "Do zero ao produto validado com usuários reais." },
    { t: "Plataformas SaaS", d: "Produtos multi-tenant, com billing, auth e infra em produção." },
    { t: "Automações e integrações", d: "Fluxos internos e integrações entre sistemas críticos." },
    { t: "Reengenharia de produto", d: "Modernização de bases legadas com risco controlado." },
  ];
  return (
    <section id="servicos" className="border-b border-border/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Serviços</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Engenharia de software feita como produto.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Trabalhamos com poucos clientes por trimestre. Cada projeto recebe planejamento, execução e acompanhamento no mesmo padrão de qualidade.
            </p>
            <a href="#cta" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:opacity-80">
              Iniciar conversa <ArrowUpRight className="size-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <div key={s.t} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold">{s.t}</h3>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
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
    { q: "Preciso migrar todos os meus clientes de uma vez?", a: "Não. Você pode migrar cliente por cliente. A TERON convive com processos legados durante a transição." },
    { q: "Quem paga as taxas de pagamento?", a: "Você configura por proposta. Repasse, absorção ou modelo híbrido, tudo transparente para o cliente." },
    { q: "Consigo personalizar o portal para minha marca?", a: "Sim. Logo, cores, domínio próprio e templates de e-mail já vêm de fábrica." },
    { q: "Como funciona a assinatura digital?", a: "Contratos são assinados com validade jurídica (padrão eIDAS/ICP-Brasil). Toda versão fica versionada em auditoria." },
    { q: "E se um cliente atrasar o envio de material?", a: "O cronograma pausa automaticamente. O prazo é recalculado e o cliente é notificado do impacto." },
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
          Pronto para operar como um estúdio de outro nível?
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Ative a TERON hoje. Suba sua primeira proposta em menos de 20 minutos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/app" className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90">
            Abrir workspace <ArrowRight className="size-3.5" />
          </Link>
          <Link to="/login" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent">
            Entrar
          </Link>
        </div>
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
