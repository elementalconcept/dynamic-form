import { TestBed } from '@angular/core/testing';

import { NgxDynamicFormMaterialService } from './ngx-dynamic-form-material.service';

describe('NgxDynamicFormMaterialService', () => {
  let service: NgxDynamicFormMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicFormMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
