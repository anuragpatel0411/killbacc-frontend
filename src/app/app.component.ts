import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'KillBacc';

  constructor(private router: Router){}

  ngOnInit(){
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        console.log(this.router.url.slice(0,5))

        if(this.router.url.slice(0,5)!='/home')
            window.scrollTo(0, 0)
      });
  }

}
