import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectedQuestion' })
export class ContactPipe implements PipeTransform {
  transform(questions: any[], selectedQuestionID) {
    return questions?.filter(question => question.id === selectedQuestionID);
  }
}