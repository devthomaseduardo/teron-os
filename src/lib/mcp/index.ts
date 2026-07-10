import { auth, defineMcp } from "@lovable.dev/mcp-js";

import listAttentionItems from "./tools/list-attention-items";
import listProjects from "./tools/list-projects";
import listClients from "./tools/list-clients";
import listProposals from "./tools/list-proposals";
import listInvoices from "./tools/list-invoices";
import whoami from "./tools/whoami";

const projectRef =
  import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "teron-studio-mcp",
  title: "TERON Studio",
  version: "0.1.0",
  instructions:
    "Ferramentas do TERON Studio — sistema operacional para estúdios de software. Use estas tools para consultar pendências, projetos, clientes, propostas e faturas do workspace do usuário autenticado.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    whoami,
    listAttentionItems,
    listProjects,
    listClients,
    listProposals,
    listInvoices,
  ],
});