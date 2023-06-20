import { DynamicFormElement } from './dynamic-form-element.types';

export interface DynamicFormConfig<M> {
  elements: DynamicFormElement<M>[];

  endpoint?: string;
  textTransformer?: (message: string) => string;
}
