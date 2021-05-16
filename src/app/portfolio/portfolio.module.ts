import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioPageComponent } from './containers/portfolio-page.component';
import { PortfolioComponent } from './components/portfolio.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const COMPONENTS = [
  PortfolioPageComponent, PortfolioComponent
];

@NgModule({
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    FontAwesomeModule
  ],
  
  declarations: COMPONENTS,
  exports: COMPONENTS,
})

export class PortfolioModule { }
