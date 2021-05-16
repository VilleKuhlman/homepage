import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverComponent } from './components/cover.component';
import { CoverRoutingModule } from './cover-routing.module';


export const COMPONENTS = [
  CoverComponent,
  
];

@NgModule({
  imports: [
    CommonModule,
    CoverRoutingModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})

export class CoverModule { }
