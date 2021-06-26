import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoList } from '../models/todo-list.model';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private listsAmount = new BehaviorSubject<number>(0);

  constructor() {
    this.listsAmount.next(this.todoLists.length);
  }

  private todoLists: TodoList[] = [
    {
      id: 1,
      caption: 'work',
      description: 'Buy a new plant for office ha ha ha me is smart',
      icon: 'home',
      color: 'red',
    },

    {
      id: 2,
      caption: 'home',
      description: 'Tidy the thingy thing',
      icon: 'star',
      color: 'green',
    },

    {
      id: 5,
      caption: 'revenge',
      description: 'Hello there! my name is Inigo.',
      icon: 'list',
      color: 'blue',
    },
  ];

  getListSize() {
    return this.listsAmount.asObservable();
  }

  getAllLists() {
    return [...this.todoLists];
  }
  getListByID(id: number) {
    return this.todoLists.find((l) => l.id === id);
  }

  deleteListByID(id: number) {
    this.todoLists = this.todoLists.filter((l) => l.id !== id);
    this.listsAmount.next(this.todoLists.length);
  }

  getTemplateList() {
    return {
      id: 0,
      caption: '',
      description: '',
      icon: '',
      color: '',
    } as TodoList;
  }

  addList(list: TodoList) {
    const maxID = Math.max(...this.todoLists.map((o) => o.id), 0);

    let listToAdd = list;
    listToAdd.id = maxID + 1;

    this.todoLists.push(listToAdd);
    this.listsAmount.next(this.todoLists.length);
  }

  updateList(list: TodoList) {
    let indexToReplace = this.todoLists.findIndex((l) => l.id === list.id);
    this.todoLists[indexToReplace] = list;
  }
}
