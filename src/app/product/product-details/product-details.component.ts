import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { Popup } from 'src/app/classes/popup.model';

import { Product } from 'src/app/classes/product.model';
import { Config } from 'src/app/config';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private unsubscribe$ = new Subject();

  @Input() public product: Product;
  public productLoading: boolean;
  public imagesLoaded: string[];
  public activeImageUrl: string;
  public reviewLoading: boolean;
  public activeImageIndex: number;
  public ratingCount: number;
  public ratingValues: number[];
  public selectedRating: any;
  public productReviews: any;

  url= new Config();

  rateProd: FormGroup;
  rating: number= 5;

  popupData: Popup;
  showPopup= false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private modalService: NgbModal, 
    private formBuilder: FormBuilder, 
    private tokenService: TokenService, 
  ) { 
    route.params.subscribe(params => { 
      this.getProduct(params['id']);
    });
  }

  ngOnInit(): void {
    this.imagesLoaded = [];
  }

  private getProduct(prodId): void {
    this.productLoading = true;
    this.productService
      .getProduct(prodId)
        .subscribe((product)=>{
          if(product){
            this.product= product;
            this.setupProduct();
            this.productLoading = false;
          }else{
            this.router.navigate(['/product-not-found']);
          }
        })
  }

  public onSelectThumbnail(event, index) {
    event.preventDefault();
    this.activeImageUrl = this.product.imageURLs[index];
    this.activeImageIndex = index;
  }

  public onAddToCart() {
    // cart service
  }
  public onSelectQuantity(event) {
    // this.selectedQuantity = <number>+event.target.value;
  }

  public onRate() {

  }

  public onImageLoad(e: any) {
    this.imagesLoaded.push(e.target.src);
  }

  getImageUrl(activeImageUrl, opt){
    if(opt=='p'){
      return this.url.api+"/products/"+activeImageUrl;
    }
    if(opt=='i'){
      return this.url.api+"/products/"+activeImageUrl;
    }
  }
  public checkImageLoaded(image, opt){
    console.log(this.imagesLoaded)
    console.log(this.getImageUrl(image, opt))
    var a=this.imagesLoaded.includes(this.url.ui+this.getImageUrl(image, opt));
    console.log(this.url.ui+this.getImageUrl(image, opt))
    console.log(a)
    console.log("=====================================================")
    return a;
  }

  private setupProduct() {
    if (this.product) {
      this.checkCategories();
      this.ratingCount = this.product.ratings ? Object.keys(this.product.ratings).length : 0;
      this.activeImageUrl = this.product.imageURLs[0];
      this.activeImageIndex = 0;
    }
  }

  private checkCategories() {
    const categories = Object.keys(this.product.categories).map(
      (category, index, inputArray) => {
        category = index < inputArray.length - 1 ? category + ',' : category;
        return category;
      }
    );
  }
  
  Dates(param?:Date){
    if(param)
      return (new Date(param))
    else 
      return (new Date)
  }

  popupResponse(response){
    if(response){
      // this.deleteFile();
    }else{
      // if(this.productDeleteId=="")
      // location.reload()
    }
      location.reload()
    this.showPopup=false;
  }

  // convenience getter for easy access to form fields
  get f(){ 
    return this.rateProd.controls; 
  }

  initRatingForm(){
    this.rateProd = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      ratingStar: [this.rating, [ Validators.required]],
      date: [new Date],
      productId: [this.product._id],
      review: [null]
    });
  }

  resetFormData(){
    this.rateProd.reset();
  }

  // rate produt modal functions
  closeResult: string;

  openModal(content) {
    this.initRatingForm();
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.resetFormData();
    }, (reason) => {
      this.closeResult = `Dismissed `;
      this.resetFormData();
    });
  }

  rate(rating){
    this.rating= rating;
    this.f.ratingStar.setValue(this.rating);
  }

  rateProduct(){
    this.f.ratingStar.setValue(this.rating);
    this.f.email.setValue(this.f.email.value.toLowerCase())
    var sendData= {
      data: this.rateProd.value,
      token: this.tokenService.getToken()
    }
    console.log(sendData)
    this.productService.rateProduct(sendData)
          .subscribe((data)=>{
            this.popupData= {
              "data" : data,
              "cancelButton": "Close",
            }
            this.showPopup= true;
            this.resetFormData();
          })
  }

  getAllReviews(){
    this.reviewLoading= true;
    this.productService.getProductReviews(this.product._id)
      .subscribe((reviews)=>{
        if(reviews)
          this.productReviews= reviews;
        else  
          this.productReviews= null
        this.reviewLoading= false;
        console.log(this.productReviews)
      })

    }

    // random color generator for usericons
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color+'80';
    }

}
