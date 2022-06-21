import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Pizza} from './product';
import { catchError, Observable, throwError} from 'rxjs';
import {tap, map} from 'rxjs/operators';

export interface Order {
  adress : string;
  appartment : string;
  telephone : string;  
  totalPrice : number;
  pizzas : PizzaOrder[];  
}

export interface PizzaOrder {
  name : string;
  price : number; 
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url ='http://localhost:3000/api/pizzas';
  private orderUrl ='http://localhost:3000/api/orders';

  constructor(private http:HttpClient) { }

  productsInCart :Pizza[] = [];

  getProducts(): Observable<Pizza[]>{
    return this.http.get<Pizza[]>(this.url).pipe(map(data =>  data), //console.log('All ', JSON.stringify(data))
    catchError(this.handleError)
    ); 
  }


  createOrder(order : Order):Observable<Order> {
    console.log("order", order);
    return this.http.post<Order>(this.orderUrl, order).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {      
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}