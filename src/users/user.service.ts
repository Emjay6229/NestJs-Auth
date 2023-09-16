import { Injectable, Param} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async getMyProfile(@Param("id") id: string) {
        const user = await this.userModel.findById(id).select('firstName lastName email phoneNumber role');

        if (!user) {
            throw new Error("Credentials not found")
        };

        return {
            user: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                "phone number": user.phoneNumber,
                role: user.role
            }
        }
    };

    async updateMyProfile(@Param("id") id: string, dto: UserDto) {
        const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true });

        if (!user) {
            throw new Error("Credentials not found")
        }

        return {
            user: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                "phone number": user.phoneNumber,
                role: user.role
            }
        }
    }
}
