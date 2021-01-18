import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Config } from '../config';
import { ApiService } from './api.service';
 
@Injectable()
export class UserService{
    constructor(private apiService: ApiService){}

    url= new Config();

    getAllMessage(opt){
        return this.apiService.get(`${this.url.api}/user-message/get-user-message/${opt}`);     // get 12 message at a time
    }

    sendMessage(messageBody: any){
        return this.apiService.post(this.url.api+'/user-message/send-user-message', messageBody);
    }

    reply(messageBody){
        return this.apiService.post(this.url.api+'/user-message/send-user-reply', messageBody);
    }

    // getProductNameDeleteCategory(cat_name: string){
    //     return this.apiService.get(`${this.url.api}/products/get-product-names/${cat_name}`);
    // }

    // deleteCategory(_id: string){
    //     return this.apiService.delete(`${this.url.api}/category/delete-category/${_id}`);
    // }

}
