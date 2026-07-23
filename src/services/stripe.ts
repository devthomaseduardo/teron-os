/**
 * Servidor de Integração Stripe — Teron OS
 * Suporta Stripe Checkout Session, Cartão de Crédito Internacional e Pix via Stripe
 */

export interface StripeCheckoutRequest {
  proposalId: string;
  amount: number; // Em Reais (BRL)
  customerEmail: string;
  description: string;
  companyName: string;
}

export interface StripeCheckoutResponse {
  success: boolean;
  sessionId?: string;
  url?: string;
  error?: string;
}

/**
 * Cria Sessão do Stripe Checkout
 */
export async function createStripeCheckoutSession(data: StripeCheckoutRequest): Promise<StripeCheckoutResponse> {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  // Se não houver chave real no .env, retorna simulador de checkout Stripe
  if (!secretKey || secretKey.includes("YOUR_")) {
    const fakeSessionId = `cs_test_${Math.random().toString(36).substring(2, 12)}`;
    return {
      success: true,
      sessionId: fakeSessionId,
      url: `https://checkout.stripe.com/c/pay/${fakeSessionId}`,
    };
  }

  try {
    const bodyParams = new URLSearchParams();
    bodyParams.append("payment_method_types[0]", "card");
    bodyParams.append("payment_method_types[1]", "boleto");
    bodyParams.append("mode", "payment");
    bodyParams.append("customer_email", data.customerEmail);
    bodyParams.append("client_reference_id", data.proposalId);

    bodyParams.append("line_items[0][price_data][currency]", "brl");
    bodyParams.append("line_items[0][price_data][product_data][name]", `OS / Proposta Teron Studio — ${data.companyName}`);
    bodyParams.append("line_items[0][price_data][product_data][description]", data.description);
    bodyParams.append("line_items[0][price_data][unit_amount]", Math.round(data.amount * 100).toString()); // em centavos
    bodyParams.append("line_items[0][quantity]", "1");

    bodyParams.append("success_url", `${process.env.APP_URL || "http://localhost:3005"}/cliente/onboarding/${data.proposalId}?payment=stripe_success`);
    bodyParams.append("cancel_url", `${process.env.APP_URL || "http://localhost:3005"}/proposta/${data.proposalId}?payment=stripe_cancelled`);

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${secretKey}`,
      },
      body: bodyParams.toString(),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error?.message || "Erro ao gerar sessão de checkout no Stripe",
      };
    }

    return {
      success: true,
      sessionId: result.id,
      url: result.url,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Erro de conexão com a API do Stripe",
    };
  }
}

/**
 * Cria PaymentIntent no Stripe para formulário de cartão embarcado
 */
export async function createStripePaymentIntent(data: { amount: number; email: string; proposalId: string }) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || secretKey.includes("YOUR_")) {
    return {
      success: true,
      clientSecret: `pi_test_${Math.random().toString(36).substring(2, 10)}_secret_${Math.random().toString(36).substring(2, 10)}`,
    };
  }

  try {
    const bodyParams = new URLSearchParams();
    bodyParams.append("amount", Math.round(data.amount * 100).toString());
    bodyParams.append("currency", "brl");
    bodyParams.append("receipt_email", data.email);
    bodyParams.append("metadata[proposalId]", data.proposalId);

    const response = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${secretKey}`,
      },
      body: bodyParams.toString(),
    });

    const result = await response.json();

    return {
      success: response.ok,
      clientSecret: result.client_secret,
      error: result.error?.message,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
}
