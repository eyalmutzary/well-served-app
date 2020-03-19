import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { Order } from './order';
import { Product } from './product';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentOrder: Order;
  productAdded: Subscription;
  orderChanged = new EventEmitter<Order>();


  constructor(private menuService: MenuService) { }

  newOrder(){
    this.currentOrder = {
      orderSum: 0,
      orderStatus: 0
    }
    this.productAdded = this.menuService.addingProduct.subscribe((product: Product) => {
      this.addProduct(product)
    })
  }

  getOrder(){
    return this.currentOrder;
  }

  addProduct(product: Product){
      let orderDetails = {position: 0, title: product.title, price: product.price, note: ''}
      if(this.currentOrder.productsList == undefined){
        this.currentOrder.productsList = [orderDetails]
      }
      else{
        orderDetails.position = this.currentOrder.productsList.length;
        this.currentOrder.productsList.push(orderDetails); // add the product to the list
      }
      this.currentOrder.orderSum = this.currentOrder.orderSum + product.price; // calc the sum of the order.
      this.orderChanged.emit();
  }

}
