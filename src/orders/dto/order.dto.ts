import { IsMongoId, IsString, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class OrderDto {
    @IsMongoId()
    @IsNotEmpty()
    customer: ObjectId;

    @IsString()
    @IsNotEmpty()
    item: string;

    @IsString()
    @IsNotEmpty()
    price: string;
};