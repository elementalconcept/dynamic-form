import { Component } from '@angular/core';

import { DynamicFormComponentStatus, DynamicFormComponentValue } from '@elemental-concept/ngx-dynamic-form';
import { materialComponentMap } from '@elemental-concept/ngx-dynamic-form-material';

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
  customStatus: string;
  customFormValue = {};

  materialConfig = materialConfig;
  materialValue = materialValue;
  materialComponentMap = materialComponentMap;
  materialStatus: string;
  materialFormValue = {};

  onCustomVStatusChanges = (data: DynamicFormComponentStatus) => this.customStatus = data.status;
  onMaterialChanges = (data: DynamicFormComponentStatus) => this.materialStatus = data.status;

  onCustomValueChanges = (data: DynamicFormComponentValue) => this.customFormValue = data.value;
  onMaterialValueChanges = (data: DynamicFormComponentValue) => this.materialFormValue = data.value;
}
