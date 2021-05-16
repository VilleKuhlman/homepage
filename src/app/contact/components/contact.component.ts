import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vk-contact',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  animations: [
     trigger('submitText', [
      transition('false => true', [
          animate('3s', keyframes([
            style({ offset: 0,   opacity:0, marginTop: '85px' }),
            style({ offset: 0.1, opacity:1, marginTop: '75px'  }),
            style({ offset: 0.9, opacity:1, marginTop: '75px'  }),
            style({ offset: 1,   opacity:0, marginTop: '65px'  }),
         ])),
      ]),  
    ]), 
  ],
})

export class ContactComponent {
  blinker:boolean = false;
  alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  @Input() contact: any;
  @Input() message: any;

  get selectedQuestionID() {
    return this.contact?.question.id;
  }
  get nextQuestionID() {
    return this.contact?.nextQuestionId;
  }
  get answer() {
    return this.contact?.answer;
  }
  get choices() {
    return this.contact?.choices;
  }
  get questions() {
    return this.contact?.questions;
  }
  get summary() {
    return this.message?.summary;
  }
  get showSubmit() {
    return this.message?.showSubmit;
  }
  get submitted() {
    return this.message?.submitted;
  }

  trackByChoiceId(index: number, choice: any): string {
    return choice.id;
  }

  trackByQuestionId(index: number, question: any): string {
    return question.id;
  }

  
  @Output() respond: EventEmitter<any> = new EventEmitter();
  @Output() navigate: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  @ViewChild("firstNameField") firstNameField: ElementRef;
  focusOnFirstName(type){
        if(type === 'string' || type === 'number')
        this.firstNameField.nativeElement.focus();
  }

  faCheck = faCheck;
  faEnvelope = faEnvelope;
   constructor() { }

   navigateNext(){ 
     this.blinker = true;
    setTimeout(()=> {   
      if(this.nextQuestionID)
        this.navigate.emit(this.nextQuestionID);
    }, 0);
    setTimeout(()=> {   
      this.blinker = false;
  }, 600); 
  }

   setAnswer(value){
    this.respond.emit({question:this.selectedQuestionID, value:value, id:this.answer?.id});
   }

   submitAnswer(){
    this.submit.emit(this.message);
   }

   getRows(){
     return this.answer ? this.answer.value.split("\n").length < 4 ? this.answer.value.split("\n").length : 3 : 1;
   }
 }