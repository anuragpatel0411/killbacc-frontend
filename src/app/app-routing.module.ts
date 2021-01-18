import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { Error404Component } from './core/error404/error404.component';
import { ProductNotFoundComponent } from './core/error404/product-not-found/product-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { UserMessageComponent } from './admin/user-message/user-message.component';
import { BannerComponent } from './admin/banner/banner.component';
import { PromosComponent } from './admin/promos/promos.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'admin/login-admin', component: LoginAdminComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    children:[
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'promos', component: PromosComponent },
      { path: 'banner', component: BannerComponent },
      { path: 'user-messages', component: UserMessageComponent },
    ]
  },
  { path: 'product-not-found', component: ProductNotFoundComponent},
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
