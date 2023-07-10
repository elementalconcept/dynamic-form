import { DynamicFormElement } from './dynamic-form-element.types';

export interface DynamicFormConfig<M, V> {
  elements: DynamicFormElement<M, V>[];

  endpoint?: string;
  textTransformer?: (message: string) => string;
}
