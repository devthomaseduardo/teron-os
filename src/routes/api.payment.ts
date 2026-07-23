import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createMercadoPagoPix, createMercadoPagoPreference } from "../services/mercadopago";
import { createStripeCheckoutSession } from "../services/stripe";

export interface PaymentWebhookInput {
  proposalId: string;
  paymentMethod: "pix" | "card" | "boleto" | "stripe" | "mercadopago";
  amount: number;
  transactionId?: string;
  status: "paid" | "pending" | "failed";
}

export interface MercadoPagoPixServerInput {
  proposalId: string;
  amount: number;
  email: string;
  name: string;
  company: string;
}

export interface StripeCheckoutServerInput {
  proposalId: string;
  amount: number;
  email: string;
  company: string;
}

export const paymentsStore = new Map<string, any>();

/**
 * Server Function: Gerar PIX via Mercado Pago
 */
export const createMercadoPagoPixFn = createServerFn({ method: "POST" })
  .validator((data: MercadoPagoPixServerInput) => data)
  .handler(async ({ data }) => {
    const names = data.name.split(" ");
    const result = await createMercadoPagoPix({
      proposalId: data.proposalId,
      amount: data.amount,
      email: data.email,
      firstName: names[0] || "Cliente",
      lastName: names.slice(1).join(" ") || "B2B",
      description: `Entrada 50% OS #${data.proposalId} — ${data.company}`,
    });

    return result;
  });

/**
 * Server Function: Gerar Checkout no Stripe
 */
export const createStripeCheckoutFn = createServerFn({ method: "POST" })
  .validator((data: StripeCheckoutServerInput) => data)
  .handler(async ({ data }) => {
    const result = await createStripeCheckoutSession({
      proposalId: data.proposalId,
      amount: data.amount,
      customerEmail: data.email,
      companyName: data.company,
      description: `Entrada 50% OS #${data.proposalId} — ${data.company}`,
    });

    return result;
  });

/**
 * Server Function: Confirmar Pagamento & Liberar Workstation B2B
 */
export const processPaymentWebhookFn = createServerFn({ method: "POST" })
  .validator((data: PaymentWebhookInput) => data)
  .handler(async ({ data }) => {
    const { proposalId, paymentMethod, amount, transactionId, status } = data;

    const record = {
      proposalId,
      paymentMethod,
      amount,
      transactionId: transactionId || `tx_${Math.random().toString(36).substring(2, 9)}`,
      status: status || "paid",
      paidAt: new Date().toISOString(),
      workstationUnlocked: true,
    };

    paymentsStore.set(proposalId, record);

    return {
      success: true,
      message: "Pagamento confirmado! Workstation B2B desbloqueada com sucesso.",
      record,
      workstationUrl: `/cliente/onboarding/${proposalId}`,
    };
  });

export const Route = createFileRoute("/api/payment")({
  component: () => null,
});
