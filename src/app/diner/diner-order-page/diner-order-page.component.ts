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
  private newProduct: Subscription;



  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private menuService: MenuService, private orderService: OrderService) { 
    
  }

  ngOnInit() {
    this.orderService.newOrder();
    console.log(this.currentOrder)
    this.newProduct = this.orderService.orderChanged.subscribe(() => {this.currentOrder = this.orderService.getOrder();})
  }

  ngOnDestroy(){
    this.newProduct.unsubscribe();
  }

  showConfirmAlert(){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  addNoteAlert(){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AddNoteComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
