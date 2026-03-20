import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'src/generated/prisma/client'

export function PrismaClientFactory(config: ConfigService) {
	const connectionString = config.getOrThrow('DATABASE_URL')
	const schema = 'public'

	const adapter = new PrismaPg({ connectionString }, { schema })
	return new PrismaClient({ adapter })
}
