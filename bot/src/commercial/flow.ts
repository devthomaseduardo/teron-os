import type { CommercialSession, CommercialStep, DiscoveryAnswers } from './types';
import {
  mainMenu,
  tipoProjetoMenu,
  prazoMenu,
  investimentoMenu,
  servicosMenu,
  texts,
  buildProposalMessage,
} from './templates';

/**
 * Processa a mensagem do cliente no fluxo comercial / proposta.
 * Retorna o pr\u00f3ximo passo + payload para o RichSender.
 */
export function processCommercial(
  session: CommercialSession,
  input: string,
  rowId?: string
): {
  session: CommercialSession;
  reply: {
    text?: string;
    list?: {
      title: string;
      description: string;
      buttonText: string;
      footer?: string;
      sections: {
        title: string;
        rows: {
          rowId: string;
          title: string;
          description?: string;
        }[];
      }[];
    };
    buttons?: { id: string; text: string }[];
  };
  action?: 'create_proposal';
} {
  const normalized = (rowId || input || '').trim().toLowerCase();
  let step = session.step;
  const answers = { ...session.answers };

  // Comandos universais
  if (['oi', 'menu', '0', 'in\u00edcio', 'inicio'].includes(normalized)) {
    return {
      session: { step: 'menu', answers: {} },
      reply: { list: mainMenu },
    };
  }

  // === MENU PRINCIPAL ===
  if (step === 'menu' || !step) {
    if (normalized === 'menu_proposta' || normalized.includes('proposta')) {
      return {
        session: { step: 'proposta_nome', answers: {} },
        reply: { text: texts.askName },
      };
    }
    if (normalized === 'menu_servicos' || normalized.includes('servi\u00e7o') || normalized.includes('servico')) {
      return {
        session: { ...session, step: 'servicos' },
        reply: { list: servicosMenu },
      };
    }
    if (normalized === 'menu_como_funciona' || normalized.includes('como funciona')) {
      return {
        session: { ...session, step: 'como_funciona' },
        reply: {
          text: texts.howItWorks,
          buttons: [
            { id: 'menu_proposta', text: 'Fazer proposta' },
            { id: 'menu', text: 'Voltar ao menu' },
          ],
        },
      };
    }
    if (normalized === 'menu_portfolio' || normalized.includes('portf\u00f3lio') || normalized.includes('portfolio')) {
      return {
        session: { ...session, step: 'portfolio' },
        reply: {
          text: 'Alguns dos nossos trabalhos:\n\n\u2022 Homma Design\n\u2022 Sleep House\n\u2022 Hazap Computadores\n\nQuer ver mais detalhes ou j\u00e1 prefere uma proposta?',
          buttons: [
            { id: 'menu_proposta', text: 'Fazer proposta' },
            { id: 'menu', text: 'Voltar ao menu' },
          ],
        },
      };
    }
    if (normalized === 'menu_humano' || normalized.includes('humano')) {
      return {
        session: { ...session, step: 'humano' },
        reply: { text: texts.human },
      };
    }
    if (normalized === 'menu_agendar' || normalized.includes('agendar')) {
      return {
        session: { ...session, step: 'agendar' },
        reply: { text: 'Qual o melhor dia da semana para conversarmos?' },
      };
    }
    if (normalized === 'menu_cliente' || normalized.includes('cliente')) {
      return {
        session: { ...session, step: 'cliente' },
        reply: {
          text: 'Para te identificar, me confirma o *e-mail* ou *nome da empresa* cadastrado?',
        },
      };
    }

    // fallback \u2192 mostra menu
    return {
      session: { step: 'menu', answers: {} },
      reply: { list: mainMenu },
    };
  }

  // === DISCOVERY DA PROPOSTA ===
  if (step === 'proposta_nome') {
    answers.name = input.trim();
    return {
      session: { step: 'proposta_empresa', answers },
      reply: { text: texts.askCompany },
    };
  }

  if (step === 'proposta_empresa') {
    answers.company = input.trim();
    return {
      session: { step: 'proposta_tipo', answers },
      reply: { list: tipoProjetoMenu },
    };
  }

  if (step === 'proposta_tipo') {
    const map: Record<string, string> = {
      tipo_site: 'Site / Landing Page',
      tipo_sistema: 'Sistema Web / Dashboard',
      tipo_app: 'Aplicativo',
      tipo_automacao: 'Bot + Automa\u00e7\u00e3o',
      tipo_outro: 'Outro',
    };
    answers.projectType = map[normalized] || input.trim();
    return {
      session: { step: 'proposta_objetivo', answers },
      reply: { text: texts.askObjective },
    };
  }

  if (step === 'proposta_objetivo') {
    answers.objective = input.trim();
    return {
      session: { step: 'proposta_atual', answers },
      reply: {
        text: texts.askCurrent,
        buttons: [
          { id: 'atual_sim', text: 'Sim' },
          { id: 'atual_nao', text: 'N\u00e3o' },
        ],
      },
    };
  }

  if (step === 'proposta_atual') {
    if (normalized === 'atual_sim' || normalized.includes('sim')) {
      answers.hasCurrent = true;
      return {
        session: { step: 'proposta_atual_link', answers },
        reply: { text: texts.askCurrentLink },
      };
    }
    answers.hasCurrent = false;
    return {
      session: { step: 'proposta_prazo', answers },
      reply: { list: prazoMenu },
    };
  }

  if (step === 'proposta_atual_link') {
    answers.currentLink = input.trim();
    return {
      session: { step: 'proposta_prazo', answers },
      reply: { list: prazoMenu },
    };
  }

  if (step === 'proposta_prazo') {
    const map: Record<string, string> = {
      prazo_urgente: 'At\u00e9 15 dias',
      prazo_30: '30 dias',
      prazo_60: '60 dias',
      prazo_flexivel: 'Flex\u00edvel',
    };
    answers.deadline = map[normalized] || input.trim();
    return {
      session: { step: 'proposta_investimento', answers },
      reply: { list: investimentoMenu },
    };
  }

  if (step === 'proposta_investimento') {
    const map: Record<string, string> = {
      inv_3k: 'At\u00e9 R$ 3.000',
      inv_5k: 'R$ 3.000 \u2013 5.000',
      inv_10k: 'R$ 5.000 \u2013 10.000',
      inv_15k: 'R$ 10.000 \u2013 15.000',
      inv_acima: 'Acima de R$ 15.000',
    };
    answers.investment = map[normalized] || input.trim();
    return {
      session: { step: 'proposta_integracoes', answers },
      reply: { text: texts.askIntegrations },
    };
  }

  if (step === 'proposta_integracoes') {
    answers.integrations = input.trim();
    return {
      session: { step: 'proposta_obs', answers },
      reply: { text: texts.askNotes },
    };
  }

  if (step === 'proposta_obs') {
    answers.notes = input.trim().toLowerCase() === 'n\u00e3o' ? '' : input.trim();
    return {
      session: { step: 'proposta_gerando', answers },
      reply: { text: texts.generating },
      action: 'create_proposal',
    };
  }

  // Servi\u00e7os \u2192 atalho para proposta
  if (step === 'servicos') {
    if (normalized === 'serv_proposta' || normalized.includes('proposta')) {
      return {
        session: { step: 'proposta_nome', answers: {} },
        reply: { text: texts.askName },
      };
    }
    // outros servi\u00e7os podem pr\u00e9-selecionar o tipo
    const tipoMap: Record<string, string> = {
      serv_landing: 'Site / Landing Page',
      serv_site: 'Site / Landing Page',
      serv_sistema: 'Sistema Web / Dashboard',
      serv_app: 'Aplicativo',
      serv_bot: 'Bot + Automa\u00e7\u00e3o',
    };
    if (tipoMap[normalized]) {
      answers.projectType = tipoMap[normalized];
      return {
        session: { step: 'proposta_nome', answers },
        reply: { text: texts.askName },
      };
    }
  }

  // fallback
  return {
    session: { step: 'menu', answers: {} },
    reply: { list: mainMenu },
  };
}

export { buildProposalMessage };
