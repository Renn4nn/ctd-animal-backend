import { z } from "zod";
import { Prisma } from "src/generated/prisma/client";
import { createZodDto, ZodDto } from "nestjs-zod";

export const animalTypeSchema = z.object({
  id: z.number(),
  label: z.string().min(1, "O label é obrigatório"),
  active: z.boolean().default(true),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date()
}) satisfies z.ZodType<Prisma.AnimalTypeModel>

export const createAnimalTypeSchema = z.object({
  label: z.string().min(1, "O label é obrigatório"),
});

export const updateAnimalTypeSchema = createAnimalTypeSchema.partial()

export type AnimalType = z.infer<typeof animalTypeSchema>;
export type AnimalTypeUpdate = z.infer<typeof updateAnimalTypeSchema>;
export type AnimalTypeCreate = z.infer<typeof createAnimalTypeSchema>;

// DTO's
export class AnimalTypeDTO extends createZodDto(animalTypeSchema) { }
export class AnimalTypeUpdateDTO extends createZodDto(updateAnimalTypeSchema) { }
export class AnimalTypeCreateDTO extends createZodDto(createAnimalTypeSchema) { }