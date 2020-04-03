import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlagComponent } from './flag.component';
import { FormsModule } from '@angular/forms';
import { ConvertDatePipe } from './convert-date.pipe';
import { CriteriaComponent } from './criteria/criteria.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FlagComponent,
    ConvertDatePipe,
    CriteriaComponent
  ],
  exports: [
    FlagComponent,
    CommonModule,
    FormsModule,
    ConvertDatePipe,
    CriteriaComponent
  ]
})
export class SharedModule { }
