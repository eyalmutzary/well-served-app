import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['../modals.style.css']
})
export class AddNoteComponent implements OnInit {

  @Output("confirm") confirm = new EventEmitter<void>();
  @Output("close") close = new EventEmitter<void>();

  
  constructor() { }

  ngOnInit() {
  }
  
  onConfirm(){
    this.confirm.emit();
  }

  onClose(){
    this.close.emit();
  }
}
