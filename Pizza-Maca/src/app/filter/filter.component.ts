import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products/products.service'
import {ProductsComponent} from '../products/products.component'


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  constructor() { }

  ngOnInit(): void {    
  }

  onChangeDisc(event: any){
    console.log("radi checkbox");        
    if(this.checked){
      console.log("vraca true");
    }
  }

}
