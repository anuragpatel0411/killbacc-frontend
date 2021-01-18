import { Injectable } from "@angular/core";
import { Config } from '../config';
import { ApiService } from './api.service';
 
@Injectable()
export class FileService{
    constructor(private apiService: ApiService){}

    url= new Config();

    uploadProductFiles(formData: FormData){
        return this.apiService.post(this.url.api+'/files/upload-product-images', formData);
    }

    uploadPromoImage(formData: FormData){
        return this.apiService.post(this.url.api+'/files/upload-promo-image', formData);
    }

    uploadBannerImage(formData: FormData){
        return this.apiService.post(this.url.api+'/files/upload-banner-image', formData);
    }

    deleteFiles(deleteData: object){
        return this.apiService.post(this.url.api+'/files/delete-files', deleteData);
    }

}