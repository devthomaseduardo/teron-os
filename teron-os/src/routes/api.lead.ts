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
  intent?: string; // proposta | recrutador | produto_teron
}

export async function processLeadCreation(data: LeadInput) {
  const intent =
    data.intent ||
    (data.answers && typeof data.answers === "object" && (data.answers as any).intent) ||
    "proposta";

  const clientName = data.name || "Contato";
  const companyName = data.company || null;
  const clientEmail = data.email || null;
  const clientPhone = data.phone || null;
  const whatsappId = data.whatsappId || data.phone || null;
  const clientAddress = data.address || data.city || null;
  const typeOfProject =
    data.projectType || data.project_type || (intent === "recrutador" ? "Recrutamento" : "Projeto sob medida");
  const projectDeadline = data.deadline || null;
  const projectBriefing = data.briefing || data.project_details || null;
  const total = data.totalInvestment || 0;
  const entry = total > 0 ? total * 0.5 : 0;

  const leadStatus = intent === "recrutador" ? "recrutador" : "proposta_enviada";

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
      answers: (data.answers as any) || {
        name: clientName,
        company: companyName,
        intent,
      },
      totalInvestment: total,
      entryPayment: entry,
      status: leadStatus,
      source: "whatsapp",
      intent: String(intent),
    },
  });

  // Recrutador: só lead, sem proposta comercial
  if (intent === "recrutador") {
    return {
      success: true,
      leadId: lead.id,
      proposalId: null,
      publicToken: null,
      url: null,
      message: "Lead de recrutamento registrado",
    };
  }

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 7);

  const titlePrefix = intent === "produto_teron" ? "TERON OS Sob Medida" : "Proposta";

  const proposal = await prisma.proposal.create({
    data: {
      leadId: lead.id,
      title: `${titlePrefix} — ${companyName || clientName}`,
      content: projectBriefing,
      amount: total,
      entryAmount: entry,
      status: "enviada",
      validUntil,
      version: 1,
    },
  });

  const appUrl = (process.env.APP_URL || "https://os.thomaseduardo.com.br").replace(/\/$/, "");
  const proposalUrl = `${appUrl}/proposta/${proposal.publicToken}`;

  const queryParams = new URLSearchParams({
    cliente: clientName,
    empresa: companyName || "",
    email: clientEmail || "",
    endereco: clientAddress || "",
    projeto: typeOfProject,
    briefing: projectBriefing || "",
    prazo: projectDeadline || "",
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
      status: lead.status,
      intent: lead.intent,
    },
    message: "Proposta gerada com sucesso via TERON OS",
  };
}

export const createLeadFn = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => data)
  .handler(async ({ data }) => processLeadCreation(data));

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as LeadInput;
          const result = await processLeadCreation(body);
          return Response.json(result);
        } catch (err) {
          console.error("[api/lead] error:", err);
          return Response.json({ success: false, error: "Failed to create lead" }, { status: 500 });
        }
      },
    },
  },
  component: () => null,
});
