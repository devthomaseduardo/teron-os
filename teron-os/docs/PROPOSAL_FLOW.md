# Fluxo Completo de Proposta — TERON OS

> **Implementação real:** `bot/src/teron/teron-flow.ts` + `bot/src/teron/templates.ts`  
> A pasta `bot/src/commercial/` foi um rascunho inicial e pode ser removida.

## Visão Geral

```
Cliente (WhatsApp)
      ↓
Menu TERON → "Quero um orçamento" (rowId: 1)
      ↓
Discovery guiado (8 etapas)
      ↓
Bot chama POST /api/lead
      ↓
OS cria Lead + Proposal (publicToken)
      ↓
Bot envia link personalizado
      ↓
Cliente abre /proposta/{publicToken}
      ↓
Simula → Assina (OTP) → Paga entrada → Workstation
```

## Menu Principal (já implementado)

| rowId | Título                | Ação                          |
|-------|-----------------------|-------------------------------|
| `1`   | Quero um orçamento   | Inicia discovery              |
| `2`   | Já sou cliente       | Área do cliente               |
| `3`   | Prazos e valores     | Info de preços                |
| `4`   | Falar com o time     | Handoff humano                |
| `5`   | Agendar uma call     | Link de agendamento           |
| `6`   | Acessar o site       | Link da plataforma            |

## Discovery (8 etapas)

| Etapa | Campo              | Tipo        |
|-------|--------------------|-------------|
| 1     | Nome               | Texto       |
| 2     | Empresa            | Texto       |
| 3     | E-mail             | Texto (valida @) |
| 4     | Cidade / Estado    | Texto       |
| 5     | Website / Instagram| Texto       |
| 6     | Tipo de projeto    | Modal (4 opções) |
| 7     | Briefing / detalhes| Texto       |
| 8     | Prazo              | Modal (4 opções) |

Ao final da etapa 8:
1. Grava lead local (`data/leads.jsonl`)
2. Chama `POST {TERON_OS_URL}/api/lead`
3. Recebe `url` / `proposalUrl`
4. Envia mensagem final com o link

## API `/api/lead`

Cria:
- **Lead** (status: `proposta_enviada`, source: `whatsapp`)
- **Proposal** (status: `enviada`, gera `publicToken`, validUntil +7 dias)

Retorna:
```json
{
  "success": true,
  "leadId": "...",
  "proposalId": "...",
  "publicToken": "...",
  "url": "https://os.../proposta/{token}?cliente=...&empresa=..."
}
```

## Página pública

Rota: `/proposta/$id`

Etapas:
1. Boas-vindas
2. Diagnóstico IA
3. Escopo
4. Simulador (extras)
5. Cronograma
6. Contrato + OTP
7. Pagamento (MP PIX + Stripe)
8. Workstation liberada

## Como ativar

```env
# bot/.env
NICHE_ID=teron
TERON_OS_URL=https://os.thomaseduardo.com.br
```

## Próximas melhorias

- [ ] Página buscar dados pelo `publicToken` no banco (hoje depende de query params)
- [ ] Notificar painel quando proposta é visualizada / aceita / paga
- [ ] Adicionar faixa de investimento no discovery
- [ ] Remover `bot/src/commercial/` (rascunho)
