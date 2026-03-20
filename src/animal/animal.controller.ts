import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseUUIDPipe, Patch, Post, UploadedFile } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import type { Animal, AnimalCreate, AnimalUpdate } from "src/schema/animal.schema";
import { ApiSuccessResponse } from "src/utils/apitypes/api.response.types";

@Controller('animal')
export class AnimalController {
  constructor(private readonly service: AnimalService) { }

  @Get()
  async getAnimals(): Promise<ApiSuccessResponse<Animal[]>> {
    const result = await this.service.getAnimals();
    return {
      data: result
    };
  }

  @Get(':id')
  async getAnimalById(@Param('id', ParseUUIDPipe) id: string): Promise<ApiSuccessResponse<Animal>> {
    const result = await this.service.getAnimalById(id);
    return {
      data: result
    };
  }

  @Post()
  async createAnimal(
    @Body() animal: AnimalCreate,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/, // Regex para aceitar formatos de imagem
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024, // 5MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false, // Permite criar o animal sem foto
        }),
    ) files: Express.Multer.File[]
  ): Promise<ApiSuccessResponse<Animal>> {
    const photoPaths = files?.map(file => `/photos/animals/${file.filename}`) || [];
    const result = await this.service.createAnimal({
      ...animal,
      photos: [...(animal.photos || []), ...photoPaths],
    });
    return {
      data: result
    };
  }

  @Patch(':id')
  async updateAnimal(@Param('id', ParseUUIDPipe) id: string, @Body() animal: AnimalUpdate): Promise<ApiSuccessResponse<Animal>> {
    const result = await this.service.updateAnimal(id, animal);
    return {
      data: result
    };
  }

  @Delete(':id')
  async deleteAnimal(@Param('id', ParseUUIDPipe) id: string): Promise<ApiSuccessResponse<Animal>> {
    const result = await this.service.deleteAnimal(id);
    return {
      data: result
    };
  }
}
