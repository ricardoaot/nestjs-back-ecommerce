import { Injectable } from "@nestjs/common";
import productData from "./products.seeder.data";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsSeeder {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){}
    async seedProducts() {
        for (const product of productData) {
            const exist = await this.productRepository.findOneBy({name: product.name})
            if (!exist){ 
                await this.productRepository.save(product);
            }
        }
        return 'Products seeded'
    }
}