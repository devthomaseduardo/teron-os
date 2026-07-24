# Todos os Fluxos do Bot — TERON OS

## Menu Principal

Quando o cliente digita `oi`, `menu`, `0` ou inicia a conversa:

**Modal:**
- Título: `TERON OS`
- Descrição: `Como posso te ajudar hoje?`
- Botão: `Ver opções`

**Opções (rows):**

| rowId                 | Título               |
|-----------------------|----------------------|
| `menu_proposta`       | Fazer Proposta       |
| `menu_servicos`       | Ver Serviços         |
| `menu_como_funciona`  | Como funciona        |
| `menu_portfolio`      | Portfólio / Cases    |
| `menu_humano`         | Falar com humano     |
| `menu_agendar`        | Agendar conversa     |
| `menu_cliente`        | Já sou cliente       |

---

## 1. Fluxo: Fazer Proposta (`menu_proposta`)

Ver documento completo: [PROPOSAL_FLOW.md](./PROPOSAL_FLOW.md)

---

## 2. Fluxo: Ver Serviços (`menu_servicos`)

**Modal de serviços:**

| rowId              | Título                     | Descrição                      |
|--------------------|----------------------------|--------------------------------|
| `serv_landing`     | Landing Page               | Página de alta conversão       |
| `serv_site`        | Site Institucional         | Presença digital completa      |
| `serv_sistema`     | Sistema Web / Dashboard    | Gestão interna                 |
| `serv_app`         | Aplicativo                 | iOS / Android                  |
| `serv_bot`         | Bot + Automação            | WhatsApp + integrações        |
| `serv_proposta`    | Quero proposta personalizada | Volta para discovery        |

Ao clicar em um serviço → mostra detalhes + botão "Quero esse" → entra no discovery já com o tipo pré-selecionado.

---

## 3. Fluxo: Como funciona (`menu_como_funciona`)

Mensagem em etapas:

1. "Aqui é simples:"
2. "1. Você me conta o que precisa"
3. "2. Eu monto uma proposta personalizada"
4. "3. Você recebe um link exclusivo"
5. "4. Aceita e a gente começa"

Botões:
- `cta_proposta` → Fazer proposta agora
- `cta_menu` → Voltar ao menu

---

## 4. Fluxo: Portfólio (`menu_portfolio`)

Modal com cases (exemplos):

| rowId           | Título                |
|-----------------|-----------------------|
| `case_1`        | Site Homma Design     |
| `case_2`        | Sleep House           |
| `case_3`        | Hazap Computadores    |
| `case_voltar`   | Voltar ao menu        |

Cada case pode abrir uma mensagem com link + resumo.

---

## 5. Fluxo: Falar com humano (`menu_humano`)

1. Bot responde: "Vou avisar o time agora. Em breve alguém te responde por aqui."
2. Cria ticket / notificação no painel da OS
3. Marca a conversa como `humano`

---

## 6. Fluxo: Agendar conversa (`menu_agendar`)

1. Pergunta melhor dia da semana
2. Pergunta período (manhã / tarde)
3. Confirma e salva
4. Envia confirmação + cria lembrete

---

## 7. Fluxo: Já sou cliente (`menu_cliente`)

Submenu:

| rowId                | Título                  |
|----------------------|-------------------------|
| `cli_status`         | Status do projeto       |
| `cli_pagamentos`     | Pagamentos              |
| `cli_suporte`        | Suporte                 |
| `cli_voltar`         | Voltar ao menu          |

(Precisa de identificação pelo número do WhatsApp)

---

## Regras gerais do bot

- `oi` / `menu` / `0` → sempre volta ao menu principal
- 2 respostas inválidas seguidas → mostra menu limpo
- Mesmo modal não é reenviado em menos de 25 segundos
- Toda conversa de proposta cria/atualiza um Lead no banco
