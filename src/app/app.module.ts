import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

import { DYNAMIC_FORM_COMPONENT_MAP, DynamicFormComponent } from '@elemental-concept/dynamic-form';

import { AppComponent } from './app.component';

import { StringInputComponent } from './components';

import { customComponentMap } from './types';

@NgModule({
  declarations: [
    AppComponent,

    StringInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,

    MatButtonModule,

    DynamicFormComponent
  ],
  providers: [
    // Dynamic Form mapping object using Dynamic Form Material map
    { provide: DYNAMIC_FORM_COMPONENT_MAP, useValue: customComponentMap }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
