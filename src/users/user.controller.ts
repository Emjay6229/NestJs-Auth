import { 
    Controller, 
    Body, 
    Get, 
    Patch, 
    Delete,
    Request,
    UseGuards
} from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/profile')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get()
    getMyProfile(@Request() req ) {
        return this.userService.getMyProfile(req.user.id);
    };

    @UseGuards(AuthGuard)
    @Patch()
    updateMyProfile(@Request() req, @Body() dto: UserDto) {
        return this.userService.updateMyProfile(req.user.id, dto);
    };

    @UseGuards(AuthGuard)
    @Delete()
    deleteProfile(@Request() req) {
        return this.userService.deleteProfile(req.user.id);
    }
}
