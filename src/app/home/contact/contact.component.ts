import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Popup } from 'src/app/classes/popup.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private userService: UserService, 
  ) { }

  popupData: Popup;
  showPopup= false;
  
  contactForm: FormGroup;

  ngOnInit(): void {

    //contact form
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      subject: [null, Validators.required],
      message: [null, Validators.required],
      dateTime: [null],
    });
  }

  // convenience getter for easy access to form fields
  get f(){ 
    return this.contactForm.controls; 
  }

  sendMessage(){
    this.contactForm.controls.dateTime.setValue(new Date());

    var sendData= {
      data: this.contactForm.value,
      token: this.tokenService.getToken()
    }
    this.userService.sendMessage(sendData)
          .subscribe((data)=>{
            this.popupData= {
              "data" : data,
              "cancelButton": "Close",
            }
            this.showPopup= true;
            this.contactForm.reset();
          })
  }
  popupResponse(response){
    this.showPopup=false;
  }

}
