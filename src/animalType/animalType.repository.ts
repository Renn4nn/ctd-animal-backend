import { Injectable } from "@nestjs/common";
import { GetAnimalTypeParams, IAnimalTypeRepository, UpdateAnimalTypeParams } from "src/utils/interface/animalType.interface";
import { Inject } from "@nestjs/common";
import { Prisma, PrismaClient } from "src/generated/prisma/client";

@Injectable()
export class AnimalTypeRepository implements IAnimalTypeRepository {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: PrismaClient) { }

  animalType(where: Prisma.AnimalTypeWhereUniqueInput) {
    return this.prisma.animalType.findUniqueOrThrow({
      where
    });
  }

  animalTypes(params: GetAnimalTypeParams) {
    return this.prisma.animalType.findMany({
      ...params
    });
  }

  createAnimalType(data: Prisma.AnimalTypeCreateInput) {
    return this.prisma.animalType.create({
      data
    });
  }

  updateAnimalType(params: UpdateAnimalTypeParams) {
    return this.prisma.animalType.update({ ...params });
  }

  deleteAnimalType(where: Prisma.AnimalTypeWhereUniqueInput) {
    return this.prisma.animalType.delete({
      where
    });
  }
} 