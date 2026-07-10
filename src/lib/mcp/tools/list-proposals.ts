import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { proposals } from "@/lib/teron-data";

export default defineTool({
  name: "list_proposals",
  title: "Propostas comerciais",
  description: "Lista as propostas comerciais com escopo, valor, status e envio.",
  inputSchema: {
    status: z
      .enum(["rascunho", "enviada", "aprovada", "recusada"])
      .optional()
      .describe("Filtra por status da proposta."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const rows = status ? proposals.filter((p) => p.status === status) : proposals;
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { proposals: rows },
    };
  },
});