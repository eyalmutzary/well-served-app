import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Order } from './order';
import { Product } from './product';
import { MenuService } from './menu.service';
import { TableService } from './table.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentOrder: Order;
  productCounter: number;
  productAdded: Subscription;
  orderChanged = new EventEmitter<Order>();

  constructor(private menuService: MenuService, private tableService: TableService, private http: HttpClient, 
    private router: Router) { }

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

  sendOrder(order:Order){
    this.tableService.getTableDetails().subscribe(res => {
      this.http
      .post(
        'http://localhost:3000/orders',
        {
          productList: order.productsList,
          waiter:"5e75f27dbf005246b0fd2ce3", // Change later
          table: res.details._id
        }
      ).pipe(
          catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return throwError(errorMessage);
            }
            return throwError(errorMessage);
          })
        ).subscribe(resData => {console.log("Order added")});
    })
    this.router.navigate(['/diner']);

  }

  getOrder(){
    return this.currentOrder;
  }

  resetOrder(){
    this.currentOrder = undefined;
    this.productCounter = 0;
    this.productAdded.unsubscribe();
  }

  addProduct(product: Product){
      let orderDetails = {position: this.productCounter, title: product.title, price: product.price, note: ''}
      this.productCounter = this.productCounter + 1;
      if(this.currentOrder.productsList == undefined){
        this.currentOrder.productsList = [orderDetails]
      }
      else{
        orderDetails.position = this.productCounter;
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
  }

}
