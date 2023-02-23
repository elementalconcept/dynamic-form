import { DynamicFormConfig } from '../lib/types/dynamic-form.config';

const simpleForm: DynamicFormConfig<void> = {
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
    }
  ]
};

const loginForm: DynamicFormConfig<void> = {
  elements: [
    {
      id: 'email',
      label: 'E-mail',
      type: 'string',
      validators: [ { type: 'required' }, { type: 'email' } ]
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      validators: [ { type: 'required' } ]
    },
    {
      id: 'remember',
      label: 'Remember me',
      type: 'checkbox'
    }
  ]
};

const eventForm: DynamicFormConfig<string> = {
  elements: [
    {
      id: 'name',
      label: 'Event name',
      type: 'string',
      validators: [ { type: 'required' } ]
    },
    {
      id: 'location',
      label: 'Event location',
      type: 'coords',
      meta: 'google-maps'
    },
    {
      id: 'date',
      label: 'Event date',
      type: 'date',
      validators: [ { type: 'required' } ]
    },
    {
      id: 'allDay',
      label: 'All day',
      type: 'checkbox'
    },
    {
      id: 'time',
      label: 'Time',
      type: 'time',
      dependsOn: [
        { id: 'allDay', type: 'set' }
      ]
    }
  ]
};
