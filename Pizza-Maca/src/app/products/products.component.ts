import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import {Pizza} from './product';
import {ProductsService} from './products.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  errorMessage: string =' ';
  imageWidth: number =90;
  imageHeight: number =90;  
  sub!: Subscription;

  products : Pizza[] =[]; 
  productsToShow : Pizza[] = [];
  isCheckedDis = false;
  isCheckedVege = false;
  
  totalPrice = 0;

  constructor(public producstService: ProductsService, public dialog: MatDialog){  }
 
  getProductsToShow(products: Pizza[], isDiscount: boolean, isVege: boolean):Pizza[] {
    let filteredProducts = products;

    if(isDiscount){
      filteredProducts = products.filter(product => product.discount);
    }
    
    if(isVege){
      filteredProducts = products.filter(product => product.vegetarian);
    }

    if(isDiscount && isVege){
      filteredProducts = products.filter(product => product.discount && product.vegetarian);
    }

    return filteredProducts;
  }
  
  onChangeDisc(event: any){       
    this.productsToShow = this.getProductsToShow(this.products, this.isCheckedDis, this.isCheckedVege);

    console.log("Checkbox ima vrednost: " + this.isCheckedDis); 
    if(this.isCheckedDis == true){
      console.log(this.products);      
    }    
  }

  ngOnInit(): void {
    var cartText = document.getElementById("cartText");    

    /*
    ODGOVOR OD SERVERA

    description: "Leaf rake with 48-inch wooden handle."
    imageUrl: "assets/images/leaf_rake.png"
    price: 19.95
    productCode: "GDN-0011"
    productId: 1
    productName: "Leaf Rake"
    releaseDate: "March 19, 2021"
    starRating: 3.2

    ----------------------------------------------
    1 - Pošto server vraća objekat sa poljem results u kom se nalazi niz objekata Pica, [object Object] greška se javlja jer ne nemoguće sa *ngFor petljom prolaziti kroz objeka
        To bi bilo kao da sa for petljom u javascript-u prolazimo kroz jedan objekat - neće raditi. 

        ŠTA SERVER VRAĆA:
        { (1.1 - ovde počinje taj objekat)
          "results": [
            {
              "_id": 1,
              "name": "Hawaiian Pizza",
              "description": "his crowd-pleasing recipe starts with my fluffy homemade pizza",
              "grade": "3.2",
              "price":9.99,
              "discount":true,
              "picture":"hawaiian-pizza.jpg"
            }, ...
          ]
        }

    */
    
    this.sub = this.producstService.getProducts().subscribe({
      next: (products: any) => { //(1.1 - products: any)
        // U skladu sa gore navedenim objašnjenjem (1) potrebno je nizu Pizza dodeliti niz Pizza koji smo deobili od servera. products (1.1) je kapitalni objekat 
        // U delu šta server vraća naglašeno šta je 1.1, ovde nam treba niz koji je smešten u property results objekta 1.1
        // let helper_array: any[] = products.results;
        // helper_array.forEach((p: any) => {
        //   this.products.push({
        //     "_id": p._id,
        //     "name": p.name,
        //     "description": p.description,
        //     "grade": p.grade,
        //     "price": p.price,
        //     "discount": p.discount,
        //     "picture": p.picture,
        //     "vegetarian": p.vegetarian
        //   });
        // });

        this.products = products.results;  
        this.productsToShow = this.products;      
        
        //console.log(this.products)
      },
      error: err => this.errorMessage = err
    });  
    
  

  } 

 
  AddtoCart(product:Pizza){
    this.producstService.productsInCart.push(product);
    console.log("cart", this.producstService.productsInCart);
    this.totalPrice += product.price;
  }

  openDialog() {
    this.dialog.open(CartModalComponent, {
      data: {
        totalPrice : this.totalPrice,
        products : this.producstService.productsInCart
      }
    });
  }
 
   
}


