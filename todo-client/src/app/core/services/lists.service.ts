import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TO_DO_LISTS } from '../constants/general-constants';
import { TodoList } from '../models/todo-list.model';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private listsAmount = new BehaviorSubject<number>(0);
  private listObs$ = new Subject<TodoList>();
  todoLists = TO_DO_LISTS;

  constructor() {
    this.listsAmount.next(this.todoLists.length);
  }

  getListSize() {
    return this.listsAmount.asObservable();
  }

  getAllLists() {
    return [...this.todoLists];
  }
  getListByID(id: number) {

    this.listObs$.next(this.todoLists.find((l) => l.id === id));
 }

 getListObs(){
   return this.listObs$.asObservable();
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
    const maxID = Math.max(...this.todoLists.map((l) => l.id), 0);

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
