import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';

describe('FileController', () => {
  let controller: FileController;

  let mockProductsRepository: Partial<ProductsRepository>;

  mockProductsRepository = {
    updateProduct: () => Promise.resolve(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        FileService, 
        JwtService, 
        CloudinaryService, 
        ProductsService, 
        { 
          provide: ProductsRepository, 
          useValue: mockProductsRepository
        },
      ],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
