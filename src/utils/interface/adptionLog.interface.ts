import { Prisma } from "../../generated/prisma/client";
import { AdptionLog, AdptionLogCreateDTO, AdptionLogUpdateDTO } from "../../schema/adptionLog.schema";
import { ApiResponse } from "../apitypes/api.response.types";

export type GetAdptionLogParams = {
  skip?: number
  take?: number
  cursor?: Prisma.AdoptionLogWhereUniqueInput
  where?: Prisma.AdoptionLogWhereInput
  orderBy?: Prisma.AdoptionLogOrderByWithRelationInput
}

export type CreateAdptionLogParams = {
  data: Prisma.AdoptionLogCreateInput
}

export type UpdateAdptionLogParams = {
  where: Prisma.AdoptionLogWhereUniqueInput
  data: Prisma.AdoptionLogUpdateInput
}

export interface IAdptionLogRepository {
  adptionLog(
    adptionLogWhereUniqueInput: Prisma.AdoptionLogWhereUniqueInput
  ): Promise<AdptionLog>
  adptionLogs(params: GetAdptionLogParams): Promise<AdptionLog[]>
  createAdptionLog(data: AdptionLogCreateDTO): Promise<AdptionLog>
  updateAdptionLog(params: UpdateAdptionLogParams): Promise<AdptionLog>
  deleteAdptionLog(where: Prisma.AdoptionLogWhereUniqueInput): Promise<AdptionLog>
}

export interface IAdptionLogService {
  getAdptionLogs(): Promise<AdptionLog[]>
  getAdptionLogById(id: string): Promise<AdptionLog>
  createAdptionLog(data: AdptionLogCreateDTO): Promise<AdptionLog>
  updateAdptionLog(id: string, data: AdptionLogUpdateDTO): Promise<AdptionLog>
  deleteAdptionLog(id: string): Promise<AdptionLog>
}

export interface IAdptionLogController {
  getAdptionLogs(): Promise<ApiResponse<AdptionLog[]>>
  getAdptionLogById(id: string): Promise<ApiResponse<AdptionLog>>
  createAdptionLog(data: AdptionLogCreateDTO): Promise<ApiResponse<AdptionLog>>
  updateAdptionLog(id: string, data: AdptionLogUpdateDTO): Promise<ApiResponse<AdptionLog>>
  deleteAdptionLog(id: string): Promise<ApiResponse<AdptionLog>>
}