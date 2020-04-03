import { Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StockParameterService {
    showCountry: string;
    filterBy: string;
    marketId: string;
    branchId: string;
    constructor() {}
}
