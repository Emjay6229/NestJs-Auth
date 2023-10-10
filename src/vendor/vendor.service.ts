import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EditVendorDto } from './dto';
import { Vendor } from './schemas/vendor.entity';

@Injectable()
export class VendorService {
    constructor(
        @InjectModel(Vendor.name) 
        private readonly vendorModel: Model<Vendor>
      ) {}

    async getMyProfile(id: any) {
        const vendor = await this.vendorModel.findById(id)
            .select('restaurantName email address rating review website');

        if (!vendor)
            throw new Error("Credentials not found");

        return { vendor };
    };

    async updateMyProfile(id: any, dto: EditVendorDto) {
        const vendor = await this.vendorModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true })
            .select('restaurantName email address');

        if (!vendor)
            throw new Error("Credentials not found");

        return { vendor }
    };

    async deleteProfile(id: any) {
      await this.vendorModel.findByIdAndDelete(id);
      return { message: `vendor with id of ${id} has been deleted`}
    }
}
