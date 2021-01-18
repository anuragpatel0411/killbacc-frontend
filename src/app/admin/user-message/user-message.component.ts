import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Popup } from 'src/app/classes/popup.model';
import { AdminService } from 'src/app/services/admin.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private adminService: AdminService,
    private router: Router
  ) { }

  messages: any= [];
  pageNo: any= 1;

  replyForm: FormGroup;

  popupData: Popup;
  showPopup= false;

  ngOnInit(): void {
    // check admin login
    if(localStorage.getItem("adminLoginData")!=this.adminService.getAdminToken()){
      localStorage.setItem("adminLoginData", " ")
      this.router.navigate(['home']);
    }

    this.getUserMessage()
    this.replyForm = this.formBuilder.group({
      reply: [null, Validators.required],
      dateTime: [null],
    });
  }

  // convenience getter for easy access to form fields
  get f(){ 
    return this.replyForm.controls; 
  }

  reply(message){
    var sendData= {
      message: message,
      data: this.replyForm.value,
      token: this.tokenService.getToken()
    }
    this.userService.reply(sendData)
          .subscribe((data)=>{
            this.popupData= {
              "data" : data,
              "cancelButton": "Close",
            }
            this.showPopup= true;
            this.replyForm.reset();
          })
  }

  popupResponse(response){
    this.showPopup=false;
    location.reload();
  }

  getUserMessage(){
    this.userService.getAllMessage(this.pageNo)
      .subscribe((data)=>{
        if(!data.length){
          this.pageNo=false;
        }
        data.forEach(element => {
          element.collapsed= true;
          this.messages.push(element);
        });
      })
  }

  Dates(param?:Date){
    if(param)
      return (new Date(param))
    else 
      return (new Date)
  }

  loadMore(){
    this.pageNo++;
    this.getUserMessage()
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
    this.replyForm.reset();
  }

}
