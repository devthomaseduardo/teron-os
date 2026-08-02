import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getCurrentUserFn } from "@/services/auth";

/**
 * Porteiro de todo o painel administrativo.
 *
 * Toda rota /app/* passa por aqui. A verificacao roda no servidor (server fn
 * lendo o cookie httpOnly), entao nao ha janela em que o HTML protegido chega
 * ao browser antes da checagem.
 */
export const Route = createFileRoute("/app")({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn();

    if (!user) {
      throw redirect({
        to: "/login",
        search: { next: location.href },
      });
    }

    // Disponivel para as rotas filhas via `Route.useRouteContext()`
    return { user };
  },
  component: () => <Outlet />,
});
