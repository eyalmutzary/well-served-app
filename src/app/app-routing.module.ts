import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DinerComponent } from './diner/diner.component';
import { MenuComponent } from './diner/menu/menu.component';
import { MenuCategoriesComponent } from './diner/menu/menu-categories/menu-categories.component';
import { MenuMealsListComponent } from './diner/menu/menu-meals-list/menu-meals-list.component';
import { MenuMealDetailsComponent } from './modals/menu-meal-details/menu-meal-details.component';
import { DinerOrderPageComponent } from './diner/diner-order-page/diner-order-page.component';
import { WaiterComponent } from './waiter/waiter.component';
import { ControlPanelComponent } from './waiter/control-panel/control-panel.component';
import { OrdersListComponent } from './waiter/orders-list/orders-list.component';
import { WaiterOrderPageComponent } from './waiter/orders-list/waiter-order-page/waiter-order-page.component';
import { TablesListComponent } from './waiter/tables-list/tables-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/diner', pathMatch: 'full' },
  { path: 'diner', component: DinerComponent },
  { path: 'diner/menu', component: MenuComponent },
  { path: 'diner/order', component: DinerOrderPageComponent },
  { path: 'waiter',component: ControlPanelComponent },
  { path: 'waiter/orderslist', component: OrdersListComponent },
  { path: 'waiter/tableslist', component: TablesListComponent },
  { path: 'waiter/orderpage', component: WaiterOrderPageComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
