import { Injectable } from "@nestjs/common";
import { IAnimalService } from "src/utils/interface/animal.interface";
import { Animal, AnimalCreate, AnimalUpdate } from "src/schema/animal.schema";
import { AnimalRepository } from "./animal.repository";

@Injectable()
export class AnimalService implements IAnimalService {
  constructor(
    private readonly animalRepository: AnimalRepository) { }

  getAnimals() {
    return this.animalRepository.animals({ orderBy: { createdAt: 'asc' } });
  }

  getAnimalById(id: string): Promise<Animal> {
    return this.animalRepository.animal({ id });
  }

  createAnimal(data: AnimalCreate): Promise<Animal> {
    return this.animalRepository.createAnimal(data);
  }

  updateAnimal(id: string, data: AnimalUpdate): Promise<Animal> {
    return this.animalRepository.updateAnimal({ where: { id }, data });
  }

  deleteAnimal(id: string) {
    return this.animalRepository.deleteAnimal({ id });
  }
}
