import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
    getPortfolioItems(): Observable<{[id: number] : any}> {    
        return of({
          1:{
            id: 1, name: ""
          },
          2:{
            id: 2, name: "about", children:[3]
          },
          3:{
            id: 3, name: "cv"
          },
          4:{
            id: 4, name: "gallery"
          },
          5:{
            id: 5, name: "contact"
          } 
        });
    }
}