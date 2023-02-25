import { Component } from '@angular/core';

import { CommonInputDirective } from '../../directives';

@Component({
  selector: 'ngx-df-multi-select-input',
  templateUrl: './multi-select-input.component.html',
  styleUrls: [ './multi-select-input.component.scss' ]
})
export class MultiSelectInputComponent extends CommonInputDirective {
}
