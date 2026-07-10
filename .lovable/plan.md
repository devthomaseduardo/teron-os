
# TERON OS — Reposicionamento + Novos Módulos

Vou reposicionar a plataforma como **TERON OS — Sistema Operacional para empresas de produtos digitais** e construir a base dos módulos que você descreveu. Dada a amplitude (13+ módulos, IA, cobrança automatizada, contratos, pagamentos), vou executar em fases para entregar valor real em cada etapa, sem "telas vazias".

## Fase 1 — Reposicionamento + Portal Comercial (esta entrega)

### Landing / Identidade
- Reescrever copy e narrativa: "TERON OS — O sistema operacional para empresas que constroem produtos digitais"
- Remover qualquer linguagem de "agência" / "estúdio de engenharia"
- Refinar hero, seções e microcopy — mesma identidade dark premium, tipografia refinada, mais respiro, micro-animações sutis (framer-motion) inspiradas em Linear/Vercel/Arc

### Workspace (renomear área)
- "Dashboard" → **Workspace** com sidebar minimalista tipo Linear
- Command palette (⌘K) mockada para reforçar a sensação de OS
- Reestruturar navegação em torno dos novos módulos

### Portal Comercial (o maior diferencial)
Rota pública: `/proposta/$id` — jornada em etapas, uma seção por vez, navegação por steps com progresso:

```
Boas-vindas → Sobre a TERON → Como trabalhamos → Escopo →
Incluso / Não incluso → Cronograma → Área do cliente →
Investimento → Políticas → FAQ → Aceite → Contrato → Pagamento → Sucesso
```

Cada passo com layout dedicado, animações de transição, tipografia grande. Ao final: gera projeto + libera onboarding (mockado nesta fase, real na Fase 2 quando conectar ao banco).

### Onboarding do Cliente
Rota `/cliente/onboarding/$projeto` — checklist obrigatório (logo, manual, textos, imagens, vídeos, acessos, domínio, hospedagem, referências, objetivos). Estado do projeto travado em "Aguardando Cliente" enquanto houver pendências; banner claro: *"O prazo será iniciado apenas após o recebimento de todos os materiais."*

### Módulos com telas de alta fidelidade (dados mock, prontos p/ backend)
- **Centro de Aprovações** — versões, status, aprovar/solicitar alteração, histórico
- **Controle de Escopo** — detecção de itens fora do escopo + CTA "Gerar orçamento complementar"
- **Controle de Horas** — previstas vs executadas, produtividade
- **Diário do Projeto** — timeline automática de eventos
- **Central de Comunicação** — chat por projeto
- **Base de Conhecimento** — credenciais e infra do projeto
- **Health Score do Cliente** — pontuação + indicadores
- **Assistente de IA (painel)** — feed de sugestões acionáveis ("Cliente há 7 dias sem enviar materiais…")

## Fase 2 — Backend real (próxima entrega, sob demanda)
- Ativar Lovable Cloud: tabelas `proposals`, `projects`, `onboarding_items`, `approvals`, `scope_items`, `time_entries`, `journal_events`, `messages`, `knowledge_entries`, `invoices`, `health_scores`
- Autenticação já existente + RLS por cliente/projeto
- Assistente de IA real via Lovable AI Gateway (Gemini) analisando eventos e gerando sugestões
- Cobrança automatizada via cron (lembretes, multa/juros)
- Pós-venda automatizado (30/60/90 dias)
- Contrato digital + assinatura + integração Stripe/Paddle para pagamento

## Fase 3 — Refinamento
- Command palette funcional
- Notificações real-time
- Relatórios e exports

## Detalhes técnicos
- Stack atual mantida (TanStack Start, Tailwind, shadcn, framer-motion)
- Todas as telas usam tokens semânticos já definidos em `src/styles.css`
- Dados mock estruturados em `src/lib/teron-data.ts` (estender)
- Rotas novas: `proposta.$id.tsx`, `cliente.onboarding.$projeto.tsx`, `app.aprovacoes.tsx`, `app.escopo.tsx`, `app.horas.tsx`, `app.diario.tsx`, `app.chat.tsx`, `app.base.tsx`, `app.health.tsx`, `app.ia.tsx`

Confirma para eu começar pela Fase 1?
