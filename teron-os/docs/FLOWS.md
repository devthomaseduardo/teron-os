# Todos os Fluxos do Bot — TERON OS

> Fluxo principal implementado em `bot/src/teron/`.

## Menu Principal

Arquivo: `bot/src/teron/templates.ts` → `tplTeronMenu()`

| rowId | Título                |
|-------|-----------------------|
| 1     | Quero um orçamento   |
| 2     | Já sou cliente       |
| 3     | Prazos e valores     |
| 4     | Falar com o time     |
| 5     | Agendar uma call     |
| 6     | Acessar o site       |

Comandos universais: `oi`, `menu`, `0`, `voltar`, `cancelar`, `sair`, `reiniciar`

---

## 1. Quero um orçamento (Discovery)

Ver [PROPOSAL_FLOW.md](./PROPOSAL_FLOW.md)

---

## 2. Já sou cliente

Template: `tplClientInfo()`
- Link para o painel
- Opções: novo orçamento | falar com time | menu

---

## 3. Prazos e valores

Template: `tplPricingInfo()`
- Texto explicativo
- Opções: orçamento | agendar call | menu

---

## 4. Falar com o time

Template: `tplHandoff()`
- Marca `humanHandoff = true`
- Mensagem de transferência

---

## 5. Agendar uma call

Template: `tplScheduleCall()`
- Link para agendamento
- Opções: orçamento | menu

---

## 6. Acessar o site

Template: `tplVisitWebsite()`
- Link da plataforma
- Opções: orçamento | menu

---

## Pós-proposta (estado `done`)

- `status` / `acessei` / `assinei` / `paguei` → `tplPosProposta()`
- `humano` → handoff
- Qualquer outra coisa → reabre menu

---

## Regras gerais

- 3 respostas inválidas → handoff humano automático
- E-mail é validado com regex
- Escape sempre volta ao menu limpo
