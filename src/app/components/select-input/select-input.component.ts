import { Component } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { DynamicFormElement, DynamicFormPassThroughControl } from '@elemental-concept/dynamic-form';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements DynamicFormPassThroughControl<unknown, unknown> {
  readonly type = 'passthrough';

  config: DynamicFormElement<unknown, unknown>;

  formGroup: UntypedFormGroup;

  formControl: AbstractControl;

  visible = true;

  set dynamicFormElement(element: DynamicFormElement<unknown, unknown>) {
    this.config = element;
    console.log('xxx');
  }

  showControl = () => this.visible = true;

  hideControl = () => this.visible = false;
}
