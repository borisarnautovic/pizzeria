import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Pizza} from '../products/product';
import { Subscription } from 'rxjs';
import {ProductsService} from '../products/products.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  imageWidth: number =280;
  imageHeight: number =280;

  sub!: Subscription;
  
  errorMessage: string =' ';
  products : Pizza[] =[];   
  product: Pizza | undefined;

  constructor(private route: ActivatedRoute, private producstService: ProductsService){  }

  ngOnInit(): void {

    const routerParams = this.route.snapshot.paramMap;
    const productNameFromRoute = String(routerParams.get('productName')); 
    

    this.sub = this.producstService.getProducts().subscribe({
      next: (products: any) => {
         this.products = products.results;            

         this.product = this.products.find(product =>product.name === productNameFromRoute); 
      },
      
      error: (err: string) => this.errorMessage = err
    });     

     // this.products = products.find((product: { _id: string; }) => product._id === productIdFromRoute);   
 
  

  }  


}
