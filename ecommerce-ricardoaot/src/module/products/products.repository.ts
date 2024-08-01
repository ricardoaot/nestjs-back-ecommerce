import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";
import { Repository, MoreThan } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../categories/category.entity";
import { NewProductDTO } from "./dto/newProduct.dto";

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
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
    
    async createProduct(product: NewProductDTO): Promise<Product> { 
        const foundCategory = await this.categoryRepository.findOneBy({name: product.category}); 

        if(!foundCategory) throw new NotFoundException('Product not found');
        
        const foundProduct = await this.productRepository.findOneBy({name: product.name});
        if(foundProduct) throw new NotFoundException('Product already exists');

        const product2 = new Product();
        product2.name = product.name;
        product2.price = product.price;
        product2.stock = product.stock;
        product2.category = foundCategory
        
        return await this.productRepository.save(product2);
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
        console.log("id es: ",id)
        const productFound = await this.productRepository.findOneBy({id});
        console.log("Producto es: ", productFound)
        if (!productFound) return undefined;
        if(productFound) {
            return await this.productRepository.remove(productFound);
        }
    }  

}