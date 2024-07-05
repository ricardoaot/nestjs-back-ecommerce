import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';

jest.mock('./products.repository');

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        ProductsRepository,
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const mockProducts: Partial<Product>[] = [
        { id: '1', name: 'Test Product', price: 100, stock: 10 }
    ];
      productsRepository.getProducts = jest.fn().mockResolvedValue(mockProducts);

      const result = await productsService.getProducts(10, 1);
      expect(result).toEqual(mockProducts);
      expect(productsRepository.getProducts).toHaveBeenCalledWith(10, 1);
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      const mockProduct: Partial<Product> = { id: '1', name: 'Test Product', price: 100, stock: 10 };
      productsRepository.getProductById = jest.fn().mockResolvedValue(mockProduct);

      const result = await productsService.getProductById('1');
      expect(result).toEqual(mockProduct);
      expect(productsRepository.getProductById).toHaveBeenCalledWith('1');
    });
  });

  describe('createProduct', () => {
    it('should create a new product and return its id', async () => {
      const mockProduct: Partial<Product> = { id: '1', name: 'Test Product', description: '', price: 100, stock: 10, imgUrl: '', orderDetails: [] };
      productsRepository.createProduct = jest.fn().mockResolvedValue(mockProduct);

      const result = await productsService.createProduct(
        { name: 'Test Product', description: '', price: 100, stock: 10, imgUrl: '', orderDetails: [] }
      );
      expect(result).toEqual('1');
      expect(productsRepository.createProduct).toHaveBeenCalledWith({ name: 'Test Product', description: '', price: 100, stock: 10, imgUrl: '', orderDetails: []});
    });
  });

  describe('updateProduct', () => {
    it('should update a product and return the updated product', async () => {
      const mockProduct: Partial<Product> = { id: '1', name: 'Updated Product', price: 150, stock: 5 };
      productsRepository.updateProduct = jest.fn().mockResolvedValue(mockProduct);

      const result = await productsService.updateProduct({ name: 'Updated Product', price: 150, stock: 5 }, '1');
      expect(result).toEqual(mockProduct);
      expect(productsRepository.updateProduct).toHaveBeenCalledWith({ name: 'Updated Product', price: 150, stock: 5 }, '1');
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return its id', async () => {
      const mockProduct: Partial<Product> = { id: '1', name: 'Deleted Product', price: 100, stock: 0 };
      productsRepository.deleteProduct = jest.fn().mockResolvedValue(mockProduct);

      const result = await productsService.deleteProduct('1');
      expect(result).toEqual('1');
      expect(productsRepository.deleteProduct).toHaveBeenCalledWith('1');
    });
  });
});