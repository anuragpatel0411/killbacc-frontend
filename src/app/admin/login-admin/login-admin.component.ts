import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private adminService: AdminService, private tokenService: TokenService, private router: Router) {}

  ngOnInit() {

    // check admin  already login
    if(localStorage.getItem("adminLoginData")==this.adminService.getAdminToken()){
      this.router.navigate(['admin']);
    }


    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }
aa:string=localStorage.getItem('adminLoginData');

  public onLogin() {
    var sendData= {
      data: this.loginForm.value,
      token: this.tokenService.getToken()
    }
    localStorage.setItem("adminLoginData", "data")

    this.adminService.adminLogin(sendData)
      .subscribe((data)=>{
        if(data){
          if(data.slice(0,3)=="adm")
            localStorage.setItem("adminLoginData", data)
          else
            alert(data)
            location.reload()
        }
      })
  }

} 