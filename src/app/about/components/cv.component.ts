import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'vk-cv',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  
})
export class CVComponent implements OnInit {

  @Input() toggledRowId: number;
  @Output() toggleRow = new EventEmitter();
  skills = [
    {title: "Role based:", subskills:["Development Leadership, Solution Design, Project Management"]},
    {title: "Programming:", subskills:["JavaScript, NodeJS, Java, MySQL, Angular, NGRX"]},
    {title: "Platforms:", subskills:["VMware, Hyper-V, Azure, AWS"]},
    {title: "Methods:", subskills:["SAFe, Scrum, Agile, ITIL"]},
  ];

  constructor() { }

  ngOnInit() {
    if(this.toggledRowId === 0){
      setTimeout(()=> {    
        this.toggleRow.emit(1);
    }, 700);
    }
  
  }

}
