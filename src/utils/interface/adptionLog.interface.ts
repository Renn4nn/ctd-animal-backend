import { Prisma } from "../../generated/prisma/client";
import { AdptionLog, AdptionLogCreate, AdptionLogUpdate } from "../../schema/adptionLog.schema";
import { ApiResponse } from "../apitypes/api.response.types";

export type GetAdptionLogParams = {
  skip?: number
  take?: number
  cursor?: Prisma.AdoptionLogWhereUniqueInput
  where?: Prisma.AdoptionLogWhereInput
  orderBy?: Prisma.AdoptionLogOrderByWithRelationInput
}

export type CreateAdptionLogParams = {
  data: Prisma.AdoptionLogUncheckedCreateInput
}

export type UpdateAdptionLogParams = {
  where: Prisma.AdoptionLogWhereUniqueInput
  data: Prisma.AdoptionLogUncheckedUpdateInput
}

export interface IAdptionLogRepository {
  adptionLog(
    adptionLogWhereUniqueInput: Prisma.AdoptionLogWhereUniqueInput
  ): Promise<AdptionLog>
  adptionLogs(params: GetAdptionLogParams): Promise<AdptionLog[]>
  createAdptionLog(data: Prisma.AdoptionLogUncheckedCreateInput): Promise<AdptionLog>
  updateAdptionLog(params: UpdateAdptionLogParams): Promise<AdptionLog>
  deleteAdptionLog(where: Prisma.AdoptionLogWhereUniqueInput): Promise<AdptionLog>
}

export interface IAdptionLogService {
  getAdptionLogs(): Promise<AdptionLog[]>
  getAdptionLogById(id: string): Promise<AdptionLog>
  createAdptionLog(data: AdptionLogCreate): Promise<AdptionLog>
  updateAdptionLog(id: string, data: AdptionLogUpdate): Promise<AdptionLog>
  deleteAdptionLog(id: string): Promise<AdptionLog>
}

export interface IAdptionLogController {
  getAdptionLogs(): Promise<ApiResponse<AdptionLog[]>>
  getAdptionLogById(id: string): Promise<ApiResponse<AdptionLog>>
  createAdptionLog(data: AdptionLogCreate): Promise<ApiResponse<AdptionLog>>
  updateAdptionLog(id: string, data: AdptionLogUpdate): Promise<ApiResponse<AdptionLog>>
  deleteAdptionLog(id: string): Promise<ApiResponse<AdptionLog>>
}