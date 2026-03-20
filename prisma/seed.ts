import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'
import { seedDatabase } from 'src/utils/utilsDb'
import { seedUsers } from './userseed/seed'

const connectionString = process.env.DATABASE_URL
const schema = 'public'
const adapter = new PrismaPg({ connectionString }, { schema })
const prisma = new PrismaClient({ adapter })

async function main() {
	await seedDatabase({
		prisma,
		models: {
			// biome-ignore-start lint/suspicious/noExplicitAny: Required
			user: {
				data: seedUsers,
				// sujeito a erro por conta do id
				whereCb: (item: any) => ({ id: item.id })
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
