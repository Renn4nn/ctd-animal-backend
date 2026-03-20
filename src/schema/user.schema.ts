import { createZodDto } from "nestjs-zod";
import { Prisma } from "src/generated/prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
}) satisfies z.ZodType<Prisma.UserCreateInput>

export const userSchema = z.object({
  id: z.string(),
  ...createUserSchema.shape,
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date()
}) satisfies z.ZodType<Prisma.UserModel>

export const updateUserSchema = createUserSchema.partial()

// Não existe em runtime por isso usa o DTO
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type UserSchema = z.infer<typeof userSchema>

// DTOs
export class UserDto extends createZodDto(userSchema) {}
export class CreateUserDto extends createZodDto(createUserSchema) {}
export class UpdateUserDto extends createZodDto(updateUserSchema) {}