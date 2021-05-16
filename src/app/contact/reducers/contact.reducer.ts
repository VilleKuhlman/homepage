import { createReducer, on } from '@ngrx/store';
import { ContactActions } from '@vk-homepage/contact/actions';

export const contactFeatureKey = 'contact';

export interface State {
  questions: {[id: number] : {id:number, sentence:string, choices?:number[], child?:number, type?:string}};
  answers: {[id: number] : {id:number, value:any, question:number}};
  selectedQuestionId : number;
  submitted : {[id: number] : {id:number, subject:string, content:string, questions:number[]}};
}

export const initialState: State = {
  questions: {},
  answers: {},
  selectedQuestionId : 1,
  submitted: {},
};

export const reducer = createReducer(
  initialState,

  on(ContactActions.getQuestionsSuccess, (state, { questions }) => ({
    ...state,
    selectedQuestionId : 1,
    questions: {...questions},
  })),

  on(ContactActions.submitMessage, (state, message) => ({
    ...state,
    submitted: {
      ...state.submitted,
      [message.id]: {id:message.id, questions:message.questions, subject:message.subject, content:message.content}
    },
  })),

  on(ContactActions.addAnswer, (state, answer) => ({
    ...state,
    answers: {
      ...state.answers,
      [answer.id]: {id:answer.id, question:answer.question, value:answer.value}
    },
  })),

  on(ContactActions.updateAnswer, (state, answer) => ({
    ...state,
    answers: {
      ...state.answers,
      [answer.id]: {
        ...state.answers[answer.id],
       id:answer.id, question:answer.question, value:answer.value
      }
    },
  })),

on(ContactActions.updateSelectedQuestion, (state, { objectID }) => ({
  ...state,
  selectedQuestionId: objectID
})),

);

export const selectSubmitted = (state: State) => state.submitted;
export const selectQuestions = (state: State) => state.questions;
export const selectAnswers = (state: State) => state.answers;
export const selectSelectedQuestionId = (state: State) => state.selectedQuestionId;

