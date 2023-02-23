import { Directive } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { map, startWith } from 'rxjs/operators';

import { DynamicFormElement, DynamicFormPassThroughControl } from '@elementalconcept/ngx-dynamic-form';

import { inputModeMap, MaterialInputMeta, SuffixType } from '../../types';

@UntilDestroy()
@Directive()
export class CommonInputDirective implements DynamicFormPassThroughControl<MaterialInputMeta> {
  readonly type = 'passthrough';

  formGroup!: UntypedFormGroup;

  compiledConfig!: DynamicFormElement<MaterialInputMeta>;

  visible = true;

  inputMode = 'text';

  inputType = 'text';

  required = false;

  errors: string[] = [];

  set config(config: DynamicFormElement<MaterialInputMeta>) {
    this.compiledConfig = {
      ...config,

      meta: {
        ...config.meta,

        appearance: config.meta ? config.meta.appearance : 'fill',
        floatLabel: config.meta ? config.meta.floatLabel : 'always',
        hintLabel: config.meta ? config.meta.hintLabel : '',
        labelPosition: config.meta ? config.meta.labelPosition : 'after',
        cssClass: config.meta ? config.meta.cssClass : '',
        color: config.meta ? config.meta.color : 'primary',
        suffix: config.meta ? config.meta.suffix : SuffixType.label,
        externalLink: config.meta ? config.meta.externalLink : null,
        htmlDescription: config.meta ? config.meta.htmlDescription : '',
        hideRequiredMarker: config.meta ? config.meta.hideRequiredMarker : false,
        sectionTitle: config.meta ? config.meta.sectionTitle : false,
      }
    }
  }

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
