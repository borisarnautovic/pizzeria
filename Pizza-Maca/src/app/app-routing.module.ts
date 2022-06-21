import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path:'', component: ProductsComponent},
    {path:'product/:productName', component: ProductDetailsComponent },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
