import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TableService } from '../../shared/table.service';

@Component({
  selector: 'app-table-num',
  templateUrl: './table-num.component.html',
  styleUrls: ['../modals.style.css']
})
export class TableNumComponent implements OnInit {

  
  @Output("confirm") confirm = new EventEmitter<void>();
  @Output("close") close = new EventEmitter<void>();
  error: string;
  // @ViewChild('pass', {static: false}) pass:ElementRef;
  // @ViewChild('newNum', {static: false}) newNum:ElementRef;



  constructor(private tableService: TableService) { }

  ngOnInit() {
  }
  
  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }
    const password = form.value.password;
    const newNum = form.value.newNum;

    this.tableService.validateTableNum().subscribe(resData => {

      let exist: boolean = resData.includes(newNum)
      if(password != 'admin123'){
        this.error = "Wrong password!";
        return;
      } else if(exist){
        this.error = "Table name already exists!";
        return;
      }
      else{
        this.tableService.editTableNum(newNum);
        this.close.emit();

      }
    },
    errorMessage => {
      this.error = errorMessage;
      console.log(errorMessage);
    });
  }

  onClose(){
    this.close.emit();
  }

}
