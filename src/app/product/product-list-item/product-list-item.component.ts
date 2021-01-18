import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Popup } from 'src/app/classes/popup.model';
import { Product } from 'src/app/classes/product.model';
import { Config } from 'src/app/config';
import { AdminService } from 'src/app/services/admin.service';
import { FileService } from 'src/app/services/file.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() public product: Product;
  @Input() public displayMode: string;

  popupData: Popup;
  showPopup= false;
  productDeleteId: string= "";
  productDeleteImages: Array<string>=[];
  discount: number;
  features: Array<string>=[];

  public imageLoading: boolean;

  admin: boolean= false;

  url= new Config();

  updateProd: FormGroup;

  constructor(
    private adminService: AdminService, 
    private tokenService: TokenService, 
    private productService: ProductService,
    private fileService: FileService,
    private modalService: NgbModal, 
    private formBuilder: FormBuilder, 
    
    ) { }

  ngOnInit(): void {
    // check admin login
    if(localStorage.getItem("adminLoginData")==this.adminService.getAdminToken()){
      this.admin=true
    }else{
      localStorage.setItem("adminLoginData", " ")
    }

    this.imageLoading= true;
    this.updateProd = this.formBuilder.group({
      description: [this.product.description, Validators.required],
      feature: [''],
      name: [this.product.name, Validators.required],
      currentPrice: [this.product.price , [Validators.required, (control: FormControl)=>{
        if(control && control.parent){
          if(control.parent.get('mrp').value){
            control.parent.get('mrp').updateValueAndValidity();
          }
        }
      }]],
      mrp: [this.product.priceNormal, [ Validators.required, (control: FormControl)=>{
        if(control && control.parent){
          if(control.parent.get('currentPrice').value>control.value){
            return {pattern: true};
          }
        }
        return null;
      }]]
    });
    this.features= this.product.features;
  }

  // convenience getter for easy access to form fields
  get f(){ 
    return this.updateProd.controls; 
  }

  public onAddToCart(){
    // cart service
  }

  public onImageLoad(){
    this.imageLoading= false;
  }

  deleteProduct(product){
    this.productDeleteId= product._id;
    this.productDeleteImages= product.imageURLs;
    this.popupData= {
      "data" : "Are you sure want to delete "+ product.name +".",
      "cancelButton": "Cancel",
      "confirmButton": "Confirm",
    }
    this.showPopup= true;
  }
  popupResponse(response){
    if(response){
      this.deleteFile();
    }else{
      if(this.productDeleteId=="")
        location.reload()
    }
    this.showPopup=false;
  }

  deleteFile(){
    var fileDeleteData={
      "type": "product",
      "data": this.productDeleteImages  
    }
    this.fileService.deleteFiles(fileDeleteData)
      .subscribe((data)=>{
        console.log(data)
        if(data=='deleted'){
          this.deleteProductData();
        }
        else{
          this.popupData={
            "data" : "Error Deleting Product. Try Again",
            "cancelButton": "Close",
          }
          this.showPopup=true;
        }
      })
  }

  deleteProductData(){
    console.log(this.productDeleteId)
    this.productService.deleteProduct(this.productDeleteId)
    .subscribe((data)=>{
      this.popupData={
        "data" : "Product Deleted",
        "cancelButton": "Close",
      }
      this.showPopup=true;
      this.productDeleteId="";
    })
  }

  
  // edit produt modal functions
  closeResult: string;

  openModal(content) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.resetFormData();
    }, (reason) => {
      this.closeResult = `Dismissed `;
      this.resetFormData();
    });
  }

  resetFormData(){
    this.updateProd.reset();
  }

  addFeature(){
    var feature= this.updateProd.controls['feature'].value;
    if(feature)
        this.features.push(feature);
    this.updateProd.controls['feature'].setValue("");
  }
  removeFeature(i){
    this.features.splice(i,1);
  }

  calcDiscount(){
    var calc= 100-(this.updateProd.controls.currentPrice.value/this.updateProd.controls.mrp.value)*100;
    if(calc>=0){
      this.discount= calc-(calc%1);
    }else{
      this.discount= null;
    }
  }

  updateProduct(){
    var sendData= {
      _id: this.product._id,
      data: this.getUpdateFormValue(),
      token: this.tokenService.getToken()
    }
    console.log(sendData)
    this.productService.updateProduct(sendData)
          .subscribe((data)=>{
            this.popupData= {
              "data" : data,
              "cancelButton": "Close",
            }
            this.showPopup= true;
            this.resetFormData();
          })
  }

  getUpdateFormValue(){
    var data={
      description: this.updateProd.controls['description'].value,
      features: this.features,
      name: this.updateProd.controls['name'].value,
      currentPrice: this.updateProd.controls['currentPrice'].value,
      priceNormal: this.updateProd.controls['mrp'].value,
    }
    return data;
  }

}
