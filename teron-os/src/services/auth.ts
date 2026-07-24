import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

import { prisma } from "@/lib/prisma";

export interface AuthSuccessResponse {
  success: true;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
  };
  token: string;
}

export interface AuthErrorResponse {
  success: false;
  error: string;
}

export const loginUserFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthSuccessResponse | AuthErrorResponse> => {
    try {
      const email = data.email.trim().toLowerCase();
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return { success: false, error: "E-mail ou senha incorretos." };
      }

      const passwordMatch = await bcrypt.compare(data.password, user.passwordHash);
      if (!passwordMatch) {
        return { success: false, error: "E-mail ou senha incorretos." };
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

      await prisma.session.create({
        data: {
          token,
          userId: user.id,
          expiresAt,
        },
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      };
    } catch (err) {
      console.error("[Auth Server] Error logging in:", err);
      return { success: false, error: "Falha interna ao efetuar login." };
    }
  });

export const registerUserFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string; name?: string }) => data)
  .handler(async ({ data }): Promise<AuthSuccessResponse | AuthErrorResponse> => {
    try {
      const email = data.email.trim().toLowerCase();
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return { success: false, error: "Já existe uma conta com este e-mail." };
      }

      const passwordHash = await bcrypt.hash(data.password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          name: data.name || email.split("@")[0],
          role: "admin",
        },
      });

      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      await prisma.session.create({
        data: {
          token,
          userId: user.id,
          expiresAt,
        },
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      };
    } catch (err) {
      console.error("[Auth Server] Error registering user:", err);
      return { success: false, error: "Falha interna ao criar conta." };
    }
  });

export const verifySessionFn = createServerFn({ method: "GET" })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    try {
      if (!data.token) return null;

      const session = await prisma.session.findUnique({
        where: { token: data.token },
        include: { user: true },
      });

      if (!session || session.expiresAt < new Date()) {
        if (session) {
          await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
        }
        return null;
      }

      return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
      };
    } catch (err) {
      console.error("[Auth Server] Error verifying session:", err);
      return null;
    }
  });

export const logoutFn = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    try {
      if (data.token) {
        await prisma.session.delete({ where: { token: data.token } }).catch(() => {});
      }
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  });
