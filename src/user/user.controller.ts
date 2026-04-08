import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, UserSchema } from "src/schema/user.schema";
import { ApiSuccessResponse } from "src/utils/apitypes/api.response.types";

@Controller('api/user')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Get()
    async getUsers(): Promise<ApiSuccessResponse<UserSchema[]>> {
        const result = await this.service.getUsers();
        return {
            data: result
        }
    }

    @Get(':id')
    async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<ApiSuccessResponse<UserSchema>> {
        const result = await this.service.getUserById(id);
        return {
            data: result
        }
    }

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<ApiSuccessResponse<UserSchema>> {
        const result = await this.service.createUser(user);
        return {
            data: result
        }
    }

    @Post('login')
    async login(@Body() { login, password }: { login: string, password: string }) {
        const result = await this.service.validateUser(login, password);
        if (!result) {
            return {
                data: "Usuario ou senha incorretos!"
            }
        }
        return {
            data: result
        }
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UpdateUserDto): Promise<ApiSuccessResponse<UserSchema>> {
        const result = await this.service.updateUser(id, user);
        return {
            data: result
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<ApiSuccessResponse<UserSchema>> {
        const result = await this.service.deleteUser(id);
        return {
            data: result
        }
    }
}
