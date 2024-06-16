import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./product.entity";
import { Request } from "express";

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {}
    async getProducts(limit: number, page: number): Promise<Product[]> {
        return await this.productsRepository.getProducts(limit, page);
    }
    async getProductById(id: string): Promise<Product> {
        return await this.productsRepository.getProductById(id);
    }
    async createProduct(product: Omit<Product, 'id'>): Promise<string> {
        const createdProduct = await this.productsRepository.createProduct(product)
        return createdProduct.id
    }
    async updateProduct(product: Product, id: string): Promise<string> {
        const updatedProduct = await this.productsRepository.updateProduct(product, id)
        return updatedProduct.id;
    }
    async deleteProduct(id: string): Promise<string> {
        const deletedProduct = await this.productsRepository.deleteProduct(id)
        return deletedProduct.id;
    }
}