import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Path } from '@vk-homepage/core/models';

@Injectable({ providedIn: 'root' })
export class LayoutService {
    getPaths(): Observable<{[id: number] : Path}> {    
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
            id: 4, name: "portfolio"
          },
          5:{
            id: 5, name: "contact", hasData:true
          } 
        });
    }
}




