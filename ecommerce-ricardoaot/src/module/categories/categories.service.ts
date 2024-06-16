import { Injectable } from "@nestjs/common";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) {}
    async getCategories() {
        return await this.categoryRepository.find();
    }
    async addCategory(category: Omit<Category, 'id'>) {
        return await this.categoryRepository.save(category);
    }
}