import { Injectable } from "@nestjs/common";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import categoriesData from "./categories.seeder.data";

@Injectable()
export class CategoriesSeeder {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>
    ) {}

    async seedCategories() {
        for (const category of categoriesData) {
            const exists = await this.categoriesRepository.findOneBy({
              name: category.name,
            });
            if (!exists) {
              await this.categoriesRepository.save(category);
            }
        }

        return 'Categories seeded'
    }
}