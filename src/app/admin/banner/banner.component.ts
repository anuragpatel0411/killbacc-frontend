import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Popup } from 'src/app/classes/popup.model';
import { Config } from 'src/app/config';
import { AdminService } from 'src/app/services/admin.service';
import { BannerService } from 'src/app/services/banner.service';
import { FileService } from 'src/app/services/file.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(
    private bannerService: BannerService,
    private fileService: FileService, 
    private formBuilder: FormBuilder, 
    private tokenService: TokenService, 
    private modalService: NgbModal, 
    private adminService: AdminService,
    private router: Router
    ) { }

  public banners;

  public url= new Config;

  bannerForm: FormGroup;
  
  bannerDeleteId: string= "";
  bannerImageName: string= "";
  bannerCount: number= 0;

  popupData: Popup;
  showPopup= false;

  fileErrorSize: boolean= false;
  addBannerLoading: boolean;

  ngOnInit(): void {
    // check admin login
    if(localStorage.getItem("adminLoginData")!=this.adminService.getAdminToken()){
      localStorage.setItem("adminLoginData", " ")
      this.router.navigate(['home']);
    }
  
    this.getBannerList();
    
    // new category add form
    this.bannerForm = this.formBuilder.group({
      banner: [null, Validators.required]
    });
  }

  getBannerList(){
    this.bannerService.getAllBanner()
      .subscribe((banners)=>{
        this.banners= banners;
        this.bannerCount= banners.length
      })
    
  }

  // convenience getter for easy access to form fields
  get f(){ 
    return this.bannerForm.controls; 
  }

  // upload Image
  imageName: string= "";  
  onFileChange(event)  {
    this.fileErrorSize= false;
    console.log(event)
    if(event.target.files[0].size>1048576){
      this.fileErrorSize= true;
      this.f.banner.reset();
    }else{
      this.imageName= event.target.files[0];
    }
  }

  addBanner(){
    this.addBannerLoading= true;
    // image upload
    const formData =  new  FormData();
    formData.append("banner",  this.imageName);
 
    console.log("1")
    this.fileService.uploadBannerImage(formData)
    .subscribe((data)=>{

      var banner={
            image: data
          };
          this.bannerForm.reset();
          var sendData= {
            data: banner,
            token: this.tokenService.getToken()
          }

          this.bannerService.addBanner(sendData)
            .subscribe((data)=>{
              this.addBannerLoading= false;

              this.popupData= {
                "data" : data,
                "cancelButton": "Close",
              }
              this.showPopup= true;
            })
    })

  }

  // add banner modal functions
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
    this.bannerForm.reset();
  }

  
  popupResponse(response){
    if(response){
      this.deleteFile();
    }else{
      if(this.bannerDeleteId=="")
        location.reload();
    }
    console.log(this.popupData)
    this.popupData= null;
    this.showPopup=false;
  }

  activateBanner(_id){
    var sendData= {
      data: {'_id': _id},
      token: this.tokenService.getToken()
    }
    this.bannerService.activateBanner(sendData)
            .subscribe((data)=>{
              this.popupData= {
                "data" : data,
                "cancelButton": "Close",
              }
              this.showPopup= true;
            })
  }
  
  deleteBanner(banner){
    this.bannerDeleteId= banner._id;
    this.bannerImageName= banner.image;
    this.popupData= {
      "data" : "Are you sure want to delete this banner.",
      "cancelButton": "Cancel",
      "confirmButton": "Confirm",
    }
    this.showPopup= true;
  }


  deleteFile(){
    var fileDeleteData={
      "type": "banner",
      "data": {'fileName': this.bannerImageName}
    }
    this.fileService.deleteFiles(fileDeleteData)
      .subscribe((data)=>{
        console.log(data)
        if(data=='deleted'){
          this.deleteBannerData();
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

  deleteBannerData(){
    this.bannerService.deleteBanner(this.bannerDeleteId)
    .subscribe((data)=>{
      this.popupData={
        "data" : "Banner Deleted",
        "cancelButton": "Close",
      }
      this.showPopup=true;
      this.bannerDeleteId="";
    })
  }
}
