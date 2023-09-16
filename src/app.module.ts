import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './orders/orders.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    // forRoot accepts the same configurations as mongoose.connect()
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/restaurant-db'),
    AuthModule, 
    OrderModule, 
    UserModule
  ]
})
export class AppModule {}