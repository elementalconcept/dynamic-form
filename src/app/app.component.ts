import { Component } from '@angular/core';

import {
  DynamicFormComponentStatus,
  DynamicFormComponentValue,
  DynamicFormConfig,
  TranslationFilterService
} from '@elemental-concept/dynamic-form';

import { Observable } from 'rxjs';

import { customComponentMap, customConfig, customValue, FormValue } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  customConfig$: Observable<DynamicFormConfig<unknown>>;

  customValue = customValue;
  customComponentMap = customComponentMap;
  customStatus: string;
  customFormValue: FormValue = customValue;

  constructor(private readonly translationFilterService: TranslationFilterService) {
    this.customConfig$ = this.translationFilterService.wrap(customConfig);
  }

  onCustomVStatusChanges = (data: DynamicFormComponentStatus) => this.customStatus = data.status;

  onCustomValueChanges = (data: DynamicFormComponentValue) => this.customFormValue = data.value as FormValue;
}
