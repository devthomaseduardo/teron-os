import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/prisma";

/** GET /api/dashboard — métricas reais para o Command Center */
export const Route = createFileRoute("/api/dashboard")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const [
            leadsTotal,
            leadsRecrutador,
            proposals,
            projects,
            recentLeads,
            recentProposals,
            recentProjects,
          ] = await Promise.all([
            prisma.lead.count(),
            prisma.lead.count({ where: { intent: "recrutador" } }),
            prisma.proposal.findMany({
              select: {
                id: true,
                status: true,
                amount: true,
                viewedAt: true,
                acceptedAt: true,
                publicToken: true,
                title: true,
                createdAt: true,
                lead: { select: { name: true, company: true } },
              },
            }),
            prisma.project.findMany({
              select: {
                id: true,
                title: true,
                status: true,
                budget: true,
                clientName: true,
                clientCompany: true,
                clientAccessToken: true,
                clientPortal: true,
                updatedAt: true,
              },
            }),
            prisma.lead.findMany({
              orderBy: { createdAt: "desc" },
              take: 5,
              select: {
                id: true,
                name: true,
                company: true,
                status: true,
                intent: true,
                createdAt: true,
              },
            }),
            prisma.proposal.findMany({
              orderBy: { createdAt: "desc" },
              take: 5,
              select: {
                id: true,
                title: true,
                status: true,
                amount: true,
                publicToken: true,
                createdAt: true,
                lead: { select: { name: true, company: true } },
              },
            }),
            prisma.project.findMany({
              orderBy: { updatedAt: "desc" },
              take: 5,
              select: {
                id: true,
                title: true,
                status: true,
                budget: true,
                clientName: true,
                clientCompany: true,
                clientAccessToken: true,
                clientPortal: true,
              },
            }),
          ]);

          const proposalsOpen = proposals.filter((p) =>
            ["enviada", "visualizada", "rascunho"].includes(p.status)
          ).length;
          const proposalsAccepted = proposals.filter((p) => p.status === "aceita").length;
          const proposalsViewed = proposals.filter((p) => p.viewedAt).length;
          const pipeline = proposals
            .filter((p) => !["recusada", "expirada"].includes(p.status))
            .reduce((s, p) => s + (p.amount || 0), 0);
          const acceptedValue = proposals
            .filter((p) => p.status === "aceita")
            .reduce((s, p) => s + (p.amount || 0), 0);
          const projectsActive = projects.filter((p) =>
            ["onboarding", "em_andamento"].includes(p.status)
          ).length;
          const projectsOnboarding = projects.filter((p) => p.status === "onboarding").length;

          const risks: { text: string; tag: string }[] = [];
          for (const p of projects) {
            if (p.status === "onboarding") {
              const portal = (p.clientPortal as any) || {};
              const checklist = Array.isArray(portal.checklist) ? portal.checklist : [];
              const required = checklist.filter((c: any) => c.required !== false);
              const done = required.filter((c: any) => c.done).length;
              if (required.length && done < required.length) {
                risks.push({
                  text: `${p.clientCompany || p.clientName} — checklist ${done}/${required.length}`,
                  tag: "Aguarda materiais",
                });
              }
            }
            if (p.status === "pausado") {
              risks.push({
                text: `${p.title} — pausado`,
                tag: "Pausado",
              });
            }
          }
          for (const p of proposals) {
            if (p.status === "visualizada" && !p.acceptedAt) {
              risks.push({
                text: `${p.lead?.company || p.lead?.name || p.title} — proposta vista sem aceite`,
                tag: "Follow-up",
              });
            }
          }

          const insights = [
            {
              id: "leads",
              kind: "cliente",
              label: "Leads", 
              value: String(leadsTotal),
              hint: leadsRecrutador ? `${leadsRecrutador} recrutador` : "Via bot e site",
              tone: "info" as const,
              href: "/app/leads",
            },
            {
              id: "propostas-abertas",
              kind: "proposta",
              label: "Propostas abertas",
              value: String(proposalsOpen),
              hint: `${proposalsViewed} visualizadas`,
              tone: "warning" as const,
              href: "/app/propostas",
            },
            {
              id: "aceitas",
              kind: "contrato",
              label: "Propostas aceitas",
              value: String(proposalsAccepted),
              hint: acceptedValue ? `R$ ${acceptedValue.toLocaleString("pt-BR")}` : "Nenhuma ainda",
              tone: "success" as const,
              href: "/app/propostas",
            },
            {
              id: "projetos",
              kind: "projeto",
              label: "Projetos ativos",
              value: String(projectsActive),
              hint: `${projectsOnboarding} em onboarding`,
              tone: "info" as const,
              href: "/app/projetos",
            },
            {
              id: "pipeline",
              kind: "receita",
              label: "Pipeline",
              value: pipeline,
              hint: "Valor em propostas abertas/aceitas",
              tone: "primary" as const,
              href: "/app/financeiro",
            },
            {
              id: "pagamentos",
              kind: "pagamento",
              label: "Valor aceito",
              value: acceptedValue,
              hint: "Soma das propostas aceitas",
              tone: "success" as const,
              href: "/app/pagamentos",
            },
          ];

          const deliveries = recentProjects.map((p) => {
            const portal = (p.clientPortal as any) || {};
            const checklist = Array.isArray(portal.checklist) ? portal.checklist : [];
            const done = checklist.filter((c: any) => c.done).length;
            const total = checklist.length || 1;
            return {
              id: p.id,
              name: p.title,
              client: p.clientCompany || p.clientName,
              progress: Math.round((done / total) * 100),
              status: p.status,
              token: p.clientAccessToken,
            };
          });

          return Response.json({
            success: true,
            empty: leadsTotal === 0 && proposals.length === 0 && projects.length === 0,
            insights,
            kpis: {
              leadsTotal,
              proposalsOpen,
              proposalsAccepted,
              projectsActive,
              pipeline,
              acceptedValue,
            },
            risks: risks.slice(0, 6),
            deliveries,
            recentLeads,
            recentProposals,
          });
        } catch (err) {
          console.error("[api/dashboard]", err);
          return Response.json(
            {
              success: false,
              empty: true,
              insights: [],
              kpis: {
                leadsTotal: 0,
                proposalsOpen: 0,
                proposalsAccepted: 0,
                projectsActive: 0,
                pipeline: 0,
                acceptedValue: 0,
              },
              risks: [],
              deliveries: [],
              error: "Banco indisponível — rode npm run db:migrate",
            },
            { status: 500 }
          );
        }
      },
    },
  },
  component: () => null,
});
