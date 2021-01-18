import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product.model';
import { Promo } from '../classes/promo.model';
import { Config } from '../config';
import { AdminService } from '../services/admin.service';
import { BannerService } from '../services/banner.service';
import { ProductService } from '../services/product.service';
import { PromoService } from '../services/promo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private productService: ProductService, 
    private promoService: PromoService, 
    private adminService: AdminService,
    private bannerService: BannerService,
    ) { }

  productsNewArrivals: Array<Product>;
  productsOnSale: Array<Product>;
  productsBestRated: Array<Product>;
  promo: Promo;
  bannerImage: string="/assets/banner_home.png";

  url= new Config();

  date: number;
  date2: number;

  ngOnInit(): void {
    this.date= new Date(localStorage.getItem('userVisitKillBacc')).getTime();
    this.date2= new Date().getTime();
    console.log(this.date)
    if((this.date2-this.date)>(60*60*1000)){
      // set user visit
      this.adminService.setUserVisit({"datetime": new Date()})
        .subscribe((data)=>{
          localStorage.setItem('userVisitKillBacc', JSON.parse(data).datetime)
        })
    }
    
    // get active promo
    this.promoService.getActivePromo()
      .subscribe((promo)=>{
        this.promo= promo;
      })

    // get new arrivals
    this.productService.getNewProducts()
      .subscribe((products)=>{
        this.productsNewArrivals= products;
      })

    // get products on sale
    this.productService.getProductsOnSale()
      .subscribe((products)=>{
        this.productsOnSale= products;
      })

    // get best rated
    this.productService.getBestRatedProducts()
      .subscribe((products)=>{
        this.productsBestRated= products;
      })

    // this.bannerService.getActiveBanner()
    //   .subscribe((banner)=>{
    //     this.bannerImage= this.url.api + '/banners/' + banner.image;
    //   })
  }

}
