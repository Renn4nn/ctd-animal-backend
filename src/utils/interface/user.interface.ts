import { Prisma } from "../../generated/prisma/client";
import { CreateUserDto, UpdateUserDto, UserSchema } from "../../schema/user.schema";
import { ApiResponse } from "../apitypes/api.response.types";

export type GetUserParams = {
    skip?: number
	take?: number
	cursor?: Prisma.UserWhereUniqueInput
	where?: Prisma.UserWhereInput
	orderBy?: Prisma.UserOrderByWithRelationInput
}

export type CreateUserParams = {
    data: Prisma.UserCreateInput
}

export type UpdateUserParams = {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
}

export interface IUserRepository {
    user(
		userWhereUniqueInput: Prisma.UserWhereUniqueInput
	): Promise<UserSchema>
    users(params: GetUserParams): Promise<UserSchema[]>
    createUser(data: CreateUserDto): Promise<UserSchema>
    updateUser(params: UpdateUserParams): Promise<UserSchema>
    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserSchema>
}

export interface IUserService {
    getUsers(): Promise<UserSchema[]> // aqui não retorna como data:
    getUserById(id: string): Promise<UserSchema>
    createUser(data: CreateUserDto): Promise<UserSchema>
    updateUser(id: string, data: UpdateUserDto): Promise<UserSchema>
    deleteUser(id: string): Promise<UserSchema>
}
 
export interface IUserController {
    getUsers(): Promise<ApiResponse<UserSchema[]>>
    getUserById(id: string): Promise<ApiResponse<UserSchema>>
    createUser(data: CreateUserDto): Promise<ApiResponse<UserSchema>>
    updateUser(id: string, data: UpdateUserDto): Promise<ApiResponse<UserSchema>>
    deleteUser(id: string): Promise<ApiResponse<UserSchema>>
}