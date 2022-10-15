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
    {title: "Programming:", subskills:["TypeScript, JavaScript, NodeJS, MySQL, PostgreSQL, React, Angular"]},
    {title: "Platforms:", subskills:["AWS, VMware, Azure, ServiceNow"]},
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
