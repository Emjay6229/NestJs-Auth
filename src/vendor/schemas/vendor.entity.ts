import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument} from "mongoose";

export type VendorDocument = HydratedDocument<Vendor>;

@Schema({
    timestamps: true,
    autoIndex: false
})
export class Vendor {
    @Prop({ 
        required: true
    })
    name: string;

    @Prop({ 
        required: true,
        trim: true,
        unique: true
    })
    email: string;

    @Prop({ 
        required: true
    })
    restaurantName: string;

    @Prop({ 
        required: true,
        trim: true 
    })
    phoneNumber: string;

    @Prop({ 
        required: true,
        trim: true,
        minlength: [8, "Minimum of 8 characters"]
    })
    password: string;

    @Prop({ 
        required: true
    })
    address: string;

    @Prop({
        trim: true
    })
    openingHour: string;

    @Prop({
        trim: true
    })
    closingHour: string;

    @Prop({
        trim: true
    })
    minimumPrice: string;
    
    @Prop({
        required: true,
        unique: true,
        trim: true
    })
    website: string;

    
    @Prop({
        default: 0
    })
    likes: number;

    @Prop({
        default: 0
    })
    rating: number;

    @Prop({
        type: String,
        default: "none"
    })
    reviews: string[];

    @Prop({
        default: false
    })
    active: boolean;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);