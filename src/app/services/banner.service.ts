import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Config } from '../config';
import { ApiService } from './api.service';
 
@Injectable()
export class BannerService{
    constructor(private apiService: ApiService){}

    url= new Config();

    getActiveBanner(): Observable<any>{
        return this.apiService.get(this.url.api+'/banner/get-active-banner');    // get active banner
    }

    getAllBanner(): Observable<any>{
        return this.apiService.get(this.url.api+'/banner/get-all-banners');    // get active banner
    }

    addBanner(body): Observable<any>{
        return this.apiService.post(this.url.api+'/banner/add-banner', body);
    }
    
    activateBanner(body): Observable<any>{
        return this.apiService.post(this.url.api+'/banner/activate-banner', body);
    }

    deleteBanner(_id: string){
        return this.apiService.delete(`${this.url.api}/banner/delete-banner/${_id}`)
    }
}