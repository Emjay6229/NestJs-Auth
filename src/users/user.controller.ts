import { Controller, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('api/v1/profile')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":id")
    getMyProfile(@Param("id") id: string) {
        return this.userService.getMyProfile(id)
    };

    @Patch(":id")
    updateMyProfile(@Param("id") id: string, @Body() dto: UserDto) {
        return this.userService.updateMyProfile(id, dto)
    }
}
