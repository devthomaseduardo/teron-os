import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { attentionItems } from "@/lib/teron-data";

export default defineTool({
  name: "list_attention_items",
  title: "Pendências que precisam de atenção",
  description:
    "Lista as pendências priorizadas do workspace (pagamentos, propostas, entregas, reuniões e itens bloqueados aguardando cliente).",
  inputSchema: {
    priority: z
      .enum(["critical", "high", "medium", "low"])
      .optional()
      .describe("Filtra por prioridade."),
    blockedByClient: z
      .boolean()
      .optional()
      .describe("Se true, retorna apenas itens bloqueados aguardando cliente."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ priority, blockedByClient }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    let items = attentionItems;
    if (priority) items = items.filter((i) => i.priority === priority);
    if (blockedByClient) items = items.filter((i) => i.blockedBy === "cliente");
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { items },
    };
  },
});