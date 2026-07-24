# Status — TERON OS

## Pipeline completo (código)

```
WhatsApp (NICHE_ID=teron)
  → discovery / recrutador / produto TERON
  → POST /api/lead
  → Proposal.publicToken

Cliente
  → GET  /api/proposal/{token}
  → POST accept  → Project + clientAccessToken
  → /proposta/{token}  (useProposal)
  → /cliente/onboarding/{clientAccessToken}
      GET/PATCH /api/project/{token}  (checklist no Postgres)

Admin
  → GET /api/leads      → /app/leads
  → GET /api/proposals  → /app/propostas
  → GET /api/projects   → /app/projetos

Pagamento
  → processPaymentWebhookFn / POST /api/payment
  → aceita proposta + cria Project se faltar
```

## Sem demo

- Leads, propostas e projetos começam **vazios**
- Workstation só abre com token real
- Proposta pública lê do banco (fallback query string)

## Rodar

```bash
npm run db:migrate
npm run dev

# bot
cd bot && cp .env.example .env   # preencher GEMINI_KEY se hybrid
# NICHE_ID=teron
# TERON_OS_URL=http://localhost:3005
npm run bot:dev   # ou o script do monorepo
```

## Segurança

- `.env` no gitignore — não commitar secrets
- Rotacionar chaves se `.env` já foi commitado

## Mercado

Ver [MARKET.md](./MARKET.md)
