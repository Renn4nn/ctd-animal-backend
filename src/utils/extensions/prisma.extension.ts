import type { PrismaClient } from "src/generated/prisma/client"
import type { CustomPrismaService } from 'nestjs-prisma'

export type CustomPrismaClient = CustomPrismaService<PrismaClient>
