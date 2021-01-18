import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Config } from '../config';
import { ApiService } from './api.service';
import { Product } from '../classes/product.model';
 
@Injectable()
export class ProductService{
    constructor(private apiService: ApiService){}

    url= new Config();

    getProducts(): Observable<any>{
        return this.apiService.get(this.url.api+'/products/get-products');
    }

    public getProduct(_id: any): Observable<Product | null> {
        return this.apiService.get(`${this.url.api}/product/${_id}`);
    }

    public getProductNames(): Observable<Product | null> {
        return this.apiService.get(this.url.api+'/products/get-product-names');
    }

    addProduct(product: any){
        return this.apiService.post(this.url.api+'/products/add-product', product);
    }

    getNewProducts(): Observable<any>{
        return this.apiService.get(this.url.api+'/products/get-products-new');    // top 3 new
    }

    getProductsOnSale(): Observable<any>{
        return this.apiService.get(this.url.api+'/products/get-products-on-sale');    // top 3 products with max discount
    }

    getBestRatedProducts(): Observable<any>{
        return this.apiService.get(this.url.api+'/products/get-products-best-rated');    // get 3 best rated products
    }

    deleteProduct(_id: string){
        return this.apiService.delete(`${this.url.api}/product/delete-product/${_id}`)
    }

    updateProduct(product: any){
        return this.apiService.post(this.url.api+'/products/update-product', product);
    }

    rateProduct(product: any){
        return this.apiService.post(this.url.api+'/products/rate-product', product);
    }

    public getProductReviews(_id: any): Observable<Product | null> {
        return this.apiService.get(`${this.url.api}/product/get-product-reviews/${_id}`);
    }

}