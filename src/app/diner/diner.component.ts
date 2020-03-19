import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';

import { PlaceholderDirective } from '../modals/placeholder.directive';
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import { TableDetailsComponent } from '../modals/table-details/table-details.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-diner',
  templateUrl: './diner.component.html',
  styleUrls: ['./diner.component.css']
})
export class DinerComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
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
}
