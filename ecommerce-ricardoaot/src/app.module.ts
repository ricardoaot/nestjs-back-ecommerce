import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './module/categories/categories.module';
import { OrdersModule } from './module/orders/orders.module';
import { OrderDetailsModule } from './module/orderDetails/orderDetail.module';
import { UsersModule } from './module/users/users.module';
import { ProductsModule } from './module/products/products.module';
import { AuthModule } from './module/auth/auth.module';
import { FileModule } from './module/file/file.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        load: [TypeOrmConfig]
      }
    ),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),

    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '3600s' },
      secret: process.env.JWT_SECRET,
    }),

    UsersModule, 
    ProductsModule, 
    AuthModule,
    CategoriesModule,
    OrdersModule,
    OrderDetailsModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
