import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {User, UserSchema } from 'src/auth/schemas/user.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
    imports: [
      MongooseModule.forFeature([{
      name: User.name, 
      schema: UserSchema
    }])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
