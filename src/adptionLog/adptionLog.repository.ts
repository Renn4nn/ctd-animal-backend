import { Injectable } from "@nestjs/common";
import { GetAdptionLogParams, IAdptionLogRepository, UpdateAdptionLogParams } from "src/utils/interface/adptionLog.interface";
import { Inject } from "@nestjs/common";
import { Prisma, PrismaClient } from "src/generated/prisma/client";

@Injectable()
export class AdptionLogRepository implements IAdptionLogRepository {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: PrismaClient) { }

  adptionLog(where: Prisma.AdoptionLogWhereUniqueInput) {
    return this.prisma.adoptionLog.findUniqueOrThrow({
      where
    });
  }

  adptionLogs(params: GetAdptionLogParams) {
    return this.prisma.adoptionLog.findMany({
      ...params
    });
  }

  createAdptionLog(data: Prisma.AdoptionLogUncheckedCreateInput) {
    return this.prisma.adoptionLog.create({
      data
    });
  }

  updateAdptionLog(params: UpdateAdptionLogParams) {
    return this.prisma.adoptionLog.update({ ...params });
  }

  deleteAdptionLog(where: Prisma.AdoptionLogWhereUniqueInput) {
    return this.prisma.adoptionLog.delete({
      where
    });
  }
}
