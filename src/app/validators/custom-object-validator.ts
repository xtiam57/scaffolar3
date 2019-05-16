import { FormControl, ValidatorFn } from '@angular/forms';
import * as _ from 'underscore';

export class CustomObjectValidator {
  static compareToValidator(compareTo: string): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
      try {
        if (!_.isEmpty(control.value) && control.value === control.parent['controls'][compareTo].value) {
          return null;
        }
         return { 'compareTo': true };
      } catch {
        return { 'compareTo': true };
      }
    };
  }
}
