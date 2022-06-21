import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';


import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { FilterComponent } from './filter/filter.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';



@NgModule({
  declarations: [
    AppComponent,    
    NavbarComponent, ProductsComponent, FilterComponent, ProductDetailsComponent, CartModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
