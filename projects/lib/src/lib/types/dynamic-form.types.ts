import { ComponentRef, InjectionToken } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { DynamicFormComponentMap } from './dynamic-form-component-map.types';
import { DynamicFormControl } from './dynamic-form-control.types';
import { DynamicFormElement } from './dynamic-form-element.types';

export interface DynamicForm<M, V> {
  formGroup: FormGroup<Record<keyof V, AbstractControl>>;
  components: DynamicFormComponentDescriptor<M, V>[];
}

export interface DynamicFormComponentDescriptor<M, V> {
  config: DynamicFormElement<M, V>;
  component: ComponentRef<DynamicFormControl<M, V>>;
}

export const DYNAMIC_FORM_COMPONENT_MAP = new InjectionToken<DynamicFormComponentMap<unknown, unknown>>(
  'DYNAMIC_FORM_COMPONENT_MAP',
  {
    providedIn: 'root',
    factory: () => ({})
  }
);

export interface DynamicFormComponentStatus<V> {
  status: string;
  formGroup: FormGroup<Record<keyof V, AbstractControl>>;
}

export interface DynamicFormComponentValue<V> {
  value: V;
  formGroup: FormGroup<Record<keyof V, AbstractControl>>;
}
