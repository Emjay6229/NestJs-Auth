import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './schema/menu.entity';

@Module({
  imports: [ 
    MongooseModule.forFeature( 
      [
        { 
          name: Menu.name, 
          schema: MenuSchema 
        }
      ]
    )
  ],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule {}
