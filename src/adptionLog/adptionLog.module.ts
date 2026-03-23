import { Module } from '@nestjs/common';
import { AdptionLogController } from './adptionLog.controller';
import { AdptionLogService } from './adptionLog.service';
import { AdptionLogRepository } from './adptionLog.repository';

@Module({
  controllers: [AdptionLogController],
  providers: [AdptionLogService, AdptionLogRepository],
})
export class AdptionLogModule { }
