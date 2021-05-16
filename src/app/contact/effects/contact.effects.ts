import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, delay,tap, catchError, mergeMap, delayWhen} from 'rxjs/operators';
import { ContactService } from '@vk-homepage/contact/services';
import { ContactActions } from '@vk-homepage/contact/actions';
import { LayoutActions } from '@vk-homepage/core/actions';
import { Message } from '@vk-homepage/contact/models';
import { interval, of } from 'rxjs';

@Injectable()
export class ContactEffects {
 
  constructor(
    private actions$: Actions,
    private ContactService: ContactService,
  ) {  }

  submitMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.submitMessage),
      switchMap((message) =>
        this.ContactService.sendMail(message).pipe(
          catchError(err => of(`I caught: ${err}`)),
          map((response: Message) =>
            ContactActions.submitMessageSuccess(),
          ),
          delay(3000),
          map(() =>
            LayoutActions.navigateDataObject({objectID:1})
          )
        )
      )
    )
  );

  getQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.enter),
      switchMap(() =>
        this.ContactService.getQuestions().pipe(
          delay(0),
          map((questions: {[id: number] : {id:number, sentence:string, choices?:number[], child?:number, type?:string, placeholder?:string}}) =>
          ContactActions.getQuestionsSuccess({ questions })
          ),
        )
      )
    )
  );

  navigateNextQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.navigateNextQuestion),    
      delay(600),
      map((action) =>
        LayoutActions.navigateDataObject({objectID:action.id})
      )
    )
  );

  navigateDataObject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LayoutActions.navigateDataObject),
      mergeMap((action) => 
        of(document.hasFocus() && (document.activeElement.tagName == 'TEXTAREA')).pipe(     
          tap((textAreaFocused) => {
              if(textAreaFocused)
                (document.activeElement as HTMLElement).blur()    
          }),
          delayWhen(textAreaFocused => textAreaFocused ? interval(600) : of({})),
          map(() => ContactActions.updateSelectedQuestion({objectID:action.objectID})),
        )
      )
    )
  );

}




