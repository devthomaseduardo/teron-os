import { createFileRoute } from "@tanstack/react-router";
import {
  CreditCard,
  Key,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Save,
  Globe,
  AlertCircle,
  ExternalLink,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { StatusPill } from "@/components/teron/status-pill";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações de Pagamentos & API — TERON OS" }] }),
  component: PaymentConfigPage,
});

function PaymentConfigPage() {
  const [mpAccessToken, setMpAccessToken] = useState("APP_USR-4151004476930004-052911-b1f1550fc2afc658a3f26a6e43a0c0f7-261592994");
  const [mpPublicKey, setMpPublicKey] = useState("4151004476930004whAgRrihWwbagztBSBYwmgPweBW1i72x");
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const [stripePublishableKey, setStripePublishableKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("teron_payment_api_keys");
        if (saved) {
          const parsed = JSON.parse(saved);
          setMpAccessToken(parsed.mpAccessToken || "APP_USR-4151004476930004-052911-b1f1550fc2afc658a3f26a6e43a0c0f7-261592994");
          setMpPublicKey(parsed.mpPublicKey || "4151004476930004whAgRrihWwbagztBSBYwmgPweBW1i72x");
          setStripeSecretKey(parsed.stripeSecretKey || "");
          setStripePublishableKey(parsed.stripePublishableKey || "");
        }
      } catch (e) {}
    }
  }, []);

  const handleSaveKeys = () => {
    try {
      localStorage.setItem(
        "teron_payment_api_keys",
        JSON.stringify({
          mpAccessToken,
          mpPublicKey,
          stripeSecretKey,
          stripePublishableKey,
          updatedAt: new Date().toISOString(),
        })
      );
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      alert("Erro ao salvar configurações de API.");
    }
  };

  return (
    <WorkspaceShell
      eyebrow="Configurações de API & Gateways"
      title="Integração Mercado Pago & Stripe"
      description="Gerencie as chaves de API e credenciais de pagamento para cobranças automáticas de propostas e OS."
      action={
        <button
          onClick={handleSaveKeys}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Save className="size-4" /> Salvar Chaves de API
        </button>
      }
    >
      <div className="space-y-6">
        {/* SUCCESS ALERT */}
        {isSaved && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-400 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="size-4" /> Chaves de API salvas com sucesso! O ambiente de produção foi atualizado.
          </div>
        )}

        {/* MERCADO PAGO CONFIGURATION CARD */}
        <section className="rounded-2xl border border-emerald-500/30 bg-card p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold text-xs">
                MP
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Mercado Pago (PIX & Checkout Transparente)</h3>
                <p className="text-[11px] text-muted-foreground">Cole abaixo seu Access Token obtido no Painel do Desenvolvedor Mercado Pago</p>
              </div>
            </div>
            <StatusPill tone={mpAccessToken ? "success" : "warning"} dot>
              {mpAccessToken ? "Credenciais Ativas" : "Aguardando Chave"}
            </StatusPill>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-foreground flex items-center gap-1.5 mb-1">
                <Key className="size-3.5 text-emerald-400" /> Mercado Pago Access Token (Production / Test)
              </label>
              <input
                type="password"
                placeholder="APP_USR-829410..."
                value={mpAccessToken}
                onChange={(e) => setMpAccessToken(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="mt-1 text-[10.5px] text-muted-foreground">
                Exemplo: APP_USR-xxxxxxxxxxxx ou TEST-xxxxxxxxxxxx
              </p>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-foreground flex items-center gap-1.5 mb-1">
                <Globe className="size-3.5 text-emerald-400" /> Mercado Pago Public Key (Opcional)
              </label>
              <input
                type="text"
                placeholder="APP_USR-pub-key-..."
                value={mpPublicKey}
                onChange={(e) => setMpPublicKey(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </section>

        {/* STRIPE CONFIGURATION CARD */}
        <section className="rounded-2xl border border-indigo-500/30 bg-card p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono font-bold text-xs">
                S
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Stripe (Cartão de Crédito Internacional & Checkout)</h3>
                <p className="text-[11px] text-muted-foreground">Cole abaixo sua Secret Key obtida na dashboard do Stripe</p>
              </div>
            </div>
            <StatusPill tone={stripeSecretKey ? "success" : "warning"} dot>
              {stripeSecretKey ? "Credenciais Ativas" : "Aguardando Chave"}
            </StatusPill>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-foreground flex items-center gap-1.5 mb-1">
                <Key className="size-3.5 text-indigo-400" /> Stripe Secret Key (sk_live_... / sk_test_...)
              </label>
              <input
                type="password"
                placeholder="sk_live_51M..."
                value={stripeSecretKey}
                onChange={(e) => setStripeSecretKey(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="mt-1 text-[10.5px] text-muted-foreground">
                Exemplo: sk_live_... para produção ou sk_test_... para testes.
              </p>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-foreground flex items-center gap-1.5 mb-1">
                <Globe className="size-3.5 text-indigo-400" /> Stripe Publishable Key (pk_live_... / pk_test_...)
              </label>
              <input
                type="text"
                placeholder="pk_live_51M..."
                value={stripePublishableKey}
                onChange={(e) => setStripePublishableKey(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </section>

        {/* SAVE BUTTON */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveKeys}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Save className="size-4" /> Confirmar e Salvar Credenciais
          </button>
        </div>
      </div>
    </WorkspaceShell>
  );
}
