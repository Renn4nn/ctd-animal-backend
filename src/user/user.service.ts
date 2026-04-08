import { Injectable } from "@nestjs/common";
import { IUserService } from "src/utils/interface/user.interface";
import { CreateUserDto, UpdateUserDto, UserSchema } from "src/schema/user.schema";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService implements IUserService {
    constructor(
        private readonly userRepository: UserRepository) { }

    getUsers() {
        return this.userRepository.users({ orderBy: { createdAt: 'asc' } });
    }

    getUserById(id: string): Promise<UserSchema> {
        return this.userRepository.user({ id })
    }

    createUser(data: CreateUserDto): Promise<UserSchema> {

        return this.userRepository.createUser(data);
    }

    validateUser(login: string, password: string) {
        return this.userRepository.validateUser(login, password);
    }

    updateUser(id: string, data: UpdateUserDto): Promise<UserSchema> {
        return this.userRepository.updateUser({ where: { id }, data });
    }

    deleteUser(id: string) {
        return this.userRepository.deleteUser({ id });
    }
}