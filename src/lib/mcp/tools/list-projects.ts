import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { projects } from "@/lib/teron-data";

export default defineTool({
  name: "list_projects",
  title: "Projetos do estúdio",
  description:
    "Lista os projetos ativos com progresso, próximo marco, horas da semana e se há bloqueio aguardando cliente.",
  inputSchema: {
    status: z
      .enum(["descoberta", "execucao", "revisao", "entregue", "pausado"])
      .optional()
      .describe("Filtra por status do projeto."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const rows = status ? projects.filter((p) => p.status === status) : projects;
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { projects: rows },
    };
  },
});