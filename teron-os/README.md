# TERON OS

**Sistema Operacional Empresarial** para empresas de tecnologia.

Conecta processos comerciais, financeiros e operacionais em um único ambiente inteligente, com bot de atendimento no WhatsApp integrado.

## Visão do Produto

- **Frontend**: Painel completo (CRM, Projetos, Propostas, Financeiro, Chat, Automações...)
- **Bot WhatsApp**: Atendimento inteligente com modais interativos + geração de propostas
- **Integração**: Bot → Discovery → Proposta personalizada → Link único na OS

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | React 19 + TanStack Start + Tailwind 4 + Radix UI |
| Backend/DB | Prisma + PostgreSQL |
| Bot | Node.js + WPPConnect + Gemini (hybrid) |
| Deploy | Vercel + Docker |

## Estrutura atual

```
teron-os/
├── bot/                 # WhatsApp Bot (multi-tenant + niches)
├── prisma/              # Schema + migrations
├── src/                 # Frontend (TanStack Start)
├── docs/                # Documentação
├── public/
├── docker-compose.yml
└── package.json
```

## Scripts principais

```bash
npm run dev          # Frontend (porta 3005)
npm run bot:dev      # Bot WhatsApp
npm run db:up        # Sobe PostgreSQL
npm run db:migrate   # Roda migrations
npm run db:studio    # Prisma Studio
```

## Fluxo principal (Proposta)

1. Cliente fala no WhatsApp
2. Clica em **Fazer Proposta**
3. Bot faz Discovery guiado (perguntas)
4. Gera proposta personalizada
5. Salva no banco (Lead + Proposal)
6. Envia link único: `/proposta/{id}`
7. Cliente visualiza, aceita ou solicita alteração

Documentação completa do fluxo: [`docs/PROPOSAL_FLOW.md`](docs/PROPOSAL_FLOW.md)

## Autor

Thomas Eduardo — [thomaseduardo.online](https://thomaseduardo.online)
