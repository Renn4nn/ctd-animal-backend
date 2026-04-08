import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'
import { seedDatabase } from 'src/utils/extensions/utilsDb'
import * as bcrypt from 'bcrypt'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT = '5432', POSTGRES_DB } = process.env;
const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`;

const schema = 'public'
const adapter = new PrismaPg({ connectionString }, { schema })
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminLogin = process.env.ADMIN_LOGIN || 'ctd.admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ctd-secure-password';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await seedDatabase({
    prisma,
    models: {
      // biome-ignore-start lint/suspicious/noExplicitAny: Required
      user: {
        data: [
          {
            login: adminLogin,
            password: hashedPassword,
          }
        ],
        // usando login como chave única estável para upsert
        whereCb: (item: { login: string }) => ({ login: item.login })
      }
      // biome-ignore-end lint/suspicious/noExplicitAny: Required
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
