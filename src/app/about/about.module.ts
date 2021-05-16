import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { CVPageComponent } from './containers/cv-page.component';
import { CVComponent } from './components/cv.component';

import { StoreModule } from '@ngrx/store';
import * as fromAbout from '@vk-homepage/about/reducers';

export const COMPONENTS = [
  CVPageComponent, CVComponent
];

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    StoreModule.forFeature(fromAbout.aboutFeatureKey, fromAbout.reducers),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})

export class IntroModule { }
