import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../../shared/product';
import { OrderService } from '../../shared/order.service';


@Component({
  selector: 'app-menu-meal-details',
  templateUrl: './menu-meal-details.component.html',
  styleUrls: ['../modals.style.css']
})
export class MenuMealDetailsComponent implements OnInit {

  @Output("close") close = new EventEmitter<void>();
  @Input("productDetails") productDetails: Product;

  product: Product;
  prodSub: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }
  
  onAddProduct(){
    this.orderService.addProduct(this.productDetails)
    this.close.emit();
  }

  onClose(){
    this.close.emit();
  }
}
