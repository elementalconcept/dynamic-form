import { TestBed } from '@angular/core/testing';

import { TranslationFilterService } from './translation-filter.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('TranslationFilterService', () => {
  let service: TranslationFilterService;

  let translateService;

  beforeEach(() => {
    translateService = {
      stream: of([ 'test' ])
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: translateService }
      ]
    });
    service = TestBed.inject(TranslationFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
