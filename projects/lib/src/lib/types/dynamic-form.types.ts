import { ComponentRef, InjectionToken } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { DynamicFormComponentMap } from './dynamic-form-component-map.types';
import { DynamicFormControl } from './dynamic-form-control.types';
import { DynamicFormElement } from './dynamic-form-element.types';
import { DynamicFormValue } from './dynamic-form-value.types';

export interface DynamicForm<M> {
  formGroup: UntypedFormGroup;
  components: DynamicFormComponentDescriptor<M>[];
}

export interface DynamicFormComponentDescriptor<M> {
  config: DynamicFormElement<M>;
  component: ComponentRef<DynamicFormControl<M>>;
}

export const DYNAMIC_FORM_COMPONENT_MAP = new InjectionToken<DynamicFormComponentMap<unknown>>(
  'DYNAMIC_FORM_COMPONENT_MAP',
  {
    providedIn: 'root',
    factory: () => ({})
  }
);

export interface DynamicFormComponentStatus {
  status: string;
  formGroup: UntypedFormGroup;
}

export interface DynamicFormComponentValue {
  value: DynamicFormValue;
  formGroup: UntypedFormGroup;
}
