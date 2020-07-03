import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { IStock, IBranch, IMarket, ICountry, ISector } from "./stocks";
import { StockService } from "./stock.service";
import { CriteriaComponent } from "../shared/criteria/criteria.component";
import { StockParameterService } from "./stock-parameter.service";
import { forkJoin } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  templateUrl: "./stock-list.component.html",
  styleUrls: ["./stock-list.component.css"],
})
export class StockListComponent implements OnInit, AfterViewInit {
  pageTitle = "Alla aktier";
  imageWidth = 50;
  imageMargin = 2;
  showImage = true;
  errorMessage: string;
  includeDetail = true;
  @ViewChild(CriteriaComponent)
  filterComponent: CriteriaComponent;
  parentListFilter: string;

  filtredStocks: IStock[] = [];
  stocks: IStock[] = [];
  markets: IMarket[] = [];
  branches: IBranch[] = [];
  countries: ICountry[] = [];
  sectors: ISector[] = [];

  get showCountry(): string {
    return this.stockParameterService.showCountry;
  }
  set showCountry(value: string) {
    this.stockParameterService.showCountry = value;
  }
  constructor(
    private stockService: StockService,
    private stockParameterService: StockParameterService
  ) {}
  ngAfterViewInit(): void {
    this.filterComponent.listFilter = this.stockParameterService.filterBy;
    this.parentListFilter = this.filterComponent.listFilter;
  }
  marketSelected(event: any) {
    this.stockParameterService.marketId = event.target.value;
    this.performFilter();
  }
  branchSelected(event: any) {
    this.stockParameterService.branchId = event.target.value;
    this.performFilter();
  }

  ngOnInit(): void {
    //    this.initAllValues1();
    this.initAllValues2();
  }
  initAllValues2(): void {
    forkJoin([
      this.stockService.getAllBranches(),
      this.stockService.getAllCountries(),
      this.stockService.getAllMarkets(),
      this.stockService.getAllSectors(),
    ])
      .pipe(
        switchMap((result) => {
          return this.stockService.getAllStocks();
        })
      )
      .subscribe((hopp: any) => {});
  }
  onValueChange(value: string): void {
    this.stockParameterService.filterBy = value;
    this.performFilter();
  }
  performFilter(): void {
    const filterObject = {
      filterby: this.stockParameterService.filterBy,
      flagId: this.stockParameterService.showCountry,
      marketId: this.stockParameterService.marketId,
      branchId: this.stockParameterService.branchId,
    };

    this.filtredStocks = this.stocks.filter(
      (stock: IStock) =>
        (!filterObject.filterby ||
          stock.name
            .toLocaleLowerCase()
            .indexOf(filterObject.filterby.toLocaleLowerCase()) !== -1) &&
        (!filterObject.flagId || stock.countryId === +filterObject.flagId) &&
        (!filterObject.branchId ||
          filterObject.branchId === "0" ||
          stock.branchId === +filterObject.branchId) &&
        (!filterObject.marketId ||
          filterObject.marketId === "0" ||
          stock.marketId === +filterObject.marketId)
    );
  }

  addStock(event: any, stock: IStock) {
    console.log(stock);
  }
  filterOnFlag(flagId: string): void {
    if (flagId) {
      this.showCountry = flagId;
      this.performFilter();
    }
  }
}
