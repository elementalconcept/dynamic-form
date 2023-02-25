import { TestBed } from '@angular/core/testing';
import { UntypedFormControl, Validators } from '@angular/forms';

import { DynamicFormFactoryService } from './dynamic-form-factory.service';
import { DynamicFormValidators } from './dynamic-form-validators';

describe('DynamicFormFactoryService', () => {
  let service: DynamicFormFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create correct validators', () => {
    spyOn(Validators, 'min').and.callThrough();
    spyOn(Validators, 'max').and.callThrough();
    spyOn(Validators, 'pattern').and.callThrough();
    spyOn(DynamicFormValidators, 'equalTo').and.callThrough();

    expect(service.getValidator({ type: 'required' })).toBe(Validators.required);
    expect(service.getValidator({ type: 'requiredTrue' })).toBe(Validators.requiredTrue);
    expect(service.getValidator({ type: 'email' })).toBe(Validators.email);

    expect(service.getValidator({ type: 'min', value: 10 })).toBeInstanceOf(Function);
    expect(Validators.min).toHaveBeenCalledWith(10);

    expect(service.getValidator({ type: 'max', value: 100 })).toBeInstanceOf(Function);
    expect(Validators.max).toHaveBeenCalledWith(100);

    expect(service.getValidator({ type: 'pattern', pattern: 'abc' })).toBeInstanceOf(Function);
    expect(Validators.pattern).toHaveBeenCalledWith('abc');

    expect(service.getValidator({ type: 'equalTo', field: 'password' })).toBeInstanceOf(Function);
    expect(DynamicFormValidators.equalTo).toHaveBeenCalledWith('password');

    expect(service.getValidator({ type: null })).toEqual(null);
  });

  it('should return FormControl instance', () => {
    expect(service.createFormControl('', [])).toBeInstanceOf(UntypedFormControl);
  });
});
