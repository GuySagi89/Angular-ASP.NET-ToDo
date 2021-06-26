import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  COLORS,
  ICONS,
  NEW_LIST_ID,
  VALIDATOR_CHARACTER_MAX,
  VALIDATOR_CHARACTER_MIN,
  VALIDATOR_WORDS_MIN,
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
  currentList!: TodoList;
  id!: number;
  icons = ICONS;
  colors = COLORS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListsService,
    private formService: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentList = this.listService.getTemplateList();

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.loadDetails();
    });

    this.handleForm();
  }

  loadDetails() {
    if (this.id !== NEW_LIST_ID) {
      let todoList = this.listService.getListByID(this.id);
      if (typeof todoList != 'undefined') {
        this.currentList = todoList;
      } else {
        this.router.navigate(['404']);
      }
    }
  }

  handleForm() {
    this.todoForm = this.formService.group({
      caption: [this.currentList.caption, [Validators.required,maxCharactersValidator(VALIDATOR_CHARACTER_MAX)]],
      description: [
        this.currentList.description,
        [Validators.required, minWordsValidator(VALIDATOR_WORDS_MIN), minCharactersValidator(VALIDATOR_CHARACTER_MIN)],
      ],
      icon: [this.currentList.icon, [Validators.required]],
      color: [this.currentList.color, [Validators.required]],
    });
  }

  saveForm() {
    this.currentList = { ...this.currentList, ...this.todoForm.value };

    if (this.id === NEW_LIST_ID) {
      this.listService.addList(this.currentList);
    } else {
      this.listService.updateList(this.currentList);
    }

    this.router.navigate(['lists']);
  }
}
