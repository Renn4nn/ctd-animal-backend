import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { AdptionLogService } from "./adptionLog.service";
import type { AdptionLog, AdptionLogCreate, AdptionLogUpdate } from "src/schema/adptionLog.schema";
import { ApiSuccessResponse } from "src/utils/apitypes/api.response.types";

@Controller('api/adption-log')
export class AdptionLogController {
  constructor(private readonly service: AdptionLogService) { }

  @Get()
  async getAdptionLogs(): Promise<ApiSuccessResponse<AdptionLog[]>> {
    const result = await this.service.getAdptionLogs();
    return {
      data: result
    };
  }

  @Get(':id')
  async getAdptionLogById(@Param('id', ParseUUIDPipe) id: string): Promise<ApiSuccessResponse<AdptionLog>> {
    const result = await this.service.getAdptionLogById(id);
    return {
      data: result
    };
  }

  @Post()
  async createAdptionLog(@Body() adptionLog: AdptionLogCreate): Promise<ApiSuccessResponse<AdptionLog>> {
    const result = await this.service.createAdptionLog(adptionLog);
    return {
      data: result
    };
  }

  @Patch(':id')
  async updateAdptionLog(@Param('id', ParseUUIDPipe) id: string, @Body() adptionLog: AdptionLogUpdate): Promise<ApiSuccessResponse<AdptionLog>> {
    const result = await this.service.updateAdptionLog(id, adptionLog);
    return {
      data: result
    };
  }

  @Delete(':id')
  async deleteAdptionLog(@Param('id', ParseUUIDPipe) id: string): Promise<ApiSuccessResponse<AdptionLog>> {
    const result = await this.service.deleteAdptionLog(id);
    return {
      data: result
    };
  }
}
