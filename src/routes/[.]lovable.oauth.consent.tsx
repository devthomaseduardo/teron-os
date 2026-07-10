import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { supabase } from "@/integrations/supabase/client";

// Tiny local typed wrapper — the supabase.auth.oauth namespace is beta and
// isn't in the shipped @supabase/supabase-js types yet.
type OAuthClient = { name?: string | null; client_id?: string | null };
type AuthorizationDetails = {
  client?: OAuthClient | null;
  redirect_url?: string | null;
  redirect_to?: string | null;
  scope?: string | null;
  redirect_uri?: string | null;
};
type OAuthResult<T> = { data: T | null; error: { message: string } | null };
type OAuthHelpers = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  approveAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  denyAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
};
function oauthApi(): OAuthHelpers {
  return (supabase.auth as unknown as { oauth: OAuthHelpers }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) {
      throw new Error("Missing authorization_id");
    }
    const { data } = await supabase.auth.getSession();
    const next = location.pathname + location.searchStr;
    if (!data.session) {
      throw redirect({ to: "/login", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId =
      new URLSearchParams(location.search).get("authorization_id") ?? "";
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) {
      throw redirect({ href: immediate });
    }
    return data;
  },
  component: ConsentScreen,
  errorComponent: ({ error }) => (
    <ConsentShell>
      <p className="text-sm text-muted-foreground">
        Não foi possível carregar esta autorização:{" "}
        {String((error as Error)?.message ?? error)}
      </p>
    </ConsentShell>
  ),
});

function ConsentShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
        <div className="mb-8"><TeronWordmark /></div>
        <div className="w-full rounded-xl border border-border bg-card p-6 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

function ConsentScreen() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState<null | "approve" | "deny">(null);
  const [error, setError] = useState<string | null>(null);

  const clientName = details?.client?.name ?? "um aplicativo externo";

  async function decide(approve: boolean) {
    setBusy(approve ? "approve" : "deny");
    setError(null);
    const api = oauthApi();
    const { data, error } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (error) {
      setBusy(null);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(null);
      setError("O servidor de autorização não retornou um redirect.");
      return;
    }
    window.location.href = target;
  }

  return (
    <ConsentShell>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Autorização MCP
      </p>
      <h1 className="mt-2 font-display text-xl font-semibold tracking-tight">
        Conectar {clientName} ao TERON
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Este aplicativo poderá usar as ferramentas do TERON como você — ler
        pendências, projetos, clientes, propostas e faturas do seu workspace.
      </p>
      <ul className="mt-4 space-y-2 rounded-md border border-border/70 bg-muted/30 p-3 text-[12.5px] text-foreground">
        <li>Acessar sua identidade básica (perfil e e-mail).</li>
        <li>Chamar as ferramentas MCP habilitadas neste workspace.</li>
      </ul>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Isto não substitui as permissões e políticas do workspace TERON.
      </p>
      {error && (
        <p role="alert" className="mt-4 rounded-md bg-destructive/10 p-2 text-[12.5px] text-destructive">
          {error}
        </p>
      )}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => decide(true)}
          disabled={busy !== null}
          className="flex-1 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
        >
          {busy === "approve" ? "Autorizando…" : "Autorizar"}
        </button>
        <button
          onClick={() => decide(false)}
          disabled={busy !== null}
          className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
        >
          {busy === "deny" ? "Recusando…" : "Recusar"}
        </button>
      </div>
    </ConsentShell>
  );
}