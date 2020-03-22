import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { AppRoutingModule } from './app-routing.module';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { TableDetailsComponent } from './modals/table-details/table-details.component';
import { PlaceholderDirective } from './modals/placeholder.directive';
import { AddNoteComponent } from './modals/add-note/add-note.component';
import { TableNumComponent } from './modals/table-num/table-num.component';

@NgModule({
  declarations: [
    AppComponent,
    DinerComponent,
    MenuComponent,
    MenuCategoriesComponent,
    MenuMealsListComponent,
    MenuMealDetailsComponent,
    DinerOrderPageComponent,
    WaiterComponent,
    ControlPanelComponent,
    OrdersListComponent,
    WaiterOrderPageComponent,
    TablesListComponent,
    ConfirmComponent,
    TableDetailsComponent,
    PlaceholderDirective,
    AddNoteComponent,
    TableNumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmComponent,
    MenuMealDetailsComponent,
    TableDetailsComponent,
    AddNoteComponent,
    TableNumComponent
  ]
})
export class AppModule { }
