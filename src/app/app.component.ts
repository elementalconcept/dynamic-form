import { Component } from '@angular/core';

import { DynamicFormComponentStatus, DynamicFormComponentValue } from '@elementalconcept/ngx-dynamic-form';
import { materialComponentMap } from '@elementalconcept/ngx-dynamic-form-material';

import { customComponentMap, customConfig, customValue, materialConfig, materialValue } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  customConfig = customConfig;
  customValue = customValue;
  customComponentMap = customComponentMap;
  customStatus: DynamicFormComponentStatus;
  customFormValue: DynamicFormComponentValue;

  materialConfig = materialConfig;
  materialValue = materialValue;
  materialComponentMap = materialComponentMap;
  materialStatus: DynamicFormComponentStatus;
  materialFormValue: DynamicFormComponentValue;

  onCustomVStatusChanges = (status: DynamicFormComponentStatus) => this.customStatus = status;

  onCustomValueChanges = (value: DynamicFormComponentValue) => this.customFormValue = value;

  onMaterialChanges = (status: DynamicFormComponentStatus) => this.materialStatus = status;

  onMaterialValueChanges = (value: DynamicFormComponentValue) => this.materialFormValue = value;
}
