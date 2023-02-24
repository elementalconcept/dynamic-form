import { Component } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

import { DynamicFormElement, DynamicFormPassThroughControl } from '@elemental-concept/ngx-dynamic-form';

import { inputModeMap } from '../../types';

@Component({
  selector: 'app-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: [ './string-input.component.scss' ]
})
export class StringInputComponent implements DynamicFormPassThroughControl<unknown> {
  readonly type = 'passthrough';

  config: DynamicFormElement<unknown>;

  inputMode = 'text';

  inputType = 'text';

  formGroup: UntypedFormGroup;

  formControl: AbstractControl;

  visible = true;

  set dynamicFormElement(element: DynamicFormElement<unknown>) {
    this.config = element;

    if (this.config.type in inputModeMap) {
      this.inputMode = inputModeMap[ this.config.type ];
    }

    this.inputType = this.config.type === 'password' ? 'password' : 'text';
  }

  showControl = () => this.visible = true;

  hideControl = () => this.visible = false;
}
