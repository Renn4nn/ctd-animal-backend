import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import type { Animal, AnimalUpdate } from "src/schema/animal.schema";
import { ApiSuccessResponse } from "src/utils/apitypes/api.response.types";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/utils/config/multer/multer";

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
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async createAnimal(
    @Body() animal: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {

    // 🔥 corrigir tipos
    const parsedAnimal = {
      ...animal,
      typeId: Number(animal.typeId),
      vaccines: animal.vaccines
        ? JSON.parse(animal.vaccines)
        : [],
      photos: animal.photos
        ? JSON.parse(animal.photos)
        : [],
    };

    const filePaths =
      files?.map(file => `/photos/animals/${file.filename}`) || [];

    const photos = [...parsedAnimal.photos, ...filePaths];

    const result = await this.service.createAnimal({
      ...parsedAnimal,
      photos,
    });

    return { data: result };
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
