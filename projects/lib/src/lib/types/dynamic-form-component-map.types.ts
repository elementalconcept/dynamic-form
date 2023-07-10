import { Type } from '@angular/core';

import { DynamicFormControl } from './dynamic-form-control.types';

export interface DynamicFormComponentMap<M, V> {
  [key: string]: Type<DynamicFormControl<M, V>>;
}
