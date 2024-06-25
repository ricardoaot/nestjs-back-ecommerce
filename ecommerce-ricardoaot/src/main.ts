import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalLoggerMiddleware } from './middlewares/logger.middleware';
import { CategoriesController } from './module/categories/categories.controller';
import { ProductsController } from './module/products/products.controller';
import { BadRequestException, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(GlobalLoggerMiddleware)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //transform: true,
      exceptionFactory: (errors) => {
        const cleanedErrors = errors.map((e) => {
          return {
            property: e.property,
            //value: e.value,
            constraints: e.constraints,
          };
        })
        return new BadRequestException({
          alert: 'the following errors occurred',
          errors: cleanedErrors
        })
      }
    })
  );

  // Seeders call
  const categorySeeder = app.get(CategoriesController);
  await categorySeeder.seedCategories();

  const productSeeder = app.get(ProductsController);
  await productSeeder.seedProducts();
  // End seeders

  await app.listen(3000);
}
bootstrap();
