import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import {
  CheckboxInputComponent,
  DescriptionComponent,
  MultiSelectInputComponent,
  RadioInputComponent,
  SelectInputComponent,
  StringInputComponent,
  TextInputComponent
} from './components';

@NgModule({
  declarations: [
    CheckboxInputComponent,
    DescriptionComponent,
    MultiSelectInputComponent,
    RadioInputComponent,
    SelectInputComponent,
    StringInputComponent,
    TextInputComponent
  ],
  exports: [
    CheckboxInputComponent,
    DescriptionComponent,
    MultiSelectInputComponent,
    RadioInputComponent,
    SelectInputComponent,
    StringInputComponent,
    TextInputComponent
  ],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,

    ReactiveFormsModule,
    CommonModule
  ]
})
export class NgxDynamicFormMaterialModule {
}
