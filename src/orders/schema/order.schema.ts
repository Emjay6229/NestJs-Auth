import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { User } from "src/auth/schemas/user.schema";

export type OrderDocument = HydratedDocument<Order>;

Schema({
    timestamps: true
})
export class Order {
    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    })
    customer: User;

    @Prop({
        required: true
    })
    item: string;

    @Prop({
        required: true
    })
    price: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
