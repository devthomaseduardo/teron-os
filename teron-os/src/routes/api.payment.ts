import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createMercadoPagoPix } from "../services/mercadopago";
import { createStripeCheckoutSession } from "../services/stripe";
import { prisma } from "@/lib/prisma";

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

export const createMercadoPagoPixFn = createServerFn({ method: "POST" })
  .validator((data: MercadoPagoPixServerInput) => data)
  .handler(async ({ data }) => {
    const names = data.name.split(" ");
    return createMercadoPagoPix({
      proposalId: data.proposalId,
      amount: data.amount,
      email: data.email,
      firstName: names[0] || "Cliente",
      lastName: names.slice(1).join(" ") || "B2B",
      description: `Entrada 50% OS #${data.proposalId} \u2014 ${data.company}`,
    });
  });

export const createStripeCheckoutFn = createServerFn({ method: "POST" })
  .validator((data: StripeCheckoutServerInput) => data)
  .handler(async ({ data }) => {
    return createStripeCheckoutSession({
      proposalId: data.proposalId,
      amount: data.amount,
      customerEmail: data.email,
      companyName: data.company,
      description: `Entrada 50% OS #${data.proposalId} \u2014 ${data.company}`,
    });
  });

/** Confirma pagamento: aceita proposta + garante Project */
export const processPaymentWebhookFn = createServerFn({ method: "POST" })
  .validator((data: PaymentWebhookInput) => data)
  .handler(async ({ data }) => {
    const { proposalId, paymentMethod, amount, transactionId, status } = data;

    if (status !== "paid") {
      return { success: false, message: "Pagamento n\u00e3o confirmado", status };
    }

    // proposalId pode ser publicToken ou id
    let proposal = await prisma.proposal.findFirst({
      where: {
        OR: [{ publicToken: proposalId }, { id: proposalId }],
      },
      include: { lead: true, project: true },
    });

    if (!proposal) {
      return {
        success: false,
        message: "Proposta n\u00e3o encontrada",
        workstationUrl: null,
      };
    }

    await prisma.proposal.update({
      where: { id: proposal.id },
      data: {
        status: "aceita",
        acceptedAt: proposal.acceptedAt || new Date(),
      },
    });

    if (proposal.leadId) {
      await prisma.lead.update({
        where: { id: proposal.leadId },
        data: { status: "aceita" },
      });
    }

    let project = proposal.project;
    if (!project) {
      project = await prisma.project.create({
        data: {
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
              { id: "logo", label: "Logotipo", done: false, required: true },
              { id: "texts", label: "Textos", done: false, required: true },
              { id: "images", label: "Imagens", done: false, required: true },
              { id: "access", label: "Acessos", done: false, required: false },
            ],
            notes: [
              {
                text: `Pagamento ${paymentMethod} confirmado \u00b7 ${transactionId || "sem id"}`,
                at: new Date().toISOString(),
              },
            ],
            payment: {
              method: paymentMethod,
              amount,
              transactionId: transactionId || null,
              paidAt: new Date().toISOString(),
            },
          },
        },
      });
    }

    return {
      success: true,
      message: "Pagamento confirmado. Workstation liberada.",
      workstationUrl: `/cliente/onboarding/${project.clientAccessToken}`,
      projectId: project.id,
      clientAccessToken: project.clientAccessToken,
    };
  });

export const Route = createFileRoute("/api/payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as PaymentWebhookInput;
          // Reusa a mesma l\u00f3gica
          const result = await processPaymentWebhookFn({ data: body } as any);
          return Response.json(result);
        } catch (err) {
          console.error("[api/payment]", err);
          return Response.json({ success: false, error: "Erro" }, { status: 500 });
        }
      },
    },
  },
  component: () => null,
});
