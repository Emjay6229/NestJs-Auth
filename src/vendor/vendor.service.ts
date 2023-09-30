import { Injectable, Param} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorDto } from './dto';
import { Vendor } from '../auth/schemas/vendor.entity';

@Injectable()
export class VendorService {
    constructor(
        @InjectModel(Vendor.name) 
        private readonly vendorModel: Model<Vendor>
      ) {}

    async getMyProfile(id: string) {
        const vendor = await this.vendorModel.findById(id).select('restaurantName email address');

        if (!vendor)
            throw new Error("Credentials not found");

        return { vendor };
    };

    async updateMyProfile(id: string, dto: VendorDto) {
        const vendor = await this.vendorModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true })
            .select('restaurantName email address');

        if (!vendor)
            throw new Error("Credentials not found");

        return { vendor }
    };

    async deleteProfile(id: string) {
      await this.vendorModel.findByIdAndDelete(id);
      return { message: `vendor ${id} has been deleted`}
    }
}
