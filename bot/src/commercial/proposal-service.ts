/**
 * Serviço responsável por criar Lead + Proposal no banco da TERON OS.
 *
 * Por enquanto é um stub. Na integração real:
 * 1. Importar o Prisma Client do monorepo (packages/database)
 * 2. Ou chamar uma API interna da OS (ex: POST /api/proposals)
 *
 * Retorna o publicToken para montar o link.
 */

import type { DiscoveryAnswers } from './types';

export interface CreateProposalResult {
  leadId: string;
  proposalId: string;
  publicToken: string;
  amount: number;
}

export async function createProposalFromDiscovery(
  answers: DiscoveryAnswers,
  whatsappId: string
): Promise<CreateProposalResult> {
  // TODO: substituir por chamada real ao Prisma / API
  // Exemplo de implementação futura:
  //
  // const lead = await prisma.lead.create({
  //   data: {
  //     name: answers.name || 'Cliente',
  //     company: answers.company,
  //     phone: whatsappId,
  //     whatsappId,
  //     projectType: answers.projectType,
  //     deadline: answers.deadline,
  //     briefing: buildBriefing(answers),
  //     answers: answers as any,
  //     status: 'proposta_enviada',
  //     source: 'whatsapp',
  //   },
  // });
  //
  // const proposal = await prisma.proposal.create({
  //   data: {
  //     leadId: lead.id,
  //     title: `Proposta - ${answers.company || answers.name}`,
  //     content: generateProposalContent(answers),
  //     amount: estimateAmount(answers.investment),
  //     status: 'enviada',
  //     validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  //   },
  // });
  //
  // return { leadId: lead.id, proposalId: proposal.id, publicToken: proposal.publicToken, amount: proposal.amount };

  // Stub temporário (gera token fake)
  const publicToken = `temp_${Date.now().toString(36)}`;
  console.log('[proposal-service] Stub createProposal', { answers, whatsappId, publicToken });

  return {
    leadId: 'stub-lead',
    proposalId: 'stub-proposal',
    publicToken,
    amount: 0,
  };
}

function buildBriefing(answers: DiscoveryAnswers): string {
  return [
    `Nome: ${answers.name}`,
    `Empresa: ${answers.company}`,
    `Tipo: ${answers.projectType}`,
    `Objetivo: ${answers.objective}`,
    `Já tem atual: ${answers.hasCurrent ? 'Sim' : 'Não'} ${answers.currentLink || ''}`,
    `Prazo: ${answers.deadline}`,
    `Investimento: ${answers.investment}`,
    `Integrações: ${answers.integrations}`,
    `Obs: ${answers.notes}`,
  ].join('\n');
}
