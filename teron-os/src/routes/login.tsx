import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { loginUserFn, registerUserFn, verifySessionFn } from "@/services/auth";

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
    const token = typeof window !== "undefined" ? localStorage.getItem("teron_auth_token") : null;
    if (token) {
      verifySessionFn({ data: { token } }).then((user) => {
        if (!cancelled && user) {
          window.location.replace(target);
        }
      });
    }
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
        const res = await registerUserFn({ data: { email, password } });
        if (!res.success) {
          setError(res.error);
          return;
        }
        localStorage.setItem("teron_auth_token", res.token);
        setNotice("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => window.location.replace(target), 800);
      } else {
        const res = await loginUserFn({ data: { email, password } });
        if (!res.success) {
          setError(res.error);
          return;
        }
        localStorage.setItem("teron_auth_token", res.token);
        window.location.replace(target);
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
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

          <div className="mt-8">
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
    </div>
  );
}