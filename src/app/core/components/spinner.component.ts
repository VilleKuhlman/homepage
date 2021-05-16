import { Component,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vk-spinner',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="spinner">
  <span [ngClass]="'letters'" *ngFor="let letter of letters; let i = index;" [ngStyle]="{'transform': 'rotateZ('+((360/letters.length)*i)+'deg)'}">
  {{ letter }}
  </span>
  </div>
  `,
})
export class SpinnerComponent {

  letters = "001010101010010101010010".split('');
  
}