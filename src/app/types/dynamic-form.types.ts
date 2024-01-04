import { DynamicFormComponentMap, DynamicFormConfig } from '@elemental-concept/dynamic-form';

import { StringInputComponent } from '../components';

export interface FormValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  misc: string;
}

export const customConfig: DynamicFormConfig<FormValue> = {
  textTransformer: key => `transform: ${key}`,
  elements: [
    {
      id: 'firstName',
      label: 'firstName',
      type: 'string',
      validators: [ { type: 'required' } ]
    },
    {
      id: 'lastName',
      label: 'lastName',
      type: 'string',
      validators: [ { type: 'required' } ]
    },
    {
      id: 'email',
      label: 'email',
      type: 'email',
      validators: [ { type: 'required' }, { type: 'email' } ]
    },
    {
      id: 'password',
      label: 'password',
      type: 'password',
      validators: [ { type: 'required' } ]
    },
    {
      id: 'misc',
      label: 'misc',
      type: 'string',
      dependsOn: [
        { id: 'firstName', type: 'equals', value: 'test' }
      ]
    }
  ]
};

export const customValue: FormValue = {
  firstName: 'Me',
  lastName: 'Myself',
  email: '',
  password: '',
  misc: ''
};

export const customComponentMap: DynamicFormComponentMap<unknown> = {
  string: StringInputComponent,
  number: StringInputComponent,
  email: StringInputComponent,
  tel: StringInputComponent,
  url: StringInputComponent,
  password: StringInputComponent
};
