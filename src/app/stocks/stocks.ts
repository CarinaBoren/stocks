export interface IStock {
  insId: number;
  urlName?: string;
  instrument?: number;
  name: string;
  isin?: string;
  ticker?: string;
  yahoo?: string;
  sectorId?: number;
  marketId?: number;
  branchId?: number;
  countryId?: number;
  listingDate?: string;
  sector?: ISector;
  market?: IMarket;
  branch?: IBranch;
  country?: ICountry;
  stockPrices?: IStockPrice[];
  allKpi?: IStockKpis;
}

export interface IAllData {
  markets?: IAllMarkets;
  sectors?: IAllSectors;
  countries?: IAllCountries;
  branches?: IAllBranches;
}
export interface IStockPrice {
  d: string;
  h: number;
  l: number;
  c: number;
  o: number;
  v: number;
}
export interface IAllKpiList {
  kpiHistoryMetadatas: IKpiListItem[];
}

export interface IKpiListItem {
  kpiId: number;
  nameSv: string;
  nameEn: string;
  format: string;
  isString: boolean;
}
export interface IKpiForStock {
  KpiId: number;
  kpiname: string;
  priceValue: string;
  reportTime: string;
  values: IKpiValue[];
}
export interface IStockKpis {
  kpiId: number;
  kpis: IKpiForStock[];
}
export interface IKpiValue {
  y: number;
  p: number;
  v: number;
}
export interface IAllKPI {
  kpiId: number;
  group: string;
  calculation: string;
  values: IKPI[];
}
export interface IKPI {
  i: number;
  n: number;
  s: string;
}
export interface IStockPriceList {
  instrument: number;
  stockPricesList: IStockPrice[];
}
export interface IAllStocks {
  instruments: IStock[];
}

export interface IReportYear {
  year: number;
  divended: number;
  free_cash_flow: number;
}
// tslint:disable-next-line: no-empty-interface
export interface IReportQuarter {}
export interface IAllBranches {
  branches: IBranch[];
}
export interface IBranch {
  id: number;
  name: string;
  sectorId: number;
}
export interface ICountry {
  id: number;
  name: string;
}
export interface IAllMarkets {
  markets: IMarket[];
}
export interface IMarket {
  id: number;
  name: string;
  countryId: number;
  isIndex: boolean;
  exchangeName: string;
}
export interface IAllSectors {
  sectors: ISector[];
}
export interface ISector {
  id: number;
  name: string;
}
export interface IAllCountries {
  countries: ICountry[];
}
export interface ICountry {
  id: number;
  name: string;
}
export interface IPortfolioItem {
  stock: IStock[];
  byeDate: string;
  price: number;
}
export interface IPortfolio {
  stocks: IPortfolioItem[];
}
