import { Injectable } from "@nestjs/common";
import { Product } from "./product.interface";

@Injectable()
export class ProductsRepository {
    private products: Product[] = [
        { id: 1, name: 'Product 1', description: 'Product 1', price: 20, stock: true, imgUrl: 'http://google.com/imagen1'  },
        { id: 2, name: 'Product 2', description: 'Product 2', price: 20, stock: true, imgUrl: 'http://google.com/imagen2'  },
        { id: 3, name: 'Product 3', description: 'Product 3', price: 20, stock: true, imgUrl: 'http://google.com/imagen3'  },
        { id: 4, name: 'Product 4', description: 'Product 4', price: 20, stock: true, imgUrl: 'http://google.com/imagen4'  },
        { id: 5, name: 'Product 5', description: 'Product 5', price: 20, stock: true, imgUrl: 'http://google.com/imagen5'  },
        { id: 6, name: 'Product 6', description: 'Product 6', price: 20, stock: true, imgUrl: 'http://google.com/imagen6'  },
        { id: 7, name: 'Product 7', description: 'Product 7', price: 20, stock: true, imgUrl: 'http://google.com/imagen7'  },
        { id: 8, name: 'Product 8', description: 'Product 8', price: 20, stock: true, imgUrl: 'http://google.com/imagen8'  },
        { id: 9, name: 'Product 9', description: 'Product 9', price: 20, stock: true, imgUrl: 'http://google.com/imagen9'  },
        { id: 10, name: 'Product 10', description: 'Product 10', price: 20, stock: true, imgUrl: 'http://google.com/imagen10'  },
        { id: 11, name: 'Product 11', description: 'Product 11', price: 20, stock: true, imgUrl: 'http://google.com/imagen11'  },
        { id: 12, name: 'Product 12', description: 'Product 12', price: 20, stock: true, imgUrl: 'http://google.com/imagen12'  },
    ]

    async getProductById(id: number): Promise<Product> {
        return this.products.find(product => product.id === id);
    }

    async getProducts(limit: number, page: number): Promise<Product[]> {
        const products = this.products.slice((page-1)*limit, page*limit);
        return products;
    }
    async createProduct(product: Omit<Product, 'id'>): Promise<number> {
        const id =  this.products.length + 1
        this.products = [...this.products, {id, ...product}];
        return id;
    }

    async updateProduct(product: Product, id: number): Promise<number|null> {
        const index = this.products.findIndex(product => product.id === id);
        if(index !== -1) {
            //this.products[index] = {...this.products[index], ...product};
            this.products[index] = product;
            return id;
        }
        return null;

    }
    async deleteProduct(id: number): Promise<number|null> {
        const index = this.products.findIndex(product => product.id === id);
        if(index !== -1) {
            this.products.splice(index, 1);
            return id
        }
        return null
    }  

}