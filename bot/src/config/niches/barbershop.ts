import type { NicheTemplate } from '../types.js';

/** Barbearia fictícia — agendamento com 8 barbeiros */
export const barbershopNiche: NicheTemplate = {
  id: 'barbershop',
  name: 'Barbearia Modelo',
  description:
    'Agendamento, preços, horários e confirmação com 8 barbeiros e escalas diferentes.',
  persona: {
    name: process.env.ASSISTANT_NAME || 'Alex',
    role: 'assistant',
    tone: 'amigavel',
    companyName: process.env.COMPANY_NAME || 'Barbearia Modelo',
    companyDescription:
      'Barbearia com profissionais qualificados, cortes, barba e estestica. Agendamento pelo WhatsApp.',
    boundaries: [
      'Não inventa horários fora da agenda real dos profissionais',
      'Não confirma valor diferente da tabela',
      'Não atende domingo (fechado)',
    ],
    goals: [
      'Agendar com serviço, profissional, dia e horário',
      'Informar preços e duração',
      'Confirmar reserva',
      'Passar endereço',
    ],
    greeting:
      'Olá! ✂️ Bem-vindo à Barbearia Modelo. Quer agendar, ver preços ou conhecer nossos profissionais?',
    farewell: 'Valeu! Te esperamos 💈',
    handoffMessage: 'Vou te passar para a recepção humana 👤',
  },
  intents: [
    {
      id: 'greeting',
      keywords: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'],
      priority: 10,
      reply: {
        replies: [
          'Olá! ✂️ Barbearia Modelo. Digite *menu* para opções ou *agendar* para marcar horário.',
        ],
        exclusive: true,
      },
    },
  ],
  flows: [],
  faq: [
    {
      id: 'parking',
      questions: ['estacionamento', 'onde estacionar'],
      answer:
        'Tem vagas na rua e um estacionamento rotativo a 50m. Qualquer dúvida, digite *endereço*.',
    },
  ],
  businessHours: undefined,
};
