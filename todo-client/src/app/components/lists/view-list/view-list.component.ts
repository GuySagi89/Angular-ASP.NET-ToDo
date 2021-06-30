import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';

import { first, map, switchMap } from 'rxjs/operators';
import {
  NEW_LIST_ID,
  NEW_LIST_PAGE,
} from 'src/app/core/constants/general-constants';
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
  id$!: Observable<number>;
  currentList!: TodoList;
  currentList$!: Observable<TodoList>;
  currentTodoItems$!: Observable<TodoItem[]>;
  currentTodoItemsUpdate$ = new Subject<TodoItem[]>();
  deleteConfirmPrompt$ = new BehaviorSubject<boolean>(false);
  toDoForm!: FormGroup;
  validList$!: Observable<boolean>;
  listUpdate!: Subscription;
  currentTodoItems!: TodoItem[];

  constructor(
    private listsService: ListsService,
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormBuilder
  ) {}

  async ngOnInit() {
    this.id = +this.route.snapshot.params['id'];

    try {
      if (isNaN(this.id) || (this.id <= 0 && this.id !== NEW_LIST_ID)) {
        this.router.navigate(['404']);
      }

      this.id$ = this.route.params.pipe(map((params) => +params.id));

      this.currentList$ = this.id$.pipe(
        switchMap((id) => this.listsService.getListByID(id))
      );

      this.currentList = await this.currentList$.pipe(first()).toPromise();
      if (!this.currentList) {
        this.router.navigate(['404']);
      }

      this.reloadItems();

      this.buildForm();
    } catch (error) {
      console.log(error);
    }
  }

  reloadItems() {
    this.listsService
      .getAllListsItems(this.id)
      .subscribe((i) => (this.currentTodoItems = i));
  }

  goToEditList() {
    this.router.navigate(['lists', this.id, 'edit']);
  }

  goToNewList() {
    this.router.navigate([NEW_LIST_PAGE]);
  }

  toggleDelete() {
    this.deleteConfirmPrompt$.next(!this.deleteConfirmPrompt$.value);
  }

  deleteList() {
    this.listsService.deleteListByID(this.id);
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

  async addItem() {
    let itemCaption: { item: '' } = this.toDoForm.value;

    let newItem: TodoItem = {
      id: 0,
      caption: itemCaption.item,
      listId: this.currentList.id,
      isCompleted: false,
    };

    try {
      await this.itemsService.addItem(newItem);
      this.toDoForm.reset();
      this.reloadItems();
    } catch (error) {
      console.log(error);
    }
  }

  onCheck(itemId: number) {
    this.itemsService.toggleItemStatus(itemId);
  }
}
