import { t as prisma } from "./prisma-CpXuewPn.mjs";
import { c as createServerFn } from "./createServerFn-aZmUlApV.mjs";
import { t as createServerRpc } from "./createServerRpc-BUBZ6fjm.mjs";
import { n as createStripeCheckoutSession, t as createMercadoPagoPix } from "./stripe-CjflXAez.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api.payment-DoUy9F9r.js
var createMercadoPagoPixFn_createServerFn_handler = createServerRpc({
	id: "2247ffda656ca3d621612e8e6a320b96f3b3cd3c0b71cfa91ecea0218926b064",
	name: "createMercadoPagoPixFn",
	filename: "src/routes/api.payment.ts"
}, (opts) => createMercadoPagoPixFn.__executeServer(opts));
var createMercadoPagoPixFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createMercadoPagoPixFn_createServerFn_handler, async ({ data }) => {
	const names = data.name.split(" ");
	return createMercadoPagoPix({
		proposalId: data.proposalId,
		amount: data.amount,
		email: data.email,
		firstName: names[0] || "Cliente",
		lastName: names.slice(1).join(" ") || "B2B",
		description: `Entrada 50% OS #${data.proposalId} \u2014 ${data.company}`
	});
});
var createStripeCheckoutFn_createServerFn_handler = createServerRpc({
	id: "ce5b78001f3c0ccd36ae21b217a65162c427476dd718afb472264b7790fa5cdc",
	name: "createStripeCheckoutFn",
	filename: "src/routes/api.payment.ts"
}, (opts) => createStripeCheckoutFn.__executeServer(opts));
var createStripeCheckoutFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createStripeCheckoutFn_createServerFn_handler, async ({ data }) => {
	return createStripeCheckoutSession({
		proposalId: data.proposalId,
		amount: data.amount,
		customerEmail: data.email,
		companyName: data.company,
		description: `Entrada 50% OS #${data.proposalId} \u2014 ${data.company}`
	});
});
var processPaymentWebhookFn_createServerFn_handler = createServerRpc({
	id: "baef1c7e38560abc8d0e21212351c96555d68b647fd0f0a189a255fd860d4fe8",
	name: "processPaymentWebhookFn",
	filename: "src/routes/api.payment.ts"
}, (opts) => processPaymentWebhookFn.__executeServer(opts));
var processPaymentWebhookFn = createServerFn({ method: "POST" }).validator((data) => data).handler(processPaymentWebhookFn_createServerFn_handler, async ({ data }) => {
	const { proposalId, paymentMethod, amount, transactionId, status } = data;
	if (status !== "paid") return {
		success: false,
		message: "Pagamento não confirmado",
		status
	};
	let proposal = await prisma.proposal.findFirst({
		where: { OR: [{ publicToken: proposalId }, { id: proposalId }] },
		include: {
			lead: true,
			project: true
		}
	});
	if (!proposal) return {
		success: false,
		message: "Proposta não encontrada",
		workstationUrl: null
	};
	await prisma.proposal.update({
		where: { id: proposal.id },
		data: {
			status: "aceita",
			acceptedAt: proposal.acceptedAt || /* @__PURE__ */ new Date()
		}
	});
	if (proposal.leadId) await prisma.lead.update({
		where: { id: proposal.leadId },
		data: { status: "aceita" }
	});
	let project = proposal.project;
	if (!project) project = await prisma.project.create({ data: {
		title: proposal.title,
		clientName: proposal.lead?.name || "Cliente",
		clientEmail: proposal.lead?.email || null,
		clientCompany: proposal.lead?.company || null,
		status: "onboarding",
		deadline: proposal.lead?.deadline || null,
		budget: proposal.amount || amount,
		description: proposal.content || proposal.lead?.briefing || null,
		leadId: proposal.leadId,
		proposalId: proposal.id,
		clientPortal: {
			checklist: [
				{
					id: "logo",
					label: "Logotipo",
					done: false,
					required: true
				},
				{
					id: "texts",
					label: "Textos",
					done: false,
					required: true
				},
				{
					id: "images",
					label: "Imagens",
					done: false,
					required: true
				},
				{
					id: "access",
					label: "Acessos",
					done: false,
					required: false
				}
			],
			notes: [{
				text: `Pagamento ${paymentMethod} confirmado \u00b7 ${transactionId || "sem id"}`,
				at: (/* @__PURE__ */ new Date()).toISOString()
			}],
			payment: {
				method: paymentMethod,
				amount,
				transactionId: transactionId || null,
				paidAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		}
	} });
	return {
		success: true,
		message: "Pagamento confirmado. Workstation liberada.",
		workstationUrl: `/cliente/onboarding/${project.clientAccessToken}`,
		projectId: project.id,
		clientAccessToken: project.clientAccessToken
	};
});
//#endregion
export { createMercadoPagoPixFn_createServerFn_handler, createStripeCheckoutFn_createServerFn_handler, processPaymentWebhookFn_createServerFn_handler };
