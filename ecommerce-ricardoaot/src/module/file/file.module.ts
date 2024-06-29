import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { ProductsService } from '../products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { ProductsRepository } from '../products/products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileController],
  providers: [
    FileService, 
    CloudinaryService, 
    CloudinaryConfig,
    ProductsService,
    ProductsRepository
  ],
})
export class FileModule {}
