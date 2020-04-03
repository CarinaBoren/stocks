import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { IStock, IStockPriceList, IStockPrice } from './stocks';
import { StockService } from './stock.service';

@Component({
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  pageTitle = 'Aktie data';
  stock: IStock;
  stockPrices: IStockPrice[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private stockService: StockService) {
   }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stockService.getStockById(id).subscribe({
      next: stock => {
            this.stock = stock;
            this.stockService.getStockPricesById(id).subscribe({
              next: stockPrices => {
                this.stock.stockPrices = stockPrices.stockPricesList;
              }
            })
          }
    });

    this.pageTitle += `: ${id}`;
    
  }
  onBack(): void {
    this.router.navigate(['/stocks']);
  }

}
