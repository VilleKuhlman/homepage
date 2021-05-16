import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoverComponent } from './components/cover.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: CoverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoverRoutingModule { }
