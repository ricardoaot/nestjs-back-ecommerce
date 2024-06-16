import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { ProductsModule } from './module/products/products.module';
import { AuthModule } from './module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from './config/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './module/categories/categories.module';
@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        //envFilePath: '.env.development'
        load: [TypeOrmConfig]
      }
    ),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),
    UsersModule, 
    ProductsModule, 
    AuthModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
