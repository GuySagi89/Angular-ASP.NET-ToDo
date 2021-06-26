import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoList } from 'src/app/core/models/todo-list.model';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent implements OnInit {
  constructor() {}
  @Input() list!: TodoList;
  @Output() listSelected = new EventEmitter<number>();

  ngOnInit(): void {}

  onClick(id: number) {
    this.listSelected.emit(id);
  }
}
