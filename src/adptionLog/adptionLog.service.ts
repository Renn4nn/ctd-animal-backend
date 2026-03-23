import { Injectable } from "@nestjs/common";
import { IAdptionLogService } from "src/utils/interface/adptionLog.interface";
import { AdptionLog, AdptionLogCreate, AdptionLogUpdate } from "src/schema/adptionLog.schema";
import { AdptionLogRepository } from "./adptionLog.repository";

@Injectable()
export class AdptionLogService implements IAdptionLogService {
  constructor(
    private readonly adptionLogRepository: AdptionLogRepository) { }

  getAdptionLogs() {
    return this.adptionLogRepository.adptionLogs({ orderBy: { adoptedAt: 'desc' } });
  }

  getAdptionLogById(id: string): Promise<AdptionLog> {
    return this.adptionLogRepository.adptionLog({ id });
  }

  createAdptionLog(data: AdptionLogCreate): Promise<AdptionLog> {
    return this.adptionLogRepository.createAdptionLog(data);
  }

  updateAdptionLog(id: string, data: AdptionLogUpdate): Promise<AdptionLog> {
    return this.adptionLogRepository.updateAdptionLog({ where: { id }, data });
  }

  deleteAdptionLog(id: string) {
    return this.adptionLogRepository.deleteAdptionLog({ id });
  }
}
