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
  pattern: string;
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
  | DynamicFormValidatorEqualTo;
