import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
    imports: [
      MongooseModule.forFeature( [ { name: User.name, schema: UserSchema } ] ),
      JwtModule.registerAsync({
          global: true,
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => ({ 
            secret: config.get<string>("jwtSecret")
          })
      })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{}