import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITEMS_LIST } from '../constants/general-constants';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  itemsList = ITEMS_LIST;
  itemsListTwo: TodoItem[] = [];

  currentEditedItemList$ = new Subject<TodoItem[]>();

  constructor() {}

  getItemsObs() {
    return this.currentEditedItemList$.asObservable();
  }

  getAllItemsByListID(listId: number) {
    let filteredList = this.itemsList.filter((p) => p.listId === listId);
    this.currentEditedItemList$.next(filteredList);
  }

  getAllItems() {
    return [...this.itemsList];
  }

  getActiveItems() {
    return this.itemsList.filter((p) => !p.isCompleted);
  }

  addItem(caption: string, listId: number) {
    this.itemsList.push();

    const maxID = Math.max(...this.itemsList.map((o) => o.id), 0);

    let itemToAdd: TodoItem = {
      id: maxID + 1,
      caption: caption,
      listId: listId,
      isCompleted: false,
    };

    this.itemsList.push(itemToAdd);
  }

  markAsCompleted() {}
}
