/**
 * Servidor de Integração Mercado Pago — Teron OS
 * Suporta PIX com QR Code, Cartão de Crédito e Mercado Pago Checkout
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

/**
 * Cria cobrança PIX via API v1 do Mercado Pago
 */
export async function createMercadoPagoPix(data: MercadoPagoPixRequest): Promise<MercadoPagoPixResponse> {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  // Se não houver chave real configurada no .env, gera payload de teste estruturado
  if (!accessToken || accessToken.includes("YOUR_")) {
    const fakePaymentId = Math.floor(100000000 + Math.random() * 900000000);
    const fakePixCode = `00020126580014br.gov.bcb.pix0136mp-${fakePaymentId}@teron-studio.com5204000053039865405${data.amount.toFixed(2)}5802BR5920TERON STUDIO B2B6009SAO PAULO62070503***6304ABCD`;

    return {
      success: true,
      paymentId: fakePaymentId,
      qrCode: fakePixCode,
      qrCodeBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      status: "pending",
    };
  }

  try {
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Idempotency-Key": `pix_${data.proposalId}_${Date.now()}`,
      },
      body: JSON.stringify({
        transaction_amount: data.amount,
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
        notification_url: `${process.env.APP_URL || "http://localhost:3005"}/api/payment?provider=mercadopago`,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Falha ao comunicar com o Mercado Pago",
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

/**
 * Cria Preferência de Checkout Mercado Pago (Cartão + PIX + Boleto)
 */
export async function createMercadoPagoPreference(data: {
  proposalId: string;
  title: string;
  amount: number;
  email: string;
}) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken || accessToken.includes("YOUR_")) {
    return {
      success: true,
      initPoint: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=demo-${data.proposalId}`,
      preferenceId: `demo-pref-${data.proposalId}`,
    };
  }

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
        payer: {
          email: data.email,
        },
        back_urls: {
          success: `${process.env.APP_URL || "http://localhost:3005"}/cliente/onboarding/${data.proposalId}?status=success`,
          pending: `${process.env.APP_URL || "http://localhost:3005"}/cliente/onboarding/${data.proposalId}?status=pending`,
          failure: `${process.env.APP_URL || "http://localhost:3005"}/proposta/${data.proposalId}?status=failure`,
        },
        auto_return: "approved",
        external_reference: data.proposalId,
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
    return {
      success: false,
      error: err.message,
    };
  }
}
