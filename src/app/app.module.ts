import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { NgxDynamicFormModule } from '@elemental-concept/ngx-dynamic-form';

import { AppComponent } from './app.component';

import { StringInputComponent } from './components';

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

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

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [ HttpClient ],
        useFactory: httpLoaderFactory
      }
    }),

    NgxDynamicFormModule,

    MatButtonModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
