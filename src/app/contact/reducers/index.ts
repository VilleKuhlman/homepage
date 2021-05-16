import {
    createSelector,
    createFeatureSelector,
    Action,
    combineReducers
  } from '@ngrx/store';
  
  import * as fromRoot from '@vk-homepage/reducers';
  import * as fromContact from '@vk-homepage/contact/reducers/contact.reducer';

  export const contactFeatureKey = 'contact';

  export interface ContactState {
    [fromContact.contactFeatureKey]: fromContact.State;
  }

  export interface State extends fromRoot.State {
    [contactFeatureKey]: ContactState;
  }

  
  export function reducers(state: ContactState | undefined, action: Action) {
    return combineReducers({
      [fromContact.contactFeatureKey]: fromContact.reducer,
    })(state, action);
  }

  /**
   * Contact Reducers
   */
  export const selectMainContactState = createFeatureSelector<State, ContactState>('contact');
  
  export const selectContactState = createSelector(
    selectMainContactState,
    state => state.contact
  );

  export const selectQuestions = createSelector(
    selectContactState,
    fromContact.selectQuestions
  );

  export const getQuestions = createSelector(
    selectQuestions,
    (questions) => questions && Object.keys(questions).map(key => questions[key])
  );
  
  export const selectSelectedQuestionId = createSelector(
    selectContactState,
    fromContact.selectSelectedQuestionId
  );

  export const selectSelectedQuestion = createSelector(
    selectQuestions,
    selectSelectedQuestionId,
    (entities, selectedId) => {
      return selectedId && entities && entities[selectedId];
    }
  );

  export const selectSelectedQuestionChoices = createSelector(
    selectSelectedQuestion,
    selectQuestions,
    (question, questions) => (question && question.choices) ? question.choices.map(choiceId => questions[choiceId]) : []
  );

  export const selectAnswers = createSelector(
    selectContactState,
    fromContact.selectAnswers
  );

  export const getAnswers = createSelector(
    selectAnswers,
    (entities) => {
      return entities && Object.keys(entities).map(key => entities[key]);
    }
  );

  export const selectSelectedQuestionAnswer = createSelector(
    selectSelectedQuestionId,
    getAnswers,
    (selectedId, answers) => {
      return (selectedId && answers.filter(answer => answer.question === selectedId)[0]);
    }
  );

  export const selectSelectedQuestionAnswerValue = createSelector(
    selectSelectedQuestionAnswer,
    (answer) => {
      return answer && answer.value;
    }
  );

  export const selectSelectedQuestionParent = createSelector(
    getQuestions,
    selectSelectedQuestionId,
    (questions, selectedID) => {
      return questions && questions.filter(question => question.child === selectedID).map(parent => 
        questions.filter(question => question.choices?.indexOf(parent.id) > -1).length > 0 ?
        questions.filter(question => question.choices?.indexOf(parent.id) > -1)[0].id : parent.id
        )[0];         
    }
  );

  export const selectSelectedQuestionParents = createSelector(
    getQuestions,
    selectSelectedQuestion,
    (questions, selectedQuestion) => {
      return questions && selectedQuestion && [questions.reduce((prevObj,curr,index,arr) => 
      {  
        const parentQuestion = arr.filter(question => question.child === prevObj.childId).map(parent => 
          questions.filter(question => question.choices?.indexOf(parent.id) > -1).length > 0 ?
          questions.filter(question => question.choices?.indexOf(parent.id) > -1)[0] : parent
          )[0];
              
       return  {
          childId: parentQuestion ? parentQuestion.id : null,
          questions: parentQuestion ? [parentQuestion].concat(prevObj.questions) : prevObj.questions,
        };
      }      
      , {childId:selectedQuestion.id, questions:[selectedQuestion] })]
      .map(result => result.questions).reduce((acc, val) => acc.concat(val), []);
    }
  );

  export const getParentQuestionIDs = createSelector(
    selectSelectedQuestionParents,
    (entities) => {
      return entities && Object.keys(entities).map(key => entities[key].id);
    }
  );
  

  export const selectAnswerSummary = createSelector(
    selectSelectedQuestionParents,
    getAnswers,
    getQuestions,
    (parentQuestions, answers, questions) => {
      return parentQuestions && answers && parentQuestions.reduce((summary, question, currentIndex, arr) => 
      {
        const answer = answers.filter(answer => answer.question === question.id)
        .map(answer => question.choices ? questions.filter(choice => choice.id === answer.value)[0]?.sentence : answer.value)
        [0];

        const summaryString = question.sentence+"\n"+answer+"\n\n";

        return summary+=summaryString;
      }, ""
    )
  });

  export const selectSelectedQuestionChoiceAnswer= createSelector(
    selectSelectedQuestionAnswer,
    selectSelectedQuestionChoices,
    (answer, choices) => {
      return answer && choices && choices.filter(choice => choice.id === answer.value)[0];
    }
  );

  export const selectSelectedQuestionChild = createSelector(
    selectSelectedQuestion,
    selectSelectedQuestionChoiceAnswer,
    (question, choiceAnswer) => {
      return (choiceAnswer && choiceAnswer.child) ? choiceAnswer.child : (question && question.child) ? question.child : question ? undefined : null;
    }
  );

  export const showSubmit = createSelector(
    selectSelectedQuestionChild,
    selectSelectedQuestion,
    selectSelectedQuestionAnswer,
    (nextQuestionId, question, answer) => {
      return !nextQuestionId && (question?.type !== 'choice' || !!answer);
    }
  );

  export const selectSubmitted = createSelector(
    selectContactState,
    fromContact.selectSubmitted
  );

  export const getMessages = createSelector(
    selectSubmitted,
    (entities) => {
      return entities && Object.keys(entities).map(key => entities[key].questions.map(question => question.id).toString());
    }
  );
  
  export const messageSubmitted = createSelector(
    getMessages,
    getParentQuestionIDs,
    (messages, parents) => {
      return messages.includes(parents?.toString());
    }
  );

  export const getQuestionView = createSelector(
    getQuestions,
    selectSelectedQuestion,
    selectSelectedQuestionChoices,
    selectSelectedQuestionAnswer,
    selectSelectedQuestionChild,
    showSubmit,
    messageSubmitted,
    selectAnswerSummary,
    (questions, question, choices, answer, nextQuestionId, showSubmit, submitted, summary, parents) => question && {questions, question, choices, answer, nextQuestionId, showSubmit, submitted, summary, parents}
  )

  export const getMessageView = createSelector(
    showSubmit,
    messageSubmitted,
    selectAnswerSummary,
    selectSelectedQuestionParents,
    (showSubmit, submitted, summary, parents) => summary && {showSubmit, submitted, summary, parents}
  )