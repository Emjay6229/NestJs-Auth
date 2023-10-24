import { Injectable, BadRequestException, ServiceUnavailableException, NotFoundException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './schema/menu.entity';
import { menuDto } from './dto';

@Injectable()
export class MenuService {
constructor( @InjectModel(Menu.name) private readonly menuModel: Model<Menu> ) {}

	async createMenu(vendorId: ObjectId, dto: menuDto) {
		try {
			const checkMenu = await this.menuModel.findOne({ meal: dto.meal });
			if (checkMenu) {
				if (checkMenu.category === dto.category) {
					throw new BadRequestException(`${dto.meal} already exists in category ${checkMenu.category}`);
				}
			}
				
			const menu = new this.menuModel({ vendor: vendorId, ...dto });
			await menu.save();
			return { menu };
		} catch(err) {
				throw new ServiceUnavailableException(err.message);
		}		
	}

	async getAllMenu(vendorId: ObjectId) {
		try{
			const items = await this.menuModel.find({ vendor: vendorId })
				.sort("meal category, vendor");

			if (!items) throw new NotFoundException();
			return { items };
		} catch(err) {
			throw new ServiceUnavailableException(err.message);
		}
	}
	
	async getMenuItem(menuId: ObjectId) {
		try{
			const item = await this.menuModel.findById(menuId)
			if (!item) throw new NotFoundException();
			return { item };
		} catch(err) {
			throw new ServiceUnavailableException(err.message);
		}
	}

	async editMenuItem(menuId: ObjectId, dto: menuDto) {
		try {
			const editedMenu = await this.menuModel.findByIdAndUpdate( menuId, dto, { new: true, runValidators: true } );
			if(!editedMenu) throw new NotFoundException("Update failed");
			return { editedMenu };
		} catch(err) {
			throw new ServiceUnavailableException(err.message);
		}
	}

	async removeMenuItem(menuId: ObjectId) {
		try {
			await this.menuModel.findByIdAndDelete(menuId);
			return "this meal has been successfully deleted";
		} catch(err) {
			throw new ServiceUnavailableException(err.message);
		}
	}

	async removeAllMenuItems() {
		try{
			await this.menuModel.deleteMany();
			return "Menu List is empty";
		} catch(err) {
				throw new ServiceUnavailableException(err.message);
		}
	}
}
