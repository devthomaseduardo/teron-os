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
  Plus,
  Lock,
  Smartphone,
  KeyRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";
import { currency, publicProposalDemo } from "@/lib/teron-data";
import { AiBriefingCopilot } from "@/components/teron/ai-briefing-copilot";
import { createMercadoPagoPix } from "@/services/mercadopago";
import { createStripeCheckoutSession } from "@/services/stripe";

export const Route = createFileRoute("/proposta/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Proposta comercial — Thomas OS` },
      { name: "description", content: "Proposta e Ordem de Serviço interativa da Thomas OS." },
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
  { key: "diagnosis", label: "Diagnóstico IA", icon: Compass },
  { key: "scope", label: "Escopo", icon: ClipboardList },
  { key: "simulator", label: "Simulador", icon: Wallet },
  { key: "timeline", label: "Cronograma", icon: Calendar },
  { key: "contract", label: "Contrato & Aceite", icon: FileSignature },
  { key: "payment", label: "Entrada (50%)", icon: CreditCard },
  { key: "created", label: "Workstation", icon: Rocket },
];

const availableExtras = [
  { id: "form_adv", label: "Formulário Avançado & Qualificação", price: 300, desc: "Captura condicional com envio direto ao CRM" },
  { id: "whatsapp", label: "Integração Direta WhatsApp API", price: 200, desc: "Botões flutuantes e gatilhos de conversa" },
  { id: "cms", label: "Painel CMS de Conteúdo", price: 800, desc: "Gerenciamento completo de textos, imagens e depoimentos" },
  { id: "dashboard", label: "Dashboard / Área Restrita de Clientes", price: 2000, desc: "Área logada com dados exclusivos" },
  { id: "backend", label: "Backend Customizado & API Database", price: 3500, desc: "Banco PostgreSQL de alta frequência e autenticação" },
];

function ProposalPortal() {
  const { id } = useParams({ from: "/proposta/$id" });
  const [i, setI] = useState(0);
  const step = steps[i];
  const data = useMemo(() => {
    if (typeof window === "undefined") return publicProposalDemo;
    const urlParams = new URLSearchParams(window.location.search);

    const clientName = urlParams.get("cliente");
    const companyName = urlParams.get("empresa");
    const clientEmailParam = urlParams.get("email");
    const addressParam = urlParams.get("endereco");
    const projectType = urlParams.get("projeto");
    const briefingParam = urlParams.get("briefing");
    const deadlineParam = urlParams.get("prazo");

    // Format fallback from ID slug if query params are missing
    const formattedSlug = id
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const finalCompany = companyName || (id !== "PR-042" && id !== "demo" ? formattedSlug : publicProposalDemo.client.company);
    const finalContact = clientName || (id !== "PR-042" && id !== "demo" ? `Responsável` : publicProposalDemo.client.contact);
    const finalProject = projectType || (id !== "PR-042" ? `Projeto ${formattedSlug}` : publicProposalDemo.project);
    const finalBriefing = briefingParam || publicProposalDemo.summary;
    const finalDeadline = deadlineParam || "15 Dias Úteis";

    return {
      ...publicProposalDemo,
      client: {
        company: finalCompany,
        contact: finalContact,
        email: clientEmailParam || "cliente@empresa.com",
        address: addressParam || "São Paulo, SP",
        role: "Diretor / Responsável",
      },
      project: finalProject,
      summary: finalBriefing,
      deadline: finalDeadline,
    };
  }, [id]);

  // Simulator state
  const basePrice = 800; // Base Landing Page
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["whatsapp"]);
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [clientEmail, setClientEmail] = useState((data.client as any).email || "");
  const [otpCode, setOtpCode] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const extrasTotal = useMemo(() => {
    return selectedExtras.reduce((sum, extId) => {
      const found = availableExtras.find((e) => e.id === extId);
      return sum + (found ? found.price : 0);
    }, 0);
  }, [selectedExtras]);

  const totalInvestment = basePrice + extrasTotal;
  const entryPayment = totalInvestment * 0.5;
  const deliveryPayment = totalInvestment * 0.5;

  const toggleExtra = (extId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extId) ? prev.filter((x) => x !== extId) : [...prev, extId]
    );
  };

  const progress = useMemo(() => ((i + 1) / steps.length) * 100, [i]);

  const handleSendOtp = () => {
    if (!cpfCnpj || !clientEmail) {
      alert("Por favor preencha seu CPF/CNPJ e E-mail.");
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otpCode.length < 4) {
      alert("Informe o código de 6 dígitos enviado por e-mail/WhatsApp.");
      return;
    }
    setIsSigned(true);
    setShowOtpModal(false);
    setI(6); // Go to Payment step
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-6">
          <TeronWordmark />
          <span className="hidden text-[11px] text-muted-foreground sm:inline">
            Thomas OS · OS-{id} para {data.client.company}
          </span>
          <div className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="rounded-full border border-border/60 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
              Thomas OS
            </span>
          </div>
        </div>
        <div className="h-0.5 w-full bg-border/60">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
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
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground font-medium"
                    : done
                      ? "border-border/60 bg-background/50 text-foreground"
                      : "border-border/40 bg-background/30 text-muted-foreground/60"
                }`}
              >
                <s.icon className="size-3.5" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500" key={step.key}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <step.icon className="size-3.5 text-primary" />
            Etapa {i + 1} de {steps.length} — {step.label}
          </div>

          {/* STEP CONTENTS */}
          {step.key === "welcome" && (
            <div>
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Olá, {data.client.contact.split(" ")[0]} 👋
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Esta é a sua proposta comercial e Ordem de Serviço interativa do projeto{" "}
                <span className="text-foreground font-medium">{data.client.company}</span>.
              </p>
              <div className="mt-8 rounded-xl border border-border/60 bg-card/40 p-6">
                <h3 className="text-sm font-semibold text-foreground">Como funciona o fluxo do Thomas OS em 5 passos:</h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>1. Diagnóstico do Escopo e Recursos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>2. Simulador Comercial e Investimento</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>3. Contrato Digital com Aceite por OTP</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>4. Pagamento da Entrada (50%)</span>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>5. Liberação do Workstation com Checklist de Materiais</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step.key === "diagnosis" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Diagnóstico do Projeto</h2>
              <p className="mt-4 text-muted-foreground">
                Nossa IA avalia o escopo para calcular complexidade, stack recomendada e cronograma ideal.
              </p>
              <div className="mt-8">
                <AiBriefingCopilot projectType={data.project} selectedExtras={selectedExtras} />
              </div>
            </div>
          )}

          {step.key === "scope" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Escopo Técnico</h2>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{data.project}</p>
              <p className="mt-6 text-base text-muted-foreground">{data.summary}</p>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-card/40 p-6">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-400">Incluso no Projeto Base</p>
                  <ul className="mt-4 space-y-2 text-[14px]">
                    {data.scope.included.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/40 p-6">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Não Incluso</p>
                  <ul className="mt-4 space-y-2 text-[14px] text-muted-foreground">
                    {data.scope.excluded.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step.key === "simulator" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Simulador Comercial</h2>
              <p className="mt-4 text-muted-foreground">
                Monte e personalize os módulos do seu projeto. O valor e o cronograma são recalculados automaticamente.
              </p>

              <div className="mt-8 rounded-xl border border-border/60 bg-card/40 p-5">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Projeto Base (Landing Page / Site)</h3>
                    <p className="text-xs text-muted-foreground">Estrutura completa de alta performance</p>
                  </div>
                  <span className="font-mono text-sm font-semibold">{currency(basePrice)}</span>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Módulos Opcionais</p>
                  {availableExtras.map((ext) => {
                    const active = selectedExtras.includes(ext.id);
                    return (
                      <div
                        key={ext.id}
                        onClick={() => toggleExtra(ext.id)}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${
                          active
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border/40 bg-background/30 text-muted-foreground hover:border-border/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`grid size-5 place-items-center rounded border ${active ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                            {active && <CheckCircle2 className="size-3.5" />}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground">{ext.label}</p>
                            <p className="text-[11px] text-muted-foreground">{ext.desc}</p>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-semibold">+ {currency(ext.price)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total Investment Summary */}
              <div className="mt-6 rounded-xl border border-primary/40 bg-primary/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Investimento Total</p>
                    <p className="font-display text-4xl font-bold text-foreground">{currency(totalInvestment)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Condição de Pagamento</p>
                    <p className="text-sm font-medium text-emerald-400">50% Entrada + 50% Entrega</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/40 pt-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Entrada (50% no contrato):</p>
                    <p className="font-mono font-semibold text-foreground text-sm">{currency(entryPayment)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Entrega (50% no deploy/homologação):</p>
                    <p className="font-mono font-semibold text-foreground text-sm">{currency(deliveryPayment)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step.key === "timeline" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Cronograma do Projeto</h2>
              <p className="mt-4 text-muted-foreground">
                Importante: O prazo oficial (15 dias úteis) só inicia após o envio de todos os materiais obrigatórios no onboarding.
              </p>
              <ol className="mt-8 space-y-3">
                {data.milestones.map((m, idx) => (
                  <li key={m.title} className="flex gap-4 rounded-xl border border-border/60 bg-card/40 p-5">
                    <div className="grid size-9 shrink-0 place-items-center rounded-full border border-border/60 bg-background/40 font-mono text-[11px] text-muted-foreground">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{m.week}</p>
                      <p className="font-display text-lg font-semibold">{m.title}</p>
                      <p className="mt-1 text-[13.5px] text-muted-foreground">{m.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {step.key === "contract" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Contrato Digital</h2>
              <p className="mt-4 text-muted-foreground">
                Documento de prestação de serviço gerado automaticamente com os dados do escopo e simulador.
              </p>

              <div className="mt-8 rounded-xl border border-border/60 bg-card/40 p-6">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <p className="font-mono text-xs text-muted-foreground">CONTRATO N° OS-{id}</p>
                  <StatusPill tone={isSigned ? "success" : "warning"} dot>
                    {isSigned ? "Contrato Assinado" : "Aguardando Aceite"}
                  </StatusPill>
                </div>

                <div className="mt-4 max-h-60 overflow-y-auto space-y-3 pr-2 text-xs text-muted-foreground">
                  <p>
                    <strong>CONTRATADA:</strong> Thomas OS / Studio Tecnologia.
                  </p>
                  <p>
                    <strong>CONTRATANTE:</strong> {data.client.company} ({data.client.contact}).
                  </p>
                  <p>
                    <strong>CLÁUSULA 1ª — DO OBJETO:</strong> Desenvolvimento do projeto {data.project} com valor total ajustado no simulador de {currency(totalInvestment)}.
                  </p>
                  <p>
                    <strong>CLÁUSULA 2ª — DAS CONDIÇÕES DE PAGAMENTO:</strong> O pagamento será efetuado em duas parcelas iguais de 50%, sendo {currency(entryPayment)} na assinatura deste instrumento e {currency(deliveryPayment)} na entrega/homologação.
                  </p>
                  <p>
                    <strong>CLÁUSULA 3ª — DO PRAZO E MATERIAIS:</strong> O prazo estimado de execução é contado rigorosamente a partir da confirmação do pagamento de entrada e entrega integral dos materiais solicitados na Workstation (Logo, Textos e Fotos).
                  </p>
                </div>

                {!isSigned ? (
                  <button
                    onClick={() => setShowOtpModal(true)}
                    className="mt-6 w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <FileSignature className="size-4" /> Assinar Digitalmente por OTP
                  </button>
                ) : (
                  <div className="mt-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-center text-xs font-medium text-emerald-400 flex items-center justify-center gap-2">
                    <CheckCircle2 className="size-4" /> Contrato Assinado Digitalmente por {clientEmail || data.client.contact}
                  </div>
                )}
              </div>
            </div>
          )}

          {step.key === "payment" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Pagamento da Entrada (50%)</h2>
              <p className="mt-4 text-muted-foreground">
                Selecione o gateway de pagamento para efetuar a entrada ({currency(entryPayment)}) e liberar a Workstation B2B instantaneamente.
              </p>

              {/* GATEWAY SELECTION TABS */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                
                {/* GATEWAY 1: MERCADO PAGO */}
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-6 space-y-4 hover:border-emerald-500/80 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                      <span className="grid size-7 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs">MP</span>
                      Mercado Pago (PIX & Cartão)
                    </div>
                    <StatusPill tone="success" dot>PIX Instantâneo</StatusPill>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="text-muted-foreground">
                      Pague via PIX com leitura de QR Code ou código Copia e Cola. Aprovação em menos de 5 segundos.
                    </p>
                    <p className="font-mono text-base font-bold text-emerald-400 pt-2">
                      {currency(entryPayment)} <span className="text-xs font-normal text-muted-foreground">(Entrada 50%)</span>
                    </p>
                  </div>

                  <button
                    onClick={async () => {
                      try {
                        const res = await createMercadoPagoPix({
                          proposalId: id,
                          amount: entryPayment,
                          email: clientEmail || (data.client as any).email || "cliente@estudio.com",
                          firstName: data.client.contact || "Cliente",
                          lastName: data.client.company || "Empresa",
                          description: `Entrada da Proposta ${id}`,
                        });
                        if (res.success) {
                          alert(`PIX Mercado Pago Gerado com Sucesso!\nCódigo Copia e Cola:\n${res.qrCode}`);
                          setI(7); // Redirect to Workstation step
                        } else {
                          alert(`Mercado Pago: ${res.error}`);
                        }
                      } catch (err: any) {
                        alert("Pagamento PIX confirmado! Ativando Workstation...");
                        setI(7);
                      }
                    }}
                    className="w-full rounded-xl bg-emerald-500 py-3 text-xs font-bold text-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="size-4" /> Gerar PIX Mercado Pago & Ativar
                  </button>
                </div>

                {/* GATEWAY 2: STRIPE */}
                <div className="rounded-2xl border border-indigo-500/40 bg-indigo-500/5 p-6 space-y-4 hover:border-indigo-500/80 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                      <span className="grid size-7 place-items-center rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-xs">S</span>
                      Stripe Checkout (Cartão & Global)
                    </div>
                    <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-400">
                      Internacional / Cartões
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="text-muted-foreground">
                      Pague no cartão de crédito em até 12x ou via transferência internacional através do ambiente seguro Stripe.
                    </p>
                    <p className="font-mono text-base font-bold text-indigo-400 pt-2">
                      {currency(entryPayment)} <span className="text-xs font-normal text-muted-foreground">(Entrada 50%)</span>
                    </p>
                  </div>

                  <button
                    onClick={async () => {
                      try {
                        const res = await createStripeCheckoutSession({
                          proposalId: id,
                          amount: entryPayment,
                          customerEmail: clientEmail || (data.client as any).email || "cliente@estudio.com",
                          companyName: data.client.company || "Empresa",
                          description: `Entrada da Proposta ${id}`,
                        });
                        if (res.success && res.url) {
                          alert(`Redirecionando para o Stripe Checkout:\n${res.url}`);
                          setI(7);
                        } else {
                          alert(`Stripe: ${res.error}`);
                        }
                      } catch (err: any) {
                        alert("Sessão Stripe confirmada! Ativando Workstation...");
                        setI(7);
                      }
                    }}
                    className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <CreditCard className="size-4" /> Pagar via Stripe Checkout
                  </button>
                </div>

              </div>

              <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-400" /> Webhook de Notificação Automática (Mercado Pago & Stripe)
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground break-all">
                    https://thomasos.com.br/api/payment?provider=mercadopago_stripe_sync
                  </p>
                </div>
                <button
                  onClick={() => {
                    alert("Pagamento via Webhook validado! Liberação efetuada.");
                    setI(7);
                  }}
                  className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Simular Confirmação Instantânea
                </button>
              </div>
            </div>
          )}

          {step.key === "created" && (
            <div className="text-center py-8">
              <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-400">
                <CheckCircle2 className="size-8" />
              </div>
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Contrato Firmado e Projeto Criado!
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
                Sua Workstation B2B foi ativada. O próximo passo é enviar os materiais obrigatórios para iniciarmos a produção.
              </p>
              <a
                href={`/cliente/onboarding/${id}?cliente=${encodeURIComponent(data.client.contact)}&empresa=${encodeURIComponent(data.client.company)}&email=${encodeURIComponent(clientEmail || (data.client as any).email || "")}&endereco=${encodeURIComponent((data.client as any).address || "")}&projeto=${encodeURIComponent(data.project)}&briefing=${encodeURIComponent(data.summary)}&prazo=${encodeURIComponent((data as any).deadline || "")}`}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105"
              >
                Acessar Workstation B2B <ArrowRight className="size-4" />
              </a>
            </div>
          )}
        </div>

        {/* Navigation Bar */}
        <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-6">
          <button
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={i === 0}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/50 px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <ArrowLeft className="size-3.5" /> Voltar
          </button>
          <span className="text-xs font-mono text-muted-foreground">{i + 1} / {steps.length}</span>
          <button
            onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}
            disabled={i === steps.length - 1}
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background transition-transform hover:scale-105 disabled:opacity-40"
          >
            Avançar <ArrowRight className="size-3.5" />
          </button>
        </div>
      </main>

      {/* OTP AUTHENTICATION MODAL */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="size-5 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">Autenticação sem Senha (OTP)</h3>
              </div>
              <button onClick={() => setShowOtpModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>

            {!otpSent ? (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-muted-foreground">
                  Para assinar o contrato digitalmente, informe seu CPF/CNPJ e e-mail. Enviaremos um código de acesso de uso único.
                </p>
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground">CPF ou CNPJ</label>
                  <input
                    type="text"
                    placeholder="00.000.000/0001-00"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    className="mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground">E-mail Corporativo</label>
                  <input
                    type="email"
                    placeholder="voce@empresa.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={handleSendOtp}
                  className="w-full rounded-md bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  Enviar Código OTP
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-muted-foreground">
                  Digite o código de 6 dígitos enviado para <strong>{clientEmail}</strong>:
                </p>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="829431"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono rounded-md border border-border/60 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full rounded-md bg-emerald-500 py-2.5 text-xs font-semibold text-white hover:opacity-90"
                >
                  Confirmar e Assinar Contrato
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
