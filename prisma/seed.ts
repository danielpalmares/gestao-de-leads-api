import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  const leads = [
    {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone_number: '11999887766',
      role: 'Desenvolvedor Frontend',
      birth_date: new Date('1990-05-15'),
      message:
        'Interessado em oportunidades de trabalho remoto na área de React e TypeScript.'
    },
    {
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone_number: '11888776655',
      role: 'Product Manager',
      birth_date: new Date('1985-08-22'),
      message:
        'Procurando desafios em empresas de tecnologia para liderar produtos inovadores.'
    },
    {
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      phone_number: '11777665544',
      role: 'UX Designer',
      birth_date: new Date('1992-12-03'),
      message:
        'Designer experiente buscando projetos que impactem positivamente a experiência do usuário.'
    }
  ]

  for (const leadData of leads) {
    const lead = await prisma.lead.upsert({
      where: { email: leadData.email },
      update: {},
      create: leadData
    })
    console.log(`Lead criado: ${lead.name} (${lead.email})`)
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch(e => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
