import { Component, OnInit, ViewChild } from '@angular/core';
import { IStock, IMarket, IBranch, ICountry, ISector } from '../stocks';
import { CriteriaComponent } from 'src/app/shared/criteria/criteria.component';
import { StockParameterService } from '../stock-parameter.service';
import { StockService } from '../stock.service';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  sectors: ISector[] = [];

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
    this.initAllValues();
}
initStocks(): void {
  forkJoin([
    this.stockService.getAllSectors(),
    this.stockService.getAllStocks()])
  .subscribe(response => {
    this.sectors = response[0].sectors;
    this.stocks = response[1].instruments;
  });
}
initAllValues(): void {
  forkJoin([
    this.stockService.getAllBranches(),
    this.stockService.getAllCountries(),
    this.stockService.getAllMarkets()])
  .subscribe(response => {
    this.branches = response[0].branches;
    this.countries = response[1].countries;
    this.markets = response[2].markets;
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
  stock.sector = this.sectors.find(item => item.id ===  stock.sectorId);
  this.stockService.getStockPricesById(stock.insId).subscribe({
    next: stockPrices => {
      stock.stockPrices = stockPrices.stockPricesList;
    }
  })
  this.stockService.currentStock = stock;
 }
performFilter(): void {
  if (this.stocks.length === 0) {
    this.initStocks();
  }
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
