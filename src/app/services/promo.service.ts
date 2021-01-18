import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Config } from '../config';
import { ApiService } from './api.service';
 
@Injectable()
export class PromoService{
    constructor(private apiService: ApiService){}

    url= new Config();

    getActivePromo(): Observable<any>{
        return this.apiService.get(this.url.api+'/promo/get-active-promo');    // get active promo
    }

    getAllPromos(): Observable<any>{
        return this.apiService.get(this.url.api+'/promo/get-all-promos');    // get active promo
    }

    addPromo(body): Observable<any>{
        return this.apiService.post(this.url.api+'/promo/add-promo', body);
    }
    
    activatePromo(body): Observable<any>{
        return this.apiService.post(this.url.api+'/promo/activate-promo', body);
    }

    deletePromo(_id: string){
        return this.apiService.delete(`${this.url.api}/promo/delete-promo/${_id}`)
    }
}