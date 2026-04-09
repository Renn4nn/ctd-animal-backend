import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, UserSchema } from "src/schema/user.schema";
import type { LoginDto } from "src/schema/login.schema";
import { ApiSuccessResponse } from "src/utils/apitypes/api.response.types";
import { AuthService } from "src/utils/auth/auth.service";
import { Public } from "src/utils/auth/public.decorator";

@Controller('api/user')
export class UserController {
    constructor(
        private readonly service: UserService,
        private readonly authService: AuthService,
    ) { }

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

    @Public()
    @Post('login')
    async login(@Body() credentials: LoginDto) {
        const { login, password } = credentials;
        const user = await this.service.validateUser(login, password);
        if (!user) {
            return {
                data: "Usuario ou senha incorretos!"
            }
        }
        const token = await this.authService.generateToken(user.id, user.login);
        return {
            data: {
                user: {
                    id: user.id,
                    login: user.login,
                },
                access_token: token,
            }
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
