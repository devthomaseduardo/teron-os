# Status — TERON OS

## Pipeline completo (implementado)

```
WhatsApp (teron-flow)
  → POST /api/lead          (Lead + Proposal)
  → link /proposta/{token}

Cliente abre proposta
  → GET /api/proposal/{token}   (marca visualizada)
  → POST accept                 (status aceita + cria Project + clientAccessToken)
  → /cliente/onboarding/{token}

Admin
  → GET /api/leads
  → GET /api/proposals
  → /app/leads e /app/propostas (sem mock)
```

## Hook da proposta

`src/hooks/use-proposal.ts`
- `load` / `accept` / `reject`
- Fallback de query params para links antigos do bot

Na página `proposta.$id.tsx`, use:

```tsx
const { id } = useParams({ from: "/proposta/$id" });
const { view, loading, error, accept } = useProposal(id);
```

## Segurança

- `.env` no gitignore
- Remova `.env` do tracking se ainda estiver no histórico
- Rotacione chaves

## Mercado

Ver [docs/MARKET.md](./MARKET.md)
