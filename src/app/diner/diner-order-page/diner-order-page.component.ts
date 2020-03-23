import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';

import { PlaceholderDirective } from '../../modals/placeholder.directive';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';
import { AddNoteComponent } from '../../modals/add-note/add-note.component';
import { Subscription } from 'rxjs';

import { Order } from '../../shared/order';
import { Product } from '../../shared/product';
import { MenuService } from '../../shared/menu.service';
import { OrderService } from '../../shared/order.service';


import { faAngleDoubleRight, faTimes, faEdit, faStarOfLife } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-diner-order-page',
  templateUrl: './diner-order-page.component.html',
  styleUrls: ['./diner-order-page.component.css']
})
export class DinerOrderPageComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faAngleDoubleRight =faAngleDoubleRight;
  faEdit = faEdit;
  faStarOfLife = faStarOfLife;

  currentOrder: Order;
  orderChanged: Subscription;
  
  isEmpty: boolean = true;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  private confirmSub: Subscription;


  constructor(private componentFactoryResolver: ComponentFactoryResolver, private orderService: OrderService) { 
  }

  ngOnInit() {
    this.orderService.newOrder();
    this.isEmpty = true;
    this.orderChanged = this.orderService.orderChanged.subscribe(() => {
      this.currentOrder = this.orderService.getOrder(); 
      if(this.currentOrder.productsList.length >= 1){
        this.isEmpty = false;
      }
    })
  }

  ngOnDestroy(){
    this.orderChanged.unsubscribe();
    this.orderService.resetOrder();
  }

  showConfirmAlert(){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    this.confirmSub = componentRef.instance.confirm.subscribe(() => {
      this.orderService.sendOrder(this.currentOrder);
      this.confirmSub.unsubscribe();
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.confirmSub.unsubscribe();
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  addNoteAlert(currentPosition: number, currentNote: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AddNoteComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.noteText = currentNote;
    componentRef.instance.currentProductPosition = currentPosition;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

  }

  onRemoveProduct(position: number){
    this.orderService.removeProduct(position);
    if(this.currentOrder.productsList.length < 1){
      this.isEmpty = true;
    }
  }

}
