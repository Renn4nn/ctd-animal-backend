import { Injectable, Inject } from "@nestjs/common";
import { GetUserParams, IUserRepository, UpdateUserParams } from "src/utils/interface/user.interface";
import { PrismaClient } from "src/generated/prisma/client";
import { Prisma } from "src/generated/prisma/client";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @Inject('PrismaService')
        private readonly prisma: PrismaClient) { }

    user(where: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUniqueOrThrow({
            where
        });
    }

    users(params: GetUserParams) {
        return this.prisma.user.findMany({
            ...params
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        });
    }

    async validateUser(login: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { login }
        });
        if (!user) {
            return null;
        }
        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }

    updateUser(params: UpdateUserParams) {
        return this.prisma.user.update({ ...params });
    }

    deleteUser(where: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.delete({
            where
        });
    }

}