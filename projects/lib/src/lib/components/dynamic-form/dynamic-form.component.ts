import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';

import { asapScheduler, combineLatest, noop, ReplaySubject, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { DynamicFormFactoryService } from '../../services';

import {
  DYNAMIC_FORM_COMPONENT_MAP,
  DynamicForm,
  DynamicFormComponentDescriptor,
  DynamicFormComponentMap,
  DynamicFormComponentStatus,
  DynamicFormComponentValue,
  DynamicFormConfig,
  DynamicFormElementRelationship
} from '../../types';

@UntilDestroy()
@Component({
  selector: 'dynamic-form[config][value]',
  templateUrl: './dynamic-form.component.html',
  styleUrls: [ './dynamic-form.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DynamicFormComponent<M, V> implements OnInit {
  formGroup: FormGroup<Record<keyof V, AbstractControl>>;

  formReady: boolean;

  private readonly config$ = new ReplaySubject<DynamicFormConfig<M>>(1);

  private readonly value$ = new ReplaySubject<V>(1);

  private readonly componentMap$ = new ReplaySubject<DynamicFormComponentMap<M>>(1);

  private readonly dynamicForm$ = new ReplaySubject<DynamicForm<M, V>>(1);

  private readonly formRef$ = new ReplaySubject<ViewContainerRef>(1);

  private valueChangesSub: Subscription;

  private statusChangesSub: Subscription;

  constructor(
    private readonly dynamicFormFactory: DynamicFormFactoryService,
    @Inject(DYNAMIC_FORM_COMPONENT_MAP) componentMap: DynamicFormComponentMap<M>
  ) {
    this.componentMap$.next(componentMap);
  }

  @ViewChild('formElement', { static: false, read: ViewContainerRef })
  set formRef(formRef: ViewContainerRef) {
    this.formRef$.next(formRef);
  }

  @Input()
  set config(config: DynamicFormConfig<M>) {
    this.config$.next(config);
  }

  @Input()
  set value(value: V) {
    this.value$.next(value);
  }

  @Input()
  set componentMap(componentMap: DynamicFormComponentMap<M>) {
    this.componentMap$.next(componentMap);
  }

  @Output()
  valueChanges = new EventEmitter<DynamicFormComponentValue<V>>();

  @Output()
  statusChanges = new EventEmitter<DynamicFormComponentStatus<V>>();

  @Output()
  formSubmit = new EventEmitter<DynamicFormComponentValue<V>>();

  ngOnInit(): void {
    // Config can be null/undefined, for example, it's being transferred over the wire.
    // If it's not ready, we should hide form contents.
    this.formReady = false;

    // We only want to create a new form when config is changed.
    // But we need other streams to have data as well, so we start from config$,
    // and then we wait for other streams with combineLatest().
    this.config$
      .pipe(
        switchMap(config =>
          combineLatest([ this.value$, this.componentMap$ ])
            .pipe(map(([ value, componentMap ]) =>
              [ config, value, componentMap ] as [ DynamicFormConfig<M>, V, DynamicFormComponentMap<M> ]
            ))
        ),
        tap(() => this.valueChangesSub instanceof Object ? this.valueChangesSub.unsubscribe() : noop()),
        tap(() => this.statusChangesSub instanceof Object ? this.statusChangesSub.unsubscribe() : noop()),
        // formReady depends on the value of config.
        tap(([ config ]) => this.formReady = config instanceof Object),
        // No need to create anything if form is not ready.
        filter(() => this.formReady),
        untilDestroyed(this)
      )
      .subscribe(this.createForm);

    // If form value was changed programmatically, we reflect such changes here.
    this.value$
      .pipe(
        filter(() => this.formReady),
        untilDestroyed(this)
      )
      .subscribe(value => this.formGroup.patchValue(value as any));

    // We can only render a form in DOM when we have
    // both DOM node reference (controlled by formReady flag)
    // and dynamicForm (created by dynamicFormFactory in createForm()).
    combineLatest([ this.dynamicForm$, this.formRef$.pipe(filter(ref => ref !== undefined)) ])
      .pipe(
        delay(0, asapScheduler),
        untilDestroyed(this)
      )
      .subscribe(this.renderForm);
  }

  onSubmit = () => this.formSubmit.emit({ formGroup: this.formGroup, value: this.formGroup.value as V });

  private createForm = (
    [ config, value, componentMap ]: [ DynamicFormConfig<M>, V, DynamicFormComponentMap<M> ]
  ) => {
    const dynamicForm = this.dynamicFormFactory.createForm(config, value, componentMap);
    this.formGroup = dynamicForm.formGroup;

    this.statusChangesSub = this.formGroup
      .statusChanges
      .pipe(untilDestroyed(this))
      .subscribe(s =>
        this.statusChanges.emit({
          status: s,
          formGroup: this.formGroup
        })
      );

    this.valueChangesSub = this.formGroup
      .valueChanges
      .pipe(
        untilDestroyed(this),
        tap(this.handleRelationships)
      )
      .subscribe(v =>
        this.valueChanges.emit({
          value: v as V,
          formGroup: this.formGroup
        })
      );

    this.dynamicForm$.next(dynamicForm);
  };

  private renderForm = ([ dynamicForm, formRef ]: [ DynamicForm<M, V>, ViewContainerRef ]) => {
    if (formRef) {
      formRef.clear();
      dynamicForm.components.forEach(item => formRef.insert(item.component.hostView));
    }
  };

  handleRelationships = () => {
    this.dynamicForm$
      .pipe(take(1))
      .subscribe(dynamicForm =>
        dynamicForm.components
          .filter(item => item.config.dependsOn instanceof Array && item.config.dependsOn.length > 0)
          .forEach(item =>
            this.isComponentVisible(dynamicForm, item)
              ? item.component.instance.showControl()
              : item.component.instance.hideControl()
          )
      );
  };

  private isComponentVisible = (dynamicForm: DynamicForm<M, V>, item: DynamicFormComponentDescriptor<M>) =>
    item.config.dependsOn!.reduce(this.checkDependency(dynamicForm), true);

  private checkDependency =
    (dynamicForm: DynamicForm<M, V>) => (flag: boolean, dependsOn: DynamicFormElementRelationship) => {
      const parentValue = dynamicForm.formGroup.value[ dependsOn.id ];

      switch (dependsOn.type) {
        case 'equals':
          return flag && parentValue === dependsOn.value;

        case 'lessThan':
          return flag && parseFloat(parentValue) < dependsOn.value;

        case 'moreThan':
          return flag && parseFloat(parentValue) > dependsOn.value;

        case 'set':
          return flag && parentValue !== undefined && parentValue !== null && parentValue !== false;

        case 'notSet':
          return flag && (parentValue === undefined || parentValue === null || parentValue !== false);

        default:
          return flag;
      }
    };
}
