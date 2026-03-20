import { Prisma } from "../../generated/prisma/client";
import { AnimalType, AnimalTypeCreateDTO, AnimalTypeUpdateDTO } from "../../schema/animalType.schema";
import { ApiResponse } from "../apitypes/api.response.types";

export type GetAnimalTypeParams = {
  skip?: number
  take?: number
  cursor?: Prisma.AnimalTypeWhereUniqueInput
  where?: Prisma.AnimalTypeWhereInput
  orderBy?: Prisma.AnimalTypeOrderByWithRelationInput
}

export type CreateAnimalTypeParams = {
  data: Prisma.AnimalTypeCreateInput
}

export type UpdateAnimalTypeParams = {
  where: Prisma.AnimalTypeWhereUniqueInput
  data: Prisma.AnimalTypeUpdateInput
}

export interface IAnimalTypeRepository {
  animalType(
    animalTypeWhereUniqueInput: Prisma.AnimalTypeWhereUniqueInput
  ): Promise<AnimalType>
  animalTypes(params: GetAnimalTypeParams): Promise<AnimalType[]>
  createAnimalType(data: AnimalTypeCreateDTO): Promise<AnimalType>
  updateAnimalType(params: UpdateAnimalTypeParams): Promise<AnimalType>
  deleteAnimalType(where: Prisma.AnimalTypeWhereUniqueInput): Promise<AnimalType>
}

export interface IAnimalTypeService {
  getAnimalTypes(): Promise<AnimalType[]>
  getAnimalTypeById(id: number): Promise<AnimalType>
  createAnimalType(data: AnimalTypeCreateDTO): Promise<AnimalType>
  updateAnimalType(id: number, data: AnimalTypeUpdateDTO): Promise<AnimalType>
  deleteAnimalType(id: number): Promise<AnimalType>
}

export interface IAnimalTypeController {
  getAnimalTypes(): Promise<ApiResponse<AnimalType[]>>
  getAnimalTypeById(id: number): Promise<ApiResponse<AnimalType>>
  createAnimalType(data: AnimalTypeCreateDTO): Promise<ApiResponse<AnimalType>>
  updateAnimalType(id: number, data: AnimalTypeUpdateDTO): Promise<ApiResponse<AnimalType>>
  deleteAnimalType(id: number): Promise<ApiResponse<AnimalType>>
}