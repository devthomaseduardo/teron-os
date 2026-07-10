import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { invoices } from "@/lib/teron-data";

export default defineTool({
  name: "list_invoices",
  title: "Faturas financeiras",
  description: "Lista as faturas do financeiro com valor, vencimento e status.",
  inputSchema: {
    status: z
      .enum(["paga", "aberta", "vencida", "prevista"])
      .optional()
      .describe("Filtra por status da fatura."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const rows = status ? invoices.filter((i) => i.status === status) : invoices;
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { invoices: rows },
    };
  },
});