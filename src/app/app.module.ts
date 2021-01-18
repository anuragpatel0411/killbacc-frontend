import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './core/header/topbar/topbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { NavbarComponent } from './core/header/navbar/navbar.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductListItemComponent } from './product/product-list-item/product-list-item.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ApiService } from './services/api.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { PromoService } from './services/promo.service';
import { HttpClientModule } from '@angular/common/http';
import { PagerService } from './services/pager.service';
import { UiService } from './services/ui.service';
import { SortPipe } from './services/sort.pipe';
import { RatingStarComponent } from './core/rating-star/rating-star.component';
import { PriceComponent } from './core/price/price.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { TokenService } from './services/token.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { AdminService } from './services/admin.service';
import { Error404Component } from './core/error404/error404.component';
import { ProductNotFoundComponent } from './core/error404/product-not-found/product-not-found.component';
import { FilterPipe } from './services/filter.pipe';
import { ProductWidgetComponent } from './home/product-widget/product-widget.component';
import { PromoComponent } from './home/promo/promo.component';
import { ContactComponent } from './home/contact/contact.component';
import { FaqComponent } from './home/faq/faq.component';
import { AdminComponent } from './admin/admin.component';
import { PromosComponent } from './admin/promos/promos.component';
import { BannerComponent } from './admin/banner/banner.component';
import { UserMessageComponent } from './admin/user-message/user-message.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PopupDialogComponent } from './core/popup-dialog/popup-dialog.component';
import { FileService } from './services/file.service';
import { BannerService } from './services/banner.service';
import { UserService } from './services/user.service';
import { OurTeamComponent } from './home/our-team/our-team.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopbarComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ProductListComponent,
    ProductListItemComponent,
    ProductDetailsComponent,
    RatingStarComponent,
    PriceComponent,
    AddProductComponent,
    AddCategoryComponent,
    LoginAdminComponent,
    Error404Component,
    ProductNotFoundComponent,
    FilterPipe,
    ProductWidgetComponent,
    PromoComponent,
    ContactComponent,
    FaqComponent,
    AdminComponent,
    PromosComponent,
    BannerComponent,
    UserMessageComponent,
    DashboardComponent,
    PopupDialogComponent,
    OurTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  providers: [
    ApiService,
    ProductService,
    CategoryService,
    PromoService,
    BannerService,
    PagerService,
    UiService,
    SortPipe,
    TokenService,
    AdminService,
    FileService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
