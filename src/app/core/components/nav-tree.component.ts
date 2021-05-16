import { Component, Input,ChangeDetectionStrategy, HostBinding, } from '@angular/core';
import { trigger, style, animate, transition, keyframes, query} from '@angular/animations';
import { LayoutActions } from '../actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '@vk-homepage/reducers';

@Component({
  selector: 'vk-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animateNavTree', [
      transition('true => false', [
        query(':not(.V):not(.K):not(.VK):not(.path):not(img):not(a)',  [
          style({ opacity: 0 }),      
          animate('0.1s 0.5s', style({ opacity: 1 })), 
        ], { optional: true }),  
      ]),      
    ]), 

    trigger('animatePath', [
      transition('false => true', [
        query('.pathUP', [
          animate('0.4s', keyframes([
            style({ offset: 0,   opacity:1, position:'relative', left: '50px', padding:'initial', top: '10px', transform: 'translate(0, 0) scale(1, 1)',       fontSize:'15px',   color:'rgba(73, 157, 255, 0.761)',     }),
            style({ offset: 0.49, opacity:0, position:'relative', left: '50px', padding:'initial', top: '10px', transform: 'translate(0, 0) scale(2, 0)',       fontSize:'15px',  color:'rgba(73, 157, 255, 0)',     }),
            style({ offset: 0.5, opacity:0, position:'absolute', left: '50%',  padding:'2px',     top:'25%',   transform: 'translate(-50%, -50%) scale(2, 0)', fontSize:'5.5vh',   color:'rgba(73, 157, 255, 0)',     }),
            style({ offset: 1,   opacity:1, position:'absolute', left: '50%',  padding:'2px',     top:'25%',   transform: 'translate(-50%, -50%) scale(1, 1)', fontSize:'5.5vh',   color:'rgba(73, 157, 255, 0.761)', }),
         ])),
      ], { optional: true }),
      ]),
      transition('true => false', [
        query('.pathDown', [ 
          animate('0.4s', keyframes([
            style({ offset: 0,   opacity:1, position:'absolute', left: '50%',  padding:'2px',     top:'25%',   transform: 'translate(-50%, -50%) scale(1, 1)', fontSize:'5.5vh',  color:'rgba(73, 157, 255, 0.761)',     }),
            style({ offset: 0.49, opacity:0, position:'absolute', left: '50%',  padding:'2px',     top:'25%',   transform: 'translate(-50%, -50%) scale(2, 0)', fontSize:'5.5vh', color:'rgba(73, 157, 255, 0)',     }),
            style({ offset: 0.5, opacity:0, position:'relative', left: '50px', padding:'initial', top: '10px', transform: 'translate(0, 0) scale(2, 0)',       fontSize:'15px',  color:'rgba(73, 157, 255, 0)',     }),
            style({ offset: 1,   opacity:1, position:'relative', left: '50px', padding:'initial', top: '10px', transform: 'translate(0, 0) scale(1, 1)',       fontSize:'15px',  color:'#212529', }),
          ])),
        ], { optional: true }),
      ]),     
    ]), 
  ],
})

export class NavTreeComponent {
  
  @Input() navTree: any;
 
  get showMenu() {
    return this.navTree.showMenu;
  }
  get currentPathId() {
    return this.navTree.currentPathID;
  }
  get fullPath() {
    return this.navTree.fullPath;
  }

  get showLoadingScreen() {
    return this.navTree.showLoadingScreen;
  }

  setMenu(showMenu:boolean){
    if(showMenu === true)
      this.store.dispatch(LayoutActions.closeMenu());
    else
      this.store.dispatch(LayoutActions.openMenu());
  }

  @HostBinding('@animateNavTree') get valid() { return this.showMenu; }
  @HostBinding('@animatePath') get pathup() { return this.currentPathId > 1 ? this.showMenu : null }

  constructor(private store: Store<fromRoot.State>, ) { }
}