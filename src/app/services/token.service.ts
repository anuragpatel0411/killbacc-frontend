import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
 
@Injectable()
export class TokenService{
    constructor(){}

    getToken(): Number{
        var date=new Date().getTime();
        var token= (date/6340000);
        token-=token%1;
        token=token*999876+678534;
        return token;
    }

}