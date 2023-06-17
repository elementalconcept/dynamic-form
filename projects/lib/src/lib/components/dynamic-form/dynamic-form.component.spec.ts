import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent<unknown, unknown>;
  let fixture: ComponentFixture<DynamicFormComponent<unknown, unknown>>;

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [ DynamicFormComponent ]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should generate correct configuration on ngInit (something)',
    fakeAsync(() => {
      component.config = {
        elements: [
          {
            id: 'title',
            label: 'Title',
            type: 'string',
            validators: [ { type: 'required' } ],
            errors: { required: 'Title is required' }
          },
          {
            id: 'checkbox',
            label: 'Title is set. Correct?',
            type: 'checkbox',
            dependsOn: [
              { id: 'title', type: 'set' }
            ]
          }
        ]
      };

      component.value = { title: '', checkbox: false };
      component.componentMap = {};

      component.ngOnInit();

      tick(250);

      expect(component.formReady).toBeTrue();

      expect(component.formGroup).toBeDefined();
      expect(component.formGroup.value).toEqual({ title: '', checkbox: false });
    })
  );
});
