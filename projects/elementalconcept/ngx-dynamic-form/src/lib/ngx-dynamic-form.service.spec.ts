import { TestBed } from '@angular/core/testing';

import { NgxDynamicFormService } from './ngx-dynamic-form.service';

describe('NgxDynamicFormService', () => {
  let service: NgxDynamicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
