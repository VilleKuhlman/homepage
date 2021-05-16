import { Component,ChangeDetectionStrategy } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vk-portfolio',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="col-12 banner">
    <h4>Personal projects</h4>
  </div>
  <div class="timeline">
  <div class="container left">
    <div class="content">
      <h5>2018: PortfolioApp <a target="_blank" rel="noopener noreferrer" href="https://d1vv7rnb81vmyx.cloudfront.net/"><fa-icon [icon]="faExternalLinkAlt"></fa-icon></a></h5> 
      <p>NodeJS Application coded in TypeScript and hosted on AWS. Built by using following frameworks: Angular, RXJS, NGRX</p>
    </div>
  </div>
  <div class="container right">
    <div class="content">
      <h5>2020: Homepage <a target="_blank" rel="noopener noreferrer" href="https://vk-homepage-367f8.firebaseapp.com/"><fa-icon [icon]="faExternalLinkAlt"></fa-icon></a></h5>
      <p>NodeJS Application coded in TypeScript and hosted on GCP. Built by using following frameworks: Angular, RXJS, NGRX</p>
    </div>
  </div>
  <div class="container left">
    <div class="content lastcontent">
      <h5>2023 (ETA): MasterNet </h5>
      <p>.NET Application coded in C++ and C#. Work in Progress.</p>
    </div>
  </div>
</div>
  `,
})
export class PortfolioComponent {

  faExternalLinkAlt = faExternalLinkAlt;

  ngOnInit() {
  }
  
}