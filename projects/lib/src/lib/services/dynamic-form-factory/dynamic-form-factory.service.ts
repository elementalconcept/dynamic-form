import { ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import {
  DynamicForm,
  DynamicFormComponentDescriptor,
  DynamicFormComponentMap,
  DynamicFormConfig,
  DynamicFormControl,
  DynamicFormElement,
  DynamicFormValidator
} from '../../types';

import { DynamicFormValidators } from './dynamic-form-validators';

@Injectable({ providedIn: 'root' })
export class DynamicFormFactoryService {
  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector
  ) {
  }

  createForm = <M, V>(
    config: DynamicFormConfig<M, V>,
    value: V,
    componentMap: DynamicFormComponentMap<M, V>
  ): DynamicForm<M, V> => {
    const formGroup = new FormGroup<Record<keyof V, AbstractControl>>({} as Record<keyof V, AbstractControl>);

    config.elements.forEach(this.insertFormControl(value, formGroup));

    const components = config.elements
      .map(this.mapFormComponent(componentMap, formGroup, config))
      .filter(ref => ref !== null);

    // @ts-ignore // components could be null --> strict is not happy
    return { formGroup, components };
  };

  mapFormComponent =
    <M, V>(componentMap: DynamicFormComponentMap<M, V>, formGroup: FormGroup, config: DynamicFormConfig<M, V>) =>
    (element: DynamicFormElement<M, V>): DynamicFormComponentDescriptor<M, V> | null => {
      if (element.type in componentMap) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentMap[element.type]);
        const componentRef: ComponentRef<DynamicFormControl<M, V>> = factory.create(this.injector);

        if (componentRef.instance.type === 'passthrough') {
          componentRef.instance.formGroup = formGroup;
        }

        componentRef.instance.formControl = formGroup.controls[element.id];
        componentRef.instance.textTransformer = config.textTransformer;
        componentRef.instance.dynamicFormElement = element;

        return {
          config: element,
          component: componentRef
        };
      }

      return null;
    };

  insertFormControl = <V>(value: V, formGroup: FormGroup) => <M>(element: DynamicFormElement<M, V>) => {
    if (element.type === '_description_') {
      return;
    }

    const validators: ValidatorFn[] = element.validators instanceof Array
      ? element.validators
        .map(this.getValidator)
        .filter(validator => validator !== null) as ValidatorFn[]
      : [];

    formGroup.addControl(
      element.id,
      this.createFormControl(value[element.id], validators, element.disabled || false, element.updateOn)
    );
  };

  getValidator = (validator: DynamicFormValidator): ValidatorFn | null => {
    switch (validator.type) {
      case 'min':
        return Validators.min(validator.value);

      case 'minLength':
        return Validators.minLength(validator.length);

      case 'max':
        return Validators.max(validator.value);

      case 'maxLength':
        return Validators.maxLength(validator.length);

      case 'required':
        return Validators.required;

      case 'requiredTrue':
        return Validators.requiredTrue;

      case 'email':
        return Validators.email;

      case 'patternList':
        return DynamicFormValidators.patternList(validator.patterns);

      case 'pattern':
        return Validators.pattern(validator.pattern);

      case 'equalTo':
        return DynamicFormValidators.equalTo(validator.field);

      default:
        return null;
    }
  };

  createFormControl = (
    value: any,
    validators: ValidatorFn[],
    disabled: boolean,
    updateOn: 'change' | 'blur' | 'submit' = 'change'
  ): FormControl => new FormControl({ value, disabled }, { updateOn, validators });
}
