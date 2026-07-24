//#region node_modules/.nitro/vite/services/ssr/assets/stripe-CjflXAez.js
async function createMercadoPagoPix(data) {
	const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
	if (!accessToken || accessToken.includes("YOUR_") || accessToken.trim() === "") return {
		success: false,
		error: "Mercado Pago não configurado. Defina MERCADOPAGO_ACCESS_TOKEN no .env (sem valor de demonstração)."
	};
	try {
		const appUrl = (process.env.APP_URL || "http://localhost:3005").replace(/\/$/, "");
		const response = await fetch("https://api.mercadopago.com/v1/payments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
				"X-Idempotency-Key": `pix_${data.proposalId}_${Date.now()}`
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
						number: data.identificationNumber || "00000000000"
					}
				},
				external_reference: data.proposalId,
				notification_url: `${appUrl}/api/payment/webhook?provider=mercadopago`
			})
		});
		const result = await response.json();
		if (!response.ok) return {
			success: false,
			error: result.message || result.error || "Falha ao comunicar com o Mercado Pago"
		};
		const transactionData = result.point_of_interaction?.transaction_data;
		return {
			success: true,
			paymentId: result.id,
			qrCode: transactionData?.qr_code,
			qrCodeBase64: transactionData?.qr_code_base64,
			ticketUrl: transactionData?.ticket_url,
			status: result.status
		};
	} catch (err) {
		return {
			success: false,
			error: err.message || "Erro interno na integração Mercado Pago"
		};
	}
}
/**
* Cria Sessão do Stripe Checkout
*/
async function createStripeCheckoutSession(data) {
	const secretKey = process.env.STRIPE_SECRET_KEY;
	if (!secretKey || secretKey.includes("YOUR_")) {
		const fakeSessionId = `cs_test_${Math.random().toString(36).substring(2, 12)}`;
		return {
			success: true,
			sessionId: fakeSessionId,
			url: `https://checkout.stripe.com/c/pay/${fakeSessionId}`
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
		bodyParams.append("line_items[0][price_data][unit_amount]", Math.round(data.amount * 100).toString());
		bodyParams.append("line_items[0][quantity]", "1");
		bodyParams.append("success_url", `${process.env.APP_URL || "http://localhost:3005"}/cliente/onboarding/${data.proposalId}?payment=stripe_success`);
		bodyParams.append("cancel_url", `${process.env.APP_URL || "http://localhost:3005"}/proposta/${data.proposalId}?payment=stripe_cancelled`);
		const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${secretKey}`
			},
			body: bodyParams.toString()
		});
		const result = await response.json();
		if (!response.ok) return {
			success: false,
			error: result.error?.message || "Erro ao gerar sessão de checkout no Stripe"
		};
		return {
			success: true,
			sessionId: result.id,
			url: result.url
		};
	} catch (err) {
		return {
			success: false,
			error: err.message || "Erro de conexão com a API do Stripe"
		};
	}
}
//#endregion
export { createStripeCheckoutSession as n, createMercadoPagoPix as t };
