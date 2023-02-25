import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { DynamicFormModule } from '@elemental/dynamic-form';

import { MultiSelectInputComponent } from './multi-select-input.component';

describe('MultiSelectInputComponent', () => {
  let component: MultiSelectInputComponent;
  let fixture: ComponentFixture<MultiSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectInputComponent ],
      imports: [
        DynamicFormModule
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectInputComponent);
    component = fixture.componentInstance;
    component.config = {
      id: 'multiselect',
      label: 'multiselect',
      type: 'multiselect'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
