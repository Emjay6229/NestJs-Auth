import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signinDto, signupDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post("signup")
    signup(@Body() dto: signupDto) {
        return this.authService.signup(dto);
    };

    @HttpCode(HttpStatus.OK)
    @Post("signin")
    signin(@Body() dto: signinDto) {
        return this.authService.signin(dto);
    }
}