# Arquitetura TERON OS

## Visão de alto nível

```
                    ┌─────────────────────┐
                    │     TERON OS (Web)      │
                    │  React + TanStack Start │
                    │  Prisma + PostgreSQL    │
                    └─────────────────────┘
                              ↑
                              │ API / Prisma
                              ↓
                    ┌─────────────────────┐
                    │      Bot WhatsApp       │
                    │   WPPConnect + Engine  │
                    │   (script + Gemini)    │
                    └─────────────────────┘
                              ↑
                         WhatsApp
```

## Modelos principais (Prisma)

- **User / Session** → autenticação do painel
- **Lead** → cliente que veio do bot ou manual
- **Proposal** → proposta gerada (tem publicToken para link)
- **Project** → projeto em andamento

## Integração Bot ↔ OS

1. Bot coleta dados no Discovery
2. Bot chama API interna ou usa Prisma Client diretamente
3. Cria `Lead` + `Proposal`
4. Gera link com `publicToken`
5. Cliente acessa a página pública da OS
6. Ações do cliente (aceitar/alterar) atualizam o status e notificam o painel

## Próximos passos de organização

Mover para estrutura monorepo mais limpa:

```
apps/
  web/     # frontend atual
  bot/     # bot atual
packages/
  database/
  shared/
```
