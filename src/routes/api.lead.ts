import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export interface LeadInput {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  projectType?: string;
  deadline?: string;
  briefing?: string;
  totalInvestment?: number;
}

export const leadsStore = new Map<string, any>();

export const createLeadFn = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => data)
  .handler(async ({ data }) => {
    const { name, company, email, phone, address, projectType, deadline, briefing, totalInvestment } = data;

    const slug = (company || name || "cliente")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const proposalId = `os-${slug}-${randomSuffix}`;

    const leadRecord = {
      id: proposalId,
      name: name || "Cliente B2B",
      company: company || "Empresa Contratante",
      email: email || "cliente@empresa.com.br",
      phone: phone || "(11) 99999-9999",
      address: address || "São Paulo, SP",
      projectType: projectType || "Portal Dealer B2B & Plataforma Web",
      deadline: deadline || "15 dias úteis",
      briefing: briefing || "Desenvolvimento de plataforma web B2B de alta velocidade.",
      totalInvestment: totalInvestment || 2800,
      entryPayment: (totalInvestment || 2800) * 0.5,
      createdAt: new Date().toISOString(),
      status: "proposta_enviada",
    };

    leadsStore.set(proposalId, leadRecord);

    const queryParams = new URLSearchParams({
      cliente: leadRecord.name,
      empresa: leadRecord.company,
      email: leadRecord.email,
      endereco: leadRecord.address,
      projeto: leadRecord.projectType,
      briefing: leadRecord.briefing,
      prazo: leadRecord.deadline,
    }).toString();

    const proposalUrl = `${process.env.APP_URL || "http://localhost:3005"}/proposta/${proposalId}?${queryParams}`;

    return {
      success: true,
      proposalId,
      url: proposalUrl,
      lead: leadRecord,
      message: "Lead registrado em tempo real com sucesso! Link da OS interativa gerado.",
    };
  });

export const Route = createFileRoute("/api/lead")({
  component: () => null,
});
