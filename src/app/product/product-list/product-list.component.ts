import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/classes/product.model';
import { PagerService } from 'src/app/services/pager.service';
import { ProductService } from 'src/app/services/product.service';
import { SortPipe } from 'src/app/services/sort.pipe';
import { UiService } from 'src/app/services/ui.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  unsubscribe$= new Subject;
  productsLoading: boolean;
  products: Product[];
  productsPaged: Product[];
  currentPagingPage: number;
  pager: any= {};
  admin: boolean= false;
  

  constructor(
    private productService: ProductService,
    private pagerService: PagerService,
    private sortPipe: SortPipe,
    public uiService: UiService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {

    // check admin login
    if(localStorage.getItem("adminLoginData")==this.adminService.getAdminToken()){
      this.admin=true
    }else{
      localStorage.setItem("adminLoginData", " ")
    }

    this.uiService.currentPagingPage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((page) => {
        this.currentPagingPage = page;
      });

    this.getProducts();
  }

  getProducts(){
    this.productsLoading= true;
    this.productService.getProducts()
      .subscribe((products)=>{
        this.products= products;
        this.setPage(this.currentPagingPage);
        this.productsLoading = false;
      })
  }

  onDisplayModeChange(mode: string, e: Event) {
    this.uiService.displayMode$.next(mode);
    e.preventDefault();
  }
  
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.products.length, page, 12);
    this.productsPaged = this.products.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    console.log(this.productsPaged)
    this.uiService.currentPagingPage$.next(page);
  }

  onSort(sortBy: string) {
    this.sortPipe.transform(
      this.products,
      sortBy.replace(':reverse', ''),
      sortBy.endsWith(':reverse')
    );
    this.uiService.sorting$.next(sortBy);
    this.setPage(1);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
