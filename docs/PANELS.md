# Painéis interligados — TERON OS

## Visão

```
Você (Admin / Studio)
  app/*  →  CRM, Propostas, Projetos, Financeiro, Config
        ↓
     PostgreSQL (fonte única da verdade)
        ↓
Cliente (Workstation)
  /cliente/onboarding/$projeto
  /proposta/$token
```

Tudo que você altera no **painel admin** deve refletir no **painel do cliente** porque ambos leem o mesmo banco.

## Entidades

| Modelo | Admin vê | Cliente vê |
|--------|----------|------------|
| Lead | lista, status, origem | — |
| Proposal | lista, editar, reenviar | só a dele via publicToken |
| Project | tudo | só o dele via clientAccessToken |
| clientPortal (JSON no Project) | você edita checklist, links, notas | cliente vê atualizado |

## Fluxo interligado

1. Bot cria Lead + Proposal
2. Aparece em `/app/leads` e `/app/propostas`
3. Cliente abre `/proposta/{publicToken}`
4. Ao pagar/aceitar → cria Project + `clientAccessToken`
5. Cliente acessa workstation com o token
6. Você atualiza status/checklist no admin → cliente vê na próxima carga

## Sem demo

- Banco inicia **vazio**
- Sem seed de clientes fictícios em produção
- Você pode cadastrar projetos reais depois (clientes que já fecharam)
- Arquivos `teron-data.ts` com dados mock devem ser substituídos por queries Prisma aos poucos

## Próximos passos técnicos

1. `/app/propostas` e `/app/leads` lerem do Prisma (hoje ainda usam mock)
2. `/proposta/$id` chamar `GET /api/proposal/$token`
3. Workstation do cliente filtrar por `clientAccessToken`
4. Webhook de pagamento atualizar Proposal + Project automaticamente
