import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/lib/prisma";

export interface LeadInput {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  whatsappId?: string;
  address?: string;
  city?: string;
  projectType?: string;
  project_type?: string;
  deadline?: string;
  briefing?: string;
  project_details?: string;
  totalInvestment?: number;
  answers?: Record<string, unknown>;
}

export async function processLeadCreation(data: LeadInput) {
  const clientName = data.name || "Cliente B2B";
  const companyName = data.company || "Empresa Contratante";
  const clientEmail = data.email || null;
  const clientPhone = data.phone || null;
  const whatsappId = data.whatsappId || data.phone || null;
  const clientAddress = data.address || data.city || null;
  const typeOfProject =
    data.projectType || data.project_type || "Portal Dealer B2B & Plataforma Web";
  const projectDeadline = data.deadline || "15 dias úteis";
  const projectBriefing =
    data.briefing ||
    data.project_details ||
    "Desenvolvimento de plataforma web B2B de alta velocidade.";
  const total = data.totalInvestment || 2800;
  const entry = total * 0.5;

  // 1. Cria o Lead
  const lead = await prisma.lead.create({
    data: {
      name: clientName,
      company: companyName,
      email: clientEmail,
      phone: clientPhone,
      whatsappId,
      address: clientAddress,
      projectType: typeOfProject,
      deadline: projectDeadline,
      briefing: projectBriefing,
      answers: data.answers || {
        name: clientName,
        company: companyName,
        email: clientEmail,
        city: data.city,
        projectType: typeOfProject,
        deadline: projectDeadline,
        briefing: projectBriefing,
      },
      totalInvestment: total,
      entryPayment: entry,
      status: "proposta_enviada",
      source: "whatsapp",
    },
  });

  // 2. Cria a Proposal vinculada
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 7);

  const proposal = await prisma.proposal.create({
    data: {
      leadId: lead.id,
      title: `Proposta — ${companyName}`,
      content: projectBriefing,
      amount: total,
      entryAmount: entry,
      status: "enviada",
      validUntil,
      version: 1,
    },
  });

  const appUrl = (process.env.APP_URL || "https://os.thomaseduardo.com.br").replace(
    /\/$/,
    ""
  );

  // Link limpo usando publicToken (sem query params pesados)
  const proposalUrl = `${appUrl}/proposta/${proposal.publicToken}`;

  // Também mantém compatibilidade com query params (para a página atual)
  const queryParams = new URLSearchParams({
    cliente: clientName,
    empresa: companyName,
    email: clientEmail || "",
    endereco: clientAddress || "",
    projeto: typeOfProject,
    briefing: projectBriefing,
    prazo: projectDeadline,
  }).toString();

  const proposalUrlWithParams = `${proposalUrl}?${queryParams}`;

  return {
    success: true,
    leadId: lead.id,
    proposalId: proposal.id,
    publicToken: proposal.publicToken,
    url: proposalUrlWithParams,
    proposalUrl: proposalUrlWithParams,
    lead: {
      id: lead.id,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      projectType: lead.projectType,
      deadline: lead.deadline,
      briefing: lead.briefing,
      totalInvestment: lead.totalInvestment,
      entryPayment: lead.entryPayment,
      status: lead.status,
    },
    message: "Proposta comercial gerada com sucesso via TERON OS!",
  };
}

export const createLeadFn = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => data)
  .handler(async ({ data }) => {
    return processLeadCreation(data);
  });

export const Route = createFileRoute("/api/lead")({
  // Handler HTTP tradicional para o bot (fetch direto)
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as LeadInput;
          const result = await processLeadCreation(body);
          return Response.json(result);
        } catch (err) {
          console.error("[api/lead] error:", err);
          return Response.json(
            { success: false, error: "Failed to create lead/proposal" },
            { status: 500 }
          );
        }
      },
    },
  },
  component: () => null,
});
