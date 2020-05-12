import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlagComponent } from './flag/flag.component';
import { FormsModule } from '@angular/forms';
import { ConvertDatePipe } from './convert-date.pipe';
import { CriteriaComponent } from './criteria/criteria.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FlagComponent,
    ConvertDatePipe,
    CriteriaComponent,
    BarChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
    RadarChartComponent
  ],
  exports: [
    FlagComponent,
    CommonModule,
    FormsModule,
    ConvertDatePipe,
    CriteriaComponent,
    BarChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
    RadarChartComponent
  ]
})
export class SharedModule { }
