import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { DynamicFormElement } from '../../types/dynamic-form-element.types';
import { DynamicFormConfig } from '../../types/dynamic-form.config';

@Injectable({ providedIn: 'root' })
export class TranslationFilterService {
  constructor(private readonly translate: TranslateService) {
  }

  wrap = <M, V>(config: DynamicFormConfig<M, V>): Observable<DynamicFormConfig<M, V>> =>
    this.translate
      .stream(this.collectKeys(config))
      .pipe(map(translations => this.updateTranslations(config, translations)));

  private collectKeys = <M, V>(config: DynamicFormConfig<M, V>): string[] =>
    config.elements.reduce(
      (acc, element) => {
        acc.push(element.label);

        if (typeof element.placeholder === 'string') {
          acc.push(element.placeholder);
        }

        if (element.options instanceof Array) {
          element.options.forEach(option => acc.push(option.label));
        }

        if (element.errors instanceof Object) {
          Object.keys(element.errors).forEach(key => acc.push(element.errors[key]));
        }

        // this is used for the checkbox input with external link (example: accept Terms and Conditions)
        if (
          (element.meta as any)?.externalLink instanceof Object
          && typeof (element.meta as any).externalLink.label === 'string'
        ) {
          acc.push((element.meta as any).externalLink.label);
        }

        return acc;
      },
      []
    );

  private updateTranslations = <M, V>(
    config: DynamicFormConfig<M, V>,
    translations: { [key: string]: string; }
  ): DynamicFormConfig<M, V> => {
    return {
      ...config,

      elements: config.elements.map(element => {
        const result: DynamicFormElement<M, V> = {
          ...element,
          label: translations[element.label]
        };

        if (typeof element.placeholder === 'string') {
          result.placeholder = translations[element.placeholder];
        }

        if (element.options instanceof Array) {
          result.options = element.options.map(option => ({ ...option, label: translations[option.label] }));
        }

        if (element.errors instanceof Object) {
          result.errors = Object.keys(element.errors)
            .reduce(
              (acc, key) => ({
                ...acc,
                [key]: translations[element.errors[key]]
              }),
              {}
            );
        }

        if (
          (element.meta as any)?.externalLink instanceof Object
          && typeof (element.meta as any).externalLink.label === 'string'
        ) {
          (result.meta as any).externalLink.label = translations[(element.meta as any).externalLink.label];
        }

        return result;
      })
    };
  };
}
