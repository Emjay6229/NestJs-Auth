import { IsEmail, IsString, IsOptional } from "class-validator";

export class VendorDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    restaurantame?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string;
};
