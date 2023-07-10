import { DynamicFormComponentMap, DynamicFormConfig } from '@elemental-concept/dynamic-form';

import { SelectInputComponent, StringInputComponent } from '../components';

export interface FormValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  misc: string;
  filter: string;
  select: number;
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
      id: 'filter',
      label: 'Filter',
      type: 'string'
    },
    {
      id: 'select',
      label: 'Select',
      type: 'select',
      options: [
        { value: 1, label: 'Assembly' },
        { value: 2, label: 'Bash' },
        { value: 3, label: 'C#' },
        { value: 4, label: 'Java' },
        { value: 5, label: 'JavaScript' },
        { value: 6, label: 'Perl' },
        { value: 7, label: 'Python' },
        { value: 8, label: 'Scala' },
        { value: 9, label: 'TypeScript' }
      ],
      optionsFilter: (oldValue, newValue, formElement, patchValue: (value: Partial<FormValue>) => void) => {
        console.log('optionsFilter');

        if (oldValue.filter === newValue.filter) {
          return formElement.filteredOptions;
        }

        const result = newValue.filter.trim().length === 0
          ? formElement.options
          : formElement.options.filter(o => o.label.includes(newValue.filter));

        if (result.length > 0) {
          patchValue({ [formElement.id]: result[0].value });
        }

        return result;
      }
    }
  ]
};

export const customValue: FormValue = {
  firstName: 'Me',
  lastName: 'Myself',
  email: null,
  password: null,
  misc: null,
  filter: '',
  select: 1
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
