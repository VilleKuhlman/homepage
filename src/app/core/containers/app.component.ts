import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';
import { map, tap, filter, take, throttleTime } from 'rxjs/operators';
import * as fromRoot from '@vk-homepage/reducers';
import * as fromContact from '@vk-homepage/contact/reducers';
import { LayoutActions } from '@vk-homepage/core/actions';
import { Router} from "@angular/router";

import {
  trigger,
  style,
  animate,
  transition,
  query,
  group,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  animations: [
    trigger('dataAnimations', [   
      transition(':increment', [
        query(':enter', [
          style({ top: '140%', opacity:0})
        ], { optional: true }),
        group([
          query(':leave', [
            animate('800ms ease-out', style({ top: '-40%', opacity:0}))
          ], { optional: true }),
          query(':enter', [
            animate('800ms ease-out', style({ top: '50%', opacity:1}))
          ], { optional: true })
        ]),
      ]),
      transition(':decrement', [
        query(':enter', [
          style({ top: '-40%',})
        ], { optional: true }),
        group([
          query(':leave', [
            animate('800ms ease-out', style({ top: '140%', opacity:0}))
          ], { optional: true }),
          query(':enter', [
            animate('800ms ease-out', style({ top: '50%', opacity:1}))
          ], { optional: true })
        ]),
      ]),
    ]),
    
    trigger('routeAnimations', [
      transition(':enter', [
        style({ opacity: 0 }),      
           animate('1s', keyframes([
            style({ opacity: 0, offset: 0}),
            style({ opacity: 1, offset: 0.5}),
            style({ opacity: 1, offset: 1.0}),
          ])),
        ]),
        transition(':leave', [   
            style({ opacity: 1 }),
              animate('1s', keyframes([
                style({ opacity: 1, offset: 0}),
                style({ opacity: 1, offset: 0.5}),
                style({ opacity: 0, offset: 1}),
              ])),
        ]),
     
      transition(':increment', [
        query(':enter, :leave', [
          style({
            position: 'fixed',
            transform: 'translateY(0%)',
          })
        ], { optional: true }),
        query(':enter', [
          style({ transform: 'translateY(100%)', opacity:0})
        ], { optional: true }),
        group([
          query(':leave', [
            animate('800ms ease-out', style({ transform: 'translateY(-100%)', opacity:0}))
          ], { optional: true }),
          query(':enter', [
            animate('800ms ease-out', style({ transform: 'translateY(0%)', opacity:1}))
          ], { optional: true })
        ]),
      ]),

      transition(':decrement', [
        query(':enter, :leave', [
          style({
            position: 'fixed',
            transform: 'translateY(0)',

          })
        ], { optional: true }),
        query(':enter', [
          style({ transform: 'translateY(-100%)'})
        ], { optional: true }),
        group([
          query(':leave', [
            animate('800ms ease-out', style({ transform: 'translateY(100%)', opacity:0}))
          ], { optional: true }),
          query(':enter', [
            animate('800ms ease-out', style({ transform: 'translateY(0%)', opacity:1}))
          ], { optional: true })
        ]),
      ]),
    ])
  ]
})

export class AppComponent{

  loaded$: Observable<boolean>;
  showLoadingScreen$: Observable<boolean>; 
  showMenu$: Observable<boolean>; 
  navTree$: Observable<any>;
  currentPathId$: Observable<number>;
  currentDataId$: Observable<number>;
  navigation$: Observable<any>;
  
  constructor(private store: Store<fromRoot.State>, private router: Router) {

    this.loaded$ = this.store.pipe(select(fromRoot.selectLoaded));
    this.showMenu$ = this.store.pipe(select(fromRoot.selectShowMenu));
    this.showLoadingScreen$ = this.store.pipe(select(fromRoot.selectShowLoadingScreen));
    this.navTree$ = this.store.pipe(select(fromRoot.selectNavTree)); 
    this.currentPathId$ = this.store.pipe(select(fromRoot.selectSelectedPathId));
    this.currentDataId$ = this.store.pipe(select(fromContact.selectSelectedQuestionId));
    this.navigation$ = this.store.pipe(select(fromRoot.selectNavigation)); 
    
    const wheel$ = fromEvent(document, 'wheel').pipe(
      throttleTime(300),
      tap((event) => event['deltaY'] > 0 ? this.navigatePath('next') : this.navigatePath('prev')) 
      ).subscribe();
  }

  @HostListener('swipedown', ['$event.target'])
    onSwipeDown(){this.navigatePath('prev')}

  @HostListener('swipeup', ['$event.target'])
    onSwipeUp(){this.navigatePath('next')}

  navigatePath(i: string){
    this.navigation$.pipe(
      map(nav => nav[i]),
      take(1),
      filter(nav => nav != null && nav != undefined)
    ).subscribe(nav => (typeof nav === 'number') ? 
    this.store.dispatch(LayoutActions.navigateDataObject({objectID:nav })) : 
    this.router.navigate([nav]) );
  }

  setMenu(showMenu:boolean){
    if(showMenu === true)
      this.store.dispatch(LayoutActions.closeMenu());
    else
      this.store.dispatch(LayoutActions.openMenu());
  }

  ngOnInit() {
    this.store.dispatch(LayoutActions.getPaths());
  }

}