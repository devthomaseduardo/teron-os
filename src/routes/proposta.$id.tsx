import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Compass,
  CreditCard,
  FileSignature,
  HelpCircle,
  MessageSquare,
  Rocket,
  Scale,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";
import { currency, publicProposalDemo } from "@/lib/teron-data";

export const Route = createFileRoute("/proposta/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Proposta ${params.id} — TERON OS` },
      { name: "description", content: "Proposta comercial interativa da TERON." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProposalPortal,
});

type Step = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const steps: Step[] = [
  { key: "welcome", label: "Boas-vindas", icon: Sparkles },
  { key: "about", label: "Sobre a TERON", icon: Building2 },
  { key: "how", label: "Como trabalhamos", icon: Compass },
  { key: "scope", label: "Escopo", icon: ClipboardList },
  { key: "inout", label: "Incluso / Não incluso", icon: CheckCircle2 },
  { key: "timeline", label: "Cronograma", icon: Calendar },
  { key: "client-area", label: "Área do cliente", icon: MessageSquare },
  { key: "investment", label: "Investimento", icon: Wallet },
  { key: "policies", label: "Políticas", icon: Scale },
  { key: "faq", label: "FAQ", icon: HelpCircle },
  { key: "accept", label: "Aceite", icon: ShieldCheck },
  { key: "contract", label: "Contrato", icon: FileSignature },
  { key: "payment", label: "Pagamento", icon: CreditCard },
  { key: "created", label: "Projeto criado", icon: Rocket },
];

function ProposalPortal() {
  const { id } = useParams({ from: "/proposta/$id" });
  const [i, setI] = useState(0);
  const step = steps[i];
  const data = publicProposalDemo;
  const progress = useMemo(() => ((i + 1) / steps.length) * 100, [i]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-6">
          <TeronWordmark />
          <span className="hidden text-[11px] text-muted-foreground sm:inline">Proposta {data.code} para {data.client.company}</span>
          <div className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="rounded-full border border-border/60 px-2 py-0.5 font-mono">{id}</span>
          </div>
        </div>
        <div className="h-0.5 w-full bg-border/60">
          <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* Stepper */}
      <div className="border-b border-border/60 bg-card/30">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-6 py-3 text-[11.5px]">
          {steps.map((s, idx) => {
            const active = idx === i;
            const done = idx < i;
            return (
              <button
                key={s.key}
                onClick={() => setI(idx)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors ${
                  active
                    ? "border-foreground/40 bg-foreground text-background"
                    : done
                      ? "border-border/60 bg-background/50 text-muted-foreground"
                      : "border-border/40 bg-background/30 text-muted-foreground/60"
                }`}
              >
                <span className="font-mono text-[10px]">{String(idx + 1).padStart(2, "0")}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500" key={step.key}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <step.icon className="size-3.5" />
            Etapa {i + 1} de {steps.length}
          </div>
          <StepContent stepKey={step.key} data={data} />
        </div>

        {/* Nav */}
        <div className="mt-16 flex items-center justify-between gap-3">
          <button
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={i === 0}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/50 px-3.5 py-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <ArrowLeft className="size-3.5" /> Voltar
          </button>
          <span className="text-[11px] text-muted-foreground">{i + 1} / {steps.length}</span>
          <button
            onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}
            disabled={i === steps.length - 1}
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-transform hover:scale-[1.02] disabled:opacity-40"
          >
            Continuar <ArrowRight className="size-3.5" />
          </button>
        </div>
      </main>
    </div>
  );
}

function StepContent({ stepKey, data }: { stepKey: string; data: typeof publicProposalDemo }) {
  switch (stepKey) {
    case "welcome":
      return (
        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Olá, {data.client.contact.split(" ")[0]}.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Preparamos esta proposta com muito cuidado. Ela conta quem somos, como trabalhamos e como podemos construir <span className="text-foreground">{data.project}</span> junto com a {data.client.company}.
          </p>
          <p className="mt-4 text-muted-foreground">Reserve 5 minutos. Vale a pena.</p>
        </div>
      );
    case "about":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Sobre a TERON</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Somos uma empresa de tecnologia. Construímos produtos digitais para empresas que querem escalar com previsibilidade — não com sorte.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: "50+", l: "projetos entregues" },
              { n: "12", l: "países atendidos" },
              { n: "96%", l: "satisfação (CSAT)" },
              { n: "8y", l: "de operação" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl font-semibold text-foreground">{s.n}</p>
                <p className="mt-1 text-[12px] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "how":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Como trabalhamos</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Toda a operação acontece dentro do TERON OS. Você tem visibilidade total, sem depender do WhatsApp da equipe.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Um Product Lead dedicado como seu ponto único de contato.",
              "Sprints semanais com aprovações registradas e versionadas.",
              "Cronograma que pausa automaticamente quando dependemos de você.",
              "Chat, arquivos e histórico centralizados — nada por WhatsApp.",
              "Cobrança automática por marcos, com nota fiscal emitida na hora.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/40 p-4 text-[14px]">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" /> {t}
              </li>
            ))}
          </ul>
        </div>
      );
    case "scope":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Escopo</h2>
          <p className="mt-4 text-[11px] uppercase tracking-widest text-muted-foreground">{data.project}</p>
          <p className="mt-6 text-lg text-muted-foreground">{data.summary}</p>
        </div>
      );
    case "inout":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">O que está incluso</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-card/40 p-6">
              <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-400">Incluso</p>
              <ul className="mt-4 space-y-2 text-[14px]">
                {data.scope.included.map((s) => (
                  <li key={s} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 p-6">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Não incluso</p>
              <ul className="mt-4 space-y-2 text-[14px] text-muted-foreground">
                {data.scope.excluded.map((s) => (
                  <li key={s} className="flex items-start gap-2"><X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    case "timeline":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Cronograma</h2>
          <p className="mt-4 text-muted-foreground">Duração estimada: <span className="text-foreground">{data.timelineWeeks} semanas</span>, contadas após o recebimento de todos os materiais do onboarding.</p>
          <ol className="mt-10 space-y-3">
            {data.milestones.map((m, i) => (
              <li key={m.title} className="flex gap-4 rounded-xl border border-border/60 bg-card/40 p-5">
                <div className="grid size-9 shrink-0 place-items-center rounded-full border border-border/60 bg-background/40 font-mono text-[11px] text-muted-foreground">{i + 1}</div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{m.week}</p>
                  <p className="font-display text-lg font-semibold">{m.title}</p>
                  <p className="mt-1 text-[13.5px] text-muted-foreground">{m.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case "client-area":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Sua área exclusiva</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A partir do aceite, você recebe acesso ao TERON OS. Um workspace privado para acompanhar tudo:
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["Cronograma vivo", "Aprovações versionadas", "Chat do projeto", "Materiais & arquivos", "Faturas & pagamentos", "Base de conhecimento"].map((c) => (
              <div key={c} className="rounded-lg border border-border/60 bg-card/40 p-4 text-[13.5px]">{c}</div>
            ))}
          </div>
        </div>
      );
    case "investment":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Investimento</h2>
          <p className="mt-6 text-6xl font-display font-semibold tracking-tight">{currency(data.amount)}</p>
          <p className="mt-2 text-muted-foreground">Parcelado por marcos, com nota fiscal em cada pagamento.</p>
          <div className="mt-10 divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60 bg-card/40">
            {data.installments.map((p) => (
              <div key={p.label} className="flex items-center justify-between px-5 py-4 text-[14px]">
                <div>
                  <p className="font-medium">{p.label}</p>
                  <p className="text-[12px] text-muted-foreground">{p.when}</p>
                </div>
                <p className="font-mono text-foreground">{currency(p.value)}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "policies":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Políticas comerciais</h2>
          <ul className="mt-8 space-y-3">
            {data.policies.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/40 p-4 text-[14px]">
                <Scale className="mt-0.5 size-4 shrink-0 text-muted-foreground" /> {p}
              </li>
            ))}
          </ul>
        </div>
      );
    case "faq":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Perguntas frequentes</h2>
          <div className="mt-8 space-y-3">
            {data.faqs.map((f) => (
              <details key={f.q} className="group rounded-lg border border-border/60 bg-card/40 p-5 open:bg-card/60">
                <summary className="cursor-pointer list-none text-[14.5px] font-medium">{f.q}</summary>
                <p className="mt-2 text-[13.5px] text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      );
    case "accept":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Aceite</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Ao clicar em "Aceitar proposta", você confirma que leu e concorda com o escopo, cronograma, investimento e políticas.
          </p>
          <div className="mt-10 rounded-xl border border-border/60 bg-card/40 p-6">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-primary/15 text-primary"><ShieldCheck className="size-5" /></div>
              <div>
                <p className="font-medium">{data.client.contact}</p>
                <p className="text-[12px] text-muted-foreground">{data.client.role} · {data.client.company}</p>
              </div>
              <StatusPill tone="warning" dot className="ml-auto">Aguardando aceite</StatusPill>
            </div>
            <button className="mt-6 w-full rounded-md bg-foreground py-3 text-[14px] font-medium text-background transition-transform hover:scale-[1.01]">
              Aceitar proposta
            </button>
          </div>
        </div>
      );
    case "contract":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Contrato digital</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Contrato gerado automaticamente com base na proposta aceita. Assinatura eletrônica com validade jurídica.
          </p>
          <div className="mt-10 rounded-xl border border-border/60 bg-card/40 p-6">
            <p className="font-mono text-[11px] text-muted-foreground">CONTRATO DE PRESTAÇÃO DE SERVIÇOS · {data.code}</p>
            <div className="mt-4 max-h-56 space-y-2 overflow-y-auto text-[13px] text-muted-foreground">
              <p>Pelo presente instrumento particular, a TERON e a {data.client.company} firmam contrato para o desenvolvimento de {data.project}, no valor de {currency(data.amount)}, conforme cronograma e políticas anexos…</p>
              <p>Cláusula 1ª — Do objeto. O objeto do presente contrato compreende os serviços descritos no escopo aceito digitalmente pela CONTRATANTE em {new Date().toLocaleDateString("pt-BR")}.</p>
              <p>Cláusula 2ª — Do prazo. O prazo será contabilizado a partir do recebimento integral dos materiais do onboarding.</p>
              <p>Cláusula 3ª — Do pagamento. O pagamento será efetuado conforme cronograma de marcos anexo.</p>
            </div>
            <button className="mt-6 w-full rounded-md bg-foreground py-3 text-[14px] font-medium text-background">Assinar digitalmente</button>
          </div>
        </div>
      );
    case "payment":
      return (
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Pagamento da entrada</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Escolha a forma de pagamento. O projeto é criado automaticamente após a confirmação.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["Cartão de crédito", "PIX", "Boleto"].map((m) => (
              <button key={m} className="rounded-xl border border-border/60 bg-card/40 p-5 text-left text-[14px] transition-colors hover:bg-card/70">
                <p className="font-medium">{m}</p>
                <p className="mt-1 text-[12px] text-muted-foreground">{currency(data.installments[0].value)}</p>
              </button>
            ))}
          </div>
        </div>
      );
    case "created":
      return (
        <div className="text-center">
          <div className="mx-auto mb-8 grid size-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-400">
            <CheckCircle2 className="size-8" />
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">Projeto criado.</h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Seu workspace no TERON OS foi liberado. Já enviamos um e-mail com seu acesso e o próximo passo: o onboarding do projeto.
          </p>
          <a href="/cliente/onboarding/p6" className="mt-10 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90">
            Ir para o onboarding <ArrowRight className="size-4" />
          </a>
        </div>
      );
    default:
      return null;
  }
}
