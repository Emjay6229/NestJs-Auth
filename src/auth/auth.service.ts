import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { signinDto, signupDto } from "./dto";
import { Vendor } from "src/vendor/schemas/vendor.entity";
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Vendor.name) 
        private readonly vendorModel: Model<Vendor>,
        private jwtService: JwtService
      ) {}

    async signup(dto: signupDto) {
        const checkVendor = await this.vendorModel.findOne({ email: dto.email }).select('email');

        if (checkVendor) 
            throw new BadRequestException("Credentials taken");

        const securePass = await argon.hash(dto.password);

        dto.password = securePass;

        const vendor = new this.vendorModel(dto);

        await vendor.save();
        
        return {
            message: "Your account has been created successfully",
            vendor,
        }; 
    };

    async signin(dto: signinDto) {
        const vendor = await this.vendorModel.findOne({ email: dto.email });

        if (!vendor) 
            throw new NotFoundException("Credentials do not exist");

        const passwordMatch = await argon.verify(vendor.password, dto.password);

        if(!passwordMatch) 
            throw new BadRequestException("Incorrect Password Credentials");

        const payload = {
          vendorId: vendor._id,
          retaurantName: vendor.restaurantName,
          email: vendor.email,
          phoneNumber: vendor.phoneNumber,
          address: vendor.address,
          openingHour: vendor.openingHour,
          closingHour: vendor.closingHour,
          minimumPrice: vendor.minimumPrice,
          website: vendor.website,
          likes: vendor.likes,
          rating: vendor.rating,
          reviews: vendor.reviews,
          active: vendor.active
        };

        const access_token = await this.jwtService.signAsync(payload);

        return {
            message: "Sign in successful",
            access_token
        };
    };
};