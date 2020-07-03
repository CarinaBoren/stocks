import {
  Injectable,
  ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR,
} from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError, of, combineLatest, forkJoin } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  IAllStocks,
  IStock,
  IStockPriceList,
  IAllMarkets,
  IAllBranches,
  IAllCountries,
  IAllSectors,
  IAllKPI,
  IAllData,
  IAllKpiList,
  IKpiForStock,
  IMarket,
  IStockKpis,
} from "./stocks";
import { ConvertDatePipe } from "../shared/convert-date.pipe";

@Injectable({
  providedIn: "root",
})
export class StockService {
  constructor(private http: HttpClient, private datePipe: ConvertDatePipe) {}
  stocks: IAllStocks;
  markets: IAllMarkets;
  branches: IAllBranches;
  countries: IAllCountries;
  sectors: IAllSectors;
  ma200: IAllKPI;
  allKpis: IAllKpiList;
  alldata: IAllData;
  allKpiForCurrentStock: IKpiForStock;
  currentStock: IStock | null;
  authKey = "";
  myStocksUrl = "api/stocks/branches.json";

  getKPI(stockId: number, kpiId: number): Observable<IKpiForStock> {
    return this.http
      .get<IKpiForStock>(
        `https://apiservice.borsdata.se/v1/instruments/${stockId}/kpis/${kpiId}/year/mean/history?authKey=${this.authKey}`
      )
      .pipe(catchError(this.handleError));
  }

  getStockPricesByDateAndId(
    stockId: number,
    fromDate: Date
  ): Observable<IStockPriceList> {
    const toDate = new Date();
    const toDateString = this.datePipe.transform(toDate.toString());
    const fromDateString = this.datePipe.transform(fromDate.toString());
    return this.http
      .get<IStockPriceList>(
        `https://apiservice.borsdata.se/v1/instruments/${stockId}/stockprices?authKey=${this.authKey}&from=${fromDateString}&to=${toDateString}`
      )
      .pipe(catchError(this.handleError));
  }
  getStockPricesById(stockId: number): Observable<IStockPriceList> {
    const toDate = new Date();
    const fromDate = new Date(
      toDate.getFullYear(),
      toDate.getMonth(),
      toDate.getDate() - 20
    );
    const toDateString = this.datePipe.transform(toDate.toString());
    const fromDateString = this.datePipe.transform(fromDate.toString());
    return this.http
      .get<IStockPriceList>(
        `https://apiservice.borsdata.se/v1/instruments/${stockId}/stockprices?authKey=${this.authKey}&from=${fromDateString}&to=${toDateString}`
      )
      .pipe(catchError(this.handleError));
  }

  async getAllKPIForStock(stockId: number) {
    const data = await this.http
      .get<IStockKpis>(
        `https://apiservice.borsdata.se/v1/instruments/${stockId}/kpis/year/summary?authKey=${this.authKey}`
      )
      .toPromise();
    return data;
  }

  async getAllKPIs() {
    // tslint:disable-next-line: max-line-length
    const data = await this.http
      .get<IAllKpiList>(
        `https://apiservice.borsdata.se/v1/instruments/kpis/metadata?authKey=${this.authKey}`
      )
      .toPromise();
    this.allKpis = data;
    return data;
  }

  async getAllMarkets() {
    const data = await this.http
      .get<IAllMarkets>(
        `https://apiservice.borsdata.se/v1/markets?authKey=${this.authKey}`
      )
      .toPromise();
    this.markets = data;
    return data;
  }

  async getAllSectors() {
    const data = await this.http
      .get<IAllSectors>(
        `https://apiservice.borsdata.se/v1/sectors?authKey=${this.authKey}`
      )
      .toPromise();
    this.sectors = data;
    return data;
  }

  async getAllBranches() {
    const data = await this.http
      .get<IAllBranches>(
        `https://apiservice.borsdata.se/v1/branches?authKey=${this.authKey}`
      )
      .toPromise();
    this.branches = data;
    return data;
  }

  async getAllCountries() {
    const data = await this.http
      .get<IAllCountries>(
        `https://apiservice.borsdata.se/v1/countries?authKey=${this.authKey}`
      )
      .toPromise();
    this.countries = data;
    return data;
  }
  async getAllStocks() {
    const data = await this.http
      .get<IAllStocks>(
        `https://apiservice.borsdata.se/v1/instruments?authKey=${this.authKey}`
      )
      .toPromise();
    this.stocks = data;
    return data;
  }

  private initializeStock(): IStock {
    // Return an initialized object
    return {
      insId: 0,
      name: "",
    };
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  getStockById(stockId: number): Observable<IStock> {
    if (this.stocks) {
      const foundItem = this.stocks.instruments.find(
        (item) => item.insId === stockId
      );
      if (foundItem) {
        foundItem.market = this.markets.markets.find(
          (item) => item.id === foundItem.marketId
        );
        foundItem.branch = this.branches.branches.find(
          (item) => item.id === foundItem.branchId
        );
        foundItem.country = this.countries.countries.find(
          (item) => item.id === foundItem.countryId
        );
        foundItem.sector = this.sectors.sectors.find(
          (item) => item.id === foundItem.sectorId
        );
        return of(foundItem);
      }
    } else {
      return of(this.initializeStock());
    }
  }
}
