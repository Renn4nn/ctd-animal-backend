import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseInterceptors, UploadedFiles, UseGuards } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import type { Animal, AnimalCreate, AnimalUpdate } from "src/schema/animal.schema";
import { ApiSuccessResponse } from "src/utils/apitypes/api.response.types";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/utils/config/multer/multer";
import * as fs from "fs";
import * as path from "path";
import { JwtAuthGuard } from "src/utils/auth/jwt-auth.guard";

@Controller('api/animal')
@UseGuards(JwtAuthGuard)
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
  @UseInterceptors(FilesInterceptor('files', 20, multerConfig))
  async createAnimal(
    @Body() animal: Record<string, unknown>,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ApiSuccessResponse<Animal>> {
    const parseJsonArray = (value: unknown): string[] => {
      if (Array.isArray(value)) return value.map(String);
      if (typeof value !== 'string' || value.trim() === '') return [];
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.map(String) : [];
      } catch {
        return [];
      }
    };

    const parsedAnimal: AnimalCreate = {
      name: String(animal.name ?? ''),
      typeId: Number(animal.typeId),
      breed: String(animal.breed ?? ''),
      age: String(animal.age ?? ''),
      description: (animal.description ?? null) as string | null,
      story: (animal.story ?? null) as string | null,
      behavior: (animal.behavior ?? null) as string | null,
      vaccines: parseJsonArray(animal.vaccines),
      size: animal.size as AnimalCreate['size'],
      sex: animal.sex as AnimalCreate['sex'],
      photos: parseJsonArray(animal.photos),
      status: (animal.status as AnimalCreate['status']) ?? undefined,
    };

    const filePaths = files?.map((file) => `/uploads/photos/animals/${file.filename}`) || [];

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
    // Busca o animal para obter as fotos antes de deletar
    const animal = await this.service.getAnimalById(id);

    // Exclui as imagens físicas do disco
    if (animal.photos && animal.photos.length > 0) {
      for (const photoPath of animal.photos) {
        try {
          const filename = path.basename(photoPath);
          const fullPath = path.join(process.cwd(), 'uploads', 'photos', 'animals', filename);

          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        } catch (error) {
          console.error(`Erro ao excluir imagem ${photoPath}:`, error);
        }
      }
    }

    const result = await this.service.deleteAnimal(id);
    return {
      data: result
    };
  }
}
