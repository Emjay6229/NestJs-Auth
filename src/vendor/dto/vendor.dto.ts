import { IsEmail, IsString, IsOptional } from "class-validator";

export class EditVendorDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    restaurantName: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    website: string
};
