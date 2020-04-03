import { Component, OnInit, ViewChild } from '@angular/core';
import { StockParameterService } from '../stock-parameter.service';
import { StockService } from '../stock.service';
import { IStock, IMarket, IBranch, ICountry, ISector, IAllMarkets, IAllBranches, IKPI } from '../stocks';
import { CriteriaComponent } from 'src/app/shared/criteria/criteria.component';
import { combineLatest, ObservedValueOf, Scheduler, observable, Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'pm-sweden',
  templateUrl: './sweden.component.html',
  styleUrls: ['./sweden.component.css']
})
export class SwedenComponent implements OnInit {

  pageTitle: 'Hej hopp';
  stocks: IStock[] = [];
  kpis: IKPI[] = [];

  branches: IBranch[] = [];

  sectors: ISector[] = [];

  
  errorMessage: string;
  @ViewChild(CriteriaComponent, {static: false}) filterComponent: CriteriaComponent;


  constructor(private stockService: StockService,
              private stockParameterService: StockParameterService) {
}

  ngOnInit(): void {
    this.stockService.getAllStocks().subscribe({
      next: stocks => {
        console.log(this.stockService.stocks);
        this.stockService.getKPI().subscribe({
          next: kpi => console.log(this.stockService.ma200),
      error: err => this.errorMessage = err
    });
      },
      error: err => this.errorMessage = err
    });
    this.stockService.getAllSectors().subscribe({
      next: sectors => console.log(this.stockService.sectors),
      error: err => this.errorMessage = err
    });
    this.stockService.getAllBranches().subscribe({
      next: branches => console.log(this.stockService.branches),
      error: err => this.errorMessage = err
    });
    // this.stockService.getKPI().subscribe({
    //   next: kpi => console.log(this.stockService.ma200),
    //   error: err => this.errorMessage = err
    // });
}
performFilter(): void {}
}
