import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ContactActions } from '@vk-homepage/contact/actions';
import * as fromContact from '@vk-homepage/contact/reducers';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'vk-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <vk-contact (respond)="respond($event)" (navigate)="navigate($event)" (submit)="submit($event)" 
  [contact]="contact$ | async" [message]="message$ | async">
  </vk-contact>
  `,
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {

  contact$: Observable<any>;
  message$: Observable<any>;

  constructor(private store: Store<fromContact.State>) {
    this.contact$ = store.pipe(select(fromContact.getQuestionView));
    this.message$ = store.pipe(select(fromContact.getMessageView));
  }

  navigate(nextID: number){
      this.store.dispatch(ContactActions.navigateNextQuestion({id:nextID}));
  }

  respond(answer) {
    if(answer.id)
      this.store.dispatch(ContactActions.updateAnswer( {id:answer.id, value:answer.value, question:answer.question} ));
    else
      this.store.dispatch(ContactActions.addAnswer( {id:uuid(), value:answer.value, question:answer.question} ));
  }

  submit(message){
    this.store.dispatch(ContactActions.submitMessage({id:uuid(), subject:"VilleSivusto", content:message.summary, questions:message.parents}));
  }

  ngOnInit() {
    this.store.dispatch(ContactActions.enter());
  }

  ngOnDestroy(){
    this.store.dispatch(ContactActions.leave());
  }

}
