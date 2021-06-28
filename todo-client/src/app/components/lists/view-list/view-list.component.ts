import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TodoItem } from 'src/app/core/models/todo-item.model';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { ItemsService } from 'src/app/core/services/items.service';
import { ListsService } from 'src/app/core/services/lists.service';
import {
  minCharactersValidator,
  minWordsValidator,
} from 'src/app/core/validations/general-validators';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css'],
})
export class ViewListComponent implements OnInit {
  id!: number;
  currentList!: TodoList;
  currentTodoItemsList!: TodoItem[];
  currentTodoItems!: Observable<TodoItem[]>;
  deletePrompt$ = new BehaviorSubject<boolean>(false);
  currentId$=new Observable<number>();
  toDoForm!: FormGroup;

  constructor(
    private listsService: ListsService,
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.currentTodoItems=this.itemsService.getItemsObs().pipe(map(v=>v));
    this.itemsService.getAllItemsByListID(this.currentList.id);

    this.id=+this.route.snapshot.params['id'];
    this.currentId$=this.route.params.pipe(map(params=>+params['id']));

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

  toggleDelete() {
    this.deletePrompt$.next(!this.deletePrompt$.value);
  }

  deleteList(id: number) {
    this.listsService.deleteListByID(id);
    this.router.navigate(['']);
  }

  buildForm() {
    this.toDoForm = this.formService.group({
      item: [
        '',
        [Validators.required, minCharactersValidator(10), minWordsValidator(3)],
      ],
    });
  }

  addItem() {
    let formResult: { item: '' } = this.toDoForm.value;
    this.itemsService.addItem(formResult.item, this.id);
    this.toDoForm.reset();
  }
}
