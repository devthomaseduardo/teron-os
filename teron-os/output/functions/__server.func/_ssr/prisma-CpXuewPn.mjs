import { t as PrismaPgAdapterFactory } from "../_libs/@prisma/adapter-pg.mjs";
import { PrismaClient } from "@prisma/client";
//#region node_modules/.nitro/vite/services/ssr/assets/prisma-CpXuewPn.js
var connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5434/teron_os?schema=public";
var globalForPrisma = globalThis;
var adapter = new PrismaPgAdapterFactory({ connectionString });
var prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
//#endregion
export { prisma as t };
