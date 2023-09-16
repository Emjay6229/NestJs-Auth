import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    autoIndex: false
})
export class User {
    @Prop({ 
        required: true,
        trim: true
    })
    firstName: string;

    @Prop({ 
        required: true,
        trim: true
    })
    lastName: string;

    @Prop({ 
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    })
    email: string;

    @Prop({ 
        required: true ,
        trim: true,
        minlength: 6
    })
    password: string;

    @Prop({ 
        required: true,
        trim: true 
    })
    phoneNumber: string;

    @Prop({
        enum: ["admin", "customer", "vendor"],
        default: "vendor"
    })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);