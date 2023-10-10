import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';
import configuration from './config/configuration';
import { MenuModule } from './menu/menu.module';
// import { OrderModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], 
      useFactory: async(config: ConfigService) => ({
          uri: config.get<string>('database.connectionString')
        })}),
    AuthModule, 
    VendorModule, 
    MenuModule, 
    // OrderModule, 
  ]
})
export class AppModule {}