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
  productCounter: number;
  productAdded: Subscription;
  orderChanged = new EventEmitter<Order>();


  constructor(private menuService: MenuService) { }

  newOrder(){
    this.productCounter = 0;
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

  resetOrder(){
    this.currentOrder = undefined;
    this.productAdded.unsubscribe();
  }

  addProduct(product: Product){
      let orderDetails = {position: this.productCounter, title: product.title, price: product.price, note: ''}
      this.productCounter = +1;
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

  removeProduct(position: number){
    this.currentOrder.productsList.forEach((product, index) => {
      if(product.position === position) {
        this.currentOrder.orderSum = this.currentOrder.orderSum - this.currentOrder.productsList[index].price;
        this.currentOrder.productsList.splice(index,1);
        this.orderChanged.emit();
      }
    })
  }

  addNote(position: number, text: string){
    this.currentOrder.productsList.forEach((product, index) => {
      if(product.position === position) {
        this.currentOrder.productsList[index].note = text; 
      }
    })
    console.log(this.currentOrder)
  }

}
