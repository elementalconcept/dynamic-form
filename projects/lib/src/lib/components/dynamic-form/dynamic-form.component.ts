import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { asapScheduler, combineLatest, noop, ReplaySubject, Subscription, timer } from 'rxjs';
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
  styleUrls: []
})
export class DynamicFormComponent<M, V> implements OnInit {
  formGroup: FormGroup<Record<keyof V, AbstractControl>>;

  formReady: boolean;

  protected oldValue: V;

  private readonly config$ = new ReplaySubject<DynamicFormConfig<M, V> | null | undefined>(1);

  private readonly value$ = new ReplaySubject<V>(1);

  private readonly componentMap$ = new ReplaySubject<DynamicFormComponentMap<M, V>>(1);

  private readonly dynamicForm$ = new ReplaySubject<DynamicForm<M, V>>(1);

  private readonly formRef$ = new ReplaySubject<ViewContainerRef>(1);

  private valueChangesSub: Subscription;

  private statusChangesSub: Subscription;

  constructor(
    private readonly dynamicFormFactory: DynamicFormFactoryService,
    @Inject(DYNAMIC_FORM_COMPONENT_MAP) componentMap: DynamicFormComponentMap<M, V>
  ) {
    this.componentMap$.next(componentMap);
  }

  @ViewChild('formElement', { static: false, read: ViewContainerRef })
  set formRef(formRef: ViewContainerRef) {
    this.formRef$.next(formRef);
  }

  @Input()
  set config(config: DynamicFormConfig<M, V> | null | undefined) {
    const result = config instanceof Object
      ? {
        ...config,
        elements: config.elements.map(element => ({
          ...element,
          filteredOptions: element.options
        }))
      }
      : config;

    this.config$.next(result);
  }

  @Input()
  set value(value: V) {
    this.oldValue = value;
    this.value$.next(value);
  }

  @Input()
  set componentMap(componentMap: DynamicFormComponentMap<M, V>) {
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
        untilDestroyed(this),
        switchMap(config =>
          combineLatest([this.value$, this.componentMap$])
            .pipe(map(([value, componentMap]) => [config, value, componentMap]))
        ),
        tap(() => this.valueChangesSub instanceof Object ? this.valueChangesSub.unsubscribe() : noop()),
        tap(() => this.statusChangesSub instanceof Object ? this.statusChangesSub.unsubscribe() : noop()),
        // formReady depends on the value of config.
        tap(([config]) => this.formReady = config instanceof Object),
        // No need to create anything if form is not ready.
        filter(() => this.formReady)
      )
      .subscribe(this.createForm);

    // If form value was changed programmatically, we reflect such changes here.
    this.value$
      .pipe(
        untilDestroyed(this),
        filter(() => this.formReady)
      )
      .subscribe(value => this.formGroup.patchValue(value as any));

    // We can only render a form in DOM when we have
    // both DOM node reference (controlled by formReady flag)
    // and dynamicForm (created by dynamicFormFactory in createForm()).
    combineLatest([this.dynamicForm$, this.formRef$.pipe(filter(ref => ref !== undefined))])
      .pipe(
        untilDestroyed(this),
        delay(0, asapScheduler)
      )
      .subscribe(this.renderForm);
  }

  onSubmit = () => this.formSubmit.emit({ formGroup: this.formGroup, value: this.formGroup.value as V });

  private createForm = (
    [config, value, componentMap]: [DynamicFormConfig<M, V>, V, DynamicFormComponentMap<M, V>]
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

    this.filterOptions(dynamicForm);

    this.dynamicForm$.next(dynamicForm);
  };

  private renderForm = ([dynamicForm, formRef]: [DynamicForm<M, V>, ViewContainerRef]) => {
    if (formRef) {
      formRef.clear();
      dynamicForm.components.forEach(item => formRef.insert(item.component.hostView));
    }
  };

  handleRelationships = () => {
    this.dynamicForm$
      .pipe(take(1))
      .subscribe(dynamicForm => {
        this.filterOptions(dynamicForm);

        dynamicForm.components
          .filter(item => item.config.dependsOn instanceof Array && item.config.dependsOn.length > 0)
          .forEach(item =>
            this.isComponentVisible(dynamicForm, item)
              ? item.component.instance.showControl()
              : item.component.instance.hideControl()
          );

        this.oldValue = dynamicForm.formGroup.value as V;
      });
  };

  private filterOptions = (dynamicForm: DynamicForm<M, V>) => {
    dynamicForm.components
      .filter(item => item.config.options instanceof Array && typeof item.config.optionsFilter === 'function')
      .forEach(item =>
        item.config.filteredOptions = item.config.optionsFilter(
          this.oldValue,
          dynamicForm.formGroup.value as V,
          item.config,
          this.patchValue
        )
      );
  };

  private patchValue = (value: Partial<V>) => timer(1).subscribe(() => this.formGroup.patchValue(value as any));

  private isComponentVisible = (dynamicForm: DynamicForm<M, V>, item: DynamicFormComponentDescriptor<M, V>) =>
    item.config.dependsOn.reduce(this.checkDependency(dynamicForm), true);

  private checkDependency =
    (dynamicForm: DynamicForm<M, V>) => (flag: boolean, dependsOn: DynamicFormElementRelationship) => {
      const parentValue = dynamicForm.formGroup.value[dependsOn.id];

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
