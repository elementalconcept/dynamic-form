import { DynamicFormElementOption } from './dynamic-form-element-option.types';
import { DynamicFormElementRelationship } from './dynamic-form-element-relationship.types';
import { DynamicFormErrors } from './dynamic-form-errors.types';
import { DynamicFormValidator } from './dynamic-form-validator.types';

export interface DynamicFormElement<M, V> {
  id: string;
  type: '_description_' | string;

  disabled?: boolean;
  label?: string;
  placeholder?: string;
  updateOn?: 'change' | 'blur' | 'submit';
  meta?: M;
  options?: DynamicFormElementOption[];
  filteredOptions?: DynamicFormElementOption[];
  optionsFilter?: (
    oldValue: V,
    newValue: V,
    formElement: DynamicFormElement<M, V>,
    patchValue: (value: Partial<V>) => void
  ) => DynamicFormElementOption[];
  dependsOn?: DynamicFormElementRelationship[];
  validators?: DynamicFormValidator[];
  errors?: DynamicFormErrors;
}
