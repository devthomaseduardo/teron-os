# Segurança — TERON OS

## Regras obrigatórias

1. **Nunca** commitar `.env`, tokens WhatsApp, `data/`, `tenants/`
2. `.env` real só no servidor / máquina local (use `.env.example` como modelo)
3. Se `.env` já foi commitado alguma vez: **rotacione todas as chaves** (DB, MP, Stripe, Gemini)
4. Painel admin e painel do cliente usam tokens/roles diferentes
5. API pública de proposta só retorna campos necessários (sem passwordHash, sem dados de outros clientes)

## Variáveis sensíveis

| Variável | Onde |
|----------|------|
| DATABASE_URL | OS |
| MERCADOPAGO_* | OS + bot |
| STRIPE_* | OS |
| GEMINI_KEY / OPENAI_KEY | bot |
| PANEL_TOKEN / ADMIN_TOKEN | bot |
| TERON_OS_URL | bot |

## Produção

- Use HTTPS
- Tokens de painel longos e únicos
- Número WhatsApp comercial dedicado
- Backup do Postgres
- Sem dados de demo em produção (banco começa vazio)
