import { DynamicFormComponentMap } from '@elemental-concept/ngx-dynamic-form';

import { MaterialInputMeta } from './types';

import {
  CheckboxInputComponent,
  DescriptionComponent,
  MultiSelectInputComponent,
  RadioInputComponent,
  SelectInputComponent,
  StringInputComponent,
  TextInputComponent
} from './components';

export const materialComponentMap: DynamicFormComponentMap<MaterialInputMeta> = {
  string: StringInputComponent,
  number: StringInputComponent,
  email: StringInputComponent,
  tel: StringInputComponent,
  url: StringInputComponent,
  password: StringInputComponent,
  select: SelectInputComponent,
  multiselect: MultiSelectInputComponent,
  text: TextInputComponent,
  checkbox: CheckboxInputComponent,
  radio: RadioInputComponent,
  _description_: DescriptionComponent
};
