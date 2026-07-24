import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/prisma";

const DEFAULT_CHECKLIST = [
  { id: "logo", label: "Logotipo (SVG/PNG)", hint: "Alta resolu\u00e7\u00e3o, fundo transparente", required: true, done: false },
  { id: "brand", label: "Manual de marca / cores", hint: "HEX e tipografia", required: true, done: false },
  { id: "texts", label: "Textos institucionais", hint: "Sobre, servi\u00e7os, contato", required: true, done: false },
  { id: "images", label: "Banco de imagens", hint: "Fotos oficiais", required: true, done: false },
  { id: "access", label: "Acessos (dom\u00ednio/DNS)", hint: "Registro e painel", required: false, done: false },
];

function ensurePortal(raw: unknown) {
  const portal = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  let checklist = Array.isArray(portal.checklist) ? (portal.checklist as any[]) : [];
  if (checklist.length === 0) checklist = DEFAULT_CHECKLIST;
  return {
    checklist,
    notes: Array.isArray(portal.notes) ? portal.notes : [],
  };
}

export const Route = createFileRoute("/api/project/$token")({
  server: {
    handlers: {
      /** Cliente: carrega workstation pelo clientAccessToken */
      GET: async ({ params }) => {
        try {
          const token = params.token;
          if (!token || token.length < 8) {
            return Response.json({ error: "Token inv\u00e1lido" }, { status: 400 });
          }

          const project = await prisma.project.findFirst({
            where: {
              OR: [{ clientAccessToken: token }, { id: token }],
            },
            include: {
              lead: true,
              proposal: true,
            },
          });

          if (!project) {
            return Response.json({ error: "Projeto n\u00e3o encontrado" }, { status: 404 });
          }

          const portal = ensurePortal(project.clientPortal);

          // Persist default checklist if missing
          if (!(project.clientPortal as any)?.checklist?.length) {
            await prisma.project.update({
              where: { id: project.id },
              data: { clientPortal: portal as any },
            });
          }

          const done = portal.checklist.filter((c: any) => c.done).length;
          const required = portal.checklist.filter((c: any) => c.required !== false);
          const requiredDone = required.filter((c: any) => c.done).length;

          return Response.json({
            id: project.id,
            title: project.title,
            clientName: project.clientName,
            clientCompany: project.clientCompany,
            clientEmail: project.clientEmail,
            status: project.status,
            deadline: project.deadline,
            budget: project.budget,
            description: project.description,
            clientAccessToken: project.clientAccessToken,
            portal,
            progress: portal.checklist.length
              ? Math.round((done / portal.checklist.length) * 100)
              : 0,
            requiredProgress: required.length
              ? Math.round((requiredDone / required.length) * 100)
              : 100,
            lead: project.lead
              ? {
                  name: project.lead.name,
                  company: project.lead.company,
                  email: project.lead.email,
                  phone: project.lead.phone,
                  briefing: project.lead.briefing,
                  projectType: project.lead.projectType,
                  deadline: project.lead.deadline,
                }
              : null,
            proposal: project.proposal
              ? {
                  publicToken: project.proposal.publicToken,
                  status: project.proposal.status,
                  amount: project.proposal.amount,
                }
              : null,
            createdAt: project.createdAt.toISOString(),
            updatedAt: project.updatedAt.toISOString(),
          });
        } catch (err) {
          console.error("[api/project GET]", err);
          return Response.json({ error: "Erro interno" }, { status: 500 });
        }
      },

      /** Atualiza checklist / notas do clientPortal */
      PATCH: async ({ params, request }) => {
        try {
          const token = params.token;
          const body = (await request.json()) as {
            checklistItemId?: string;
            done?: boolean;
            fileName?: string;
            status?: string;
            note?: string;
          };

          const project = await prisma.project.findFirst({
            where: {
              OR: [{ clientAccessToken: token }, { id: token }],
            },
          });

          if (!project) {
            return Response.json({ error: "Projeto n\u00e3o encontrado" }, { status: 404 });
          }

          const portal = ensurePortal(project.clientPortal);

          if (body.checklistItemId) {
            portal.checklist = portal.checklist.map((c: any) => {
              if (c.id !== body.checklistItemId) return c;
              return {
                ...c,
                done: body.done ?? true,
                fileName: body.fileName || c.fileName,
                updatedAt: new Date().toISOString(),
              };
            });
          }

          if (body.note) {
            portal.notes = [
              ...portal.notes,
              { text: body.note, at: new Date().toISOString() },
            ];
          }

          const required = portal.checklist.filter((c: any) => c.required !== false);
          const allRequiredDone = required.every((c: any) => c.done);
          let status = project.status;
          if (body.status) status = body.status;
          else if (allRequiredDone && status === "onboarding") status = "em_andamento";

          const updated = await prisma.project.update({
            where: { id: project.id },
            data: {
              clientPortal: portal as any,
              status,
            },
          });

          return Response.json({
            success: true,
            status: updated.status,
            portal,
          });
        } catch (err) {
          console.error("[api/project PATCH]", err);
          return Response.json({ error: "Erro interno" }, { status: 500 });
        }
      },
    },
  },
  component: () => null,
});
