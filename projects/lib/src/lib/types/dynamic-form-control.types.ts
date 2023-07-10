import { AbstractControl, ControlValueAccessor, UntypedFormGroup } from '@angular/forms';

import { DynamicFormElement } from './dynamic-form-element.types';

interface DynamicFormControlCommon<M, V> {
  formControl: AbstractControl;

  dynamicFormElement: DynamicFormElement<M, V>;

  showControl: () => void;

  hideControl: () => void;

  textTransformer?: (message: string) => string;
}

export interface DynamicFormControlCVA<M, V> extends DynamicFormControlCommon<M, V>, ControlValueAccessor {
  type: 'cva';
}

export interface DynamicFormPassThroughControl<M, V> extends DynamicFormControlCommon<M, V> {
  type: 'passthrough';

  formGroup: UntypedFormGroup;
}

export interface DynamicFormDescriptionControl<M, V> extends DynamicFormControlCommon<M, V> {
  type: 'description';
}

export type DynamicFormControl<M, V> =
  | DynamicFormControlCVA<M, V>
  | DynamicFormPassThroughControl<M, V>
  | DynamicFormDescriptionControl<M, V>;
