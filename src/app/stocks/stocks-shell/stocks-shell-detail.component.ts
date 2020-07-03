import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { IStock } from '../stocks';

@Component({
  selector: 'pm-stocks-shell-detail',
  templateUrl: './stocks-shell-detail.component.html'
})
export class StocksShellDetailComponent implements OnInit {

  get stock(): IStock |null {
    return this.stockService.currentStock;
  }
  constructor(private stockService: StockService) { }
  ngOnInit() {
  }

}
