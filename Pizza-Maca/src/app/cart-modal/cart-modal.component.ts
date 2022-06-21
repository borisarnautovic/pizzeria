import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pizza } from '../products/product';
import { ProductsComponent } from '../products/products.component';
import { Order, PizzaOrder, ProductsService } from '../products/products.service';


export interface DialogData{
  products: Pizza[];
  totalPrice : number;  
}


@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {  

  inputAdress : string = '';
  inputApp : string = '';
  inputTel : string = '';
  order: any;  
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private productsService: ProductsService) {}

  // Kad pokusam da ucitam u konstruktor private productsComponent : ProductComponent - dolazi do konfilkta sa modalnim dijalogom koji se ne otvara.

  ngOnInit(): void {    
    
  }

  onChangeInputAdress(event: any){
    this.inputAdress = event.target.value;
    console.log("Input radi", this.inputAdress)
  }
  onChangeInputApp(event: any){
    this.inputApp = event.target.value;
    console.log("Input radi", this.inputApp)
  }
  onChangeInputTel(event: any){
    this.inputTel = event.target.value;
    console.log("Input radi", this.inputTel)
  }



  onClickOrder(){
    if(this.inputAdress === '' || this.inputApp==='' || this.inputTel==='' ){
      alert("Sva polja moraju biti popunjena");
    }else {
      const pizzas:PizzaOrder[] = this.data.products.map(product => ({name: product.name, price: product.price}));

      const order : Order = {
        adress:this.inputAdress, 
        appartment:this.inputApp, 
        telephone:this.inputTel, 
        totalPrice:this.data.totalPrice,
        pizzas
      };

      this.productsService.createOrder(order).subscribe(order => this.order.push(order));
      this.productsService.productsInCart.length = 0;
      
      //Za praznjenje korpe nakon poslate porudzbine ideja mi je bila da postavim productComponent.productsInCart.length na 0, ali dolazi do nekog konflikta pri ucitavanju productComponent-e u konstruktoru
    }

  }

  

}
