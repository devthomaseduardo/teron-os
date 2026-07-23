import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/lib/prisma";

export interface LeadInput {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  projectType?: string;
  project_type?: string;
  deadline?: string;
  briefing?: string;
  project_details?: string;
  totalInvestment?: number;
}

export const leadsStore = new Map<string, any>();

export async function processLeadCreation(data: LeadInput) {
  const {
    name,
    company,
    email,
    phone,
    address,
    city,
    projectType,
    project_type,
    deadline,
    briefing,
    project_details,
    totalInvestment,
  } = data;

  const clientName = name || "Cliente B2B";
  const companyName = company || "Empresa Contratante";
  const clientEmail = email || "cliente@empresa.com.br";
  const clientPhone = phone || "(11) 99999-9999";
  const clientAddress = address || city || "São Paulo, SP";
  const typeOfProject = projectType || project_type || "Portal Dealer B2B & Plataforma Web";
  const projectDeadline = deadline || "15 dias úteis";
  const projectBriefing = briefing || project_details || "Desenvolvimento de plataforma web B2B de alta velocidade.";
  const total = totalInvestment || 2800;
  const entry = total * 0.5;

  const slug = (companyName || clientName || "cliente")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const proposalId = `os-${slug}-${randomSuffix}`;

  const leadRecord = {
    id: proposalId,
    name: clientName,
    company: companyName,
    email: clientEmail,
    phone: clientPhone,
    address: clientAddress,
    projectType: typeOfProject,
    deadline: projectDeadline,
    briefing: projectBriefing,
    totalInvestment: total,
    entryPayment: entry,
    status: "proposta_enviada",
  };

  leadsStore.set(proposalId, leadRecord);

  try {
    await prisma.lead.create({
      data: leadRecord,
    });
  } catch (err) {
    console.error("[Prisma] Failed to save lead to PostgreSQL:", err);
  }

  const queryParams = new URLSearchParams({
    cliente: leadRecord.name,
    empresa: leadRecord.company,
    email: leadRecord.email,
    endereco: leadRecord.address,
    projeto: leadRecord.projectType,
    briefing: leadRecord.briefing,
    prazo: leadRecord.deadline,
  }).toString();

  const appUrl = process.env.APP_URL || "http://localhost:3005";
  const proposalUrl = `${appUrl}/proposta/${proposalId}?${queryParams}`;

  return {
    success: true,
    proposalId,
    url: proposalUrl,
    lead: leadRecord,
    message: "Proposta comercial gerada com sucesso via TERON OS!",
  };
}

export const createLeadFn = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => data)
  .handler(async ({ data }) => {
    return processLeadCreation(data);
  });

export const Route = createFileRoute("/api/lead")({
  component: () => null,
});
