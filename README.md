# Dynamic Form

This library generates Angular `FormGroup` and related DOM from a specified JSON configuration. Such configuration can
either be baked in into the application or received dynamically from back-end. Exact form input fields are NOT part of
the library and must be provided by a library user. A set of Material based input components can be found in
[Material Components For Dynamic Form](https://github.com/elementalconcept/dynamic-form-material/)
.
`Dynamic Form 1.x` is only compatible with Angular v13 v14 and v15.

## Installation

Install the library through NPM:

```shell
$ npm i @elemental-concept/dynamic-form
```

`DynamicFormModule` should be included into your Angular modules automatically by IDE. If your IDE doesn't support such
functionality, don't forget to add it manually:

```typescript
import { DynamicFormModule } from '@elemental-concept/dynamic-form';

@NgModule({
  imports: [
    DynamicFormModule
  ]
})
class SomeModule {
}
```

## Usage

The library provides `DynamicFormComponent` and `DynamicFormFactoryService` to generate forms in run-time. In most
cases `DynamicFormComponent` should be used directly. `DynamicFormFactoryService` can be used to create a completely
custom solution when supplied component is not enough.

Please note that `@elemental-concept/dynamic-form` DOES NOT provide any compatible input components!
You should either provide your own input components or use a component library like
[@elemental-concept/dynamic-form-material](https://github.com/elementalconcept/dynamic-form-material).

`DynamicFormComponent` expects form configuration, form value and optional input component mapping. Form configuration
describes all fields, their labels, validations, etc in a simple format. Value is a regular key-value map as used
by `FormGroup`. `DynamicFormComponent` also provides a set of events for application to react to data and state changes.
Additionally, custom HTML can be placed inside the form if needed.

### Simple Example

```angular2html
<!-- my-form.component.html -->
<dynamic-form [config]="config" [value]="value"></dynamic-form>
```

```typescript
// my-form.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: [ './my-form.component.scss' ]
})
export class MyFormComponent {
  config = {
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

  value = {
    firstName: 'John',
    lastName: 'Doe'
  };
}
```

### Adding Custom HTML To The Form

`DynamicFormComponent` has 4 content slots which can be used to annotate and decorate the form according to the design.
One of these slots should also contain submit button if required. Slots are specified by CSS classes:

- `before-form` - content will be placed befor `<form>` tag.
- `form-header` - content will be placed at the start of `<form>` tag.
- `form-footer` - content will be placed at the end of `<form>` tag.
- `after-form` - content will be placed after `<form>` tag.

```angular2html
<!-- my-form.component.html -->
<ecdf-dynamic-form [config]="config" [value]="value">

  <h3 class="before-form">Sign-up form</h3>

  <p class="form-header">All fields are mandatory</p>

  <div class="form-footer">
    <button>Sign up now!</button>
  </div>

  <p class="after-form">Terms and conditions.</p>

</ecdf-dynamic-form>
```

This will render the following structure:

```html
<h3 class="before-form">Sign-up form</h3>

<form>

  <p class="form-header">All fields are mandatory</p>

  <!-- FORM FIELDS RENDERED HERE DYNAMICALLY -->

  <div class="form-footer">
    <button>Sign up now!</button>
  </div>

</form>

<p class="after-form">Terms and conditions.</p>
```

## API

### DynamicFormComponent

`@Input config: DynamicFormConfig<M>`

Required. Specifies a configuration of input fields and related data. Please check `DynamicFormConfig` section for more
info.

`@Input value: { [ key: string ]: any }`

Required. Value of the form. Can be an empty object `{}`.

`@Input componentMap: DynamicFormComponentMap<M>`

Mapping between textual input types like `string` and `checkbox` to actual Angular components. This mapping should be
provided either by component library like _Material Components For Dynamic Form_ or by the app developer manually.
Check `DynamicFormComponentMap` section for more info.

`@Output valueChanges: EventEmitter<DynamicFormComponentValue>`

Fires an event each time there are any changes to a form value.

`@Output statusChanges: EventEmitter<DynamicFormComponentStatus>`

Fires an event each time there are any status changes to a form.

`@Output formSubmit: EventEmitter<DynamicFormComponentValue>`

Fires an event when the user submits the form.

### DynamicFormConfig<M>

This is where all the magic happens. This configuration allows developers to describe forms of varying complexities to
suit most needs. Each form element describes basic attributes like id and label as well as validations, relationships
between different form elements, error messages, etc. `M` describes meta information format used by the chosen set of
components. Meta information allows for additional input component customisation, like CSS classes, etc.

```typescript
interface DynamicFormConfig<M> {
  elements: DynamicFormElement<M>[];

  endpoint?: string;
  textTransformer?: (message: string) => string;
}

interface DynamicFormElement<M> {
  id: string;
  type: '_description_' | string;

  disabled?: boolean;
  label?: string;
  placeholder?: string;
  updateOn?: 'change' | 'blur' | 'submit';
  meta?: M;
  options?: DynamicFormElementOption[];
  dependsOn?: DynamicFormElementRelationship[];
  validators?: DynamicFormValidator[];
  errors?: DynamicFormErrors;
}
```

Required attributes:

- `id` - unique ID of a form field, for example, `password` or `email`.
  component library.
- `type` - type of form field. Types depend on a form component library. `Dynamic Form` does not care about types at all
  as it does not render the final HTML into the view.

Optional attributes:

- `disabled` - change the status of the form element to be readonly or editable
- `label` - label to show next to the form field. Exact location and presentation of the label will depend on form
- `placeholder` - can be used by a component library to display a placeholder when form field value is empty.
- `meta` - a set of meta attributes which are passed directly to a component library without any modifications. Meta
  handling is completely dependent on a component library.
- `options` - list of possible values for a form field. Behaviour depends on a component library.
- `dependsOn` - list of dependencies which control when form field will be visible. For example, a text input field
  might only appear when a check box is selected. `dependsOn` allows you to express such behaviour.
- `validators` - a set of Angular form validators to be applied to a form field.
- `errors` - a set of error messages to show when validations fail.
- `updateOn` - when to send update events.

Example:

```typescript
{
  elements:
  [
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
  ];
}
```

### DynamicFormElementOption

```typescript
interface DynamicFormElementOption {
  label: string;
  value: any;
}
```

- `label` - label of an option visible to the end user.
- `value` - value of an option which will be assigned to the form field when a user selects it.

### DynamicFormElementRelationship

`Dynamic Form` allows specifying basic relationships between form fields. All relationships in a set are merged
with `AND` logical operation. Five operations are available:

- `equals`
- `lessThan`
- `moreThan`
- `set`
- `notSet`

Example

```typescript
{
  elements:
  [
    {
      id: 'subscribe',
      label: 'Do you wish to subscribe to our newsletter?',
      type: 'checkbox'
    },
    {
      id: 'email',
      label: 'Your e-mail for newsletter subscription',
      type: 'email',
      validators: [ { type: 'email' } ],
      dependsOn: [ { id: 'subscribe', type: 'set' } ]
    }
  ];
}
```

In this example `email` field will only be presented to the user when check box `subscribe` is checked.

Complete interface reference:

```typescript
interface DynamicFormElementRelationshipCommon {
  id: string;
}

interface DynamicFormElementRelationshipEquals extends DynamicFormElementRelationshipCommon {
  type: 'equals';
  value: any;
}

interface DynamicFormElementRelationshipLessThan extends DynamicFormElementRelationshipCommon {
  type: 'lessThan';
  value: number;
}

interface DynamicFormElementRelationshipMoreThan extends DynamicFormElementRelationshipCommon {
  type: 'moreThan';
  value: number;
}

interface DynamicFormElementRelationshipIsSet extends DynamicFormElementRelationshipCommon {
  type: 'set';
}

interface DynamicFormElementRelationshipIsNotSet extends DynamicFormElementRelationshipCommon {
  type: 'notSet';
}

type DynamicFormElementRelationship =
  | DynamicFormElementRelationshipEquals
  | DynamicFormElementRelationshipLessThan
  | DynamicFormElementRelationshipMoreThan
  | DynamicFormElementRelationshipIsSet
  | DynamicFormElementRelationshipIsNotSet;
```

### DynamicFormValidator

Describes an Angular form validator to be assigned to a form field. It's just one-to-one mapping to existing validators.
Custom validators are not supported yet.

Example:

```typescript
{
  elements:
  [
    {
      id: 'email',
      label: 'E-mail',
      type: 'email',
      validators: [ { type: 'required' }, { type: 'email' } ]
    }
  ];
}
```

This is equal to:

```typescript
new FormGroup({
  email: new FormControl('', [ Validators.required, Validators.email ])
});
```

Complete interface reference:

```typescript
interface DynamicFormValidatorMin {
  type: 'min';
  value: number;
}

interface DynamicFormValidatorMax {
  type: 'max';
  value: number;
}

interface DynamicFormValidatorRequired {
  type: 'required';
}

interface DynamicFormValidatorRequiredTrue {
  type: 'requiredTrue';
}

interface DynamicFormValidatorEmail {
  type: 'email';
}

interface DynamicFormValidatorMinLength {
  type: 'minLength';
  length: number;
}

interface DynamicFormValidatorMaxLength {
  type: 'maxLength';
  length: number;
}

interface DynamicFormValidatorPattern {
  type: 'pattern';
  pattern: string;
  errorCode: string;
}

export interface DynamicFormValidatorEqualTo {
  type: 'equalTo';
  field: string;
}

type DynamicFormValidator =
  | DynamicFormValidatorMin
  | DynamicFormValidatorMax
  | DynamicFormValidatorRequired
  | DynamicFormValidatorRequiredTrue
  | DynamicFormValidatorEmail
  | DynamicFormValidatorPattern
  | DynamicFormValidatorEqualTo;
```

### DynamicFormErrors

```typescript
interface DynamicFormErrors {
  [key: string]: string;
}
```

A simple key-value map between error codes and their messages.

## Creating Custom Input Components

This section is not finished yet. Please check the source code in the sample app on how it's done as well as
[@elemental-concept/dynamic-form-material](https://github.com/elementalconcept/dynamic-form-material)
mentioned earlier.
