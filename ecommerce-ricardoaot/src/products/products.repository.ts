import { Injectable } from "@nestjs/common";

interface Product {
    id:number
    name: string
    description: string
    price: number
    stock: boolean
    imgUrl: string
}
@Injectable()
export class ProductsRepository {
    private products: Product[] = [
        { id: 1, name: 'Product 1', description: 'Product 1', price: 20, stock: true, imgUrl: 'http://google.com/imagen1'  },
        { id: 2, name: 'Product 2', description: 'Product 2', price: 20, stock: true, imgUrl: 'http://google.com/imagen2'  },
        { id: 3, name: 'Product 3', description: 'Product 3', price: 20, stock: true, imgUrl: 'http://google.com/imagen3'  },
    ]
    async getProducts() {
        return this.products;
    }
}