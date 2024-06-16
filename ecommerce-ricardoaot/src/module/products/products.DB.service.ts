import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsDBService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    async getProducts(limit: number, page: number): Promise<Product[]> {
        return await this.productRepository.find({
            skip: (page - 1) * limit,
            take: limit
        });
    }
    async getProductById(id: string): Promise<Product> {
        return await this.productRepository.findOneBy({id});
    }
    async createProduct(product: Omit<Product, 'id'>) {
        return await this.productRepository.save(product);
    }
    async updateProduct(product: Product, id: string) {
        return await this.productRepository.update(id, product);
    }
    async deleteProduct(id: string) {
        return await this.productRepository.delete(id);
    }

}