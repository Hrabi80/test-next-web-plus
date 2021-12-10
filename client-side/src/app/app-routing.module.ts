import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoriesComponent } from './category/list-categories/list-categories.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [

  {path:"", component:LoginComponent},
  {path:'dashboard', component:ListCategoriesComponent,  canActivate : [AuthGuard]},
  {path:'add_category', component:AddCategoryComponent, canActivate : [AuthGuard]},
  {path:'update-category', component:UpdateCategoryComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
