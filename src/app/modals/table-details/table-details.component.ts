import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css', '../modals.style.css']
})
export class TableDetailsComponent implements OnInit {

  faStarOfLife = faStarOfLife;
  @Output("close") close = new EventEmitter<void>();

  
  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.close.emit();
  }
}