import { DynamicModule, Module, Global } from '@nestjs/common'
import { PrismaClient } from 'src/generated/prisma/client'

@Global()
@Module({})
export class CustomPrismaModule {
  static forRootAsync(options: {
    name: string
    useFactory: (...args: any[]) => Promise<PrismaClient> | PrismaClient
    inject?: any[]
    isGlobal?: boolean
  }): DynamicModule {
    return {
      module: CustomPrismaModule,
      global: options.isGlobal ?? true,
      providers: [
        {
          provide: options.name,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [options.name],
    }
  }
}