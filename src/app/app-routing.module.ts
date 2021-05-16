import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, CanActivate} from '@angular/router';

export const routes: Routes = [
  
  { path: '', 
    loadChildren: () => import('./cover/cover.module').then(mod => mod.CoverModule)
    },
 
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(mod => mod.IntroModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./portfolio/portfolio.module').then(mod => mod.PortfolioModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(mod => mod.ContactModule)
  },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule {
}



