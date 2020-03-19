import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuMealsListComponent } from '../../diner/menu/menu-meals-list/menu-meals-list.component';
import { Product } from '../../shared/product';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu-meal-details',
  templateUrl: './menu-meal-details.component.html',
  styleUrls: ['../modals.style.css']
})
export class MenuMealDetailsComponent implements OnInit {

  @Output("confirm") confirm = new EventEmitter<void>();
  @Output("close") close = new EventEmitter<void>();
  @Input("productDetails") productDetails: Product;

  product: Product;
  prodSub: Subscription;

  constructor(private menuMealsListComponent: MenuMealsListComponent) { }

  ngOnInit() {
  }
  
  onConfirm(){
    this.confirm.emit();
  }

  onClose(){
    this.close.emit();
  }
}
