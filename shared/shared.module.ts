import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SelectComponent
  ],
  exports: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule
  ]
})
export class SharedModule { }
