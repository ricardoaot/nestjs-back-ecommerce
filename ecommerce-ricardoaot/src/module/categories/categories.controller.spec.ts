import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesSeeder } from './categories.seeder';
import { Category } from './category.entity';
import { BadRequestException } from '@nestjs/common';
import { Response } from 'express';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;
  let seeder: CategoriesSeeder;

  const mockCategoriesService = {
    getCategories: jest.fn(),
    addCategory: jest.fn(),
  };

  const mockCategoriesSeeder = {
    seedCategories: jest.fn(),    
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: CategoriesSeeder, useValue: mockCategoriesSeeder },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
    seeder = module.get<CategoriesSeeder>(CategoriesSeeder);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should seed categories', async () => {
    mockCategoriesSeeder.seedCategories.mockResolvedValue('seeded');
    const result = await controller.seedCategories();
    expect(result).toBe('seeded');
  });

  it('should get categories', async () => {
    const mockRes = mockResponse();
    const categories = [{ id: 1, name: 'Test Category' }];
    mockCategoriesService.getCategories.mockResolvedValue(categories);
    await controller.getCategories(mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(categories);
  });

  it('should add a category', async () => {
    const mockRes = mockResponse();
    const newCategory: Omit<Category, 'id'> = { name: 'New Category' };
    const createdCategory = { id: 1, ...newCategory };
    mockCategoriesService.addCategory.mockResolvedValue(createdCategory);
    await controller.addCategory(newCategory, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith(createdCategory);
  });

  it('should handle errors in seedCategories', async () => {
    mockCategoriesSeeder.seedCategories.mockRejectedValue(new Error('Seed error'));
    await expect(controller.seedCategories()).rejects.toThrow(BadRequestException);
  });

  it('should handle errors in getCategories', async () => {
    const mockRes = mockResponse();
    mockCategoriesService.getCategories.mockRejectedValue(new Error('Get error'));
    await expect(controller.getCategories(mockRes)).rejects.toThrow(BadRequestException);
  });
});
