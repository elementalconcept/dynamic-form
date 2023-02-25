import { Directive } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { map, startWith } from 'rxjs/operators';

import { DynamicFormElement, DynamicFormPassThroughControl } from '@elemental-concept/ngx-dynamic-form';

import { inputModeMap, MaterialInputMeta } from '../../types';

@UntilDestroy()
@Directive()
export class CommonInputDirective implements DynamicFormPassThroughControl<MaterialInputMeta> {
  readonly type = 'passthrough';

  formGroup: UntypedFormGroup;

  config: DynamicFormElement<MaterialInputMeta>;

  visible = true;

  inputMode = 'text';

  inputType = 'text';

  required = false;

  errors: string[] = [];

  set formControl(control: AbstractControl) {
    control.statusChanges
      .pipe(
        startWith(control.status),
        untilDestroyed(this),
        map(status => status === 'INVALID' && !control.pristine
          ? Object.keys(control.errors ?? [])
          : []))
      .subscribe(errors => this.errors = errors);
  }

  set dynamicFormElement(element: DynamicFormElement<MaterialInputMeta>) {
    this.config = { ...element };

    if (this.config.errors === undefined) {
      this.config.errors = {};
    }

    if (this.config.type in inputModeMap) {
      this.inputMode = inputModeMap[ this.config.type ];
    }

    this.inputType = this.config.type === 'password' ? 'password' : 'text';

    this.required = element.validators instanceof Array
      ? element.validators.find(validator => validator.type === 'required' || validator.type === 'requiredTrue') !== undefined
      : false;
  }

  showControl = () => this.visible = true;

  hideControl = () => this.visible = false;
}
