import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as fromRoot from '@vk-homepage/reducers';
import { Store } from '@ngrx/store';
import { LayoutActions } from '../actions';

@Component({
  selector: 'vk-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  @Input() currentPathId: number;

  hovering: boolean;

  setMenu(showMenu:boolean){
    if(showMenu === true)
      this.store.dispatch(LayoutActions.closeMenu());
    else
      this.store.dispatch(LayoutActions.openMenu());
  }

  constructor(private store: Store<fromRoot.State>, ) { }

  setActiveButton(button: number ){
    this.hovering = button !== 0;
  }
}