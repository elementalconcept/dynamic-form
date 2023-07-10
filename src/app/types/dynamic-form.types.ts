import { DynamicFormComponentMap, DynamicFormConfig } from '@elemental-concept/dynamic-form';

import { SelectInputComponent, StringInputComponent } from '../components';

export interface FormValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  misc: string;
}

export const customConfig: DynamicFormConfig<unknown, FormValue> = {
  textTransformer: message => `XXX: ${message}`,
  elements: [
    {
      id: 'firstName',
      label: 'module.auth.login.form.config.firstName',
      type: 'string',
      validators: [{ type: 'required' }]
    },
    {
      id: 'lastName',
      label: 'module.auth.login.form.config.lastName',
      type: 'string',
      validators: [{ type: 'required' }]
    },
    {
      id: 'email',
      label: 'module.auth.login.form.config.email',
      type: 'email',
      validators: [{ type: 'required' }, { type: 'email' }]
    },
    {
      id: 'password',
      label: 'module.auth.login.form.config.password',
      type: 'password',
      validators: [{ type: 'required' }]
    },
    {
      id: 'misc',
      label: 'module.auth.login.form.config.misc',
      type: 'string',
      dependsOn: [
        { id: 'firstName', type: 'equals', value: 'test' }
      ]
    },
    {
      id: 'select',
      label: 'Select',
      type: 'select',
      options: []
    }
  ]
};

export const customValue: FormValue = {
  firstName: 'Me',
  lastName: 'Myself',
  email: null,
  password: null,
  misc: null
};

export const customComponentMap: DynamicFormComponentMap<unknown, FormValue> = {
  string: StringInputComponent,
  number: StringInputComponent,
  email: StringInputComponent,
  tel: StringInputComponent,
  url: StringInputComponent,
  password: StringInputComponent,
  select: SelectInputComponent
};
