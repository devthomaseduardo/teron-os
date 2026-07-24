import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/prisma";

/**
 * Webhook unificado:
 * POST /api/payment/webhook?provider=mercadopago|stripe
 *
 * Mercado Pago envia topic=payment & id=...
 * Stripe envia evento checkout.session.completed (raw body em produção com signature)
 */
async function ensureProjectFromProposal(proposalIdOrToken: string, meta?: {
  method?: string;
  amount?: number;
  transactionId?: string;
}) {
  const proposal = await prisma.proposal.findFirst({
    where: {
      OR: [{ publicToken: proposalIdOrToken }, { id: proposalIdOrToken }],
    },
    include: { lead: true, project: true },
  });

  if (!proposal) return null;

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

  if (proposal.project) {
    const portal = (proposal.project.clientPortal as any) || {};
    await prisma.project.update({
      where: { id: proposal.project.id },
      data: {
        clientPortal: {
          ...portal,
          payment: {
            method: meta?.method || "webhook",
            amount: meta?.amount || proposal.amount,
            transactionId: meta?.transactionId || null,
            paidAt: new Date().toISOString(),
          },
        },
      },
    });
    return proposal.project;
  }

  return prisma.project.create({
    data: {
      title: proposal.title,
      clientName: proposal.lead?.name || "Cliente",
      clientEmail: proposal.lead?.email || null,
      clientCompany: proposal.lead?.company || null,
      status: "onboarding",
      deadline: proposal.lead?.deadline || null,
      budget: meta?.amount || proposal.amount,
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
        notes: [],
        payment: {
          method: meta?.method || "webhook",
          amount: meta?.amount || proposal.amount,
          transactionId: meta?.transactionId || null,
          paidAt: new Date().toISOString(),
        },
      },
    },
  });
}

export const Route = createFileRoute("/api/payment/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const provider = url.searchParams.get("provider") || "generic";

          let body: any = {};
          const contentType = request.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            body = await request.json();
          } else {
            const text = await request.text();
            try {
              body = JSON.parse(text);
            } catch {
              body = Object.fromEntries(new URLSearchParams(text));
            }
          }

          // ── Mercado Pago ──
          if (provider === "mercadopago" || body.action?.includes("payment") || body.type === "payment") {
            const paymentId = body.data?.id || body.id || url.searchParams.get("data.id") || url.searchParams.get("id");
            const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

            if (paymentId && accessToken && !accessToken.includes("YOUR_")) {
              const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
              });
              if (res.ok) {
                const payment = await res.json();
                if (payment.status === "approved") {
                  const ref = String(payment.external_reference || "");
                  const project = await ensureProjectFromProposal(ref, {
                    method: "mercadopago",
                    amount: payment.transaction_amount,
                    transactionId: String(payment.id),
                  });
                  return Response.json({
                    success: true,
                    provider: "mercadopago",
                    projectId: project?.id,
                    token: project?.clientAccessToken,
                  });
                }
                return Response.json({ success: true, ignored: true, status: payment.status });
              }
            }

            // Sem token: aceita payload manual de teste estruturado (não inventa pagamento)
            if (body.external_reference && body.status === "approved") {
              const project = await ensureProjectFromProposal(String(body.external_reference), {
                method: "mercadopago",
                amount: body.transaction_amount,
                transactionId: String(body.id || ""),
              });
              return Response.json({ success: true, projectId: project?.id });
            }
          }

          // ── Stripe ──
          if (provider === "stripe" || body.type?.startsWith("checkout.") || body.type?.startsWith("payment_intent.")) {
            const eventType = body.type;
            if (eventType === "checkout.session.completed" || eventType === "payment_intent.succeeded") {
              const obj = body.data?.object || body;
              const ref = String(obj.client_reference_id || obj.metadata?.proposalId || "");
              if (ref) {
                const project = await ensureProjectFromProposal(ref, {
                  method: "stripe",
                  amount: (obj.amount_total || obj.amount || 0) / (obj.currency === "brl" || !obj.currency ? 100 : 100),
                  transactionId: String(obj.id || ""),
                });
                return Response.json({
                  success: true,
                  provider: "stripe",
                  projectId: project?.id,
                  token: project?.clientAccessToken,
                });
              }
            }
            return Response.json({ success: true, ignored: true, type: eventType });
          }

          // ── Manual / genérico ──
          if (body.proposalId && body.status === "paid") {
            const project = await ensureProjectFromProposal(String(body.proposalId), {
              method: body.paymentMethod || "manual",
              amount: body.amount,
              transactionId: body.transactionId,
            });
            return Response.json({
              success: true,
              workstationUrl: project ? `/cliente/onboarding/${project.clientAccessToken}` : null,
            });
          }

          return Response.json({ success: true, message: "Webhook recebido, sem ação" });
        } catch (err) {
          console.error("[webhook payment]", err);
          return Response.json({ success: false, error: "Erro no webhook" }, { status: 500 });
        }
      },

      // MP também pode enviar GET de validação
      GET: async () => Response.json({ ok: true, service: "teron-payment-webhook" }),
    },
  },
  component: () => null,
});
