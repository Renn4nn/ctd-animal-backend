import { Prisma, PrismaClient } from "../generated/prisma/client";

type SeedDatabaseParams = {
	prisma: PrismaClient
	models: {
		[key: string]: {
			data: unknown[]
			whereCb: (item: unknown) => unknown
		}
	}
	log?: boolean
}

export async function seedDatabase({
	prisma,
	models,
	log = true
}: SeedDatabaseParams): Promise<void> {
	const transactions: Prisma.PrismaPromise<unknown>[] = Object.entries(
		models
	).flatMap(([key, obj]) => {
		const { data, whereCb } = obj

		return data.map((item) =>
			// biome-ignore lint/suspicious/noExplicitAny: Required
			(prisma as any)[key].upsert({
				where: whereCb(item),
				update: {},
				create: item
			})
		)
	})

	try {
		const result = await prisma.$transaction(transactions)
		if (log)
			console.info(
				`✅ Database seeded successfully! ${result.length} records processed.`
			)
	} catch (error) {
		console.error('❌ Error seeding database:', error)
		throw error
	}
}
