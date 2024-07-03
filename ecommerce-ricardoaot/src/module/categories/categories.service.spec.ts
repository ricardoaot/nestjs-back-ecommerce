import { Test } from "@nestjs/testing";
import { CategoriesService } from "./categories.service";
import { Category } from "./category.entity";


describe('CategoriesService', () => {
    let service: CategoriesService;
    let category: Category;
    let mockCategoryService: Partial<CategoriesService>;

    beforeEach(async () => {
        mockCategoryService= {
            //getCategories: jest.fn().mockResolvedValue([]),
            addCategory: () => Promise.resolve(undefined),
            getCategories: () => Promise.resolve(undefined),
        }
        const module = await Test.createTestingModule({
            providers: [
                CategoriesService,
                {
                    provide: CategoriesService, 
                    useValue: mockCategoryService,
                }
            ], 
        }).compile();

        service = module.get<CategoriesService>(CategoriesService);
        
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
})