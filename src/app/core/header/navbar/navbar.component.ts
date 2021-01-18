import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  
  constructor(private router: Router, private adminService: AdminService, private productService: ProductService) { }

  url: string;
  userId: string="a";

  admin: boolean= false;
  // userId: string= JSON.parse(localStorage.getItem('userLoginData'))._id;

  // active tab variables
  activeHome: string= "";
  activeAbout: string= "";
  activeProducts: string= "";
  activeContact: string= "";
  activeFAQ: string= "";
  activeAdmin: string= "";
  dispSearch= true;

  navbarToggle: boolean= false;
  show: string= "topbarHide";

  // search variables
  productSearchList: any;
  searchText: string= "";
  viewSearchResult: boolean= false;

  ngOnInit() {
    
    // check admin login
    if(localStorage.getItem("adminLoginData")==this.adminService.getAdminToken()){
      this.admin=true
    }else{
      localStorage.setItem('adminLoginData', "")
    }

    if(localStorage.getItem('userLoginData'))
      this.userId= JSON.parse(localStorage.getItem('userLoginData'))._id;
    else  
      this.userId= null;

    // get product name list for search bar
    this.getProductNames();
  }
  ngDoCheck(){
    this.url= this.router.url;
    // active tab check
    this.activeHome= "";
    this.activeAbout= "";
    this.activeProducts= "";
    this.activeContact= "";
    this.activeFAQ= "";
    this.activeAdmin= "";
    
    if(this.url=='/home#hero')
      this.activeHome= 'active'
    if(this.url=='/home#about')
      this.activeAbout= 'active'
    if(this.url=='/home#contact')
      this.activeContact= 'active'
    if(this.url=='/products')
      this.activeProducts= 'active'
    if(this.url=='frequently-asked-questions')
      this.activeFAQ= 'active'
    if(this.url.slice(0,6)=='/admin')
      this.activeAdmin= 'active'
    if(this.url.slice(0,10)=='/products/'){
      this.dispSearch= false;
    }
  }

  getProductNames(){
    this.productService.getProductNames()
      .subscribe((list)=>{
        this.productSearchList= list;
      })
  }

  enterOnSearch(id){
    this.viewSearchResult= false;

    this.router.navigate(['/products'])
  }

  navbarShow(){
    console.log("hi")
    if(this.show== "topbarHide")
      this.show= "";
    else
      this.show= "topbarHide";
  }

  logoutAdmin(){
    localStorage.setItem('adminLoginData', ' ');
    location.reload()
  }


}
