import { Component, Input } from '@angular/core';
import { Promo } from 'src/app/classes/promo.model';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent{
  @Input() public promo: Promo;
 
  url= new Config;
 
  getImageUrl(activeImageUrl){
      return this.url.api+"/promos/"+activeImageUrl;
  }
}
