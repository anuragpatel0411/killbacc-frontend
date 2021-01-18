import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Popup } from './../../classes/popup.model';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent implements OnInit {

  @Input() data: Popup;
  @Output() response = new EventEmitter();

  public seeMore: boolean= false;

  constructor() { }

  ngOnInit(): void {
  }
  buttonResponse(resp){
    this.response.emit(resp);
  }

  // // on conponent from where you want to use
  // popupData: Popup={
  //  all data you want to send
  // }
  // showPopup= false;
  // popupResponse(response){
  //   if(response){
  //     console.log("function want to use on success")
  //   }else{
  //     functions want to do on close
  //   }
  //   this.showPopup=false;
  // }

  // <div (click)="showPopup=true">  click</div>

  // <app-popup-dialog [data]="popupData" *ngIf="showPopup" (response)="popupResponse($event)"></app-popup-dialog>
  
}