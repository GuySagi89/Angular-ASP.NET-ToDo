import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { ListsService } from 'src/app/core/services/lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  todoLists!: TodoList[];

  constructor(private router: Router, private listsService: ListsService) {}

  ngOnInit(): void {
    this.todoLists = this.listsService.getAllLists();
  }

  goToNewList(){
    this.router.navigate(['lists','-1','edit']);
  }
  goToViewList(id: number) {
    this.router.navigate(['lists', id]);
  }
}
