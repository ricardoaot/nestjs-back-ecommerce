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
            console.log(product)
            const foundCategory = categories.find(c => c.name === product.category);
            
            //console.log(foundCategory)

            if(foundCategory){
                const foundProduct = await this.productRepository.findOneBy({name: product.name})
                //console.log(foundProduct)

                if (!foundProduct){
                    const newProduct = new Product();
                    newProduct.name = product.name;
                    newProduct.price = product.price;
                    newProduct.stock = product.stock;
                    newProduct.description = product.description;
                    newProduct.category = foundCategory 

                    await this.productRepository.save(newProduct);
                }
            }
        }
        return 'Products seeded'
    }
}