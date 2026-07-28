import { Component } from '@angular/core';

import { DynamicFormComponentStatus, DynamicFormComponentValue } from '@elemental-concept/dynamic-form';

import { customComponentMap, customConfig, customValue, FormValue } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  standalone: false
})
export class AppComponent {
  // set config
  customConfig = customConfig(key => key);

  customValue = customValue;

  customComponentMap = customComponentMap;

  customStatus = 'INVALID';

  customFormValue: FormValue = customValue;

  onCustomVStatusChanges = (data: DynamicFormComponentStatus<FormValue>) => this.customStatus = data.status;

  onCustomValueChanges = (data: DynamicFormComponentValue<FormValue>) => this.customFormValue = data.value as FormValue;
}
