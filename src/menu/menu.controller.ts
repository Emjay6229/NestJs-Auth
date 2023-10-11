import { Controller, Get, Post, Patch, Delete, UseGuards, Body, Request, Param} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { MenuService } from './menu.service';
import { menuDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post('create-menu')
    async createMenu(@Request() req: any, @Body() dto: menuDto) {
        return await this.menuService.createMenu(req.user.vendorId, dto);
    }

    @Get('get-menu-list')
    async getAllMenu(@Request() req: any) {
        return await this.menuService.getAllMenu(req.user.vendorId);
    }

    @Get(":menuId")
    async getMenuItem(@Param('menuId') menuId: ObjectId) {
        return await this.menuService.getMenuItem(menuId);
    }

    @Patch(":menuId")
    async editMenuItem(@Body() dto: menuDto, @Param('menuId') menuId: ObjectId) {
        return await this.menuService.editMenuItem(menuId, dto);
    }

    @Delete(":menuId")
    async removeMenuItem(@Param('menuId') menuId: ObjectId) {
        return await this.menuService.removeMenuItem(menuId);
    }

    @Delete('delete-menu-list')
    async removeAllMenuItems() {
        return await this.menuService.removeAllMenuItems();
    }

}
