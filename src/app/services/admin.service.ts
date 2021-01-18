import { Injectable } from "@angular/core";
import { Config } from '../config';
import { ApiService } from './api.service';
 
@Injectable()
export class AdminService{
    constructor(private apiService: ApiService){}

    url= new Config();

    getAdminToken(){
        var today = new Date();
        return "adminlogintoken:"+today.getFullYear()+(today.getMonth()+1)+today.getDate()
    }

    adminLogin(loginData: any){
        return this.apiService.post(this.url.api+'/admin/admin-login', loginData);
    }

    getProductCount(){
        return this.apiService.get(this.url.api+'/admin/get-product-count');
    }

    getCategorytCount(){
        return this.apiService.get(this.url.api+'/admin/get-category-count');
    }

    setUserVisit(date: any){
        return this.apiService.post(this.url.api+'/admin/set-user-count', date);
    }

    getTotalUserCount(){
        return this.apiService.get(this.url.api+'/admin/get-total-user-count');
    }
    
    getMonthlyUserCount(){
        return this.apiService.get(this.url.api+'/admin/get-monthly-user-count');
    }

}