# Fluxo Completo de Proposta — TERON OS

## Visão Geral

```
Cliente (WhatsApp)
      ↓
Modal Principal → clica "Fazer Proposta"
      ↓
Discovery Guiado (perguntas 1 a 1)
      ↓
Geração da Proposta (script + IA)
      ↓
Salva Lead + Proposal no Prisma
      ↓
Envia link personalizado
      ↓
Cliente abre /proposta/{publicToken}
      ↓
Aceita / Solicita alteração / Paga entrada
```

## 1. Menu Principal (Modal)

**Título:** TERON OS  
**Descrição:** Como posso te ajudar hoje?  
**Botão:** Ver opções

| rowId              | Título              | Descrição                          |
|--------------------|---------------------|------------------------------------|
| `menu_proposta`    | Fazer Proposta      | Orçamento personalizado            |
| `menu_servicos`    | Ver Serviços        | Sites, sistemas, apps, automações  |
| `menu_como_funciona`| Como funciona      | Entenda o processo                 |
| `menu_portfolio`   | Portfólio / Cases   | Exemplos reais                     |
| `menu_humano`      | Falar com humano    | Atendimento direto                 |
| `menu_agendar`     | Agendar conversa    | Marcar uma call                    |
| `menu_cliente`     | Já sou cliente      | Status do projeto e pagamentos      |

## 2. Discovery (quando clica em Fazer Proposta)

Cada pergunta é enviada como **1 modal** ou mensagem + botões.

### Perguntas na ordem:

1. **Nome completo**  
   Texto livre

2. **Empresa**  
   Texto livre (ou "sou autônomo")

3. **Tipo de projeto** (modal)
   - `tipo_site` → Site institucional / Landing
   - `tipo_sistema` → Sistema web / Dashboard
   - `tipo_app` → Aplicativo
   - `tipo_automacao` → Automação / Bot
   - `tipo_outro` → Outro

4. **Objetivo principal**  
   Texto livre

5. **Já tem site/sistema atual?**  
   - `atual_sim` → Sim (pede o link)
   - `atual_nao` → Não

6. **Prazo desejado** (modal)
   - `prazo_urgente` → Até 15 dias
   - `prazo_30` → 30 dias
   - `prazo_60` → 60 dias
   - `prazo_flexivel` → Flexível

7. **Faixa de investimento** (modal)
   - `inv_3k` → Até R$ 3.000
   - `inv_5k` → R$ 3.000 – 5.000
   - `inv_10k` → R$ 5.000 – 10.000
   - `inv_15k` → R$ 10.000 – 15.000
   - `inv_acima` → Acima de R$ 15.000

8. **Integrações necessárias?** (multi-select ou texto)
   - WhatsApp, Pagamento, ERP, CRM, Outro

9. **Observações finais**  
   Texto livre (opcional)

## 3. Geração da Proposta

Após a última resposta:

1. Bot mostra: "Perfeito! Estou montando sua proposta personalizada..."
2. Processa com script + Gemini
3. Cria registro no banco:
   - `Lead` (status: `proposta_enviada`)
   - `Proposal` (status: `enviada`, gera `publicToken`)
4. Monta a mensagem final:

```
Pronto, {nome}! 🚀

Monteei uma proposta personalizada para {empresa}.

📋 Tipo: {tipo}
💰 Investimento estimado: {valor}
⏰ Prazo: {prazo}

Acesse aqui (válido por 7 dias):
https://os.thomaseduardo.com.br/proposta/{publicToken}

Qualquer dúvida é só responder aqui.
```

## 4. Página pública da Proposta

Rota: `/proposta/$id` (ou `/proposta/$publicToken`)

Deve mostrar:
- Nome do cliente + empresa
- Escopo resumido
- Valor e condições
- Botões: **Aceitar Proposta** | **Solicitar Alteração** | **Falar no WhatsApp**

Ao aceitar → muda status + notifica o painel da OS.

## 5. Estados da Proposta

| Status        | Descrição                          |
|---------------|------------------------------------|
| `rascunho`    | Criada mas não enviada             |
| `enviada`     | Link enviado ao cliente            |
| `visualizada` | Cliente abriu o link               |
| `aceita`      | Cliente aceitou                    |
| `recusada`    | Cliente recusou / pediu alteração  |
| `expirada`    | Passou do validUntil               |
