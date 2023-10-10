import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Vendor, VendorSchema } from "../vendor/schemas/vendor.entity";

@Module({
    imports: [
      MongooseModule.forFeature([
          { 
            name: Vendor.name, 
            schema: VendorSchema 
          }
      ]),
      // set up JWT for authentication/authorization 
      JwtModule.registerAsync({
          global: true,
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async(config: ConfigService) => (
            { 
              secret: config.get<string>("jwtSecret")
            }
          )
      })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{}


/* 
To use a particular service, its module must be imported.
To use make a module usable in other modules, it is added into the exports array
*/