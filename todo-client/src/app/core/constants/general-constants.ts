import { HttpHeaders } from '@angular/common/http';
import { TodoItem } from '../models/todo-item.model';
import { TodoList } from '../models/todo-list.model';
import { DropdownOptions } from '../tpyes/dropdown-options';

export const COLORS: DropdownOptions[] = [
  { value: 'black', viewValue: 'Black' },
  { value: 'red', viewValue: 'Red' },
  { value: 'green', viewValue: 'Green' },
  { value: 'blue', viewValue: 'Blue' },
  { value: 'orange', viewValue: 'Orange' },
  { value: 'purple', viewValue: 'Purple' },
];

export const ICONS: DropdownOptions[] = [
  { value: 'list', viewValue: 'list' },
  { value: 'home', viewValue: 'home' },
  { value: 'work', viewValue: 'work' },
  { value: 'email', viewValue: 'email' },
  { value: 'shopping_cart', viewValue: 'shopping_cart' },
  { value: 'account_balance', viewValue: 'account_balance' },
  { value: 'flight', viewValue: 'flight' },
];

export const NEW_LIST_PAGE = '/lists/-1/edit';
export const NEW_LIST_ID = -1;

export const EMPTY_LIST: TodoList = {
  id: 0,
  caption: '',
  description: '',
  icon: '',
  color: '',
};
