import { Component, OnInit, ComponentFactoryResolver, ViewChild, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { PlaceholderDirective } from '../../../modals/placeholder.directive';
import { MenuMealDetailsComponent } from '../../../modals/menu-meal-details/menu-meal-details.component';
import { Subscription, Subject } from 'rxjs';
import { Product } from '../../../shared/product';
import { MenuService } from '../../../shared/menu.service';
import { faQuestion, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'app-menu-meals-list',
  templateUrl: './menu-meals-list.component.html',
  styleUrls: ['./menu-meals-list.component.css']
})
export class MenuMealsListComponent implements OnInit {
  faQuestion = faQuestion;
  faPlus = faPlus;
  title: string = "Hamburgers"
  productDetails: Product;
  productList: Product[];
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  


  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
    private menuService: MenuService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) 
    { }

  ngOnInit() {
    // this.fetchItems();
    this.route.queryParams.subscribe(queryParams => {
      this.fetchItems(queryParams['category']);
    });
  }

  showDetailsAlert(item: Product){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(MenuMealDetailsComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.productDetails = item;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  fetchItems(category: string = "Hamburger"){
    this.title = category;
    this.menuService.fetchProductByCategory(category).subscribe(resData => {
      this.productList = resData;
    },
    errorMessage => {
      console.log(errorMessage);
    });

  }

  onAddProduct(product: Product){
    this.menuService.addProduct(product);
  }

}
