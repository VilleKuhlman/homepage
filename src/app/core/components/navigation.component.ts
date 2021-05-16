import { Component, Input, Output, EventEmitter,ChangeDetectionStrategy,HostBinding } from '@angular/core';

@Component({
  selector: 'vk-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NavigationComponent {

  @Input() navigation: any;

  @Output() navigate = new EventEmitter();
  @Output() toggleMenu = new EventEmitter();

  get showMenu() {
    return this.navigation.showMenu;
  }

  get showPrevNav() {
    return this.navigation.prev != null;
  }

  get showNextNav() {
    return !!this.navigation.next;
  }

  @HostBinding('class.navigationIsActive') get c1 () { return this.showMenu; }

  constructor() { }

}
