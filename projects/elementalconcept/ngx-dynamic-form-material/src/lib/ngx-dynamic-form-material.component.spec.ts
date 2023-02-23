import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicFormMaterialComponent } from './ngx-dynamic-form-material.component';

describe('NgxDynamicFormMaterialComponent', () => {
  let component: NgxDynamicFormMaterialComponent;
  let fixture: ComponentFixture<NgxDynamicFormMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDynamicFormMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDynamicFormMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
