import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IStock,
  IMarket,
  IBranch,
  ICountry,
  ISector,
  IKpiListItem,
} from "../stocks";
import { CriteriaComponent } from "src/app/shared/criteria/criteria.component";
import { StockParameterService } from "../stock-parameter.service";
import { StockService } from "../stock.service";

@Component({
  selector: "pm-stocks-shell-list",
  templateUrl: "./stocks-shell-list.component.html",
})
export class StocksShellListComponent implements OnInit {
  stocks: IStock[] = [];
  filtredStocks: IStock[] = [];
  markets: IMarket[] = [];
  filtredMarkets: IMarket[] = [];
  filtredBranches: IBranch[] = [];
  branches: IBranch[] = [];
  countries: ICountry[] = [];
  sectors: ISector[] = [];
  allKpis: IKpiListItem[] = [];

  errorMessage: string;
  @ViewChild(CriteriaComponent)
  filterComponent: CriteriaComponent;
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

  async ngOnInit(): Promise<void> {
    this.countries = (await this.stockService.getAllCountries()).countries;
    this.filtredMarkets = this.markets = (
      await this.stockService.getAllMarkets()
    ).markets;
    this.filtredBranches = this.branches = (
      await this.stockService.getAllBranches()
    ).branches;
    this.sectors = (await this.stockService.getAllSectors()).sectors;
    this.allKpis = (await this.stockService.getAllKPIs()).kpiHistoryMetadatas;
    this.stocks = (await this.stockService.getAllStocks()).instruments;
  }

  kpiSelected(event: any) {
    this.stockParameterService.kpiId = event.target.value;
    this.stockParameterService.kpiValue = this.allKpis.find(
      (x) => x.kpiId.toString() === this.stockParameterService.kpiId
    ).nameSv;
  }

  marketSelected(event: any) {
    this.stockParameterService.marketId = event.target.value;
    this.performFilter();
  }
  sectorSelected(event: any) {
    this.stockParameterService.sectorId = event.target.value;
    if (event.target.value) {
      this.filtredBranches = this.branches.filter(
        (x) => x.sectorId === +event.target.value
      );
      this.stockParameterService.branchId = null;
    }
    this.performFilter();
  }
  branchSelected(event: any) {
    this.stockParameterService.branchId = event.target.value;
    this.performFilter();
  }

  filterOnFlag(flagId: string): void {
    if (flagId) {
      this.showCountry = flagId;
      this.filtredMarkets = this.markets.filter(
        (x) => x.countryId.toString() === flagId
      );
      this.stockParameterService.marketId = null;
      this.performFilter();
    }
  }
  async onSelected(stock: IStock) {
    stock.market = this.markets.find((item) => item.id === stock.marketId);
    stock.branch = this.branches.find((item) => item.id === stock.branchId);
    stock.country = this.countries.find((item) => item.id === stock.countryId);
    stock.sector = this.sectors.find((item) => item.id === stock.sectorId);
    this.stockService.getStockPricesById(stock.insId).subscribe({
      next: (stockPrices) => {
        stock.stockPrices = stockPrices.stockPricesList;
      },
    });
    stock.allKpi = await this.stockService.getAllKPIForStock(stock.insId);

    stock.allKpi.kpis.map((x) => {
      let item = this.allKpis.filter((y) => y.kpiId === x.KpiId);
      x.kpiname = item[0].nameSv;
    });
    this.stockService.currentStock = stock;
    console.log(stock);
  }
  performFilter(): void {
    const filterObject = {
      filterby: this.stockParameterService.filterBy,
      flagId: this.stockParameterService.showCountry,
      marketId: this.stockParameterService.marketId,
      branchId: this.stockParameterService.branchId,
      sectorId: this.stockParameterService.sectorId,
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
        (!filterObject.sectorId ||
          filterObject.sectorId === "0" ||
          stock.sectorId === +filterObject.sectorId) &&
        (!filterObject.marketId ||
          filterObject.marketId === "0" ||
          stock.marketId === +filterObject.marketId)
    );
    if (this.stockParameterService.showCountry) {
      this.filtredMarkets = this.markets.filter(
        (x) => x.countryId.toString() === this.stockParameterService.showCountry
      );
    } else {
      this.filtredMarkets = this.markets;
    }
  }
}
