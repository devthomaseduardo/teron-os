import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/prisma";

/** GET /api/projects — lista projetos reais (admin) */
export const Route = createFileRoute("/api/projects")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const projects = await prisma.project.findMany({
            orderBy: { updatedAt: "desc" },
            take: 200,
            include: {
              proposal: { select: { publicToken: true, status: true, amount: true } },
              lead: { select: { name: true, company: true, email: true, phone: true } },
            },
          });

          const items = projects.map((p) => {
            const portal = (p.clientPortal as any) || {};
            const checklist = Array.isArray(portal.checklist) ? portal.checklist : [];
            const done = checklist.filter((c: any) => c.done).length;
            const total = checklist.length || 1;
            return {
              id: p.id,
              title: p.title,
              clientName: p.clientName,
              clientCompany: p.clientCompany,
              clientEmail: p.clientEmail,
              status: p.status,
              deadline: p.deadline,
              budget: p.budget,
              description: p.description,
              clientAccessToken: p.clientAccessToken,
              progress: Math.round((done / total) * 100),
              checklistDone: done,
              checklistTotal: checklist.length,
              createdAt: p.createdAt.toISOString(),
              updatedAt: p.updatedAt.toISOString(),
              proposalToken: p.proposal?.publicToken || null,
              lead: p.lead,
            };
          });

          return Response.json({ success: true, projects: items, total: items.length });
        } catch (err) {
          console.error("[api/projects]", err);
          return Response.json({ success: false, projects: [], error: "Erro ao listar" }, { status: 500 });
        }
      },
    },
  },
  component: () => null,
});
