import { ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import {
  DynamicForm,
  DynamicFormComponentDescriptor,
  DynamicFormComponentMap,
  DynamicFormConfig,
  DynamicFormControl,
  DynamicFormElement,
  DynamicFormValidator,
  DynamicFormValue
} from '../../types';

import { DynamicFormValidators } from './dynamic-form-validators';

@Injectable({ providedIn: 'root' })
export class DynamicFormFactoryService {
  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector
  ) {
  }

  createForm = <M>(
    config: DynamicFormConfig<M>,
    value: DynamicFormValue,
    componentMap: DynamicFormComponentMap<M>
  ): DynamicForm<M> => {
    const formGroup = new FormGroup({});

    config.elements.forEach(this.insertFormControl(value, formGroup));

    const components = config.elements
      .map(this.mapFormComponent(componentMap, formGroup))
      .filter(ref => ref !== null);

    return {
      formGroup,
      components
    };
  };

  mapFormComponent =
    <M>(componentMap: DynamicFormComponentMap<M>, formGroup: FormGroup) =>
    (element: DynamicFormElement<M>): DynamicFormComponentDescriptor<M> | null => {
      if (element.type in componentMap) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentMap[element.type]);
        const componentRef: ComponentRef<DynamicFormControl<M>> = factory.create(this.injector);

        if (componentRef.instance.type === 'passthrough') {
          componentRef.instance.formGroup = formGroup;
        }

        componentRef.instance.formControl = formGroup.controls[element.id];
        componentRef.instance.dynamicFormElement = element;

        return {
          config: element,
          component: componentRef
        };
      }

      return null;
    };

  insertFormControl = (value: DynamicFormValue, formGroup: FormGroup) => <M>(element: DynamicFormElement<M>) => {
    if (element.type === '_description_') {
      return;
    }

    const validators: ValidatorFn[] = element.validators instanceof Array
      ? element.validators
        .map(this.getValidator)
        .filter(validator => validator !== null)
      : [];

    formGroup.addControl(element.id, this.createFormControl(value[element.id], validators, element.disabled, element.updateOn));
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

  createFormControl = (value: any,
                       validators: ValidatorFn[],
                       disabled: boolean,
                       updateOn: 'change' | 'blur' | 'submit' = 'change'): FormControl =>
    new FormControl({ value, disabled }, { updateOn, validators });
}
