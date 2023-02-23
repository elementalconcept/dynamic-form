import { Component } from '@angular/core';

import { CommonInputDirective } from '../../directives';

@Component({
  selector: 'ngx-df-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: [ './text-input.component.scss' ]
})
export class TextInputComponent extends CommonInputDirective {
}
