import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'
import { seedDatabase } from 'src/utils/extensions/utilsDb'
import { seedUsers } from './userSeed/seed'
import { seedAnimalTypes } from './animalTypeSeed/seed'
import { seedAnimals } from './animalSeed/seed'

const DATABASE_URL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
const connectionString = DATABASE_URL
const schema = 'public'
const adapter = new PrismaPg({ connectionString }, { schema })
const prisma = new PrismaClient({ adapter })

// NÃO RODE NENHUMA SEED

async function main() {
	await seedDatabase({
		prisma,
		models: {
			// biome-ignore-start lint/suspicious/noExplicitAny: Required
			user: {
				data: seedUsers,
				// usando email como chave única estável para upsert
				whereCb: (item: { email: string }) => ({ email: item.email })
			},
			animalType: {
				data: seedAnimalTypes,
				whereCb: (item: { id: number }) => ({ id: item.id })
			},
			animal: {
				data: seedAnimals,
				whereCb: (item: { id: string }) => ({ id: item.id })
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
