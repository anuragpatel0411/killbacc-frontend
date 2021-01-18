import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product.model';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss']
})
export class ProductWidgetComponent implements OnInit {

  @Input() public products: Product[];
  @Input() public widgetTitle: string;

  url= new Config();

  constructor() { }

  ngOnInit(): void {
  }

}
