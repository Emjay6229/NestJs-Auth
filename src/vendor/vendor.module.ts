import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Vendor, VendorSchema } from 'src/auth/schemas/vendor.entity';

@Module({
    imports: [
      MongooseModule.forFeature([{
      name: Vendor.name, 
      schema: VendorSchema
    }])
  ],
  providers: [VendorService],
  controllers: [VendorController]
})
export class VendorModule {}
