import { Injectable } from "@nestjs/common";
import { IAnimalTypeService } from "src/utils/interface/animalType.interface";
import { AnimalType, AnimalTypeCreateDTO, AnimalTypeUpdateDTO } from "src/schema/animalType.schema";
import { AnimalTypeRepository } from "./animalType.repository";

@Injectable()
export class AnimalTypeService implements IAnimalTypeService {
  constructor(
    private readonly animalTypeRepository: AnimalTypeRepository) { }

  getAnimalTypes() {
    return this.animalTypeRepository.animalTypes({ orderBy: { createdAt: 'asc' } });
  }

  getAnimalTypeById(id: number): Promise<AnimalType> {
    return this.animalTypeRepository.animalType({ id });
  }

  createAnimalType(data: AnimalTypeCreateDTO): Promise<AnimalType> {
    return this.animalTypeRepository.createAnimalType(data);
  }

  updateAnimalType(id: number, data: AnimalTypeUpdateDTO): Promise<AnimalType> {
    return this.animalTypeRepository.updateAnimalType({ where: { id }, data });
  }

  deleteAnimalType(id: number) {
    return this.animalTypeRepository.deleteAnimalType({ id });
  }
}
