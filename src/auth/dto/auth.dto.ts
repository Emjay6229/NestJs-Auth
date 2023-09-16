import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class signinDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
};

export class signupDto extends signinDto {
    constructor() {
        super();
    }

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
};

