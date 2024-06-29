import { Injectable } from "@nestjs/common";
import { Product } from "./product.entity";
import { Repository, MoreThan } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){
        //super(productRepository.target, productRepository.manager, productRepository.queryRunner);
    }

    async getProductById(id: string): Promise<Product> {
        const result = await this.productRepository.findOne({
            where:{
                id,
                stock: MoreThan(0)
            }
        });
        return result;
    }

    async getProducts(limit: number, page: number): Promise<Product[]> {
        return await this.productRepository.find({
            skip: (page - 1) * limit,
            take: limit
        });
    }
    
    async createProduct(product: Omit<Product, 'id'>): Promise<Product> {        
        return await this.productRepository.save(product);
    }

    async updateProduct(product: Partial<Product>, id: string): Promise<Product> {
        const productFound = await this.productRepository.findOneBy({id});
        if (!productFound) return undefined;
        const productUpdated = {...productFound, ...product}
        return await this.productRepository.save(productUpdated);
    
        //return result = await this.productRepository.update(id, product);
    }

    /*
    async updateUser(id: string, user: Partial<Users>): Promise<Users | undefined>  {

    const userFound = await this.findOneBy({id});
    if (!userFound) return undefined;
    const userUpdated = {...userFound, ...user}
    return this.save(userUpdated);

  }
    */

    async deleteProduct(id: string): Promise<Product> {
        const productFound = await this.productRepository.findOneBy({id});
        if (!productFound) return undefined;
        if(productFound) {
            await this.productRepository.remove(productFound);
        }
    }  

}