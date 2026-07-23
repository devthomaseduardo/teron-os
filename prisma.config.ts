import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5434/teron_os?schema=public',
  },
})
