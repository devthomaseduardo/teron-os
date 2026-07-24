import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/prisma";

async function getProposalByToken(token: string) {
  return prisma.proposal.findUnique({
    where: { publicToken: token },
    include: {
      lead: {
        select: {
          id: true,
          name: true,
          company: true,
          email: true,
          phone: true,
          address: true,
          projectType: true,
          deadline: true,
          briefing: true,
          totalInvestment: true,
          entryPayment: true,
          status: true,
          intent: true,
        },
      },
      project: {
        select: {
          id: true,
          title: true,
          status: true,
          clientAccessToken: true,
        },
      },
    },
  });
}

function publicPayload(proposal: NonNullable<Awaited<ReturnType<typeof getProposalByToken>>>) {
  return {
    id: proposal.id,
    publicToken: proposal.publicToken,
    title: proposal.title,
    content: proposal.content,
    amount: proposal.amount,
    entryAmount: proposal.entryAmount,
    status: proposal.status,
    validUntil: proposal.validUntil?.toISOString() || null,
    version: proposal.version,
    viewedAt: proposal.viewedAt?.toISOString() || null,
    acceptedAt: proposal.acceptedAt?.toISOString() || null,
    lead: proposal.lead
      ? {
          name: proposal.lead.name,
          company: proposal.lead.company,
          email: proposal.lead.email,
          phone: proposal.lead.phone,
          address: proposal.lead.address,
          projectType: proposal.lead.projectType,
          deadline: proposal.lead.deadline,
          briefing: proposal.lead.briefing,
          totalInvestment: proposal.lead.totalInvestment,
          entryPayment: proposal.lead.entryPayment,
          intent: proposal.lead.intent,
        }
      : null,
    hasProject: Boolean(proposal.project),
    project: proposal.project
      ? {
          id: proposal.project.id,
          status: proposal.project.status,
          clientAccessToken: proposal.project.clientAccessToken,
        }
      : null,
  };
}

export const Route = createFileRoute("/api/proposal/$token")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const token = params.token;
          if (!token || token.length < 8) {
            return Response.json({ error: "Token inválido" }, { status: 400 });
          }

          const proposal = await getProposalByToken(token);
          if (!proposal) {
            return Response.json({ error: "Proposta não encontrada" }, { status: 404 });
          }

          if (proposal.validUntil && proposal.validUntil < new Date()) {
            if (proposal.status !== "expirada" && proposal.status !== "aceita") {
              await prisma.proposal.update({
                where: { id: proposal.id },
                data: { status: "expirada" },
              });
            }
            return Response.json({ error: "Proposta expirada" }, { status: 410 });
          }

          if (!proposal.viewedAt) {
            await prisma.proposal.update({
              where: { id: proposal.id },
              data: {
                viewedAt: new Date(),
                status: proposal.status === "enviada" ? "visualizada" : proposal.status,
              },
            });
            proposal.viewedAt = new Date();
            if (proposal.status === "enviada") proposal.status = "visualizada";
          }

          return Response.json(publicPayload(proposal));
        } catch (err) {
          console.error("[api/proposal GET]", err);
          return Response.json({ error: "Erro interno" }, { status: 500 });
        }
      },

      /** Aceitar proposta → cria Project + clientAccessToken */
      POST: async ({ params, request }) => {
        try {
          const token = params.token;
          if (!token || token.length < 8) {
            return Response.json({ error: "Token inválido" }, { status: 400 });
          }

          let body: { action?: string } = {};
          try {
            body = await request.json();
          } catch {
            body = {};
          }

          const action = body.action || "accept";
          const proposal = await getProposalByToken(token);

          if (!proposal) {
            return Response.json({ error: "Proposta não encontrada" }, { status: 404 });
          }

          if (proposal.validUntil && proposal.validUntil < new Date() && proposal.status !== "aceita") {
            return Response.json({ error: "Proposta expirada" }, { status: 410 });
          }

          if (action === "accept") {
            // Já aceita e já tem projeto
            if (proposal.status === "aceita" && proposal.project) {
              return Response.json({
                success: true,
                alreadyAccepted: true,
                ...publicPayload(proposal),
                workstationUrl: `/cliente/onboarding/${proposal.project.clientAccessToken}`,
              });
            }

            const updated = await prisma.proposal.update({
              where: { id: proposal.id },
              data: {
                status: "aceita",
                acceptedAt: new Date(),
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
              const created = await prisma.project.create({
                data: {
                  title: proposal.title,
                  clientName: proposal.lead?.name || "Cliente",
                  clientEmail: proposal.lead?.email || null,
                  clientCompany: proposal.lead?.company || null,
                  status: "onboarding",
                  deadline: proposal.lead?.deadline || null,
                  budget: proposal.amount,
                  description: proposal.content || proposal.lead?.briefing || null,
                  leadId: proposal.leadId,
                  proposalId: proposal.id,
                  clientPortal: {
                    checklist: [
                      { id: "logo", label: "Logotipo", done: false },
                      { id: "texts", label: "Textos institucionais", done: false },
                      { id: "images", label: "Imagens", done: false },
                      { id: "access", label: "Acessos", done: false },
                    ],
                    notes: [],
                  },
                },
              });
              project = {
                id: created.id,
                title: created.title,
                status: created.status,
                clientAccessToken: created.clientAccessToken,
              };
            }

            const fresh = await getProposalByToken(token);
            return Response.json({
              success: true,
              ...publicPayload(fresh!),
              workstationUrl: `/cliente/onboarding/${project.clientAccessToken}`,
            });
          }

          if (action === "reject") {
            await prisma.proposal.update({
              where: { id: proposal.id },
              data: { status: "recusada" },
            });
            if (proposal.leadId) {
              await prisma.lead.update({
                where: { id: proposal.leadId },
                data: { status: "perdida" },
              });
            }
            const fresh = await getProposalByToken(token);
            return Response.json({ success: true, ...publicPayload(fresh!) });
          }

          return Response.json({ error: "Ação inválida" }, { status: 400 });
        } catch (err) {
          console.error("[api/proposal POST]", err);
          return Response.json({ error: "Erro interno" }, { status: 500 });
        }
      },
    },
  },
  component: () => null,
});
