import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/proposals
 * Lista propostas reais do banco.
 */
export const Route = createFileRoute("/api/proposals")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const proposals = await prisma.proposal.findMany({
            orderBy: { createdAt: "desc" },
            take: 200,
            include: {
              lead: {
                select: {
                  id: true,
                  name: true,
                  company: true,
                  email: true,
                  projectType: true,
                },
              },
            },
          });

          const appUrl = (process.env.APP_URL || "https://os.thomaseduardo.com.br").replace(/\/$/, "");

          const items = proposals.map((p) => ({
            id: p.id,
            publicToken: p.publicToken,
            title: p.title,
            client: p.lead?.company || p.lead?.name || "—",
            contact: p.lead?.name || "",
            scope: p.lead?.projectType || p.title,
            amount: p.amount,
            entryAmount: p.entryAmount,
            status: p.status,
            validUntil: p.validUntil?.toISOString() || null,
            viewedAt: p.viewedAt?.toISOString() || null,
            acceptedAt: p.acceptedAt?.toISOString() || null,
            createdAt: p.createdAt.toISOString(),
            publicLink: `${appUrl}/proposta/${p.publicToken}`,
            leadId: p.leadId,
          }));

          return Response.json({ success: true, proposals: items, total: items.length });
        } catch (err) {
          console.error("[api/proposals]", err);
          return Response.json({ success: false, proposals: [], error: "Erro ao listar propostas" }, { status: 500 });
        }
      },
    },
  },
  component: () => null,
});
