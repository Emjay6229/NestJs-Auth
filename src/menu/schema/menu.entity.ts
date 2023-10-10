import {  Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, Types } from "mongoose";

export type MenuDocument = HydratedDocument<Menu>

@Schema()
export class Menu {
    @Prop({
        type: Types.ObjectId,
        ref: "Vendor",
        required: true
    })
    vendor: ObjectId;

    @Prop({
        required: true
    })
    meal: string;

    @Prop({
        required: true
    })
    category: string;

    @Prop({
        required: true,
    })
    price: string;

    @Prop({
        required: true
    })
    available: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);