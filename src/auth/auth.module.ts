import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Vendor, VendorSchema } from "./schemas/vendor.entity";

// Dependencies in the AuthModule
/* 
* Mongoose Module
* Jwt Module
* Config Module
*/

@Module({
    imports: [
      // set up mongoose for querying
      MongooseModule.forFeature([
          { 
            name: Vendor.name, 
            schema: VendorSchema 
          }
      ]),
      // set up JWT for authentication/authorization 
      JwtModule.registerAsync({
          global: true, // JWT is set to global to accessible anywhere in the code
          imports: [ConfigModule], // import nest Config module
          inject: [ConfigService], // inject nest Config Service
          // get environment variable from configuration file
          useFactory: async (config: ConfigService) => (
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