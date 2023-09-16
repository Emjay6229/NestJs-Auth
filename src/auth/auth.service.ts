import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { signinDto, signupDto } from "./dto";
import { User } from "src/auth/schemas/user.schema";
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService
      ) {}

    async signup(dto: signupDto) {
        const checkUser = await this.userModel.findOne({ email: dto.email }).select('email');

        if (checkUser) 
            throw new BadRequestException("Credentials taken");

        const securePass = await argon.hash(dto.password);

        dto.password = securePass;

        const user = new this.userModel(dto);

        await user.save();
        
        return {
            message: "User created successfully",
            user,
        }; 
    };

    async signin(dto: signinDto) {
        const user = await this.userModel.findOne({ email: dto.email }).select("firstName lastName email role");

        if (!user) 
            throw new UnauthorizedException("Credentials do not exist");

        const passMatch = await argon.verify(user.password, dto.password);

        if(!passMatch) 
            throw new BadRequestException("Incorrect Credentials");

        const payload = {
          id: user._id,
          username: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role
        };

        const access_token = await this.jwtService.signAsync(payload, { expiresIn: "1d" });

        return {
            message: "Sign in successful",
            access_token,
            user
        };
    };
};