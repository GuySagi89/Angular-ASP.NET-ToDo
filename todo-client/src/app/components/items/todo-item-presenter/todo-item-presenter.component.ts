import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-todo-item-presenter',
  templateUrl: './todo-item-presenter.component.html',
  styleUrls: ['./todo-item-presenter.component.css'],
})
export class TodoItemPresenterComponent implements OnInit {
  @Input() caption = '';
  @Input() isCompleted = false;
  @Output() checkChanged = new EventEmitter();
  isComleted$= new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnInit(): void {
    this.isComleted$.next(this.isCompleted);
  }

  onCheck() {
    this.isComleted$.next(!this.isComleted$.value);
    this.checkChanged.emit();
  }
}
