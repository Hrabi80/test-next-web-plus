import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoriesComponent } from './category/list-categories/list-categories.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';

const routes: Routes = [

  {path:"", component:LoginComponent},
  {path:'dashboard', component:ListCategoriesComponent,  canActivate : [AuthGuard]},
  {path:'add_category', component:AddCategoryComponent, canActivate : [AuthGuard]},
  {path:'update-category/:id', component:UpdateCategoryComponent, canActivate : [AuthGuard]},
  {path:'list-products/:id', component:ListProductsComponent,  canActivate : [AuthGuard]},
  {path:'add_product', component:AddProductComponent, canActivate : [AuthGuard]},
  {path:'update-product/:id', component:UpdateProductComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
