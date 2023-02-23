export interface DynamicFormElementRelationshipCommon {
  id: string;
}

export interface DynamicFormElementRelationshipEquals extends DynamicFormElementRelationshipCommon {
  type: 'equals';
  value: any;
}

export interface DynamicFormElementRelationshipLessThan extends DynamicFormElementRelationshipCommon {
  type: 'lessThan';
  value: number;
}

export interface DynamicFormElementRelationshipMoreThan extends DynamicFormElementRelationshipCommon {
  type: 'moreThan';
  value: number;
}

export interface DynamicFormElementRelationshipIsSet extends DynamicFormElementRelationshipCommon {
  type: 'set';
}

export interface DynamicFormElementRelationshipIsNotSet extends DynamicFormElementRelationshipCommon {
  type: 'notSet';
}

export type DynamicFormElementRelationship =
  DynamicFormElementRelationshipEquals |
  DynamicFormElementRelationshipLessThan |
  DynamicFormElementRelationshipMoreThan |
  DynamicFormElementRelationshipIsSet |
  DynamicFormElementRelationshipIsNotSet;
