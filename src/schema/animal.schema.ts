import { z } from "zod";
import { Prisma } from "src/generated/prisma/client";
import { AnimalSize, AnimalSex, AnimalStatus } from "src/generated/prisma/client";
import { createZodDto } from "nestjs-zod";

export const animalSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Nome é obrigatório"),
  typeId: z.number().int(),
  breed: z.string().min(1, "Raça é obrigatória"),
  age: z.string(),
  description: z.string().nullable(),
  story: z.string().nullable(),
  behavior: z.string().nullable(),
  vaccines: z.array(z.string()).default([]),
  size: z.enum(AnimalSize),
  sex: z.enum(AnimalSex),
  photos: z.array(z.string()).default([]),
  status: z.enum(AnimalStatus).default(AnimalStatus.Disponivel),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Prisma.AnimalModel>;

export const createAnimalSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  typeId: z.number().int(),
  breed: z.string().min(1, "Raça é obrigatória"),
  age: z.string(),
  description: z.string().nullable(),
  story: z.string().nullable(),
  behavior: z.string().nullable(),
  vaccines: z.array(z.string()).default([]),
  size: z.enum(AnimalSize),
  sex: z.enum(AnimalSex),
  photos: z.array(z.string()).default([]),
  status: z.enum(AnimalStatus).default(AnimalStatus.Disponivel),
}) satisfies z.ZodType<Prisma.AnimalUncheckedCreateInput>;

export const updateAnimalSchema = createAnimalSchema.partial()

export type Animal = z.infer<typeof animalSchema>;
export type AnimalCreate = z.infer<typeof createAnimalSchema>;
export type AnimalUpdate = z.infer<typeof updateAnimalSchema>;

// DTO's
export class AnimalDTO extends createZodDto(animalSchema) { }
export class AnimalCreateDTO extends createZodDto(createAnimalSchema) { }
export class AnimalUpdateDTO extends createZodDto(updateAnimalSchema) { }
