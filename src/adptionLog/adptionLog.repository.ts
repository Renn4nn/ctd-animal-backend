import { Injectable } from "@nestjs/common";
import { GetAdptionLogParams, IAdptionLogRepository, UpdateAdptionLogParams } from "src/utils/interface/adptionLog.interface";
import { Inject } from "@nestjs/common";
import { Prisma, PrismaClient } from "src/generated/prisma/client";
import { decrypt, encrypt } from "src/utils/crypto/crypto.util";

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
    }).then(logs => Promise.all(logs.map(async (log) => ({
      ...log,
      adopterCpf: await decrypt(log.adopterCpf),
      adopterPhone: await decrypt(log.adopterPhone),
      adopterEmail: await decrypt(log.adopterEmail),
    }))));
  }

  async createAdptionLog(data: Prisma.AdoptionLogUncheckedCreateInput) {

    const encryptedData = {
      ...data,
      adopterCpf: await encrypt(data.adopterCpf),
      adopterPhone: await encrypt(data.adopterPhone),
      adopterEmail: await encrypt(data.adopterEmail),
    };

    return this.prisma.adoptionLog.create({
      data: encryptedData
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
