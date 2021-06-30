import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import {
  COLORS,
  EMPTY_LIST,
  ICONS,
  NEW_LIST_ID,
} from 'src/app/core/constants/general-constants';

import { TodoList } from 'src/app/core/models/todo-list.model';
import { ListsService } from 'src/app/core/services/lists.service';
import {
  minCharactersValidator,
  minWordsValidator,
  maxCharactersValidator,
} from 'src/app/core/validations/general-validators';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css'],
})
export class EditListComponent implements OnInit {
  todoForm!: FormGroup;
  currentList$!: Observable<TodoList>;
  currentList!: TodoList;

  id!: number;
  icons = ICONS;
  colors = COLORS;
  id$!: Observable<number>;
  selectedIcon!: string;
  selectedColor!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listsService: ListsService,
    private formService: FormBuilder
  ) {}

  async ngOnInit() {
    this.currentList = EMPTY_LIST;

    this.id = +this.route.snapshot.params['id'];
    try {
      if (isNaN(this.id) || (this.id <= 0 && this.id !== -1)) {
        this.router.navigate(['404']);
      }

      if (this.id !== NEW_LIST_ID) {
        this.id$ = this.route.params.pipe(map((params) => +params.id));

        this.currentList$ = this.id$.pipe(
          switchMap((id) => this.listsService.getListByID(id))
        );

        this.currentList = await this.currentList$.pipe(first()).toPromise();

        if(!this.currentList){
          this.router.navigate(['404']);
        }

        this.selectedIcon = this.currentList.icon;
        this.selectedColor = this.currentList.color;
      }

      this.handleForm();
    } catch(error) {      console.log(error);}
  }

  handleForm() {
    this.todoForm = this.formService.group({
      caption: [
        this.currentList.caption,
        [Validators.required, maxCharactersValidator(12)],
      ],
      description: [
        this.currentList.description,
        [
          Validators.required,
          minWordsValidator(10),
          minCharactersValidator(30),
        ],
      ],
      icon: [this.currentList.icon, [Validators.required]],
      color: [this.currentList.color, [Validators.required]],
    });
  }

  async saveForm() {
    try {
      if (this.todoForm.invalid) return;

      this.currentList = { ...this.currentList, ...this.todoForm.value };
      if (this.id === NEW_LIST_ID) {
        await this.listsService.addList(this.currentList);
      } else {
        await this.listsService.editList(this.currentList);
      }

      this.router.navigate(['lists']);
    } catch (error) {}
  }
}
