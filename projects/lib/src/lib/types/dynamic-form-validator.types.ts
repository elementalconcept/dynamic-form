export interface DynamicFormValidatorMin {
  type: 'min';
  value: number;
}

export interface DynamicFormValidatorMax {
  type: 'max';
  value: number;
}

export interface DynamicFormValidatorRequired {
  type: 'required';
}

export interface DynamicFormValidatorRequiredTrue {
  type: 'requiredTrue';
}

export interface DynamicFormValidatorEmail {
  type: 'email';
}

export interface DynamicFormValidatorMinLength {
  type: 'minLength';
  length: number;
}

export interface DynamicFormValidatorMaxLength {
  type: 'maxLength';
  length: number;
}

export interface DynamicFormValidatorPattern {
  type: 'pattern';
  pattern: string | RegExp;
  errorCode: string;
}

export interface DynamicFormValidatorPatternList {
  type: 'patternList';
  patterns: DynamicFormValidatorPattern[];
}

export interface DynamicFormValidatorEqualTo {
  type: 'equalTo';
  field: string;
}

export interface DynamicFormValidatorMoreThanDate {
  type: 'moreThanDate';
  field: string;
}

export interface DynamicFormValidatorLessThanDate {
  type: 'lessThanDate';
  field: string;
}

export type DynamicFormValidator =
  | DynamicFormValidatorMin
  | DynamicFormValidatorMinLength
  | DynamicFormValidatorMax
  | DynamicFormValidatorMaxLength
  | DynamicFormValidatorRequired
  | DynamicFormValidatorRequiredTrue
  | DynamicFormValidatorEmail
  | DynamicFormValidatorPattern
  | DynamicFormValidatorPatternList
  | DynamicFormValidatorEqualTo
  | DynamicFormValidatorMoreThanDate
  | DynamicFormValidatorLessThanDate;
