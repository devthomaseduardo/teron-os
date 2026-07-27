import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

import { prisma } from "@/lib/prisma";

/**
 * Sessao do painel administrativo.
 *
 * O token de sessao vive em um cookie httpOnly, nunca em localStorage. Isso
 * permite validar a sessao no servidor (ver `beforeLoad` em routes/app.tsx) e
 * impede que qualquer script na pagina leia o token.
 */
export const SESSION_COOKIE = "teron_session";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface AuthSuccessResponse {
  success: true;
  user: SessionUser;
}

export interface AuthErrorResponse {
  success: false;
  error: string;
}

function issueSessionCookie(token: string, expiresAt: Date) {
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await prisma.session.create({ data: { token, userId, expiresAt } });
  issueSessionCookie(token, expiresAt);
}

function toSessionUser(user: {
  id: string;
  email: string;
  name: string | null;
  role: string;
}): SessionUser {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export const loginUserFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthSuccessResponse | AuthErrorResponse> => {
    try {
      const email = data.email.trim().toLowerCase();
      const user = await prisma.user.findUnique({ where: { email } });

      // Mensagem generica e comparacao sempre executada: evita revelar se o
      // e-mail existe e reduz o sinal de timing.
      const passwordMatch = user
        ? await bcrypt.compare(data.password, user.passwordHash)
        : await bcrypt.compare(data.password, "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv");

      if (!user || !passwordMatch) {
        return { success: false, error: "E-mail ou senha incorretos." };
      }

      await createSession(user.id);
      return { success: true, user: toSessionUser(user) };
    } catch (err) {
      console.error("[Auth] Erro ao efetuar login:", err);
      return { success: false, error: "Falha interna ao efetuar login." };
    }
  });

export const registerUserFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string; name?: string }) => data)
  .handler(async ({ data }): Promise<AuthSuccessResponse | AuthErrorResponse> => {
    try {
      const email = data.email.trim().toLowerCase();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, error: "Informe um e-mail valido." };
      }
      if (data.password.length < 8) {
        return { success: false, error: "A senha precisa ter ao menos 8 caracteres." };
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return { success: false, error: "Ja existe uma conta com este e-mail." };
      }

      const passwordHash = await bcrypt.hash(data.password, 12);
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          name: data.name?.trim() || email.split("@")[0],
          role: "admin",
        },
      });

      await createSession(user.id);
      return { success: true, user: toSessionUser(user) };
    } catch (err) {
      console.error("[Auth] Erro ao criar conta:", err);
      return { success: false, error: "Falha interna ao criar conta." };
    }
  });

/**
 * Le o cookie de sessao e devolve o usuario, ou null.
 * Usada tanto no `beforeLoad` das rotas /app quanto pelos server fns.
 */
export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<SessionUser | null> => {
    try {
      const token = getCookie(SESSION_COOKIE);
      if (!token) return null;

      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!session) return null;

      if (session.expiresAt < new Date()) {
        await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
        deleteCookie(SESSION_COOKIE, { path: "/" });
        return null;
      }

      return toSessionUser(session.user);
    } catch (err) {
      console.error("[Auth] Erro ao verificar sessao:", err);
      return null;
    }
  },
);

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const token = getCookie(SESSION_COOKIE);
    if (token) {
      await prisma.session.delete({ where: { token } }).catch(() => {});
    }
    deleteCookie(SESSION_COOKIE, { path: "/" });
    return { success: true };
  } catch {
    deleteCookie(SESSION_COOKIE, { path: "/" });
    return { success: false };
  }
});

/**
 * Helper para server fns que exigem um admin autenticado.
 * Lanca se nao houver sessao valida, para nunca seguir com userId undefined.
 */
export async function requireUser(): Promise<SessionUser> {
  const token = getCookie(SESSION_COOKIE);
  if (!token) throw new Error("NAO_AUTENTICADO");

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    throw new Error("NAO_AUTENTICADO");
  }

  return toSessionUser(session.user);
}
