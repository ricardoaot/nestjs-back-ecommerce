import { Injectable } from "@nestjs/common";
import productData from "./products.seeder.data";
import { Product } from "./product.entity";
import { Category } from "../categories/category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsSeeder {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ){}
    async seedProducts() {
        const categories = await this.categoryRepository.find();

        for (const product of productData) {
            const foundCategory = categories.find(c => c.name === product.category);
            
            if(foundCategory){
                const foundProduct = await this.productRepository.findOneBy({name: product.name})

                if (!foundProduct){
                    const newProduct = new Product();
                    newProduct.name = product.name;
                    newProduct.description = product.description;
                    newProduct.price = product.price;
                    newProduct.stock = product.stock;
                    newProduct.category = foundCategory 

                    await this.productRepository.save(newProduct);
                }
            }
        }
        return 'Products seeded'
    }
}