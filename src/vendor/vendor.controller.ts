import { 
    Controller, 
    Body, 
    Get, 
    Patch, 
    Delete,
    Request,
    UseGuards
} from '@nestjs/common';
import { VendorDto } from './dto';
import { VendorService } from './vendor.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('profile')
export class VendorController {
    constructor(private readonly vendorService: VendorService) {}

    @UseGuards(AuthGuard)
    @Get()
    getMyProfile(@Request() req: any) {
        return this.vendorService.getMyProfile(req.user.id);
    };

    @UseGuards(AuthGuard)
    @Patch()
    updateMyProfile(@Request() req: any, @Body() dto: VendorDto) {
        return this.vendorService.updateMyProfile(req.user.id, dto);
    };

    @UseGuards(AuthGuard)
    @Delete()
    deleteProfile(@Request() req: any) {
        return this.vendorService.deleteProfile(req.user.id);
    }
}
