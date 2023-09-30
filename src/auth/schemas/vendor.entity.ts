import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument} from "mongoose";

export type VendorDocument = HydratedDocument<Vendor>;

@Schema({
    timestamps: true,
    autoIndex: false
})
export class Vendor {
    @Prop({ 
        required: true,
        trim: true
    })
    firstName: string;

    @Prop({ 
        required: true,
        trim: true
    })
    restaurantName: string;

    @Prop({ 
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    })
    email: string;

    @Prop({ 
        required: true,
        trim: true 
    })
    phoneNumber: string;

    @Prop({ 
        required: true ,
        trim: true,
        minlength: 8
    })
    password: string;

  @Prop({ 
      required: true,
      trim: true
    })
    address: {
        streetName: string,
        LGA: string,
        state: string,
        number: string
    };

    @Prop({
        enum: ["admin", "customer", "vendor"],
        default: "vendor"
    })
    role: string;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);