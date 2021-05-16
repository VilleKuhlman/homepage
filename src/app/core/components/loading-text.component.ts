import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vk-loading-text',
  styleUrls: ['./loading-text.component.scss'],
  template: `
  <h1>Loading at the lightspeed</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingTextComponent {

  constructor() {
  }
  
}