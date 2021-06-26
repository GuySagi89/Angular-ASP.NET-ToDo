import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { ListsService } from 'src/app/core/services/lists.service';
import {
  charactersValidator,
  wordsValidator,
} from 'src/app/core/validations/general-validators';

interface Icon {
  value: string;
  viewValue: string;
}

interface Color {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css'],
})
export class EditListComponent implements OnInit {
  icons: Icon[] = [
    { value: 'list', viewValue: 'list' },
    { value: 'home', viewValue: 'home' },
    { value: 'star', viewValue: 'star' },
  ];

  colors: Color[] = [
    { value: 'black', viewValue: 'Black' },
    { value: 'red', viewValue: 'Red' },
    { value: 'green', viewValue: 'Green' },
    { value: 'blue', viewValue: 'Blue' },
    { value: 'orange', viewValue: 'Orange' },
  ];

  todoForm!: FormGroup;
  currentList!: TodoList;
  id!: number;
  isNewList!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListsService,
    private formService: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentList = this.listService.getEmptyList();

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.loadDetails();
      this.isNewList = this.id === -1;
    });

    this.handleForm();
  }

  loadDetails() {
    if (this.id !== -1) {
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
      caption: [this.currentList.caption, [Validators.required]],
      description: [
        this.currentList.description,
        [Validators.required, wordsValidator(10), charactersValidator(30)],
      ],
      icon: [this.currentList.icon, [Validators.required]],
      color: [this.currentList.color, [Validators.required]],
    });
  }

  saveForm() {
    this.currentList = { ...this.currentList, ...this.todoForm.value };

    if (this.isNewList) {
      this.listService.addList(this.currentList);
    } else {
      this.listService.updateList(this.currentList);
    }

    this.router.navigate(['lists']);
  }
}
