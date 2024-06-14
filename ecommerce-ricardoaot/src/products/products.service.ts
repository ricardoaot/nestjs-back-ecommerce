import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./product.interface";
import { Request } from "express";

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {}
    async getProducts(limit: number, page: number): Promise<Product[]> {
        return await this.productsRepository.getProducts(limit, page);
    }
    async getProductById(id: number): Promise<Product> {
        return await this.productsRepository.getProductById(id);
    }
    async createProduct(product: Omit<Product, 'id'>): Promise<number> {
        return await this.productsRepository.createProduct(product)
    }
    async updateProduct(product: Product, id: number): Promise<number|null> {
        return await this.productsRepository.updateProduct(product, id);
    }
    async deleteProduct(id: number): Promise<number|null> {
        return await this.productsRepository.deleteProduct(id);
    }
}