import { Test } from "@nestjs/testing";
import { CategoriesService } from "./categories.service";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('CategoriesService', () => {
    let service: CategoriesService;
    let repository: Repository<Category>;
    
    beforeEach(async () => {
        const mockRepository = {
            find: jest.fn().mockResolvedValue([]),
            save: jest.fn().mockResolvedValue({ 
                id: "4871688e-e431-40c6-99f5-7f841423bae9", 
                name: "test" 
            }),
        };

        const module = await Test.createTestingModule({
            providers: [
                CategoriesService,
                {
                    provide: getRepositoryToken(Category),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<CategoriesService>(CategoriesService);
        repository = module.get<Repository<Category>>(getRepositoryToken(Category));
    });

    it('should verify that service is defined', () => {
        expect(service).toBeDefined();
    });

    it('should add category', async () => {
        const newCategory: Omit<Category, 'id'> = { name: "test" };
        const result = await service.addCategory(newCategory);

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(newCategory.name);
    });

    it('should get all categories', async () => {
        const categories: Category[] = [
            { id: "4871688e-e431-40c6-99f5-7f841423bae9", name: "test" },
            { id: "965004fc-2b84-4e68-a974-25ebfe347825", name: "test2" },
        ];
        jest.spyOn(repository, 'find').mockResolvedValue(categories);
        const result = await service.getCategories();
        expect(result).toBeDefined();
        expect(result).toEqual(categories);
    });

    it('should call the repository find method when getting categories', async () => {
        const findSpy = jest.spyOn(repository, 'find').mockResolvedValue([]);        
        await service.getCategories();
        expect(findSpy).toHaveBeenCalledTimes(1);

    });

    it('should call the repository save method when adding a category', async () => {
        const newCategory: Omit<Category, 'id'> = { name: 'New Category' };
        const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue({ id: '1', ...newCategory } as Category);
        await service.addCategory(newCategory);
        expect(saveSpy).toHaveBeenCalledTimes(1);
        expect(saveSpy).toHaveBeenCalledWith(newCategory);
    });

    it('should throw an error if repository find method fails', async () => {
        jest.spyOn(repository, 'find').mockRejectedValue(new Error('Database error'));
        await expect(service.getCategories()).rejects.toThrow('Database error');
    });
});
