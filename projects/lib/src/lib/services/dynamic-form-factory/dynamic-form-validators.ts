import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { DynamicFormValidatorPattern } from '../../types';

// @dynamic
export class DynamicFormValidators {
  static equalTo(field: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent?.controls?.hasOwnProperty(field)) {
        const related = control.parent.controls[field];

        if (related.value !== control.value) {
          return { equalTo: true };
        }
      }

      return null;
    };
  }

  static patternList(patterns: DynamicFormValidatorPattern[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // if control is empty return no error
      if (!control.value) {
        return null;
      }

      const results = patterns.reduce((acc, pattern) => {
        // test the value of the control against the regexp supplied
        const regex = new RegExp(pattern.pattern);
        const valid = regex.test(control.value);

        if (!valid) {
          acc[pattern.errorLabel] = true;
        }

        return acc;
      }, {});

      // if true, return no error (no error), else return error passed in the second parameter
      if (Object.keys(results).length > 0) {
        return results;
      }

      return null;
    };
  }
}
