import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { AnimalTypeService } from "./animalType.service";
import { AnimalType, AnimalTypeCreateDTO, AnimalTypeUpdateDTO } from "src/schema/animalType.schema";
import { ApiSuccessResponse } from "src/utils/apitypes/api.response.types";

@Controller('animal-type')
export class AnimalTypeController {
  constructor(private readonly service: AnimalTypeService) { }

  @Get()
  async getAnimalTypes(): Promise<ApiSuccessResponse<AnimalType[]>> {
    const result = await this.service.getAnimalTypes();
    return {
      data: result
    };
  }

  @Get(':id')
  async getAnimalTypeById(@Param('id', ParseIntPipe) id: number): Promise<ApiSuccessResponse<AnimalType>> {
    const result = await this.service.getAnimalTypeById(id);
    return {
      data: result
    };
  }

  @Post()
  async createAnimalType(@Body() animalType: AnimalTypeCreateDTO): Promise<ApiSuccessResponse<AnimalType>> {
    const result = await this.service.createAnimalType(animalType);
    return {
      data: result
    };
  }

  @Patch(':id')
  async updateAnimalType(@Param('id', ParseIntPipe) id: number, @Body() animalType: AnimalTypeUpdateDTO): Promise<ApiSuccessResponse<AnimalType>> {
    const result = await this.service.updateAnimalType(id, animalType);
    return {
      data: result
    };
  }

  @Delete(':id')
  async deleteAnimalType(@Param('id', ParseIntPipe) id: number): Promise<ApiSuccessResponse<AnimalType>> {
    const result = await this.service.deleteAnimalType(id);
    return {
      data: result
    };
  }
}
