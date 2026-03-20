import { ConfigService } from '@nestjs/config'
import { PrismaPg } '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client/extension'

export function PrismaClientFactory(config: ConfigService) {
	const connectionString = config.getOrThrow('DATABASE_URL')
	const schema = config.getOrThrow('POSTGRES_DB_SCHEMA')

	const adapter = new PrismaPg({ connectionString }, { schema })
	return new PrismaClient({ adapter })
}
