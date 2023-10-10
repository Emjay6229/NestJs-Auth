import { Controller, Get, Post, Patch, Delete, UseGuards, Body, Request, Param} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { MenuService } from './menu.service';
import { menuDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @UseGuards(AuthGuard)
    @Post('create-menu')
    async createMenu(@Request() req: any, @Body() dto: menuDto) {
        return await this.menuService.createMenu(req.user.vendorId, dto);
    }

    @UseGuards(AuthGuard)
    @Get('get-menu-list')
    async getAllMenu(@Request() req: any) {
        return await this.menuService.getAllMenu(req.user.vendorId);
    }

    @UseGuards(AuthGuard)
    @Get(":menuId")
    async getMenuItem(@Param('menuId') menuId: ObjectId) {
        return await this.menuService.getMenuItem(menuId);
    }

    @UseGuards(AuthGuard)
    @Patch(":menuId")
    async editMenuItem(@Body() dto: menuDto, @Param('menuId') menuId: ObjectId) {
        return await this.menuService.editMenuItem(menuId, dto);
    }

    @UseGuards(AuthGuard)
    @Delete(":menuId")
    async removeMenuItem(@Param('menuId') menuId: ObjectId) {
        return await this.menuService.removeMenuItem(menuId);
    }

    @UseGuards(AuthGuard)
    @Delete('delete-menu-list')
    async removeAllMenuItems() {
        return await this.menuService.removeAllMenuItems();
    }

}
