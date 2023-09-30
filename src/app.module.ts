import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './users/vendor.module';
import configuration from './config/configuration';
// import { OrderModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    // connect to MongoDb
    // forRoot accepts the same configurations as mongoose.connect()
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => (
        {
          uri: config.get<string>('database.connectionString')
        }
      ),
    }),
    AuthModule, 
    VendorModule
    // OrderModule, 
  ]
})
export class AppModule {}