import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Conexao com o Postgres (Neon).
 *
 * Nao existe fallback para localhost: antes, uma DATABASE_URL ausente fazia o
 * app tentar `localhost:5434` e falhar em runtime com erro de socket, o que
 * escondia a causa real. Agora falhamos alto, no boot.
 */
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "[TERON] DATABASE_URL nao configurada. Conecte a integracao Neon ou defina a variavel de ambiente.",
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
