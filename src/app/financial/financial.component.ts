import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pm-financial",
  templateUrl: "./financial.component.html",
  styleUrls: ["./financial.component.css"],
})
export class FinancialComponent implements OnInit {
  public stockData: object[] = [
    {
      x: new Date("2012-04-02"),
      open: 85.975716,
      high: 88.395714,
      low: 85.76857,
      close: 88.375717,
      volume: 14958790,
    },
    {
      x: new Date("2012-04-03"),
      open: 89.614288,
      high: 90.315712,
      low: 88.93,
      close: 89.902855,
      volume: 20863990,
    },
    {
      x: new Date("2012-04-04"),
      open: 89.192856,
      high: 89.408569,
      low: 88.14286,
      close: 89.187141,
      volume: 14324520,
    },
    {
      x: new Date("2012-04-05"),
      open: 89.568573,
      high: 90.665718,
      low: 89.057144,
      close: 90.525711,
      volume: 16032450,
    },
    {
      x: new Date("2012-04-09"),
      open: 89.447144,
      high: 91.405716,
      low: 89.328575,
      close: 90.889999,
      volume: 14938420,
    },
    {
      x: new Date("2012-04-10"),
      open: 91.418571,
      high: 92,
      low: 89.428574,
      close: 89.777145,
      volume: 22243130,
    },
  ];

  // tslint:disable-next-line: ban-types
  public primaryXAxis: Object;
  // tslint:disable-next-line: ban-types
  public primaryYAxis: Object;
  // tslint:disable-next-line: ban-types
  public rows: Object;
  // tslint:disable-next-line: ban-types
  public axes: Object;

  constructor() {}

  ngOnInit(): void {
    this.primaryYAxis = {
      plotOffset: 25,
      rowIndex: 1,
      opposedPosition: true,
      rangePadding: "None",
    };
    this.primaryXAxis = { valueType: "DateTime" };
    this.rows = [{ height: "15%" }, { height: "85%" }];
    this.axes = [
      {
        name: "secondary",
        opposedPosition: true,
        rowIndex: 0,
      },
    ];
  }
}
