import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './containers/contact-page.component';
import { ContactComponent } from './components/contact.component';
import { ContactRoutingModule } from './contact-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromContact from '@vk-homepage/contact/reducers';
import {ContactEffects } from '@vk-homepage/contact/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactPipe } from '@vk-homepage/contact/components/contact.pipe';
import { OnlyNumber } from '@vk-homepage/contact/components/only-number';

export const COMPONENTS = [
  ContactPageComponent, ContactComponent, ContactPipe,OnlyNumber
];

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    StoreModule.forFeature(fromContact.contactFeatureKey, fromContact.reducers),
    EffectsModule.forFeature([ContactEffects]),
    FontAwesomeModule
  ],
  
  declarations: COMPONENTS,
  exports: COMPONENTS,
})

export class ContactModule { }
