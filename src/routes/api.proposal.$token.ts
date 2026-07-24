import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/proposal/:token
 * Busca proposta pelo publicToken (sem dados sensíveis de admin).
 * Marca como "visualizada" na primeira abertura.
 */
export const Route = createFileRoute("/api/proposal/$token")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const token = params.token;
          if (!token || token.length < 8) {
            return Response.json({ error: "Token inválido" }, { status: 400 });
          }

          const proposal = await prisma.proposal.findUnique({
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

          if (!proposal) {
            return Response.json({ error: "Proposta não encontrada" }, { status: 404 });
          }

          // Expiração
          if (proposal.validUntil && proposal.validUntil < new Date()) {
            if (proposal.status !== "expirada" && proposal.status !== "aceita") {
              await prisma.proposal.update({
                where: { id: proposal.id },
                data: { status: "expirada" },
              });
            }
            return Response.json({ error: "Proposta expirada" }, { status: 410 });
          }

          // Primeira visualização
          if (!proposal.viewedAt) {
            await prisma.proposal.update({
              where: { id: proposal.id },
              data: {
                viewedAt: new Date(),
                status: proposal.status === "enviada" ? "visualizada" : proposal.status,
              },
            });
          }

          // Resposta pública (sem campos internos desnecessários)
          return Response.json({
            id: proposal.id,
            publicToken: proposal.publicToken,
            title: proposal.title,
            content: proposal.content,
            amount: proposal.amount,
            entryAmount: proposal.entryAmount,
            status: proposal.viewedAt ? proposal.status : "visualizada",
            validUntil: proposal.validUntil,
            version: proposal.version,
            lead: proposal.lead
              ? {
                  name: proposal.lead.name,
                  company: proposal.lead.company,
                  email: proposal.lead.email,
                  address: proposal.lead.address,
                  projectType: proposal.lead.projectType,
                  deadline: proposal.lead.deadline,
                  briefing: proposal.lead.briefing,
                  totalInvestment: proposal.lead.totalInvestment,
                  entryPayment: proposal.lead.entryPayment,
                }
              : null,
            hasProject: Boolean(proposal.project),
            projectStatus: proposal.project?.status ?? null,
          });
        } catch (err) {
          console.error("[api/proposal] error:", err);
          return Response.json({ error: "Erro interno" }, { status: 500 });
        }
      },
    },
  },
  component: () => null,
});
