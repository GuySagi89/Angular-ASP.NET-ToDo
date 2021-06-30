import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  NEW_LIST_ID,
  NEW_LIST_PAGE,
} from 'src/app/core/constants/general-constants';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { ListsService } from 'src/app/core/services/lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  todoLists$!: Observable<TodoList[]>;

  constructor(private router: Router, private listsService: ListsService) {}

   ngOnInit() {
    this.todoLists$=  this.listsService.getAllLists();
  }

  onListClick(id: number) {
    if (id === NEW_LIST_ID) {
      this.router.navigate([NEW_LIST_PAGE]);
    } else {
      this.router.navigate(['lists', id]);
    }
  }
}
