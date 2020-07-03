import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { StockService } from "src/app/stocks/stock.service";
import {
  IStock,
  IStockKpis,
  IKpiForStock,
  IKpiListItem,
} from "src/app/stocks/stocks";
import { StockParameterService } from "src/app/stocks/stock-parameter.service";

@Component({
  selector: "pm-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"],
})
export class BarChartComponent implements OnChanges {
  constructor(
    private stockService: StockService,
    private stockParameterService: StockParameterService
  ) {}
  @Input() stock: IStock;
  @Input() kpi: IKpiForStock;
  kpiId: string;
  public barChartOption = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  currentStock: IStock;
  //  kpis: IKpiForStock;
  public barChartLabels = [];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [];
  public barChartOptions = {};

  ngOnChanges(): void {
    this.currentStock = this.stockService.currentStock;
    this.kpiId = this.stockParameterService.kpiId;
    this.barChartData = [];

    this.barChartLabels = this.kpi.values.map((x) => x.y.toString());
    this.barChartData.push({
      data: this.kpi.values.map((v) => v.v),
      label: this.kpi.kpiname,
    });
  }
}
