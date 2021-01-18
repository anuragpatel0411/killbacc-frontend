import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/classes/product.model';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  @Input() public product: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
