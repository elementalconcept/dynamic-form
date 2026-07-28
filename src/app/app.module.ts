import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';

import { DynamicFormComponent } from '@elemental-concept/dynamic-form';

import { AppComponent } from './app.component';

import { StringInputComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,

    StringInputComponent
  ],
  providers: [
    provideHttpClient()
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,

    MatButtonModule,
    DynamicFormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
