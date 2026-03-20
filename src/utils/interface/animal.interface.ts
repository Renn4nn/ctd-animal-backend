import { Prisma } from "../../generated/prisma/client";
import { Animal, AnimalCreate, AnimalUpdate } from "../../schema/animal.schema";
import { ApiResponse } from "../apitypes/api.response.types";

export type GetAnimalParams = {
  skip?: number
  take?: number
  cursor?: Prisma.AnimalWhereUniqueInput
  where?: Prisma.AnimalWhereInput
  orderBy?: Prisma.AnimalOrderByWithRelationInput
}

export type CreateAnimalParams = {
  data: Prisma.AnimalUncheckedCreateInput
}

export type UpdateAnimalParams = {
  where: Prisma.AnimalWhereUniqueInput
  data: Prisma.AnimalUncheckedUpdateInput
}

export interface IAnimalRepository {
  animal(
    animalWhereUniqueInput: Prisma.AnimalWhereUniqueInput
  ): Promise<Animal>
  animals(params: GetAnimalParams): Promise<Animal[]>
  createAnimal(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal>
  updateAnimal(params: UpdateAnimalParams): Promise<Animal>
  deleteAnimal(where: Prisma.AnimalWhereUniqueInput): Promise<Animal>
}

export interface IAnimalService {
  getAnimals(): Promise<Animal[]>
  getAnimalById(id: string): Promise<Animal>
  createAnimal(data: AnimalCreate): Promise<Animal>
  updateAnimal(id: string, data: AnimalUpdate): Promise<Animal>
  deleteAnimal(id: string): Promise<Animal>
}

export interface IAnimalController {
  getAnimals(): Promise<ApiResponse<Animal[]>>
  getAnimalById(id: string): Promise<ApiResponse<Animal>>
  createAnimal(data: AnimalCreate): Promise<ApiResponse<Animal>>
  updateAnimal(id: string, data: AnimalUpdate): Promise<ApiResponse<Animal>>
  deleteAnimal(id: string): Promise<ApiResponse<Animal>>
}