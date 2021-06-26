import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minWordsValidator(
  minWords: number
): (control: AbstractControl) => null | ValidationErrors {
  return (control: AbstractControl) => {
    if (!control) return null;
    if (!control.value) return null;
    if (typeof control.value !== 'string') return null;

    let words = control.value.split(' ').filter((word) => word);

    if (words.length >= minWords) return null;

    return {
      words: {
        actual: words.length,
        minimum: minWords,
      },
    };
  };
}

export function minCharactersValidator(
  minCharacters: number
): (control: AbstractControl) => null | ValidationErrors {
  return (control: AbstractControl) => {
    if (!control) return null;
    if (!control.value) return null;
    if (typeof control.value !== 'string') return null;
    let characters = control.value;
    if (control.value.length >= minCharacters) return null;

    return {
      words: {
        actual: characters.length,
        minimum: minCharacters,
      },
    };
  };
}

export function maxCharactersValidator(
  maxCharacters: number
): (control: AbstractControl) => null | ValidationErrors {
  return (control: AbstractControl) => {
    if (!control) return null;
    if (!control.value) return null;
    if (typeof control.value !== 'string') return null;
    let characters = control.value;
    if (control.value.length <= maxCharacters) return null;

    return {
      words: {
        actual: characters.length,
        minimum: maxCharacters,
      },
    };
  };
}
