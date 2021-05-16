import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CVPageComponent } from './containers/cv-page.component';

const routes: Routes = [
  { path: 'cv',  component: CVPageComponent },
  { path: '**', redirectTo: 'cv', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
