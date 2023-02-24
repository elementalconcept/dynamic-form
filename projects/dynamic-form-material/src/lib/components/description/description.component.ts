import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { DynamicFormDescriptionControl, DynamicFormElement } from '@elemental-concept/ngx-dynamic-form';

import { MaterialInputMeta } from '../../types';

@Component({
  selector: 'ngx-df-description',
  templateUrl: './description.component.html',
  styleUrls: [ './description.component.scss' ]
})
export class DescriptionComponent implements DynamicFormDescriptionControl<MaterialInputMeta> {
  readonly type = 'description';

  formControl: AbstractControl; // not used, but needed when compiling

  dynamicFormElement: DynamicFormElement<MaterialInputMeta>;

  visible = true;

  showControl = () => this.visible = true;

  hideControl = () => this.visible = false;
}
