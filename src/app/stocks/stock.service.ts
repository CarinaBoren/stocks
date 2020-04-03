import { Injectable, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, of, combineLatest, forkJoin} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { IAllStocks, IStock, IStockPriceList, IAllMarkets, IAllBranches, IAllCountries, IAllSectors, IAllKPI, IAllData } from './stocks';
import { ConvertDatePipe } from '../shared/convert-date.pipe';

@Injectable({
    providedIn: 'root'
  })
export class StockService {
    constructor(private http: HttpClient, private datePipe: ConvertDatePipe) {}
    stocks: IAllStocks;
    markets: IAllMarkets;
    branches: IAllBranches;
    countries: IAllCountries;
    sectors: IAllSectors;
    ma200: IAllKPI;
    alldata: IAllData;
    currentStock: IStock | null;
    authKey =  '';

    getAllStocks(): Observable<IAllStocks> {
         if (this.stocks) {
           return of(this.stocks);
         }
         return this.http.get<IAllStocks>(`https://apiservice.borsdata.se/v1/instruments?authKey=${this.authKey}`).pipe(
                // tap(data => console.log('All: ' + JSON.stringify(data))),
                tap(data => this.stocks = data),
                catchError(this.handleError)
            );
    }

    getKPI(): Observable<IAllKPI> {
        // tslint:disable-next-line: max-line-length
        return  this.http.get<IAllKPI>(`https://apiservice.borsdata.se/v1/instruments/kpis/318/200day/diff?authKey=${this.authKey}`).pipe(
           // tap(data => console.log('All: ' + JSON.stringify(data))),
            tap(data => this.ma200 = data),
            catchError(this.handleError)
        );
    }
    requestAll(): Observable<any[]> {
         const branches = this.getAllBranches();
         const sectors = this.getAllSectors();
         return forkJoin(branches, sectors);
    }


    getStockPricesById(stockId: number): Observable<IStockPriceList> {
         const toDate = new Date();
         const fromDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate() - 20);
         const toDateString = this.datePipe.transform(toDate.toString());
         const fromDateString = this.datePipe.transform(fromDate.toString());
        // tslint:disable-next-line: max-line-length
         return this.http.get<IStockPriceList>(`https://apiservice.borsdata.se/v1/instruments/${stockId}/stockprices?authKey=${this.authKey}&from=${fromDateString}&to=${toDateString}`).pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    getStockById(stockId: number): Observable<IStock> {
        if (this.stocks) {
            const foundItem = this.stocks.instruments.find(item => item.insId === stockId);
            if (foundItem) {
                foundItem.market  = this.markets.markets.find(item => item.id === foundItem.marketId);
                foundItem.branch  = this.branches.branches.find(item => item.id === foundItem.branchId);
                foundItem.country = this.countries.countries.find(item => item.id === foundItem.countryId);
                return of(foundItem);
            }
        } else {
            return of(this.initializeStock());
        }
    }

    getAllMarkets(): Observable<IAllMarkets> {
        if (this.markets) {
            return of (this.markets);
        }
        return this.http.get<IAllMarkets>(`https://apiservice.borsdata.se/v1/markets?authKey=${this.authKey}`).pipe(
            // tap(data => console.log(JSON.stringify(data))),
            tap(data => this.markets = data),
            catchError(this.handleError)
        );
    }

    getAllSectors(): Observable<IAllSectors> {
        if (this.sectors) {
            return of (this.sectors);
        }
        return this.http.get<IAllSectors>(`https://apiservice.borsdata.se/v1/sectors?authKey=${this.authKey}`).pipe(
            // tap(data => console.log(JSON.stringify(data))),
            tap(data => this.sectors = data),
            catchError(this.handleError)
        );
    }

    getAllBranches(): Observable<IAllBranches> {
        if (this.branches) {
            return of (this.branches);
        }
        return this.http.get<IAllBranches>(`https://apiservice.borsdata.se/v1/branches?authKey=${this.authKey}`).pipe(
           // tap(data => console.log(JSON.stringify(data))),
            tap(data => this.branches = data),
            catchError(this.handleError)
        );
    }
    getAllCountries(): Observable<IAllCountries> {
        if (this.countries) {
            return of (this.countries);
        }
        return this.http.get<IAllCountries>(`https://apiservice.borsdata.se/v1/countries?authKey=${this.authKey}`).pipe(
           // tap(data => console.log(JSON.stringify(data))),
            tap(data => this.countries = data),
            catchError(this.handleError)
        );
    }

    private initializeStock(): IStock {
        // Return an initialized object
        return {
           insId : 0,
           name: ''
        };
    }
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
