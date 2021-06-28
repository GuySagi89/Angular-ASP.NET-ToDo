import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-item-presenter',
  templateUrl: './todo-item-presenter.component.html',
  styleUrls: ['./todo-item-presenter.component.css'],
})
export class TodoItemPresenterComponent implements OnInit {
  constructor() {}
  @Input() caption = '';
  @Input() isCompleted = false;
  @Output() checkChanged = new EventEmitter<boolean>();

  ngOnInit(): void {}

  onCheck(isChecked: MatCheckboxChange) {
    this.checkChanged.emit(isChecked.checked);
  }
}
