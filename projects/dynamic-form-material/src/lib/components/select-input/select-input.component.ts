import { Component } from '@angular/core';

import { CommonInputDirective } from '../../directives';

@Component({
  selector: 'ngx-df-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: [ './select-input.component.scss' ]
})
export class SelectInputComponent extends CommonInputDirective {
}
