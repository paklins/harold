import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexBlockDirective } from './flex-block.directive';

@NgModule({
  declarations:
  [
      FlexBlockDirective
  ],
  imports:
  [
      CommonModule
  ],
  exports:
  [
      FlexBlockDirective
  ]
})
export class DirectivesModule { }
