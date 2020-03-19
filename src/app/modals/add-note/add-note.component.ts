import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { OrderService } from '../../shared/order.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['../modals.style.css']
})
export class AddNoteComponent implements OnInit {

  @Output("addNote") noteAdded = new EventEmitter<string>();
  @Output("close") close = new EventEmitter<void>();
  noteText: string;
  currentProductPosition: number;

  
  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }
  
  onNoteAdded(textArea: string){
    this.orderService.addNote(this.currentProductPosition,textArea);
    this.noteAdded.emit(textArea);
    this.close.emit();
  }

  onClose(){
    this.close.emit();
  }
}
