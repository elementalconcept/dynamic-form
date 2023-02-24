import { DynamicFormConfig } from '@elemental-concept/ngx-dynamic-form';

import { MaterialInputMeta } from '@elemental-concept/ngx-dynamic-form-material';

export const materialConfig: DynamicFormConfig<MaterialInputMeta> = {
  elements: [
    {
      id: 'title',
      label: 'This is a string input',
      type: 'string',
      validators: [ { type: 'required' } ],
      errors: { required: 'Title is required' }
    },
    {
      id: 'body',
      label: 'This is a text area',
      type: 'text'
    },
    {
      id: 'number',
      label: 'This is a number input',
      type: 'number',
      validators: [ { type: 'pattern', pattern: '^-?\\d*(\\.\\d+)?$' } ],
      errors: { pattern: 'Not a valid number' }
    },
    {
      id: 'email',
      label: 'This is a email input',
      type: 'email',
      validators: [ { type: 'email' } ],
      errors: { email: 'Not a valid email' }
    },
    {
      id: 'tel',
      label: 'This is a tel input',
      type: 'tel'
    },
    {
      id: 'url',
      label: 'This is a url input',
      type: 'url'
    },
    {
      id: 'password',
      label: 'This is a password input',
      type: 'password',
      validators: [
        { type: 'required' },
        { type: 'minLength', length: 8 },
        {
          type: 'patternList',
          patterns: [
            { type: 'pattern', pattern: '[0-9]', errorLabel: 'hasNumber' },
            { type: 'pattern', pattern: '[A-Z]', errorLabel: 'hasUpperCase' },
            { type: 'pattern', pattern: '[a-z]', errorLabel: 'hasLowerCase' },
            { type: 'pattern', pattern: '[!@#&():;\',?*~`$^+=<>._%-]', errorLabel: 'hasSpecialCharacters' },
            { type: 'pattern', pattern: '^\\S*$', errorLabel: 'noWhitespace' }
          ]
        }
      ],
      errors: {
        required: 'Please type your password',
        hasNumber: 'Must contain at least 1 number',
        hasUpperCase: 'Must contain at least 1 in upper case',
        hasLowerCase: 'Must contain at least 1 in lower case',
        hasSpecialCharacters: 'Must contain at least 1 of the special characters: !@#&():;\',?*~`$^+=<>._%-',
        noWhitespace: 'Must NOT contain space',
        minLength: 'Must be at least 8 characters'
      }
    },
    {
      id: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      validators: [
        { type: 'required' },
        { type: 'minLength', length: 8 },
        { type: 'equalTo', field: 'password' },
        {
          type: 'patternList',
          patterns: [
            { type: 'pattern', pattern: '[0-9]', errorLabel: 'hasNumber' },
            { type: 'pattern', pattern: '[A-Z]', errorLabel: 'hasUpperCase' },
            { type: 'pattern', pattern: '[a-z]', errorLabel: 'hasLowerCase' },
            { type: 'pattern', pattern: '[!@#&():;\',?*~`$^+=<>._%-]', errorLabel: 'hasSpecialCharacters' },
            { type: 'pattern', pattern: '^\\S*$', errorLabel: 'noWhitespace' }
          ]
        }
      ],
      errors: {
        required: 'Please type your password',
        equalTo: 'The two password must be the same',
        hasNumber: 'Must contain at least 1 number',
        hasUpperCase: 'Must contain at least 1 in upper case',
        hasLowerCase: 'Must contain at least 1 in lower case',
        hasSpecialCharacters: 'Must contain at least 1 of the special characters: !@#&():;\',?*~`$^+=<>._%-',
        noWhitespace: 'Must NOT contain space',
        minLength: 'Must be at least 8 characters'
      }
    },
    {
      id: 'description1',
      type: '_description_',
      label: '',
      meta: {
        htmlDescription: '<strong>Hello!</strong> This should render <em>HTML</em>.'
      }
    },
    {
      id: 'checkbox',
      label: 'I accept the ',
      type: 'checkbox',
      meta: {
        color: 'primary',
        externalLink: {
          label: 'terms and conditions',
          url: 'https://www.google.com'
        },
        hideRequiredMarker: true
      },
      validators: [ { type: 'requiredTrue' } ],
      errors: { required: 'This flag is required' }
    },
    {
      id: 'checkbox-2',
      label: 'Do you want to receive marketing emails?',
      type: 'checkbox',
      dependsOn: [
        { id: 'checkbox', type: 'equals', value: true }
      ]
    },
    {
      id: 'radio1',
      type: 'radio',
      label: 'This a radio label',
      options: [
        { value: '1', label: 'Uno' },
        { value: '2', label: 'Due' },
        { value: '3', label: 'Tre' }
      ]
    },
    {
      id: 'radio2',
      type: 'radio',
      options: [
        { value: '1', label: 'Uno' },
        { value: '2', label: 'Due' },
        { value: '3', label: 'Tre' }
      ]
    },
    {
      id: 'select1',
      label: 'Type',
      type: 'select',
      validators: [ { type: 'required' } ],
      options: [
        { value: '1', label: 'Normal' },
        { value: '2', label: 'VIP' },
        { value: '3', label: 'Restricted' }
      ],
      errors: { required: 'Type is required' }
    },
    {
      id: 'select2',
      label: 'This is a multi select input',
      type: 'multiselect',
      options: [
        { value: '1', label: 'Normal' },
        { value: '2', label: 'VIP' },
        { value: '3', label: 'Restricted' }
      ]
    }
  ]
};

export const materialValue = {};
