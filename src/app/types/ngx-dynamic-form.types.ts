import { DynamicFormComponentMap, DynamicFormConfig } from '@elementalconcept/ngx-dynamic-form';

import { StringInputComponent } from '../components';

export const customConfig: DynamicFormConfig<unknown> = {
  elements: [
    {
      id: 'firstName',
      label: 'First name',
      type: 'string',
      validators: [ { type: 'required' } ]
    },
    {
      id: 'lastName',
      label: 'Last name',
      type: 'string',
      validators: [ { type: 'required' } ]
    },
    {
      id: 'email',
      label: 'E-mail',
      type: 'email',
      validators: [ { type: 'required' }, { type: 'email' } ]
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      validators: [ { type: 'required' } ]
    },
    {
      id: 'misc',
      label: 'Misc',
      type: 'string',
      dependsOn: [
        { id: 'firstName', type: 'equals', value: 'Aux' }
      ]
    }
  ]
};

export const customValue = {
  firstName: 'Me',
  lastName: 'Myself'
};

export const customComponentMap: DynamicFormComponentMap<unknown> = {
  string: StringInputComponent,
  number: StringInputComponent,
  email: StringInputComponent,
  tel: StringInputComponent,
  url: StringInputComponent,
  password: StringInputComponent
};
