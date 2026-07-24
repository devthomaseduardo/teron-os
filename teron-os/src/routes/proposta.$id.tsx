import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Compass,
  CreditCard,
  FileSignature,
  Loader2,
  Rocket,
  Sparkles,
  Wallet,
  X,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";
import { currency } from "@/lib/teron-data";
import { AiBriefingCopilot } from "@/components/teron/ai-briefing-copilot";
import { createMercadoPagoPix } from "@/services/mercadopago";
import { createStripeCheckoutSession } from "@/services/stripe";
import { useProposal } from "@/hooks/use-proposal";

export const Route = createFileRoute("/proposta/$id")({
  head: () => ({
    meta: [
      { title: "Proposta comercial — TERON OS" },
      { name: "description", content: "Proposta e Ordem de Serviço interativa da TERON OS." },
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

const defaultIncluded = [
  "Descoberta e alinhamento de escopo",
  "Design e estrutura da solução",
  "Desenvolvimento sob medida",
  "Homologação com o cliente",
  "Deploy em ambiente produtivo",
  "Suporte pós-entrega (30 dias)",
];

const defaultExcluded = [
  "Aplicativo mobile nativo",
  "Migração de dados legados complexos",
  "Treinamentos presenciais",
  "SLA 24/7",
];

const defaultMilestones = [
  { week: "Semana 1", title: "Kickoff & materiais", detail: "Alinhamento, acessos e checklist de onboarding." },
  { week: "Semana 2-3", title: "Design & arquitetura", detail: "Protótipos, stack e validação do fluxo." },
  { week: "Semana 4-6", title: "Desenvolvimento", detail: "Implementação do escopo aprovado." },
  { week: "Semana 7", title: "QA & homologação", detail: "Testes e ajustes finais com o cliente." },
  { week: "Semana 8", title: "Go-live", detail: "Deploy, monitoramento e handover." },
];

function ProposalPortal() {
  const { id } = useParams({ from: "/proposta/$id" });
  const { data: apiData, view, loading, error, accept } = useProposal(id);

  const [i, setI] = useState(0);
  const step = steps[i];

  // Simulator
  const baseFromApi = apiData?.amount && apiData.amount > 0 ? apiData.amount : 0;
  const basePrice = baseFromApi > 0 ? baseFromApi : 800;
  const [selectedExtras, setSelectedExtras] = useState<string[]>(baseFromApi > 0 ? [] : ["whatsapp"]);
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [workstationUrl, setWorkstationUrl] = useState<string | null>(null);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  // Sync email e status já aceito da API
  useEffect(() => {
    if (view?.client?.email) setClientEmail(view.client.email);
    if (apiData?.status === "aceita" || apiData?.acceptedAt) {
      setIsSigned(true);
      if (apiData.project?.clientAccessToken) {
        setWorkstationUrl(`/cliente/onboarding/${apiData.project.clientAccessToken}`);
      }
    }
  }, [view, apiData]);

  const client = view?.client || {
    company: "Cliente",
    contact: "Responsável",
    email: "",
    address: "",
    role: "Responsável",
  };
  const projectTitle = view?.project || "Projeto sob medida";
  const summary = view?.summary || "Proposta comercial gerada via TERON OS.";
  const deadline = view?.deadline || "A definir";

  const extrasTotal = useMemo(() => {
    return selectedExtras.reduce((sum, extId) => {
      const found = availableExtras.find((e) => e.id === extId);
      return sum + (found ? found.price : 0);
    }, 0);
  }, [selectedExtras]);

  const totalInvestment = basePrice + extrasTotal;
  const entryPayment = (apiData?.entryAmount && apiData.entryAmount > 0)
    ? apiData.entryAmount
    : totalInvestment * 0.5;
  const deliveryPayment = totalInvestment - entryPayment;

  const toggleExtra = (extId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extId) ? prev.filter((x) => x !== extId) : [...prev, extId]
    );
  };

  const progress = useMemo(() => ((i + 1) / steps.length) * 100, [i]);

  const handleSendOtp = () => {
    if (!cpfCnpj || !clientEmail) {
      alert("Preencha CPF/CNPJ e e-mail.");
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length < 4) {
      alert("Informe o código enviado.");
      return;
    }
    setAccepting(true);
    setAcceptError(null);
    try {
      // Aceita no banco → cria Project + clientAccessToken
      const result = await accept();
      setIsSigned(true);
      setShowOtpModal(false);
      if (result.workstationUrl) {
        setWorkstationUrl(result.workstationUrl);
      } else if (result.project?.clientAccessToken) {
        setWorkstationUrl(`/cliente/onboarding/${result.project.clientAccessToken}`);
      }
      setI(6); // pagamento
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Falha ao registrar aceite";
      setAcceptError(msg);
      // Ainda permite seguir offline se API falhar
      setIsSigned(true);
      setShowOtpModal(false);
      setI(6);
    } finally {
      setAccepting(false);
    }
  };

  const goToWorkstation = async () => {
    // Garante Project criado mesmo se veio direto do pagamento
    if (!workstationUrl) {
      try {
        const result = await accept();
        if (result.workstationUrl) {
          setWorkstationUrl(result.workstationUrl);
          window.location.href = result.workstationUrl;
          return;
        }
        if (result.project?.clientAccessToken) {
          const url = `/cliente/onboarding/${result.project.clientAccessToken}`;
          setWorkstationUrl(url);
          window.location.href = url;
          return;
        }
      } catch {
        /* fallback */
      }
    }
    if (workstationUrl) {
      window.location.href = workstationUrl;
      return;
    }
    // Fallback legado
    window.location.href = `/cliente/onboarding/${id}?cliente=${encodeURIComponent(client.contact)}&empresa=${encodeURIComponent(client.company)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm">Carregando proposta...</p>
      </div>
    );
  }

  // Só bloqueia se não houver dados da API nem query params (view null)
  if (error && !view) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
        <AlertTriangle className="size-10 text-amber-400" />
        <h1 className="font-display text-2xl font-semibold">Proposta indisponível</h1>
        <p className="text-sm text-muted-foreground max-w-md">{error}</p>
        <a href="https://os.thomaseduardo.com.br" className="text-xs text-primary underline">
          Voltar ao site
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-6">
          <TeronWordmark />
          <span className="hidden text-[11px] text-muted-foreground sm:inline">
            TERON OS · {id.slice(0, 16)}{id.length > 16 ? "…" : ""} · {client.company}
          </span>
          <div className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground">
            {apiData ? (
              <StatusPill tone={apiData.status === "aceita" ? "success" : "info"} dot>
                {apiData.status}
              </StatusPill>
            ) : (
              <span className="rounded-full border border-border/60 px-2.5 py-0.5 font-mono text-xs">
                link direto
              </span>
            )}
          </div>
        </div>
        <div className="h-0.5 w-full bg-border/60">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

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

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500" key={step.key}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <step.icon className="size-3.5 text-primary" />
            Etapa {i + 1} de {steps.length} — {step.label}
          </div>

          {step.key === "welcome" && (
            <div>
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Olá, {client.contact.split(" ")[0]} 👋
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Proposta comercial e Ordem de Serviço interativa do projeto{" "}
                <span className="text-foreground font-medium">{client.company}</span>.
              </p>
              <div className="mt-8 rounded-xl border border-border/60 bg-card/40 p-6">
                <h3 className="text-sm font-semibold">Como funciona em 5 passos:</h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-muted-foreground">
                  {[
                    "1. Diagnóstico do escopo",
                    "2. Simulador e investimento",
                    "3. Contrato digital (OTP)",
                    "4. Pagamento da entrada (50%)",
                    "5. Workstation e checklist",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step.key === "diagnosis" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Diagnóstico do Projeto</h2>
              <p className="mt-4 text-muted-foreground">
                Avaliação de escopo, stack e cronograma com base no briefing.
              </p>
              <div className="mt-8">
                <AiBriefingCopilot projectType={projectTitle} selectedExtras={selectedExtras} />
              </div>
            </div>
          )}

          {step.key === "scope" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Escopo Técnico</h2>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{projectTitle}</p>
              <p className="mt-6 text-base text-muted-foreground">{summary}</p>
              {deadline && (
                <p className="mt-2 text-xs text-muted-foreground">Prazo indicado: <strong className="text-foreground">{deadline}</strong></p>
              )}
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-card/40 p-6">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-400">Incluso</p>
                  <ul className="mt-4 space-y-2 text-[14px]">
                    {defaultIncluded.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/40 p-6">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Não incluso</p>
                  <ul className="mt-4 space-y-2 text-[14px] text-muted-foreground">
                    {defaultExcluded.map((s) => (
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
                Personalize módulos. Valores recalculados automaticamente.
              </p>

              <div className="mt-8 rounded-xl border border-border/60 bg-card/40 p-5">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h3 className="font-semibold">{projectTitle}</h3>
                    <p className="text-xs text-muted-foreground">Base da proposta</p>
                  </div>
                  <span className="font-mono text-sm font-semibold">{currency(basePrice)}</span>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Módulos opcionais</p>
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

              <div className="mt-6 rounded-xl border border-primary/40 bg-primary/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Investimento total</p>
                    <p className="font-display text-4xl font-bold">{currency(totalInvestment)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Condição</p>
                    <p className="text-sm font-medium text-emerald-400">50% entrada + 50% entrega</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/40 pt-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Entrada:</p>
                    <p className="font-mono font-semibold text-sm">{currency(entryPayment)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Entrega:</p>
                    <p className="font-mono font-semibold text-sm">{currency(deliveryPayment)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step.key === "timeline" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Cronograma</h2>
              <p className="mt-4 text-muted-foreground">
                O prazo oficial inicia após pagamento da entrada e envio dos materiais no onboarding.
              </p>
              <ol className="mt-8 space-y-3">
                {defaultMilestones.map((m, idx) => (
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
                Documento gerado com os dados do escopo e do simulador.
              </p>

              <div className="mt-8 rounded-xl border border-border/60 bg-card/40 p-6">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <p className="font-mono text-xs text-muted-foreground">CONTRATO · {id.slice(0, 12)}…</p>
                  <StatusPill tone={isSigned ? "success" : "warning"} dot>
                    {isSigned ? "Assinado" : "Aguardando aceite"}
                  </StatusPill>
                </div>

                <div className="mt-4 max-h-60 overflow-y-auto space-y-3 pr-2 text-xs text-muted-foreground">
                  <p><strong>CONTRATADA:</strong> TERON OS / Studio Tecnologia.</p>
                  <p><strong>CONTRATANTE:</strong> {client.company} ({client.contact}).</p>
                  <p>
                    <strong>CLÁUSULA 1ª — OBJETO:</strong> Desenvolvimento de {projectTitle} no valor de {currency(totalInvestment)}.
                  </p>
                  <p>
                    <strong>CLÁUSULA 2ª — PAGAMENTO:</strong> {currency(entryPayment)} na assinatura e {currency(deliveryPayment)} na entrega.
                  </p>
                  <p>
                    <strong>CLÁUSULA 3ª — PRAZO:</strong> Contado a partir do pagamento da entrada e envio dos materiais na Workstation.
                  </p>
                </div>

                {acceptError && (
                  <p className="mt-3 text-xs text-amber-400">{acceptError}</p>
                )}

                {!isSigned ? (
                  <button
                    onClick={() => setShowOtpModal(true)}
                    className="mt-6 w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <FileSignature className="size-4" /> Assinar digitalmente (OTP)
                  </button>
                ) : (
                  <div className="mt-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-center text-xs font-medium text-emerald-400 flex items-center justify-center gap-2">
                    <CheckCircle2 className="size-4" /> Assinado por {clientEmail || client.contact}
                  </div>
                )}
              </div>
            </div>
          )}

          {step.key === "payment" && (
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Pagamento da entrada (50%)</h2>
              <p className="mt-4 text-muted-foreground">
                Entrada de {currency(entryPayment)} para liberar a Workstation.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-6 space-y-4">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="grid size-7 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs">MP</span>
                    Mercado Pago (PIX)
                  </div>
                  <p className="font-mono text-base font-bold text-emerald-400">{currency(entryPayment)}</p>
                  <button
                    onClick={async () => {
                      try {
                        const res = await createMercadoPagoPix({
                          proposalId: id,
                          amount: entryPayment,
                          email: clientEmail || client.email || "cliente@empresa.com",
                          firstName: client.contact || "Cliente",
                          lastName: client.company || "Empresa",
                          description: `Entrada proposta ${id}`,
                        });
                        if (res.success) {
                          alert(`PIX gerado:\n${res.qrCode}`);
                        }
                      } catch {
                        /* gateway pode não estar configurado */
                      }
                      await goToWorkstation();
                      setI(7);
                    }}
                    className="w-full rounded-xl bg-emerald-500 py-3 text-xs font-bold text-black hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="size-4" /> Gerar PIX e ativar
                  </button>
                </div>

                <div className="rounded-2xl border border-indigo-500/40 bg-indigo-500/5 p-6 space-y-4">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="grid size-7 place-items-center rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-xs">S</span>
                    Stripe Checkout
                  </div>
                  <p className="font-mono text-base font-bold text-indigo-400">{currency(entryPayment)}</p>
                  <button
                    onClick={async () => {
                      try {
                        const res = await createStripeCheckoutSession({
                          proposalId: id,
                          amount: entryPayment,
                          customerEmail: clientEmail || client.email || "cliente@empresa.com",
                          companyName: client.company || "Empresa",
                          description: `Entrada proposta ${id}`,
                        });
                        if (res.success && res.url) {
                          window.open(res.url, "_blank");
                        }
                      } catch {
                        /* */
                      }
                      await goToWorkstation();
                      setI(7);
                    }}
                    className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="size-4" /> Pagar via Stripe
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <p className="font-semibold flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-400" /> Já pagou? Continuar para a Workstation
                  </p>
                  <p className="text-muted-foreground">Garante a criação do projeto no sistema.</p>
                </div>
                <button
                  onClick={async () => {
                    await goToWorkstation();
                    setI(7);
                  }}
                  className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  Continuar
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
                Projeto criado
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
                Workstation ativada. Envie os materiais obrigatórios para iniciarmos a produção.
              </p>
              <button
                onClick={goToWorkstation}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                Acessar Workstation <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-6">
          <button
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={i === 0}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/50 px-4 py-2 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <ArrowLeft className="size-3.5" /> Voltar
          </button>
          <span className="text-xs font-mono text-muted-foreground">{i + 1} / {steps.length}</span>
          <button
            onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}
            disabled={i === steps.length - 1}
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background hover:scale-105 disabled:opacity-40"
          >
            Avançar <ArrowRight className="size-3.5" />
          </button>
        </div>
      </main>

      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="size-5 text-primary" />
                <h3 className="font-semibold text-sm">Assinatura digital (OTP)</h3>
              </div>
              <button onClick={() => setShowOtpModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>

            {!otpSent ? (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-muted-foreground">
                  Informe CPF/CNPJ e e-mail. Em produção o código será enviado de verdade; por enquanto qualquer código ≥ 4 dígitos confirma e registra o aceite no banco.
                </p>
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground">CPF ou CNPJ</label>
                  <input
                    type="text"
                    placeholder="00.000.000/0001-00"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    className="mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground">E-mail</label>
                  <input
                    type="email"
                    placeholder="voce@empresa.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={handleSendOtp}
                  className="w-full rounded-md bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  Continuar
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-muted-foreground">
                  Digite um código de confirmação (≥ 4 dígitos) para <strong>{clientEmail}</strong>:
                </p>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono rounded-md border border-border/60 bg-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={accepting}
                  className="w-full rounded-md bg-emerald-500 py-2.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {accepting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" /> Registrando aceite...
                    </>
                  ) : (
                    "Confirmar e assinar"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
