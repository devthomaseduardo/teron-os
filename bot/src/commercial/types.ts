export type CommercialStep =
  | 'menu'
  | 'proposta_nome'
  | 'proposta_empresa'
  | 'proposta_tipo'
  | 'proposta_objetivo'
  | 'proposta_atual'
  | 'proposta_atual_link'
  | 'proposta_prazo'
  | 'proposta_investimento'
  | 'proposta_integracoes'
  | 'proposta_obs'
  | 'proposta_gerando'
  | 'servicos'
  | 'como_funciona'
  | 'portfolio'
  | 'humano'
  | 'agendar'
  | 'cliente';

export interface DiscoveryAnswers {
  name?: string;
  company?: string;
  projectType?: string;
  objective?: string;
  hasCurrent?: boolean;
  currentLink?: string;
  deadline?: string;
  investment?: string;
  integrations?: string;
  notes?: string;
}

export interface CommercialSession {
  step: CommercialStep;
  answers: DiscoveryAnswers;
  leadId?: string;
}
