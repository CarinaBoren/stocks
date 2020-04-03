import { Component, OnInit, ViewChild } from '@angular/core';
import { IStock, IMarket, IBranch, ICountry } from '../stocks';
import { CriteriaComponent } from 'src/app/shared/criteria/criteria.component';
import { StockParameterService } from '../stock-parameter.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'pm-stocks-shell-list',
  templateUrl: './stocks-shell-list.component.html'
})
export class StocksShellListComponent implements OnInit {

  stocks: IStock[] = [];
  filtredStocks: IStock[] = [];

  markets: IMarket[] = [];
  filtredMarkets: IMarket[] = [];

  branches: IBranch[] = [];
  countries: ICountry[] = [];
  errorMessage: string;
  @ViewChild(CriteriaComponent, {static: false}) filterComponent: CriteriaComponent;
  get showCountry(): string {
    return this.stockParameterService.showCountry;
  }
  set showCountry(value: string) {
    this.stockParameterService.showCountry = value;
  }

  constructor(private stockService: StockService,
              private stockParameterService: StockParameterService) {
}

  ngOnInit(): void {
    this.stockService.getAllStocks().subscribe({
      next: allstocks => {
        this.stocks = allstocks.instruments;
        this.stockService.getAllMarkets().subscribe({
          next: markets => {
            this.markets = markets.markets;
            this.filtredMarkets = this.markets;
            this.stockService.getAllBranches().subscribe({
              next: allBranches => {
              this.branches = allBranches.branches;
              this.stockService.getAllCountries().subscribe({
                next: allCountries => {
                  this.countries = allCountries.countries;
                },
                error: err => this.errorMessage = err
                });
              },
              error: err => this.errorMessage = err
            });
          },
          error: err => this.errorMessage = err
        });
        if (this.filterComponent) {
        this.filterComponent.listFilter = this.stockParameterService.filterBy;
        } else {
        this.performFilter();
        }
      },
      error: err => this.errorMessage  = err
    });
}
marketSelected(event: any) {
  this.stockParameterService.marketId = event.target.value;
  this.performFilter();
}
branchSelected(event: any){
  this.stockParameterService.branchId = event.target.value;
  this.performFilter();
}

filterOnFlag(flagId: string): void {
  if(flagId) {
    this.showCountry = flagId;
    this.filtredMarkets = this.markets.filter(x => x.countryId.toString() === flagId);
    this.stockParameterService.marketId = null;
    this.performFilter();
  }
}
 onSelected(stock: IStock){
  stock.market  = this.markets.find(item => item.id === stock.marketId);
  stock.branch  = this.branches.find(item => item.id === stock.branchId);
  stock.country = this.countries.find(item => item.id === stock.countryId);
  this.stockService.getStockPricesById(stock.insId).subscribe({
    next: stockPrices => {
      stock.stockPrices = stockPrices.stockPricesList;
    }
  })
  this.stockService.currentStock = stock;
 }
performFilter(): void {
  const filterObject = {
      filterby: this.stockParameterService.filterBy,
      flagId :  this.stockParameterService.showCountry,
      marketId: this.stockParameterService.marketId,
      branchId: this.stockParameterService.branchId
    };

  this.filtredStocks = this.stocks.filter((stock: IStock) =>
              (!filterObject.filterby || stock.name.toLocaleLowerCase().indexOf(filterObject.filterby.toLocaleLowerCase()) !== -1) &&
              (!filterObject.flagId || stock.countryId === +filterObject.flagId) &&
              (!filterObject.branchId || filterObject.branchId === '0' ||stock.branchId === +filterObject.branchId) &&
              (!filterObject.marketId || filterObject.marketId === '0' || stock.marketId === +filterObject.marketId));
  if (this.stockParameterService.showCountry) {
    this.filtredMarkets = this.markets.filter(x => x.countryId.toString() === this.stockParameterService.showCountry);
  } else  {
    this.filtredMarkets = this.markets;
  }
  }
}
