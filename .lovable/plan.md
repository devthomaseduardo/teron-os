# TERON OS — Sistema Operacional da Empresa de Serviços

Você tem razão: estávamos olhando por um ângulo pequeno. A TERON OS não é um "gestor de projetos com portal" — é o **SO da empresa inteira**, do lead ao lucro, com IA e Command Center orquestrando tudo.

Vou executar em 3 fases. Esta primeira entrega estabelece a nova espinha dorsal (navegação, Command Center, e a estrutura visual de todos os 20 módulos em alta fidelidade). Fases seguintes trocam mocks por backend real, IA de verdade e automações executáveis.

---

## Fase 1 — Nova espinha e Command Center (esta entrega)

### 1.1 Reposicionamento e navegação
- Reestruturar `workspace-shell.tsx` em 6 grupos que refletem o ciclo da empresa:
  - **Command** — Command Center, Inbox, IA, Automações
  - **Aquisição** — Marketing, CRM
  - **Vendas** — Portal Comercial (propostas, contratos, assinatura, pagamentos)
  - **Entrega** — Onboarding, Workspace, Projetos, Horas, Aprovações, Escopo, Diário, Comunicação
  - **Operação** — Financeiro, Biblioteca, Base Técnica, Suporte, Templates, Analytics
  - **Empresa** — Documentação, Academia, Configurações, Marketplace
- Command palette (⌘K) já está no shell — deixar visual pronto para busca global.

### 1.2 Command Center (`/app` — nova home)
Substituir o dashboard atual pela tela executiva que você descreveu:
- Saudação contextual ("Bom dia, Thomas") + data.
- **Bloco "Hoje você possui"**: propostas pendentes, contratos aguardando assinatura, clientes aguardando resposta, pagamentos vencendo, projetos em risco, horas planejadas, receita prevista vs confirmada — cada linha é um atalho.
- **Sugestões da IA** (feed): lembrar cliente, gerar cobrança, iniciar dev após aprovação, gerar aditivo por estouro de horas, enviar relatório esquecido — cada card com botões *Executar* / *Adiar* / *Descartar*.
- **Pulso da empresa**: receita do mês, lucro, horas vendidas vs trabalhadas, projetos ativos, propostas abertas (cards compactos, não gráficos pesados).
- **Radar de riscos**: cronogramas pausados, projetos com margem caindo, clientes com Health Score baixo.

### 1.3 Módulos em alta fidelidade (mocks realistas, dados em `teron-data.ts`)
Cada módulo abaixo ganha rota, UI premium e dados fictícios coerentes:

**Aquisição**
- `app.marketing` — landing pages, portfólio, blog, formulários, leads capturados, pixel manager (visão de gerenciamento).
- `app.crm` — funil kanban de leads → qualificado → proposta, com histórico, follow-ups e próximas ações.

**Vendas** (evoluir os que já existem)
- `app.propostas` + Proposal Builder (novo) — templates, blocos reutilizáveis.
- `app.contratos` — assinatura digital simulada, status.
- `app.pagamentos` (novo) — PIX, cartão, parcelamento, cobrança automática.

**Entrega** (a maioria já existe, refinar)
- `app.onboarding` — dashboard de todos os onboardings ativos (o do cliente já existe em `/cliente/onboarding/*`).
- `app.projetos` — enriquecer com sprint, dependências, riscos, roadmap, alterações.
- Manter: aprovações, escopo, horas, diário, comunicação.

**Operação**
- `app.financeiro` — expandir: contas a receber, a pagar, fluxo de caixa, NF, comissões, receita/lucro/custos.
- `app.biblioteca` (novo) — arquivos por cliente (logos, manual, fotos, vídeos, fontes).
- `app.base` — já existe, enriquecer com VPS, Docker, Deploy, DNS, SSL, chaves.
- `app.suporte` (renomear atendimento) — tickets com prioridade, SLA, responsável.
- `app.templates` (novo) — propostas, contratos, cobranças, WhatsApp, e-mail, escopos.
- `app.analytics` (novo) — visão da empresa (receita, lucro, horas, projetos, propostas).

**Empresa**
- `app.documentacao` (novo) — SOPs, processos, manual da empresa.
- `app.academia` (novo, placeholder "em breve") — trilhas de treinamento.
- `app.automacoes` (novo) — visualizador de fluxos no-code (pagamento → cria projeto → workspace → cronograma → e-mail).
- `app.marketplace` (novo, placeholder "em breve") — WhatsApp, Google Calendar, N8N, Stripe, Mercado Pago, GitHub, Figma, Notion, Linear.
- `app.configuracoes` — expandir: empresa, equipe, permissões, integrações, SMTP, chaves.

### 1.4 Área do Cliente (rota `/cliente`)
Refinar para mostrar exatamente o que você listou: projeto, arquivos, pagamentos, contrato, timeline, aprovações, horas, chamados — nada mais.

### 1.5 IA (`app.ia`)
Evoluir para "cérebro" com feed de observações + histórico de sugestões executadas, e conectar as mesmas sugestões que aparecem no Command Center.

---

## Fase 2 — Backend real (próxima)
Migrar mocks para Lovable Cloud: tabelas para leads, propostas, contratos, projetos, horas, faturas, tickets, arquivos, base técnica; auth com papéis (owner/team/cliente); RLS. Lovable AI Gateway (Gemini) para sugestões reais do Command Center. Automações via triggers.

## Fase 3 — Pagamentos, assinatura e integrações
Stripe/Mercado Pago para cobrança real, assinatura digital, webhooks, WhatsApp/e-mail transacional, storage de arquivos, deploy real de fluxos de automação.

---

## Detalhes técnicos

- Stack: TanStack Start + Tailwind + design tokens OKLCH já estabelecidos (mantém identidade Linear/Stripe/Vercel).
- Dados: expandir `src/lib/teron-data.ts` com tipos `Lead`, `Ticket`, `Automation`, `TemplateItem`, `LibraryAsset`, `TechAsset`, `CommandCenterInsight`, `AISuggestion` (já existe).
- Rotas novas: ~10 arquivos em `src/routes/app.*.tsx`.
- Command Center reescreve `src/routes/app.index.tsx`.
- Sem quebrar MCP tools existentes (list_projects, list_clients, etc).

---

**Escopo desta entrega**: Fase 1 completa. Você abre a TERON OS e vê o Command Center dizendo exatamente o que fazer hoje. Navega pelos 20 módulos e sente que é um SO real da empresa, mesmo com dados mockados. Depois falamos de backend.

Confirma para eu começar?
