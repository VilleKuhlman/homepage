import { createAction, props } from '@ngrx/store';
import { Message } from '@vk-homepage/contact/models';

export const submitMessage = createAction('[contact] Submit Message', props<Message>());
export const submitMessageSuccess = createAction('[contact] Submit Message Success');
export const enter = createAction('[contact] Enter Component');
export const leave = createAction('[contact] Leave Component');
export const getQuestionsSuccess = createAction('[contact] Get Questions Success', props<{ questions: {[id: number] : {}} }>());

export const addAnswer = createAction('[contact] Add Answer', props<{id:string, question:any, value: any }>());
export const updateAnswer = createAction('[contact] Update Answer', props<{id:string, question:any, value: any}>());
export const navigateNextQuestion = createAction('[contact] Navigate Next Question', props<{id:number}>());

export const updateSelectedQuestion = createAction('[contact] Update Question', props<{ objectID: number, }>());
