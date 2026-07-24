import type { RichMessage } from '../messaging/types.js';

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const CONFIRMATIONS = ['Excelente!', 'Perfeito!', 'Registrado.', 'Entendido.', 'Anotado.'];

export function getRandomConfirmation(): string {
  return randomChoice(CONFIRMATIONS);
}

export function tplTeronMenu(_botName = 'Teron Bot'): RichMessage {
  const intro =
    `Ol\u00e1! Bem-vindo ao atendimento digital Teron OS \ud83c\udfe2\n` +
    `Como podemos impulsionar o seu projeto hoje?`;

  return {
    text: intro,
    intro,
    modalOnly: true,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha uma das op\u00e7\u00f5es abaixo:',
      footer: '',
      sections: [
        {
          title: 'Selecione uma op\u00e7\u00e3o:',
          rows: [
            { rowId: '1', title: 'Quero um or\u00e7amento', description: 'Proposta B2B personalizada' },
            { rowId: '7', title: 'Quero um projeto como este', description: 'Montar algo no estilo TERON OS' },
            { rowId: '8', title: 'Sou recrutador', description: 'Vagas e talentos' },
            { rowId: '2', title: 'J\u00e1 sou cliente', description: 'Workspace e suporte' },
            { rowId: '3', title: 'Prazos e valores', description: 'Estimativas e modalidades' },
            { rowId: '4', title: 'Falar com o time', description: 'Especialista humano' },
            { rowId: '5', title: 'Agendar uma call', description: 'Reuni\u00e3o estrat\u00e9gica' },
            { rowId: '6', title: 'Acessar o site', description: 'Plataforma oficial' },
          ],
        },
      ],
    },
  };
}

export function tplAskStep1FirstName(): RichMessage {
  return {
    text: 'Para iniciarmos seu atendimento, qual o seu primeiro nome?',
    keepTogether: true,
  };
}

export function tplAskStep2CompanyName(name: string): RichMessage {
  const ack = randomChoice(['Excelente', 'Perfeito', 'Prazer', '\u00d3timo']);
  const first = (name || '').split(' ')[0];
  const greeting = first ? `${ack}, ${first}!` : `${ack}!`;
  return {
    text: `${greeting} E qual o nome da sua empresa?`,
    keepTogether: true,
  };
}

export function tplAskStep3Email(): RichMessage {
  const ack = getRandomConfirmation();
  return {
    text: `${ack}\n\nQual o seu e-mail corporativo para envio da proposta?`,
    keepTogether: true,
  };
}

export function tplAskStep4City(): RichMessage {
  const ack = randomChoice(['Registrado.', 'Excelente.', 'Entendido.']);
  return {
    text: `${ack}\n\nEm qual cidade e estado fica a sede da sua empresa?`,
    keepTogether: true,
  };
}

export function tplAskStep5Website(): RichMessage {
  const ack = randomChoice(['Perfeito.', 'Excelente.', 'Anotado.']);
  return {
    text: `${ack}\n\nA empresa possui site oficial ou Instagram? (Caso n\u00e3o possua, basta responder "n\u00e3o")`,
    keepTogether: true,
  };
}

export function tplAskStep6ProjectType(): RichMessage {
  const ack = getRandomConfirmation();
  const intro = `${ack}\n\nQual a modalidade de solu\u00e7\u00e3o desejada para o seu projeto? Selecione uma op\u00e7\u00e3o:`;
  return {
    text: intro,
    intro,
    modalOnly: false,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha uma das op\u00e7\u00f5es abaixo:',
      footer: '',
      sections: [
        {
          title: 'Modalidade de Solu\u00e7\u00e3o',
          rows: [
            { rowId: '1', title: 'Landing Page', description: 'Alta convers\u00e3o e performance' },
            { rowId: '2', title: 'Portal / Web App', description: 'Plataforma web com banco de dados' },
            { rowId: '3', title: 'Automa\u00e7\u00e3o WhatsApp & OS', description: 'Bot + integra\u00e7\u00e3o OS' },
            { rowId: '4', title: 'Sistema Sob Medida / Outro', description: 'Arquitetura personalizada' },
            { rowId: '5', title: 'Produto no estilo TERON OS', description: 'OS empresarial + bot + pain\u00e9is' },
          ],
        },
      ],
    },
  };
}

export function tplAskStep7ProjectDetails(): RichMessage {
  const ack = randomChoice(['Perfeito!', 'Excelente!', 'Entendido!']);
  return {
    text: `${ack}\n\nDescreva brevemente os objetivos e requisitos principais do projeto (briefing).`,
    keepTogether: true,
  };
}

export function tplAskStep8Deadline(): RichMessage {
  const ack = randomChoice(['Registrado!', 'Excelente!', 'Anotado!']);
  const intro = `${ack}\n\nPara finalizar: qual o seu horizonte de prazo em mente para entrega? Selecione uma op\u00e7\u00e3o:`;
  return {
    text: intro,
    intro,
    modalOnly: false,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha uma das op\u00e7\u00f5es abaixo:',
      footer: '',
      sections: [
        {
          title: 'Horizonte de Prazo',
          rows: [
            { rowId: '1', title: 'At\u00e9 15 dias (Urgente)', description: 'Sprint r\u00e1pido' },
            { rowId: '2', title: 'At\u00e9 30 dias (1 m\u00eas)', description: 'Entrega padr\u00e3o' },
            { rowId: '3', title: '60+ dias (Sem pressa)', description: 'Em etapas' },
            { rowId: '4', title: 'A definir / Or\u00e7amento', description: 'An\u00e1lise de escopo' },
          ],
        },
      ],
    },
  };
}

export function tplTeronCompleted(leadData: { name: string; company: string; proposalUrl?: string }): RichMessage {
  const first = (leadData.name || 'cliente').split(' ')[0];
  const company = leadData.company ? ` (*${leadData.company}*)` : '';
  const proposalUrl = leadData.proposalUrl || 'https://os.thomaseduardo.com.br/';

  const intro =
    `\ud83c\udfe2 *TERON OS \u2014 PROPOSTA COMERCIAL B2B GERADA*\n` +
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
    `Tudo pronto, ${first}! Sua solicita\u00e7\u00e3o${company} foi processada com sucesso.\n\n` +
    `\ud83d\udcc4 *Sua Proposta Interativa:*\n` +
    `\ud83d\udc49 ${proposalUrl}\n\n` +
    `\ud83d\udd12 *Pr\u00f3ximos passos:* revise o escopo, selecione m\u00f3dulos e assine o contrato digital no link.`;

  return {
    text: intro,
    intro,
    modalOnly: false,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha uma das op\u00e7\u00f5es abaixo:',
      footer: '',
      sections: [
        {
          title: 'A\u00e7\u00f5es Dispon\u00edveis',
          rows: [
            { rowId: 'status', title: 'Ver status e onboarding', description: 'Contrato e acesso' },
            { rowId: 'reiniciar', title: 'Reiniciar atendimento', description: 'Novo or\u00e7amento' },
            { rowId: 'humano', title: 'Falar com o time', description: 'Consultor de vendas' },
          ],
        },
      ],
    },
  };
}

export function tplClientInfo(): RichMessage {
  return {
    text:
      `\ud83c\udfe2 *TERON WORKSPACE \u2014 \u00c1REA DO CLIENTE*\n` +
      `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
      `Se voc\u00ea j\u00e1 possui contrato ativo, use o link de acesso enviado na proposta ou fale com o time.\n` +
      `Portal: https://os.thomaseduardo.com.br/`,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha uma das op\u00e7\u00f5es abaixo:',
      footer: '',
      sections: [
        {
          title: 'O que deseja fazer?',
          rows: [
            { rowId: '1', title: 'Quero um or\u00e7amento', description: 'Novo projeto' },
            { rowId: '4', title: 'Falar com o time', description: 'Suporte' },
            { rowId: 'reiniciar', title: 'Menu principal', description: 'Voltar' },
          ],
        },
      ],
    },
  };
}

export function tplPricingInfo(): RichMessage {
  return {
    text:
      `\ud83d\udcca *TERON OS \u2014 INVESTIMENTOS*\n` +
      `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
      `Trabalhamos com escopo sob medida (Landing, Portais B2B, Rob\u00f4s e Plataformas de Gest\u00e3o).\n` +
      `O valor final sai na proposta personalizada.`,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha uma das op\u00e7\u00f5es abaixo:',
      footer: '',
      sections: [
        {
          title: 'Como prefere avan\u00e7ar?',
          rows: [
            { rowId: '1', title: 'Quero um or\u00e7amento', description: 'Proposta em minutos' },
            { rowId: '5', title: 'Agendar uma call', description: 'Falar com especialista' },
            { rowId: 'reiniciar', title: 'Menu principal', description: 'Voltar' },
          ],
        },
      ],
    },
  };
}

export function tplHandoff(): RichMessage {
  return {
    text:
      `\ud83d\udc64 *ATENDIMENTO ESPECIALIZADO TERON*\n` +
      `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
      `Transferindo para um especialista do time.\nUm consultor assume esta conversa em breve.`,
    keepTogether: true,
  };
}

export function tplScheduleCall(): RichMessage {
  return {
    text:
      `\ud83d\udcc5 *AGENDAMENTO \u2014 TERON OS*\n` +
      `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
      `Agende demonstra\u00e7\u00e3o ou reuni\u00e3o:\n` +
      `\ud83d\udc49 https://os.thomaseduardo.com.br/`,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha uma das op\u00e7\u00f5es abaixo:',
      footer: '',
      sections: [
        {
          title: 'Como deseja continuar?',
          rows: [
            { rowId: '1', title: 'Quero um or\u00e7amento', description: 'Proposta pr\u00e9via' },
            { rowId: 'reiniciar', title: 'Menu principal', description: 'Voltar' },
          ],
        },
      ],
    },
  };
}

export function tplVisitWebsite(): RichMessage {
  return {
    text:
      `\ud83c\udf10 *TERON OS \u2014 PLATAFORMA*\n` +
      `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
      `Conhe\u00e7a o ecossistema:\n` +
      `\ud83d\udc49 https://os.thomaseduardo.com.br/`,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha uma das op\u00e7\u00f5es abaixo:',
      footer: '',
      sections: [
        {
          title: 'Como deseja continuar?',
          rows: [
            { rowId: '1', title: 'Quero um or\u00e7amento', description: 'Proposta B2B' },
            { rowId: '7', title: 'Quero um projeto como este', description: 'Estilo TERON OS' },
            { rowId: 'reiniciar', title: 'Menu principal', description: 'Voltar' },
          ],
        },
      ],
    },
  };
}

/** Fluxo: cliente quer um produto no estilo TERON OS */
export function tplProdutoTeronIntro(): RichMessage {
  return {
    text:
      `\ud83d\ude80 *PRODUTO NO ESTILO TERON OS*\n` +
      `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
      `Perfeito. D\u00e1 para montar um sistema operacional empresarial sob medida:\n` +
      `\u2022 Painel admin + painel do cliente\n` +
      `\u2022 Bot WhatsApp multi-nicho\n` +
      `\u2022 Propostas, CRM, projetos e financeiro\n\n` +
      `Vou gerar uma proposta com esse escopo. Qual o seu *primeiro nome*?`,
    keepTogether: true,
  };
}

/** Fluxo recrutador */
export function tplRecruiterIntro(): RichMessage {
  return {
    text:
      `\ud83d\udcbc *RECRUTAMENTO \u2014 TERON*\n` +
      `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
      `Ol\u00e1! Para encaminhar ao time, me diga:\n` +
      `1) Seu nome\n` +
      `2) Empresa / consultoria\n` +
      `3) Vaga ou perfil que busca\n\n` +
      `Pode come\u00e7ar pelo *seu nome*.`,
    keepTogether: true,
  };
}

export function tplRecruiterDone(name: string): RichMessage {
  const first = (name || 'recrutador').split(' ')[0];
  return {
    text:
      `Obrigado, ${first}! \ud83d\udc4d\n` +
      `Registrei seu contato. O time responde por aqui ou por e-mail em breve.\n\n` +
      `Enquanto isso, o portf\u00f3lio e a plataforma:\n` +
      `\ud83d\udc49 https://os.thomaseduardo.com.br/`,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha:',
      footer: '',
      sections: [
        {
          title: 'Continuar',
          rows: [
            { rowId: 'reiniciar', title: 'Menu principal', description: 'Voltar' },
            { rowId: '4', title: 'Falar com o time', description: 'Urgente' },
          ],
        },
      ],
    },
  };
}

export function tplPosProposta(name: string): RichMessage {
  const first = (name || 'cliente').split(' ')[0];
  const intro =
    `\ud83d\ude80 *ONBOARDING E CONTRATO*\n` +
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
    `Excelente, ${first}!\n\n` +
    `1. Assine no link da proposta (OTP)\n` +
    `2. Pague a entrada (50%)\n` +
    `3. Workstation e checklist s\u00e3o liberados\n\n` +
    `Portal: https://os.thomaseduardo.com.br/`;

  return {
    text: intro,
    intro,
    modalOnly: false,
    keepTogether: true,
    list: {
      buttonText: 'Clique Aqui \ud83d\udc48',
      title: 'Op\u00e7\u00f5es',
      description: 'Escolha:',
      footer: '',
      sections: [
        {
          title: 'Continuar',
          rows: [
            { rowId: 'reiniciar', title: 'Menu principal', description: 'Voltar' },
            { rowId: 'humano', title: 'Falar com o time', description: 'Suporte' },
          ],
        },
      ],
    },
  };
}

export function tplEmailError(attempt = 1): RichMessage {
  if (attempt >= 2) {
    return {
      text: 'Por favor, informe um e-mail corporativo v\u00e1lido (exemplo: nome@empresa.com.br).',
      keepTogether: true,
    };
  }
  return {
    text: 'Formato de e-mail n\u00e3o identificado. Verifique se cont\u00e9m @ e tente novamente.',
    keepTogether: true,
  };
}

export function tplGenericError(attempt = 1): RichMessage {
  if (attempt >= 2) {
    return {
      text: 'N\u00e3o compreendemos a resposta. Por favor, tente enviar novamente.',
      keepTogether: true,
    };
  }
  return {
    text: 'Resposta n\u00e3o identificada. Por favor, repita sua resposta.',
    keepTogether: true,
  };
}
