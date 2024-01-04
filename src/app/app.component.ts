import { Component } from '@angular/core';

import { DynamicFormComponentStatus, DynamicFormComponentValue } from '@elemental-concept/dynamic-form';

import { customComponentMap, customConfig, customValue, FormValue } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  customConfig = customConfig;

  customValue = customValue;
  customComponentMap = customComponentMap;
  customStatus: string;
  customFormValue: FormValue = customValue;

  constructor() {
  }

  onCustomStatusChanges = (data: DynamicFormComponentStatus<FormValue>) => this.customStatus = data.status;

  onCustomValueChanges = (data: DynamicFormComponentValue<FormValue>) => this.customFormValue = data.value as FormValue;
}
