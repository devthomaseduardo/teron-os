import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5434/teron_os?schema=public'
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@teron.studio' },
    update: {},
    create: {
      email: 'admin@teron.studio',
      name: 'Admin Teron',
      passwordHash: hashedPassword,
      role: 'admin',
    },
  })

  console.log('Admin user created:', admin.email)

  const lead = await prisma.lead.create({
    data: {
      name: 'Cliente Exemplo',
      company: 'Pallas Studio',
      email: 'marina@pallas.studio',
      phone: '(11) 98888-7777',
      address: 'São Paulo, SP',
      projectType: 'Portal Dealer B2B & Plataforma Web',
      deadline: '15 dias úteis',
      briefing: 'Plataforma web B2B de alta velocidade e design premium.',
      totalInvestment: 2800,
      entryPayment: 1400,
      status: 'proposta_enviada',
    },
  })

  console.log('Sample lead created:', lead.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
