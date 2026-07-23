import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — TERON Studio" },
      { name: "description", content: "Acesse o seu workspace TERON." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : undefined,
  }),
  component: LoginPage,
});

// Ensure `next` is a same-origin path we control (e.g. "/app" or the consent
// route). Anything else falls back to /app.
function safeNext(next: string | undefined): string {
  if (!next) return "/app";
  if (!next.startsWith("/") || next.startsWith("//")) return "/app";
  return next;
}

function LoginPage() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const target = safeNext(next);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Already signed in? Send them straight to their destination.
  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled && data.session) {
        window.location.replace(target);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [target]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signup") {
        const emailRedirectTo = `${window.location.origin}${target}`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo },
        });
        if (error) throw error;
        setNotice("Conta criada. Verifique seu e-mail para confirmar o acesso.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.replace(target);
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${target}`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border/70 bg-sidebar lg:block">
        <div className="absolute inset-0 teron-grid opacity-40" />
        <div className="absolute inset-0 teron-glow opacity-60" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <TeronWordmark />
          <div>
            <p className="max-w-md font-display text-2xl font-medium leading-snug text-foreground">
              "A TERON substituiu 4 ferramentas do nosso estúdio. Nossos clientes finalmente sentem que estão sendo bem cuidados."
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Marina Prado · Founder, Pallas Studio</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-10 inline-block lg:hidden">
            <TeronWordmark />
          </Link>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            {mode === "signin" ? "Bem-vindo de volta" : "Criar sua conta"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Entre no seu workspace TERON."
              : "Configure seu workspace TERON em segundos."}
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleGoogle}
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
            >
              <GoogleIcon /> Continuar com Google
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            OU
            <span className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-3" onSubmit={handleEmail}>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@estudio.com"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[12px] font-medium text-foreground">Senha</label>
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
            {error && (
              <p role="alert" className="rounded-md bg-destructive/10 p-2 text-[12px] text-destructive">
                {error}
              </p>
            )}
            {notice && (
              <p className="rounded-md bg-muted/40 p-2 text-[12px] text-muted-foreground">{notice}</p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              {mode === "signin" ? "Entrar no workspace" : "Criar workspace"}{" "}
              <ArrowRight className="size-3.5" />
            </button>
          </form>

          <p className="mt-6 text-center text-[12px] text-muted-foreground">
            {mode === "signin" ? (
              <>
                Ainda não tem conta?{" "}
                <button onClick={() => setMode("signup")} className="text-foreground hover:underline">
                  Criar workspace
                </button>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <button onClick={() => setMode("signin")} className="text-foreground hover:underline">
                  Entrar
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 1 1 0-12.4c1.94 0 3.24.83 3.98 1.54l2.72-2.63C16.94 3.03 14.7 2 12 2a10 10 0 1 0 0 20c5.77 0 9.6-4.06 9.6-9.77 0-.66-.07-1.16-.17-1.66H12z"/>
    </svg>
  );
}