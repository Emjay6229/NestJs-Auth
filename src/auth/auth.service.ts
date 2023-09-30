import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { signinDto, signupDto } from "./dto";
import { Vendor } from "src/auth/schemas/vendor.entity";
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Vendor.name) private readonly vendorModel: Model<Vendor>,
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
            message: "User created successfully",
            vendor,
        }; 
    };

    async signin(dto: signinDto) {
        const vendor = await this.vendorModel.findOne({ email: dto.email });

        if (!vendor) 
            throw new UnauthorizedException("Credentials do not exist");

        const passwordMatch = await argon.verify(vendor.password, dto.password);

        if(!passwordMatch) 
            throw new BadRequestException("Incorrect Credentials");

        const payload = {
          id: vendor._id,
          retaurantName: `${vendor.restaurantName}`,
          email: vendor.email
        };

        const access_token = await this.jwtService.signAsync(payload, { expiresIn: "1d" });

        return {
            message: "Sign in successful",
            access_token,
            vendorData: {
                id: vendor._id,
                retaurantName: `${vendor.restaurantName}`,
                email: vendor.email
            }
        };
    };
};