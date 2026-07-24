# Status — TERON OS (atualizado)

## Feito nesta sessão

- Documentação (README, fluxos, arquitetura, painéis, segurança)
- Schema Prisma real (Lead, Proposal, Project + tokens)
- API `/api/lead` cria Lead + Proposal (ou só Lead se recrutador)
- API `/api/proposal/$token` busca proposta no banco e marca visualizada
- Bot TERON:
  - Menu com **orçamento**, **projeto como este (TERON OS)**, **recrutador**, cliente, valores, humano, call, site
  - Discovery 8 etapas
  - Payload com whatsappId + intent
- `.gitignore` protegendo secrets; `.env.example` zerado

## Como deve funcionar (resumo)

1. WhatsApp (`NICHE_ID=teron`) → menu
2. Orçamento / Projeto como TERON → discovery → `/api/lead` → link `/proposta/{token}`
3. Recrutador → 3 perguntas → lead com intent=recrutador (sem proposta)
4. Você vê tudo no painel admin (quando ligado ao Prisma)
5. Cliente vê só a proposta/projeto dele via token

## Segurança — ação sua agora

O arquivo `.env` chegou a aparecer no repositório. Faça:

1. Remover `.env` do Git (manter só local):
   ```bash
   git rm --cached .env bot/.env 2>/dev/null; git commit -m "security: stop tracking env files"
   ```
2. **Rotacionar** qualquer chave que tenha vazado (DB, MP, Gemini, etc.)
3. Usar só `.env.example` como modelo (valores vazios)

## Banco vazio (produção real)

```bash
npm run db:migrate
```

Sem seed de demo. Cadastre clientes reais depois no admin ou via bot.

## Ainda mock (próximo trabalho)

- `/app/propostas`, `/app/leads` ainda usam `teron-data.ts` (mock)
- `/proposta/$id` ainda prioriza query params; já existe API para buscar por token
- Painel cliente ainda não filtra 100% por `clientAccessToken`

Ligar esses módulos ao Prisma = painel admin e cliente 100% interligados.
