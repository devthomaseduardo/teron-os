/**
 * Integração Mercado Pago — TERON OS
 * Sem token configurado: NÃO inventa pagamento aprovado (só erro claro).
 */

export interface MercadoPagoPixRequest {
  proposalId: string;
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  identificationType?: string;
  identificationNumber?: string;
  description: string;
}

export interface MercadoPagoPixResponse {
  success: boolean;
  paymentId?: string | number;
  qrCode?: string;
  qrCodeBase64?: string;
  ticketUrl?: string;
  status?: string;
  error?: string;
}

export async function createMercadoPagoPix(data: MercadoPagoPixRequest): Promise<MercadoPagoPixResponse> {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken || accessToken.includes("YOUR_") || accessToken.trim() === "") {
    return {
      success: false,
      error:
        "Mercado Pago não configurado. Defina MERCADOPAGO_ACCESS_TOKEN no .env (sem valor de demonstração).",
    };
  }

  try {
    const appUrl = (process.env.APP_URL || "http://localhost:3005").replace(/\/$/, "");
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Idempotency-Key": `pix_${data.proposalId}_${Date.now()}`,
      },
      body: JSON.stringify({
        transaction_amount: Number(data.amount),
        description: data.description,
        payment_method_id: "pix",
        payer: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          identification: {
            type: data.identificationType || "CPF",
            number: data.identificationNumber || "00000000000",
          },
        },
        external_reference: data.proposalId,
        notification_url: `${appUrl}/api/payment/webhook?provider=mercadopago`,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || "Falha ao comunicar com o Mercado Pago",
      };
    }

    const transactionData = result.point_of_interaction?.transaction_data;

    return {
      success: true,
      paymentId: result.id,
      qrCode: transactionData?.qr_code,
      qrCodeBase64: transactionData?.qr_code_base64,
      ticketUrl: transactionData?.ticket_url,
      status: result.status,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Erro interno na integração Mercado Pago",
    };
  }
}

export async function createMercadoPagoPreference(data: {
  proposalId: string;
  title: string;
  amount: number;
  email: string;
}) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken || accessToken.includes("YOUR_") || accessToken.trim() === "") {
    return {
      success: false,
      error: "Mercado Pago não configurado. Defina MERCADOPAGO_ACCESS_TOKEN no .env.",
    };
  }

  const appUrl = (process.env.APP_URL || "http://localhost:3005").replace(/\/$/, "");

  try {
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items: [
          {
            id: data.proposalId,
            title: data.title,
            quantity: 1,
            currency_id: "BRL",
            unit_price: data.amount,
          },
        ],
        payer: { email: data.email },
        back_urls: {
          success: `${appUrl}/proposta/${data.proposalId}?payment=success`,
          pending: `${appUrl}/proposta/${data.proposalId}?payment=pending`,
          failure: `${appUrl}/proposta/${data.proposalId}?payment=failure`,
        },
        auto_return: "approved",
        external_reference: data.proposalId,
        notification_url: `${appUrl}/api/payment/webhook?provider=mercadopago`,
      }),
    });

    const result = await response.json();

    return {
      success: response.ok,
      initPoint: result.init_point || result.sandbox_init_point,
      preferenceId: result.id,
      error: result.message,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
