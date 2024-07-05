import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { UsersRepository } from '../users/users.repository';
import { OrdersRepository } from './order.repository';
import { OrderDetailsRepository } from '../orderDetails/orderDetails.repository';
import { ProductsRepository } from '../products/products.repository';
import { CreateOrderDto } from './orders.dto';

jest.mock('../users/users.repository');
jest.mock('./order.repository');
jest.mock('../orderDetails/orderDetails.repository');
jest.mock('../products/products.repository');

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let usersRepository: UsersRepository;
  let ordersRepository: OrdersRepository;
  let orderDetailsRepository: OrderDetailsRepository;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        UsersRepository,
        OrdersRepository,
        OrderDetailsRepository,
        ProductsRepository,
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    ordersRepository = module.get<OrdersRepository>(OrdersRepository);
    orderDetailsRepository = module.get<OrderDetailsRepository>(OrderDetailsRepository);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  // Aquí van las pruebas


  it('should save the order and return the saved order', async () => {
    const mockUser = { id: 'user-id', name: 'Test User' };
    const mockProduct = { id: 'product-id', price: 100, stock: 10 };
    const mockOrderDetails = { id: 'order-details-id', price: 100, products: [mockProduct] };
    const mockOrder = { id: 'order-id', user: mockUser, orderDetails: mockOrderDetails };

    usersRepository.getUserById = jest.fn().mockResolvedValue(mockUser);
    productsRepository.getProductById = jest.fn().mockResolvedValue(mockProduct);
    productsRepository.updateProduct = jest.fn().mockResolvedValue(true);
    orderDetailsRepository.addOrderDetail = jest.fn().mockResolvedValue(mockOrderDetails);
    ordersRepository.addOrder = jest.fn().mockResolvedValue(mockOrder);
    ordersRepository.getOrder = jest.fn().mockResolvedValue([mockOrder]);

    const createOrderDto: CreateOrderDto = {
      userId: 'user-id',
      products: [{ id: 'product-id' }],
    };

    const result = await ordersService.addOrder(createOrderDto);

    expect(result).toEqual([mockOrder]);
    expect(usersRepository.getUserById).toHaveBeenCalledWith('user-id');
    expect(productsRepository.getProductById).toHaveBeenCalledWith('product-id');
    expect(productsRepository.updateProduct).toHaveBeenCalledWith(mockProduct, 'product-id');
    expect(orderDetailsRepository.addOrderDetail).toHaveBeenCalledWith({
      price: 100,
      products: [mockProduct],
    });
    expect(ordersRepository.addOrder).toHaveBeenCalledWith({
      user: mockUser,
      orderDetails: mockOrderDetails,
    });
  });
});