import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github } from "lucide-react";

import { TeronWordmark } from "@/components/teron/logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — TERON Studio" },
      { name: "description", content: "Acesse o seu workspace TERON." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
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
          <h1 className="font-display text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-muted-foreground">Entre no seu workspace TERON.</p>

          <div className="mt-8 space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-accent">
              <Github className="size-4" /> Continuar com GitHub
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            OU
            <span className="h-px flex-1 bg-border" />
          </div>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/app";
            }}
          >
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground">E-mail</label>
              <input
                type="email"
                required
                placeholder="voce@estudio.com"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[12px] font-medium text-foreground">Senha</label>
                <a href="#" className="text-[11px] text-muted-foreground hover:text-foreground">Esqueci</a>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              Entrar no workspace <ArrowRight className="size-3.5" />
            </button>
          </form>

          <p className="mt-6 text-center text-[12px] text-muted-foreground">
            Ainda não tem conta? <a href="#" className="text-foreground hover:underline">Fale com a TERON</a>
          </p>
        </div>
      </div>
    </div>
  );
}