import { AbstractControl, ControlValueAccessor, UntypedFormGroup } from '@angular/forms';

import { DynamicFormElement } from './dynamic-form-element.types';

interface DynamicFormControlCommon<M> {
  formControl: AbstractControl;

  dynamicFormElement: DynamicFormElement<M>;

  showControl: () => void;

  hideControl: () => void;

  textTransformer?: (message: string) => string;
}

export interface DynamicFormControlCVA<M> extends DynamicFormControlCommon<M>, ControlValueAccessor {
  type: 'cva';
}

export interface DynamicFormPassThroughControl<M> extends DynamicFormControlCommon<M> {
  type: 'passthrough';

  formGroup: UntypedFormGroup;
}

export interface DynamicFormDescriptionControl<M> extends DynamicFormControlCommon<M> {
  type: 'description';
}

export type DynamicFormControl<M> =
  | DynamicFormControlCVA<M>
  | DynamicFormPassThroughControl<M>
  | DynamicFormDescriptionControl<M>;
