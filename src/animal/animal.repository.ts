import { Injectable } from "@nestjs/common";
import { GetAnimalParams, IAnimalRepository, UpdateAnimalParams } from "src/utils/interface/animal.interface";
import { Inject } from "@nestjs/common";
import { Prisma, PrismaClient } from "src/generated/prisma/client";

@Injectable()
export class AnimalRepository implements IAnimalRepository {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: PrismaClient) { }

  animal(where: Prisma.AnimalWhereUniqueInput) {
    return this.prisma.animal.findUniqueOrThrow({
      where
    });
  }

  animals(params: GetAnimalParams) {
    return this.prisma.animal.findMany({
      ...params
    });
  }

  createAnimal(data: Prisma.AnimalUncheckedCreateInput) {
    return this.prisma.animal.create({
      data
    });
  }

  updateAnimal(params: UpdateAnimalParams) {
    return this.prisma.animal.update({ ...params });
  }

  deleteAnimal(where: Prisma.AnimalWhereUniqueInput) {
    return this.prisma.animal.delete({
      where
    });
  }
}
