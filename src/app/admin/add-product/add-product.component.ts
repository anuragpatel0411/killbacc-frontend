import { Component, ElementRef, OnChanges, OnInit } from '@angular/core';
import { Config } from 'src/app/config';
import { FormGroup,  FormControl,  Validators, FormBuilder}  from  '@angular/forms';
import { Product, Category } from 'src/app/classes/product.model';
import { ProductService } from 'src/app/services/product.service';
import { FileService } from 'src/app/services/file.service';

import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryService } from 'src/app/services/category.service';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnChanges {

  constructor(
    private router: Router, 
    private productService: ProductService, 
    private fileService: FileService, 
    private categoryService: CategoryService, 
    private formBuilder: FormBuilder, 
    private tokenService: TokenService,
    private adminService: AdminService
    ) { }
  url= new Config();
  public product= new Product();
  public category= new Category();
  features: Array<string>=[];
  imagesURL: string;
  categories: Object;     // get from api for dropdown
  subCategories: any;  // for dropdown (search)

  fileErrorSize: boolean= false;
  fileErrorNumber: boolean= false;
  addProductLoading: boolean;

  // test:any;
  // ngOnInit(): void {
  //   this.registerForm = this.formBuilder.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', Validators.required]
  // }, {
  //     validator: MustMatch('password', 'confirmPassword')
  // });
  
  // this.test = {firstName: 'Hien', lastName : 'Nguyen', email: 'hien@gmail.com'};

  // solution 1
  // this.registerForm.patchValue(this.test);

  // solution 2
  // this.registerForm.controls['firstName'].setValue(this.test.firstName);
  // this.registerForm.controls['lastName'].setValue(this.test.lastName);
  // this.registerForm.controls['email'].setValue(this.test.email);
// }




// ================================================================================================================

  // reactive form functions and declerations
  productForm: FormGroup;

  ngOnInit(): void {

    // check admin login
    if(localStorage.getItem("adminLoginData")!=this.adminService.getAdminToken()){
      localStorage.setItem("adminLoginData", " ")
      this.router.navigate(['home']);
    }

    // fetch categories
    this.categoryService.getCategories()
      .subscribe((categories)=>{
        this.categories= categories;
      }) 


    // form for add product
    this.productForm = this.formBuilder.group({
      category: [null, Validators.required],
      subCategory: [null],
      description: ['', Validators.required],
      feature: [''],
      name: ['', Validators.required],
      seller: ['Shiv Water Corporation, Lakhimpur-Kheri(U.P.)', Validators.required],
      price: ['', [Validators.required, (control: FormControl)=>{
        if(control && control.parent){
          if(control.parent.get('priceNormal').value){
            control.parent.get('priceNormal').updateValueAndValidity();
          }
        }
      }]],
      priceNormal: ['', [Validators.required, (control: FormControl)=>{
        if(control && control.parent){
          if(control.parent.get('price').value>control.value){
            return {pattern: true};
          }
        }
        return null;
      }]],
      reduction: [''],
      quantity: [''],
      product: [null, Validators.required],
      prodImage: [null, Validators.required]
    });
    this.productForm.get('subCategory').disable();

  }

  // convenience getter for easy access to form fields
  get f(){ 
    return this.productForm.controls; 
  }

  // ================================================================================================================

  ngOnChanges() {
    // console.log("hi")
    // this.productForm.get('category').valueChanges
    // .subscribe(selectedCategory => {
    //         this.productForm.get('subCategory').reset();
    //         this.productForm.get('subCategory').enable();
    // });
  }

  changeCategory(e) {
    console.log(e)
    this.productForm.controls['category'].setValue(e);
    this.subCategories= this.setSubCategoryObject(this.productForm.controls['category'].value, this.categories);
    // this.productForm.get('subCategory').reset();
    this.productForm.controls['subCategory'].setValue(null);
    if(!this.subCategories.length || (this.productForm.controls['category'].value=='Other')){
      this.productForm.get('subCategory').disable();
    }
    this.productForm.get('subCategory').enable();
    console.log(this.subCategories)
  }
  changeSubCategory(e) {
    this.productForm.controls['subCategory'].setValue(e.target.value);
  }

  setSubCategoryObject(category, categoryiesObject){
    for (var i=0; i < categoryiesObject.length; i++) {
        if (categoryiesObject[i].category === category) {
            return categoryiesObject[i];
        }
    }
  }

  addFeature(){
    var feature= this.productForm.controls['feature'].value;
    if(feature)
        this.features.push(feature);
    this.productForm.controls['feature'].setValue("");
  }
  removeFeature(i){
    this.features.splice(i,1);
  }
  removeImage(i){
    this.files.splice(i,1);
    this.productForm.controls['prodImage'].setValue(this.files)
  }
  calcReduction(){
    var price= this.productForm.controls['price'].value;
    var priceNormal= this.productForm.controls['priceNormal'].value;
    var reduction= 100-((price/priceNormal)*100);
    reduction-=reduction%1;
    this.productForm.controls['reduction'].setValue(reduction);
  }

  // upload Image
  files: string[] =  [];

  
  onFileChange(event)  {
    this.fileErrorNumber=false;
    this.fileErrorSize= false;
    for (var i =  0; i <  event.target.files.length; i++)  {  
        if(this.files.length>=5){
          this.fileErrorNumber= true;
          break;
        }
        console.log(event.target.files[i])
        if(event.target.files[i].size>204800){    //200kb
          this.fileErrorSize= true;
          console.log("large")
        }else{
          if(event.target.files[i].type.slice(0,5)==='image'){
            this.files.push(event.target.files[i]);
            this.productForm.controls['prodImage'].setValue(this.files)
          }else{
            alert("please upload image (jpg/jpeg/png/gif)")
          }
        }
    }
  }

  addProduct(){
    this.addProductLoading= true;

    // image upload
    const formData =  new  FormData();
    for  (var i =  0; i <  this.files.length; i++)  {  
        formData.append("product",  this.files[i]);
    } 
 
    this.fileService.uploadProductFiles(formData)
    .subscribe((data)=>{
        // this.imagesURL= data;
        this.category.category=this.productForm.controls['category'].value;;
        this.category.subCategory=this.productForm.controls['subCategory'].value;;

        this.product.categories= this.category;
        this.product.date= new Date;
        this.product.description= this.productForm.controls['description'].value;
        this.product.features= this.features;
        this.product.imageIcon= JSON.parse(data);
        this.product.imageURLs= JSON.parse(data);
        this.product.name= this.productForm.controls['name'].value;
        this.product.price= this.productForm.controls['price'].value;
        this.product.priceNormal= this.productForm.controls['priceNormal'].value;
        this.product.quantity= this.productForm.controls['quantity'].value;
        this.product.reduction= this.productForm.controls['reduction'].value;
        this.product.seller= this.productForm.controls['seller'].value;

        console.log(this.product)

        this.product.features= this.features;
        var sendData= {
          data: this.product,
          token: this.tokenService.getToken()
        }
        this.productService.addProduct(sendData)
          .subscribe((data)=>{
            this.addProductLoading= false;
            alert("Product Added")
            location.reload();
          })
    })
    
  }


}
