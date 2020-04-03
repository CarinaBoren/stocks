import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { StockListComponent } from './stocks/stock-list.component';
import { ConvertDatePipe } from './shared/convert-date.pipe';
import { FlagComponent } from './shared/flag.component';
import { StockDetailComponent } from './stocks/stock-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { StockDetailGuard } from './stocks/stock-detail.guard';
import { CriteriaComponent } from './shared/criteria/criteria.component';
import { StockParameterService } from './stocks/stock-parameter.service';
import { PortfolioComponent } from './stocks/portfolio/portfolio.component';
import { StocksShellComponent } from './stocks/stocks-shell/stocks-shell.component';
import { StocksShellDetailComponent } from './stocks/stocks-shell/stocks-shell-detail.component';
import { StocksShellListComponent } from './stocks/stocks-shell/stocks-shell-list.component';
import { SwedenComponent } from './stocks/sweden/sweden.component';

@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    ConvertDatePipe,
    FlagComponent,
    StockDetailComponent,
    WelcomeComponent,
    CriteriaComponent,
    PortfolioComponent,
    StocksShellComponent,
    StocksShellDetailComponent,
    StocksShellListComponent,
    SwedenComponent
  ],
  providers: [
    StockParameterService,
    ConvertDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'stocks', component: StocksShellComponent},
      {path: 'stocks/portfolio', component: PortfolioComponent},
      {path: 'stocks/sweden', component: SwedenComponent},
      {
        path: 'stocks/:id',
        canActivate: [StockDetailGuard],
        component: StockDetailComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'},
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
