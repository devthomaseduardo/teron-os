import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/leads
 * Lista leads reais do banco (mais recentes primeiro).
 * Sem dados de demo.
 */
export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const leads = await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
            take: 200,
            include: {
              proposals: {
                orderBy: { createdAt: "desc" },
                take: 1,
                select: {
                  id: true,
                  publicToken: true,
                  status: true,
                  amount: true,
                  viewedAt: true,
                  acceptedAt: true,
                },
              },
            },
          });

          const items = leads.map((l) => {
            const lastProposal = l.proposals[0] || null;
            return {
              id: l.id,
              name: l.name,
              company: l.company || "",
              email: l.email || "",
              phone: l.phone || "",
              whatsappId: l.whatsappId || "",
              address: l.address || "",
              projectType: l.projectType || "",
              briefing: l.briefing || "",
              deadline: l.deadline || "",
              estimatedValue: l.totalInvestment || lastProposal?.amount || 0,
              status: l.status,
              source: l.source,
              intent: l.intent || "proposta",
              createdAt: l.createdAt.toISOString(),
              proposal: lastProposal
                ? {
                    id: lastProposal.id,
                    publicToken: lastProposal.publicToken,
                    status: lastProposal.status,
                    amount: lastProposal.amount,
                    viewedAt: lastProposal.viewedAt?.toISOString() || null,
                    acceptedAt: lastProposal.acceptedAt?.toISOString() || null,
                  }
                : null,
            };
          });

          return Response.json({ success: true, leads: items, total: items.length });
        } catch (err) {
          console.error("[api/leads]", err);
          return Response.json({ success: false, leads: [], error: "Erro ao listar leads" }, { status: 500 });
        }
      },
    },
  },
  component: () => null,
});
