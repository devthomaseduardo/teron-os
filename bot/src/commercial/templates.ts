import type { DiscoveryAnswers } from './types';

export const mainMenu = {
  title: 'TERON OS',
  description: 'Como posso te ajudar hoje?',
  buttonText: 'Ver op\u00e7\u00f5es',
  footer: 'Escolha uma op\u00e7\u00e3o',
  sections: [
    {
      title: 'Op\u00e7\u00f5es',
      rows: [
        { rowId: 'menu_proposta', title: 'Fazer Proposta', description: 'Or\u00e7amento personalizado' },
        { rowId: 'menu_servicos', title: 'Ver Servi\u00e7os', description: 'Sites, sistemas, apps...' },
        { rowId: 'menu_como_funciona', title: 'Como funciona', description: 'Entenda o processo' },
        { rowId: 'menu_portfolio', title: 'Portf\u00f3lio / Cases', description: 'Exemplos reais' },
        { rowId: 'menu_humano', title: 'Falar com humano', description: 'Atendimento direto' },
        { rowId: 'menu_agendar', title: 'Agendar conversa', description: 'Marcar uma call' },
        { rowId: 'menu_cliente', title: 'J\u00e1 sou cliente', description: 'Status e pagamentos' },
      ],
    },
  ],
};

export const tipoProjetoMenu = {
  title: 'Tipo de projeto',
  description: 'O que voc\u00ea precisa?',
  buttonText: 'Escolher',
  footer: 'Selecione uma op\u00e7\u00e3o',
  sections: [
    {
      title: 'Tipos',
      rows: [
        { rowId: 'tipo_site', title: 'Site / Landing Page' },
        { rowId: 'tipo_sistema', title: 'Sistema Web / Dashboard' },
        { rowId: 'tipo_app', title: 'Aplicativo' },
        { rowId: 'tipo_automacao', title: 'Bot + Automa\u00e7\u00e3o' },
        { rowId: 'tipo_outro', title: 'Outro' },
      ],
    },
  ],
};

export const prazoMenu = {
  title: 'Prazo desejado',
  description: 'Quando precisa estar pronto?',
  buttonText: 'Escolher',
  sections: [
    {
      title: 'Prazos',
      rows: [
        { rowId: 'prazo_urgente', title: 'At\u00e9 15 dias' },
        { rowId: 'prazo_30', title: '30 dias' },
        { rowId: 'prazo_60', title: '60 dias' },
        { rowId: 'prazo_flexivel', title: 'Flex\u00edvel' },
      ],
    },
  ],
};

export const investimentoMenu = {
  title: 'Faixa de investimento',
  description: 'Qual o or\u00e7amento aproximado?',
  buttonText: 'Escolher',
  sections: [
    {
      title: 'Investimento',
      rows: [
        { rowId: 'inv_3k', title: 'At\u00e9 R$ 3.000' },
        { rowId: 'inv_5k', title: 'R$ 3.000 \u2013 5.000' },
        { rowId: 'inv_10k', title: 'R$ 5.000 \u2013 10.000' },
        { rowId: 'inv_15k', title: 'R$ 10.000 \u2013 15.000' },
        { rowId: 'inv_acima', title: 'Acima de R$ 15.000' },
      ],
    },
  ],
};

export const servicosMenu = {
  title: 'Nossos Servi\u00e7os',
  description: 'O que voc\u00ea precisa?',
  buttonText: 'Ver op\u00e7\u00f5es',
  sections: [
    {
      title: 'Servi\u00e7os',
      rows: [
        { rowId: 'serv_landing', title: 'Landing Page', description: 'Alta convers\u00e3o' },
        { rowId: 'serv_site', title: 'Site Institucional', description: 'Presen\u00e7a completa' },
        { rowId: 'serv_sistema', title: 'Sistema / Dashboard', description: 'Gest\u00e3o interna' },
        { rowId: 'serv_app', title: 'Aplicativo', description: 'iOS e Android' },
        { rowId: 'serv_bot', title: 'Bot + Automa\u00e7\u00e3o', description: 'WhatsApp e integra\u00e7\u00f5es' },
        { rowId: 'serv_proposta', title: 'Proposta personalizada', description: 'Quero or\u00e7amento' },
      ],
    },
  ],
};

export function buildProposalMessage(answers: DiscoveryAnswers, publicToken: string, baseUrl: string) {
  const nome = answers.name || 'Cliente';
  const empresa = answers.company || 'sua empresa';
  const tipo = answers.projectType || 'projeto';
  const prazo = answers.deadline || 'a definir';
  const investimento = answers.investment || 'a combinar';

  return (
    `Pronto, *${nome}*! \ud83d\ude80\n\n` +
    `Montei uma proposta personalizada para *${empresa}*.\n\n` +
    `\ud83d\udccb Tipo: ${tipo}\n` +
    `\ud83d\udcb0 Investimento estimado: ${investimento}\n` +
    `\u23f0 Prazo: ${prazo}\n\n` +
    `Acesse aqui (v\u00e1lido por 7 dias):\n` +
    `${baseUrl}/proposta/${publicToken}\n\n` +
    `Qualquer d\u00favida \u00e9 s\u00f3 responder aqui.`
  );
}

export const texts = {
  askName: 'Qual o seu *nome completo*?',
  askCompany: 'Qual o nome da *empresa*? (ou digite "sou aut\u00f4nomo")',
  askObjective: 'Qual o *principal objetivo* deste projeto?',
  askCurrent: 'Voc\u00ea j\u00e1 tem site ou sistema atual?',
  askCurrentLink: 'Pode me enviar o *link* atual?',
  askIntegrations: 'Precisa de alguma *integra\u00e7\u00e3o*? (WhatsApp, pagamento, ERP, CRM...)\nPode digitar ou "nenhuma".',
  askNotes: 'Alguma *observa\u00e7\u00e3o* importante? (ou digite "n\u00e3o")',
  generating: 'Perfeito! Estou montando sua proposta personalizada... \u23f3',
  human: 'Vou avisar o time agora. Em breve algu\u00e9m te responde por aqui. \ud83d\udc4d',
  howItWorks:
    'Aqui \u00e9 simples:\n\n' +
    '1. Voc\u00ea me conta o que precisa\n' +
    '2. Eu monto uma proposta personalizada\n' +
    '3. Voc\u00ea recebe um link exclusivo\n' +
    '4. Aceita e a gente come\u00e7a\n\n' +
    'Quer fazer uma proposta agora?',
};
