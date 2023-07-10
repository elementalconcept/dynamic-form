import { Component } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

import { DynamicFormElement, DynamicFormPassThroughControl } from '@elemental-concept/dynamic-form';

import { inputModeMap } from '../../types';

@Component({
  selector: 'app-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: ['./string-input.component.scss']
})
export class StringInputComponent implements DynamicFormPassThroughControl<unknown, unknown> {
  readonly type = 'passthrough';

  config: DynamicFormElement<unknown, unknown>;

  inputMode = 'text';

  inputType = 'text';

  formGroup: UntypedFormGroup;

  formControl: AbstractControl;

  visible = true;

  textTransformer?: (message: string) => string;

  set dynamicFormElement(element: DynamicFormElement<unknown, unknown>) {
    this.config = element;

    if (this.config.type in inputModeMap) {
      this.inputMode = inputModeMap[this.config.type];
    }

    this.inputType = this.config.type === 'password' ? 'password' : 'text';
    console.log('this.textTransformer', this.textTransformer('Hello!'));
  }

  showControl = () => this.visible = true;

  hideControl = () => this.visible = false;
}
