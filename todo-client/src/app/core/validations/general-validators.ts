import { AbstractControl, ValidationErrors } from '@angular/forms';

export function wordsValidator(
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

export function charactersValidator(
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
