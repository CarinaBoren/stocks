import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { StockListComponent } from "./stocks/stock-list.component";
import { ConvertDatePipe } from "./shared/convert-date.pipe";
import { FlagComponent } from "./shared/flag/flag.component";
import { StockDetailComponent } from "./stocks/stock-detail.component";
import { StockDetailGuard } from "./stocks/stock-detail.guard";
import { CriteriaComponent } from "./shared/criteria/criteria.component";
import { StockParameterService } from "./stocks/stock-parameter.service";
import { PortfolioComponent } from "./stocks/portfolio/portfolio.component";
import { StocksShellComponent } from "./stocks/stocks-shell/stocks-shell.component";
import { StocksShellDetailComponent } from "./stocks/stocks-shell/stocks-shell-detail.component";
import { StocksShellListComponent } from "./stocks/stocks-shell/stocks-shell-list.component";
import { SwedenComponent } from "./stocks/sweden/sweden.component";
import { ChartsModule } from "ng2-charts";
import { BarChartComponent } from "./shared/charts/bar-chart/bar-chart.component";
import { DoughnutChartComponent } from "./shared/charts/doughnut-chart/doughnut-chart.component";
import { RadarChartComponent } from "./shared/charts/radar-chart/radar-chart.component";
import { PieChartComponent } from "./shared/charts/pie-chart/pie-chart.component";
import { LineChartComponent } from "./shared/charts/line-chart/line-chart.component";
import { StockService } from "./stocks/stock.service";
import { FinancialComponent } from "./financial/financial.component";
import {
  ChartAllModule,
  RangeNavigatorAllModule,
} from "@syncfusion/ej2-ng-charts";
import {
  CandleSeriesService,
  ColumnSeriesService,
} from "@syncfusion/ej2-ng-charts";

@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    ConvertDatePipe,
    FlagComponent,
    StockDetailComponent,
    CriteriaComponent,
    PortfolioComponent,
    StocksShellComponent,
    StocksShellDetailComponent,
    StocksShellListComponent,
    SwedenComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent,
    LineChartComponent,
    FinancialComponent,
  ],
  providers: [
    StockParameterService,
    ConvertDatePipe,
    StockService,
    CandleSeriesService,
    ColumnSeriesService,
  ],
  imports: [
    BrowserModule,
    ChartAllModule,
    RangeNavigatorAllModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "stocks", component: StocksShellComponent },
      { path: "stocks/portfolio", component: PortfolioComponent },
      { path: "stocks/sweden", component: SwedenComponent },
      { path: "stocks/financial", component: FinancialComponent },
      {
        path: "stocks/:id",
        canActivate: [StockDetailGuard],
        component: StockDetailComponent,
      },
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: "**", redirectTo: "welcome", pathMatch: "full" },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
