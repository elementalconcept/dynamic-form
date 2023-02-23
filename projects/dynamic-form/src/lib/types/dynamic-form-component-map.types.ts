import { Type } from '@angular/core';

import { DynamicFormControl } from './dynamic-form-control.types';

export interface DynamicFormComponentMap<M> {
  [ key: string ]: Type<DynamicFormControl<M>>;
}
