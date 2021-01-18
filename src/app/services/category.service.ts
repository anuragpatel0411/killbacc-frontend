import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Config } from '../config';
import { ApiService } from './api.service';
 
@Injectable()
export class CategoryService{
    constructor(private apiService: ApiService){}

    url= new Config();

    getCategories(){
        return this.apiService.get(this.url.api+'/category/get-categories');
    }

    addCategory(category: any){
        return this.apiService.post(this.url.api+'/category/add-category', category);
    }

    getProductNameDeleteCategory(cat_name: string){
        return this.apiService.get(`${this.url.api}/products/get-product-names/${cat_name}`);
    }

    deleteCategory(_id: string){
        return this.apiService.delete(`${this.url.api}/category/delete-category/${_id}`);
    }

}
