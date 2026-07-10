import { defineTool } from "@lovable.dev/mcp-js";

import { clients } from "@/lib/teron-data";

export default defineTool({
  name: "list_clients",
  title: "Clientes do workspace",
  description: "Lista os clientes do estúdio com contato, MRR, projetos ativos e status.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(clients, null, 2) }],
      structuredContent: { clients },
    };
  },
});