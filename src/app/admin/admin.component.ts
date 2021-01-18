import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  activeDashboard: string;
  activeCategory: string;
  activeProduct: string;
  activePromo: string;
  activeBanner: string;
  activeMessage: string;

  url: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.url= this.router.url;
    // active tab check
    this.activeDashboard= "";
    this.activeCategory= "";
    this.activeProduct= "";
    this.activePromo= "";
    this.activeBanner= "";
    this.activeMessage= "";
    
    if(this.url.slice(7)==='dashboard')
      this.activeDashboard= 'active'
    if(this.url.slice(7)==='add-category')
      this.activeCategory= 'active'
    if(this.url.slice(7)==='add-product')
      this.activeProduct= 'active'
    if(this.url.slice(7)==='promos')
      this.activePromo= 'active'
    if(this.url.slice(7)==='banner')
      this.activeBanner= 'active'
    if(this.url.slice(7)==='user-messages')
      this.activeMessage= 'active'
  }

}
