import { NgModule } from "@angular/core";
import { StockListComponent } from "./stock-list.component";
import { StockDetailComponent } from "./stock-detail.component";
import { RouterModule } from "@angular/router";
import { StockDetailGuard } from "./stock-detail.guard";
import { SharedModule } from "../shared/shared.module";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { StocksShellComponent } from "./stocks-shell/stocks-shell.component";
import { StocksShellListComponent } from "./stocks-shell/stocks-shell-list.component";
import { StocksShellDetailComponent } from "./stocks-shell/stocks-shell-detail.component";
import { SwedenComponent } from "./sweden/sweden.component";
import { FinancialComponent } from "../financial/financial.component";

@NgModule({
  declarations: [
    StockListComponent,
    StockDetailComponent,
    PortfolioComponent,
    StocksShellComponent,
    StocksShellListComponent,
    StocksShellDetailComponent,
    SwedenComponent,
    FinancialComponent,
  ],

  imports: [
    RouterModule.forChild([
      { path: "stocks", component: StockListComponent },
      {
        path: "stocks/:id",
        canActivate: [StockDetailGuard],
        component: StockDetailComponent,
      },
    ]),
    SharedModule,
  ],
})
export class StockModule {}
