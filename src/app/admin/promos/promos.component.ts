import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Popup } from 'src/app/classes/popup.model';
import { AdminService } from 'src/app/services/admin.service';
import { PromoService } from 'src/app/services/promo.service';
import { TokenService } from 'src/app/services/token.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent implements OnInit {

  constructor(
    private promoService: PromoService,
    private fileService: FileService, 
    private formBuilder: FormBuilder, 
    private tokenService: TokenService, 
    private modalService: NgbModal, 
    private adminService: AdminService,
    private router: Router
    ) { }

  public promos;

  promoForm: FormGroup;
  
  promoDeleteId: string= "";
  promoImageName: string= "";

  popupData: Popup;
  showPopup= false;

  fileErrorSize: boolean= false;
  addPromoLoading: boolean;

  ngOnInit(): void {
    // check admin login
    if(localStorage.getItem("adminLoginData")!=this.adminService.getAdminToken()){
      localStorage.setItem("adminLoginData", " ")
      this.router.navigate(['home']);
    }
  
    this.getPromoList();
    
    // new category add form
    this.promoForm = this.formBuilder.group({
      preHeading: [null],
      heading: [null, Validators.required],
      afterHeading: [null],
      buttonText: [null],
      link: [null],
      banner: [null, Validators.required]
    });
  }

  getPromoList(){
    this.promoService.getAllPromos()
      .subscribe((promos)=>{
        this.promos= promos;
      })
  }

  // convenience getter for easy access to form fields
  get f(){ 
    return this.promoForm.controls; 
  }

  // upload Image
  imageName: string= "";  
  onFileChange(event)  {
    this.fileErrorSize= false;
    console.log(event)
    if(event.target.files[0].size>524288){      // 512kb
      this.fileErrorSize= true;
    }else{
      this.imageName= event.target.files[0];
    }
  }

  addPromo(){
    this.addPromoLoading= true;
    // image upload
    const formData =  new  FormData();
    formData.append("promoBanner",  this.imageName);
 
    console.log("1")
    this.fileService.uploadPromoImage(formData)
    .subscribe((data)=>{
    console.log("2")

      var promo={
            preHeading: this.promoForm.controls['preHeading'].value,
            heading: this.promoForm.controls['heading'].value,
            afterHeading: this.promoForm.controls['afterHeading'].value,
            buttonText: this.promoForm.controls['buttonText'].value,
            link: this.promoForm.controls['link'].value,
            image: data
          };
          this.promoForm.reset();
          var sendData= {
            data: promo,
            token: this.tokenService.getToken()
          }

          this.promoService.addPromo(sendData)
            .subscribe((data)=>{
              this.addPromoLoading= false;
              this.popupData= {
                "data" : data,
                "cancelButton": "Close",
              }
              this.showPopup= true;
            })
    })

  }

  // add promo modal functions
  closeResult: string;

  openModal(content) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
      this.resetFormData();
    });
  }

  resetFormData(){
    this.promoForm.reset();
  }

  
  popupResponse(response){
    if(response){
      this.deleteFile();
    }else{
      if(this.promoDeleteId=="")
        location.reload();
    }
    console.log(this.popupData)
    this.popupData= null;
    this.showPopup=false;
  }

  activatePromo(_id){
    var sendData= {
      data: {'_id': _id},
      token: this.tokenService.getToken()
    }
    this.promoService.activatePromo(sendData)
            .subscribe((data)=>{
              this.popupData= {
                "data" : data,
                "cancelButton": "Close",
              }
              this.showPopup= true;
            })
  }
  
  deletePromo(promo){
    console.log(promo)

    this.promoDeleteId= promo._id;
    this.promoImageName= promo.image;
    this.popupData= {
      "data" : "Are you sure want to delete this promo.",
      "cancelButton": "Cancel",
      "confirmButton": "Confirm",
    }
    this.showPopup= true;
  }


  deleteFile(){
    var fileDeleteData={
      "type": "promo",
      "data": {'fileName': this.promoImageName}
    }
    this.fileService.deleteFiles(fileDeleteData)
      .subscribe((data)=>{
        console.log(data)
        if(data=='deleted'){
          this.deletePromoData();
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

  deletePromoData(){
    this.promoService.deletePromo(this.promoDeleteId)
    .subscribe((data)=>{
      this.popupData={
        "data" : "Promo Deleted",
        "cancelButton": "Close",
      }
      this.showPopup=true;
      this.promoDeleteId="";
    })
  }

}
