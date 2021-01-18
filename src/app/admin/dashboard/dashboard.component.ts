import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public productCount: number=0;
  public categoryCount: number= 0;
  public totalUserCount: number= 0;
  public monthlyUserCount: number= 0;

  constructor(
    private adminService: AdminService,
    private router: Router
    ) { }

  ngOnInit(): void {

    // check admin login
    if(localStorage.getItem("adminLoginData")!=this.adminService.getAdminToken()){
      localStorage.setItem("adminLoginData", " ")
      this.router.navigate(['home']);
    }

    this.adminService.getProductCount()
      .subscribe((count)=>{
        this.productCount= count;
      })

    this.adminService.getCategorytCount()
      .subscribe((count)=>{
        this.categoryCount= count;
      })

    this.adminService.getTotalUserCount()
      .subscribe((count)=>{
        this.totalUserCount= count;
      })
    
      this.adminService.getMonthlyUserCount()
        .subscribe((count)=>{
          this.monthlyUserCount= count;
        })
  }


}
