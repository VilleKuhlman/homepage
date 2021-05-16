import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AboutActions } from '@vk-homepage/about/actions';
import * as fromAbout from '@vk-homepage/about/reducers';

@Component({
  selector: 'vk-cv-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<vk-cv [toggledRowId]="toggledRowId$ | async" (toggleRow)="setRow($event)"></vk-cv>`,
  styleUrls: ['./cv-page.component.scss']
})
export class CVPageComponent implements OnInit {

  toggledRowId$: Observable<number>;

  constructor(private store: Store<fromAbout.State>) {
    this.toggledRowId$ = store.pipe(select(fromAbout.selectToggledRow));   
  }

  ngOnInit() {
  }

  setRow(id: number){
    this.store.dispatch(AboutActions.toggleRow({id}));
  }

}
