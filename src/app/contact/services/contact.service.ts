import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Message } from '@vk-homepage/contact/models';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
    responseType: 'text' as 'json',
  };

@Injectable({ providedIn: 'root' })
export class ContactService {

    private API_PATH = 'https://us-central1-vk-homepage-367f8.cloudfunctions.net/sendMail';

    constructor(
        private http: HttpClient) {  }

    sendMail(message: Message): Observable<Message> {
        return this.http.post<Message>(this.API_PATH, message, httpOptions);
    }

    getQuestions(): Observable<{[id: number] : {id:number, sentence:string, choices?:number[], child?:number, type?:string, placeholder?:string}}> {    
        return of({
          1:{
            id:1, sentence:"What are you up to?", placeholder:"Please select one of the following.", type:"choice", choices:[5,6,7]
          },
          2:{
            id:2, sentence:"For a position", placeholder:"Please describe about the role.", child:3, type:"string"
          },
          3:{
            id:3, sentence:"With monthly salary", placeholder:"Only numbers are allowed.",  child:8, type:"number"
          },
          4:{
            id:4, sentence:"What's your message?", placeholder:"This information is only used to mail you back.", type:"string"
          },
          5:{
            id:5, sentence:"I want to send you a virtual High five"
          },
          6:{
            id:6, sentence:"I would like to hire you", child:2
          },
          7:{
            id:7, sentence:"I want to send you a message", child:4
          },
          8:{
            id:8, sentence:"With additional information", placeholder:"This information is only used to mail you back.", type:"string"
          },
        });
    }
  
}




