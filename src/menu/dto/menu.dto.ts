import {IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray } from "class-validator";

export class menuDto {
    @IsString()
    @IsNotEmpty()
    meal: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsArray()
    @IsNotEmpty()
    category: string[];

    @IsBoolean()
    @IsOptional()
    available: boolean;
};
