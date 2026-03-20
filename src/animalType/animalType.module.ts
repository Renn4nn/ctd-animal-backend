import { Module } from '@nestjs/common';
import { AnimalTypeController } from './animalType.controller';
import { AnimalTypeService } from './animalType.service';
import { AnimalTypeRepository } from './animalType.repository';

@Module({
  controllers: [AnimalTypeController],
  providers: [AnimalTypeService, AnimalTypeRepository],
})
export class AnimalTypeModule { }
