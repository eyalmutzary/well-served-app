import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { TableService } from 'src/app/shared/table.service';
import { Product } from '../../shared/product';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css', '../modals.style.css']
})
export class TableDetailsComponent implements OnInit {

  faStarOfLife = faStarOfLife;
  @Output("close") close = new EventEmitter<void>();
  error: string;
  totalProducts: [];

  
  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.fetchTableOrders();
  }

  onClose(){
    this.close.emit();
  }

  fetchTableOrders(){
    this.totalProducts = [];
    this.tableService.fetchTableOrders().subscribe(resData => {
        resData.orders.forEach(order => {
          order.productList.forEach(product => {
            this.totalProducts.push(product);
          })
        });
    },
    errorMessage => {
      console.log(errorMessage);
      this.error = "Table didn't open. Ask the waiter to open the table."
    });
  }
}