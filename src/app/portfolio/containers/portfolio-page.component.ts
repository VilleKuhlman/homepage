import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vk-portfolio-page',
  styleUrls: ['./portfolio-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <vk-portfolio></vk-portfolio>
  `,
})

export class PortfolioPageComponent {

   constructor() { }

 }