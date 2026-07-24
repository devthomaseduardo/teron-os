# Roteiro de Gravacao — TERON OS

Use este documento quando for gravar o projeto.

## Ordem sugerida dos videos / capitulos

1. **Visao geral do produto**
   - O que e a TERON OS
   - Problema que resolve
   - Bot + Painel integrados

2. **Arquitetura**
   - Monorepo (web + bot + prisma)
   - Fluxo Bot → Discovery → Proposta → Link
   - Schema do banco (Lead + Proposal)

3. **Bot WhatsApp**
   - Menu principal (modais)
   - Todos os fluxos (proposta, servicos, como funciona, etc.)
   - Discovery passo a passo
   - Anti-ban e humanizacao

4. **Geracao de Proposta**
   - Como as respostas viram uma proposta
   - publicToken e link personalizado
   - Pagina publica `/proposta/$id`

5. **Painel da OS**
   - CRM / Leads
   - Propostas
   - Projetos
   - Financeiro

6. **Proximos passos**
   - Integracao real bot ↔ Prisma
   - Aceitar proposta pelo link
   - Notificacoes no painel

## Arquivos importantes para mostrar

- `docs/PROPOSAL_FLOW.md`
- `docs/FLOWS.md`
- `bot/src/commercial/flow.ts`
- `bot/src/commercial/templates.ts`
- `prisma/schema.prisma`
- `src/routes/proposta.$id.tsx`
- `src/routes/app.propostas.tsx`

## Commits feitos nesta sessao

1. `docs: add README + proposal flow documentation and architecture`
2. `feat(db): improve Lead and Proposal models for WhatsApp proposal flow`
3. `feat(bot): add commercial niche with full menu and proposal discovery flow`
4. `feat(bot): add proposal service stub + recording guide`
