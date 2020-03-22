import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlaceholderDirective } from '../modals/placeholder.directive';
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import { TableDetailsComponent } from '../modals/table-details/table-details.component';
import { TableService } from '../shared/table.service'

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { TableNumComponent } from '../modals/table-num/table-num.component';



@Component({
  selector: 'app-diner',
  templateUrl: './diner.component.html',
  styleUrls: ['./diner.component.css']
})
export class DinerComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  tableNumSub: Subscription;
  faEdit = faEdit;
  tableNum: string;

  constructor(private tableService: TableService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.tableNum = this.tableService.tableNum;
    this.tableNumSub = this.tableService.tableNumChanged.subscribe((newNum) => {this.tableNum = newNum})
  }

  // Maybe async problem, should check eventemitter or await

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

  showTableDetails(){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(TableDetailsComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  showEditTableNum(){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(TableNumComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
