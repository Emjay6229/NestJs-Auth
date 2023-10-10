import { 
    Controller, 
    Body, 
    Get, 
    Patch, 
    Delete,
    Request,
    UseGuards
} from '@nestjs/common';
import { EditVendorDto } from './dto';
import { VendorService } from './vendor.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('profile')
export class VendorController {
    constructor(private readonly vendorService: VendorService) {}

    @UseGuards(AuthGuard)
    @Get()
    getMyProfile(@Request() req: any) {
        console.log(req.user)
        return this.vendorService.getMyProfile(req.user.vendorId);
    };

    @UseGuards(AuthGuard)
    @Patch()
    updateMyProfile(@Request() req: any, @Body() dto: EditVendorDto) {
        return this.vendorService.updateMyProfile(req.user.vendorId, dto);
    };

    @UseGuards(AuthGuard)
    @Delete()
    deleteProfile(@Request() req: any) {
        return this.vendorService.deleteProfile(req.user.vendorId);
    }
}
