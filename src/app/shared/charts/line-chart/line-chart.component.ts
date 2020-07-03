import { Component, OnInit, Input, OnChanges, OnDestroy } from "@angular/core";
import { StockService } from "src/app/stocks/stock.service";
import { IStock } from "src/app/stocks/stocks";

@Component({
  selector: "pm-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent implements OnChanges, OnDestroy {
  @Input() stockId: number;
  public period: number;
  public barChartLabels = [];
  public barChartType = "line";
  public barChartLegend = false;
  public barChartData = [];
  public barChartOptions = {
    layout: { padding: { left: 10, right: 10, top: 50, bottom: 0 } },
  };
  constructor(private stockService: StockService) {}
  ngOnDestroy(): void {}

  ngOnChanges(): void {
    this.updateGraph();
  }
  onClick(period: number): void {
    this.period = period;
    this.updateGraph();
  }
  getFromDate(): Date {
    const currentDate = new Date();
    switch (this.period) {
      case 1:
        return new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        );
      case 2:
        return new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
      case 3:
        return new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 3,
          currentDate.getDate()
        );
      case 4:
        return new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 6,
          currentDate.getDate()
        );
      case 5:
        return new Date(currentDate.getFullYear(), 0, 1);
      case 6:
        return new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
      case 7:
        return new Date(
          currentDate.getFullYear() - 3,
          currentDate.getMonth(),
          currentDate.getDate()
        );
      case 8:
        return new Date(
          currentDate.getFullYear() - 5,
          currentDate.getMonth(),
          currentDate.getDate()
        );
      case 9:
        return new Date(
          currentDate.getFullYear() - 10,
          currentDate.getMonth(),
          currentDate.getDate()
        );
      case 10:
        return new Date(
          currentDate.getFullYear() - 50,
          currentDate.getMonth(),
          currentDate.getDate()
        );
      default:
        return new Date(currentDate.getFullYear(), 0, 1);
    }
  }

  updateGraph(): void {
    const fromDate = this.getFromDate();
    this.stockService
      .getStockPricesByDateAndId(this.stockId, fromDate)
      .subscribe({
        next: (stockPrices) => {
          this.barChartData = [
            {
              data: stockPrices.stockPricesList.map((x) => x.l),
              label: "close",
              fill: false,
              pointRadius: 0,
              color: "#000000",
            },
            {
              data: stockPrices.stockPricesList.map((x) => x.h),
              label: "high",
              fill: false,
              pointRadius: 0,
            },
          ];
          this.barChartLabels = stockPrices.stockPricesList.map((x) => x.d);
        },
      });
  }
}
