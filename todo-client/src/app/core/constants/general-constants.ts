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
export const VALIDATOR_CHARACTER_MIN = 30;
export const VALIDATOR_WORDS_MIN = 10;
export const VALIDATOR_CHARACTER_MAX = 12;
