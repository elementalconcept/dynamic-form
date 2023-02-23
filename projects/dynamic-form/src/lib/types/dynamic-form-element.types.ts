import { DynamicFormElementOption } from './dynamic-form-element-option.types';
import { DynamicFormElementRelationship } from './dynamic-form-element-relationship.types';
import { DynamicFormValidator } from './dynamic-form-validator.types';
import { DynamicFormErrors } from './dynamic-form-errors.types';

export interface DynamicFormElement<M> {
  id: string;
  type: '_description_' | string;

  label?: string;
  placeholder?: string;
  meta?: M;
  options?: DynamicFormElementOption[];
  dependsOn?: DynamicFormElementRelationship[];
  validators?: DynamicFormValidator[];
  errors?: DynamicFormErrors;
}
