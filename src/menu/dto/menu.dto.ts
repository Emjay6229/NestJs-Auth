import {IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class menuDto {
    @IsString()
    @IsNotEmpty()
    meal: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsBoolean()
    @IsOptional()
    available: boolean;
};
