import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'src/generated/prisma/client'

export function PrismaClientFactory(config: ConfigService) {
	const connectionString = `postgresql://${config.get('POSTGRES_USER')}:${encodeURIComponent(config.get('POSTGRES_PASSWORD')!)}@${config.get('POSTGRES_HOST')}:${config.get('POSTGRES_PORT')}/${config.get('POSTGRES_DB')}`
	const schema = 'public'
	const adapter = new PrismaPg({ connectionString }, { schema })
	return new PrismaClient({ adapter })
}
