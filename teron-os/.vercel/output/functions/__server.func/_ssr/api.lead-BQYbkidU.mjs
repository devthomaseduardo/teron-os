import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as prisma } from "./prisma-CpXuewPn.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api.lead-BQYbkidU.js
async function processLeadCreation(data) {
	const intent = data.intent || data.answers && typeof data.answers === "object" && data.answers.intent || "proposta";
	const clientName = data.name || "Contato";
	const companyName = data.company || null;
	const clientEmail = data.email || null;
	const clientPhone = data.phone || null;
	const whatsappId = data.whatsappId || data.phone || null;
	const clientAddress = data.address || data.city || null;
	const typeOfProject = data.projectType || data.project_type || (intent === "recrutador" ? "Recrutamento" : "Projeto sob medida");
	const projectDeadline = data.deadline || null;
	const projectBriefing = data.briefing || data.project_details || null;
	const total = data.totalInvestment || 0;
	const entry = total > 0 ? total * .5 : 0;
	const leadStatus = intent === "recrutador" ? "recrutador" : "proposta_enviada";
	const lead = await prisma.lead.create({ data: {
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
			intent
		},
		totalInvestment: total,
		entryPayment: entry,
		status: leadStatus,
		source: "whatsapp",
		intent: String(intent)
	} });
	if (intent === "recrutador") return {
		success: true,
		leadId: lead.id,
		proposalId: null,
		publicToken: null,
		url: null,
		message: "Lead de recrutamento registrado"
	};
	const validUntil = /* @__PURE__ */ new Date();
	validUntil.setDate(validUntil.getDate() + 7);
	const titlePrefix = intent === "produto_teron" ? "TERON OS Sob Medida" : "Proposta";
	const proposal = await prisma.proposal.create({ data: {
		leadId: lead.id,
		title: `${titlePrefix} — ${companyName || clientName}`,
		content: projectBriefing,
		amount: total,
		entryAmount: entry,
		status: "enviada",
		validUntil,
		version: 1
	} });
	const proposalUrlWithParams = `${`${(process.env.APP_URL || "https://os.thomaseduardo.com.br").replace(/\/$/, "")}/proposta/${proposal.publicToken}`}?${new URLSearchParams({
		cliente: clientName,
		empresa: companyName || "",
		email: clientEmail || "",
		endereco: clientAddress || "",
		projeto: typeOfProject,
		briefing: projectBriefing || "",
		prazo: projectDeadline || ""
	}).toString()}`;
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
			intent: lead.intent
		},
		message: "Proposta gerada com sucesso via TERON OS"
	};
}
var createLeadFn_createServerFn_handler = createServerRpc({
	id: "a547668f53ddf64526109de74976ac7c496cb70c2c0c56958a07d1c0c2599ecd",
	name: "createLeadFn",
	filename: "src/routes/api.lead.ts"
}, (opts) => createLeadFn.__executeServer(opts));
var createLeadFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createLeadFn_createServerFn_handler, async ({ data }) => processLeadCreation(data));
//#endregion
export { createLeadFn_createServerFn_handler };
