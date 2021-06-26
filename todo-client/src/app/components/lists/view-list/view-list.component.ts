import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { ListsService } from 'src/app/core/services/lists.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css'],
})
export class ViewListComponent implements OnInit, OnDestroy {
  id!: number;
  currentList!: TodoList;

  constructor(
    private listsService: ListsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.loadDetails();
    });
  }

  loadDetails() {
    let todoList = this.listsService.getListByID(this.id);
    if (typeof todoList != 'undefined') {
      this.currentList = todoList;
    } else {
      this.router.navigate(['404']);
    }
  }

  goToEditList(id: number) {
    this.router.navigate(['lists', id, 'edit']);
  }

  deleteList(id:number) {
    this.listsService.deleteListByID(id);
    this.router.navigate(['lists']);
  }
}
