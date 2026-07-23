import { Component } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

import { DynamicFormElement, DynamicFormPassThroughControl } from '@elemental-concept/dynamic-form';

import { InputMetaDefault } from '../../../../projects/lib/src/lib/types';
import { FormValue, inputModeMap } from '../../types';

@Component({
  selector: 'app-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: [ './string-input.component.scss' ]
})
export class StringInputComponent implements DynamicFormPassThroughControl<InputMetaDefault, FormValue> {
  readonly type = 'passthrough';

  config: DynamicFormElement<InputMetaDefault, FormValue>;

  inputMode = 'text';

  inputType = 'text';

  formGroup: UntypedFormGroup;

  formControl: AbstractControl;

  visible = true;

  textTransformer?: (message: string) => string;

  set dynamicFormElement(element: DynamicFormElement<InputMetaDefault, FormValue>) {
    this.config = element;

    if (this.config.type in inputModeMap) {
      this.inputMode = inputModeMap[this.config.type];
    }

    this.inputType = this.config.type === 'password' ? 'password' : 'text';
  }

  showControl = () => this.visible = true;

  hideControl = () => this.visible = false;

  transform = (key: string | undefined): string =>
    key === undefined
      ? ''
      : this.textTransformer === undefined
      ? key
      : this.textTransformer(key);
}
