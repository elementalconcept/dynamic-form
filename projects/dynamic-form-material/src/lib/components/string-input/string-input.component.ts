import { Component } from '@angular/core';

import { CommonInputDirective } from '../../directives';

import { SuffixType } from '../../types';

@Component({
  selector: 'ngx-df-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: [ './string-input.component.scss' ]
})
export class StringInputComponent extends CommonInputDirective {
  SuffixType = SuffixType;

  onPasswordToggle = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    this.inputType = this.inputType === 'password'
      ? 'text'
      : 'password';
  }
}
