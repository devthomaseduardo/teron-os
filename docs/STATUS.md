# Status atual do projeto — TERON OS

Atualizado em 23/07/2026

## O que já está pronto e funcionando

### Bot WhatsApp (`bot/src/teron/`)
- Menu principal com 6 opções (modal interativo)
- Discovery completo em 8 etapas:
  1. Nome
  2. Empresa
  3. E-mail
  4. Cidade
  5. Website/Instagram
  6. Tipo de projeto (modal)
  7. Briefing / detalhes
  8. Prazo (modal)
- Gera link personalizado da proposta
- Chama `POST /api/lead` da OS
- Fallback local se a API estiver offline
- Pós-proposta (status, humano, reiniciar)

### API (`src/routes/api.lead.ts`)
- Recebe dados do bot
- Cria **Lead** + **Proposal** no Prisma
- Retorna `publicToken` + URL da proposta

### Página pública da proposta (`/proposta/$id`)
- Boas-vindas personalizada
- Diagnóstico IA
- Escopo técnico
- Simulador comercial (extras)
- Cronograma
- Contrato digital com assinatura OTP
- Pagamento (Mercado Pago PIX + Stripe)
- Liberação da Workstation

### Banco (Prisma)
- User / Session
- Lead (com whatsappId, answers, source)
- Proposal (com publicToken, version, status)
- Project

## Fluxo completo (como está hoje)

```
Cliente no WhatsApp
      ↓
Menu TERON → "Quero um orçamento"
      ↓
8 perguntas (discovery)
      ↓
Bot chama POST /api/lead
      ↓
OS cria Lead + Proposal no banco
      ↓
Bot envia link: /proposta/{publicToken}?cliente=...&empresa=...
      ↓
Cliente abre a proposta interativa
      ↓
Simula, assina, paga entrada
      ↓
Workstation liberada
```

## Como ativar o nicho TERON no bot

No `.env` do bot:

```env
NICHE_ID=teron
TERON_OS_URL=https://os.thomaseduardo.com.br
# ou http://localhost:3005 em dev
```

O orchestrator já prioriza o fluxo Teron quando `nicheId === 'teron'`.

## Próximos melhorias recomendadas

1. Rodar migration do Prisma (`npm run db:migrate`) para aplicar o schema novo
2. Fazer a página `/proposta/$id` buscar os dados pelo `publicToken` no banco (hoje usa query params)
3. Notificar o painel quando proposta é visualizada / aceita / paga
4. Remover a pasta `bot/src/commercial/` (foi criada como rascunho; o fluxo real está em `bot/src/teron/`)
5. Organizar monorepo (`apps/web` + `apps/bot`) se quiser

## Commits desta sessão

1. docs: README + fluxos + arquitetura
2. feat(db): schema Lead + Proposal melhorado
3. feat(bot): commercial niche (rascunho)
4. feat(bot): proposal service stub + recording guide
5. feat(api): /api/lead alinhado com schema novo + publicToken
