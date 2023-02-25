import { UntypedFormControl, Validators } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

import { DynamicFormValidator } from '@elemental-concept/ngx-dynamic-form';

import { CommonInputDirective } from './common-input.directive';

describe('CommonInputDirective', () => {
  it('should create an instance', () => {
    const directive = new CommonInputDirective();

    expect(directive).toBeTruthy();
    expect(directive.type).toEqual('passthrough');
    expect(directive.inputMode).toEqual('text');
    expect(directive.inputType).toEqual('text');
    expect(directive.required).toBeFalse();
    expect(directive.errors).toEqual([]);
  });

  it('should show/hide control on click', () => {
    const directive = new CommonInputDirective();

    expect(directive.visible).toBeTrue();
    directive.showControl();
    expect(directive.visible).toBeTrue();
    directive.hideControl();
    expect(directive.visible).toBeFalse();
  });

  it('should set formControl', fakeAsync(() => {
    const directive = new CommonInputDirective();
    const control = new UntypedFormControl('', [ Validators.required ]);

    directive.formControl = control;
    tick(250);
    expect(directive.errors).toEqual([]);
  }));

  it('should set formControl (1)', fakeAsync(() => {
    const directive = new CommonInputDirective();
    const control = new UntypedFormControl('', [ Validators.required ]);
    control.markAsDirty();
    control.markAsTouched();

    directive.formControl = control;
    tick(250);
    expect(directive.errors).toEqual([ 'required' ]);
  }));

  it('should set dynamicFormElement', fakeAsync(() => {
    const directive = new CommonInputDirective();
    const element = {
      id: 'string',
      label: 'string',
      type: 'string',
      validators: [ { type: 'required' } ] as DynamicFormValidator[]
    };

    directive.dynamicFormElement = element;
    tick(250);

    expect(directive.config.id).toEqual(element.id);
    expect(directive.config.label).toEqual(element.label);
    expect(directive.config.type).toEqual(element.type);
    expect(directive.config.validators).toEqual(element.validators);

    expect(directive.inputMode).toEqual('text');
    expect(directive.inputType).toEqual('text');
    expect(directive.required).toBeTrue();
  }));

  it('should set dynamicFormElement (1)', fakeAsync(() => {
    const directive = new CommonInputDirective();
    const element = {
      id: 'checkbox',
      label: 'checkbox',
      type: 'checkbox',
      validators: [ { type: 'requiredTrue' } ] as DynamicFormValidator[]
    };

    directive.dynamicFormElement = element;
    tick(250);

    expect(directive.config.id).toEqual(element.id);
    expect(directive.config.label).toEqual(element.label);
    expect(directive.config.type).toEqual(element.type);
    expect(directive.config.validators).toEqual(element.validators);

    expect(directive.inputMode).toEqual('text');
    expect(directive.inputType).toEqual('text');
    expect(directive.required).toBeTrue();
  }));

  it('should set dynamicFormElement (2)', fakeAsync(() => {
    const directive = new CommonInputDirective();
    const element = {
      id: 'password',
      label: 'password',
      type: 'password'
    };

    directive.dynamicFormElement = element;
    tick(250);

    expect(directive.config.id).toEqual(element.id);
    expect(directive.config.label).toEqual(element.label);
    expect(directive.config.type).toEqual(element.type);

    expect(directive.inputMode).toEqual('text');
    expect(directive.inputType).toEqual('password');
    expect(directive.required).toBeFalse();
  }));
});
