import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faFileAlt, faFileCode, faEnvelope, faBars, faChevronDown, faChevronUp, faIdBadge, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import {
  SpinnerComponent,
  LoadingTextComponent,
  MenuComponent,
  NavigationComponent,
  NavTreeComponent,
  PulseComponent
} from '@vk-homepage/core/components';
import {
  AppComponent,
  } from '@vk-homepage/core/containers';

export const COMPONENTS = [
  AppComponent,
  SpinnerComponent,
  LoadingTextComponent,
  MenuComponent,
  NavigationComponent,
  NavTreeComponent,
  PulseComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})

export class CoreModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faFileCode,faFileAlt,faEnvelope, faBars, faChevronDown, faIdBadge, faExternalLinkAlt, faChevronUp);
  }
}
