import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { signinDto, signupDto } from "./dto";
import { User } from "src/auth/schemas/user.schema";
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async signup(dto: signupDto) {
        const checkUser = await this.userModel.findOne({ email: dto.email }).select('email');

        if (checkUser) 
            throw new Error("Credentials taken");

        const securePass = await argon.hash(dto.password);

        dto.password = securePass;

        const user = new this.userModel(dto);

        await user.save();
        return {
            message: "User created successfully",
            user,
        }; 
    }

    async signin(dto: signinDto) {
        const user = await this.userModel.findOne({ email: dto.email });

        if (!user) 
            throw new Error("Credentials do not exist");

        const passMatch = await argon.verify(user.password, dto.password);

        if(!passMatch) 
            throw new Error("Incorrect Credentials");

        return {
            message: "Sign in successful",
            user: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: user.role,
            }
        };
    };
} 