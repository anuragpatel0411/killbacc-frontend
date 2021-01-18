import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { TokenService } from 'src/app/services/token.service';
import { AdminService } from 'src/app/services/admin.service';
import { Popup } from 'src/app/classes/popup.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private categoryService: CategoryService, 
    private tokenService: TokenService, 
    private modalService: NgbModal, 
    private adminService: AdminService,
    private router: Router
    ) { }

  category: any;
  subCategories: Array<string>=[];
  
  categoryForm: FormGroup;
  categories: Object;
  addCatLoading: boolean;

  popupData: Popup;
  showPopup= false;
  categoryDeleteId: string= "";

  ngOnInit(): void {
    // check admin login
    if(localStorage.getItem("adminLoginData")!=this.adminService.getAdminToken()){
      localStorage.setItem("adminLoginData", " ")
      this.router.navigate(['home']);
    }

    this.getCategories();

    // new category add form
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
      subCategory: ['']
    });
  }

  getCategories(){
    this.categoryService.getCategories()
    .subscribe((categories)=>{
      this.categories= categories;
    })
  }

  // convenience getter for easy access to form fields
  get f(){ 
    return this.categoryForm.controls; 
  }

  addSubCategory(){
    var feature= this.categoryForm.controls['subCategory'].value;
    if(feature)
        this.subCategories.push(feature);
    this.categoryForm.controls['subCategory'].setValue("");
  }
  removeSubCategory(i){
    this.subCategories.splice(i,1);
  }


  addCategory(){
    this.addCatLoading= true;
    this.category={
      category: JSON.parse(JSON.stringify(this.categoryForm.controls['category'].value).toLowerCase()),
      subCategory: this.subCategories
    };
    this.categoryForm.controls['category'].setValue("");
    console.log(this.category)
    var sendData= {
      data: this.category,
      token: this.tokenService.getToken()
    }
    this.categoryService.addCategory(sendData)
          .subscribe((data)=>{
            this.addCatLoading= false;

            this.popupData= {
              "data" : data,
              "cancelButton": "Close",
            }
            this.showPopup= true;
          })
  };

  // delete Category
  deleteCategory(category:any){
    this.categoryDeleteId= category._id;
    this.categoryService.getProductNameDeleteCategory(category.category)
      .subscribe((data)=>{
        this.popupData= {
          "data" : "Are you sure want to delete "+ category.category +".",
          "dataArray": data,
          "cancelButton": "Cancel",
          "confirmButton": "Confirm",
        }
        this.showPopup= true;
      })

  }
  deleteCategoryFromDB(){
    this.categoryService.deleteCategory(this.categoryDeleteId)
      .subscribe((data)=>{
        if(data){
          this.popupData= {
            "data" : "Category deleted successfully.",
            "cancelButton": "Close",
          }
          this.categoryDeleteId= "";
          this.showPopup= true;
        }
      })
  }

  popupResponse(response){
    if(response){
      this.deleteCategoryFromDB();
    }else{
      if(this.categoryDeleteId=="")
      location.reload();
    }
    console.log(this.popupData)
    this.popupData= null;
    this.showPopup=false;
  }

  // add category modal functions
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
    this.subCategories= [];
    this.categoryForm.reset();
  }


}
