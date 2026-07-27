import { defineConfig } from "@prisma/config";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "[TERON] DATABASE_URL nao configurada. Conecte a integracao Neon antes de rodar comandos do Prisma.",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    provider: "postgresql",
    url: process.env.DATABASE_URL,
    // Neon: migrations precisam da conexao direta (sem pgbouncer).
    directUrl: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL,
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
});
