import { Injectable, Inject } from "@nestjs/common";
import { GetUserParams, IUserRepository, UpdateUserParams } from "src/utils/interface/user.interface";
import { PrismaClient } from "src/generated/prisma/client";
import { Prisma } from "src/generated/prisma/client";

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

    createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({
            data
        });
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