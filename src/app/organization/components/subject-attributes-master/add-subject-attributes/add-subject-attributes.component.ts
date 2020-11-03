import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-subject-attributes',
  templateUrl: './add-subject-attributes.component.html',
  styleUrls: ['./add-subject-attributes.component.scss']
})
export class AddSubjectAttributesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  enableButton = () => {
    console.log('enable button');
    return false;
  }

  enableAlert = () => {
    console.log('enable Alert');
    return true;
  }

  onSubmit =()=>{
    console.log('form submitted......');
    
  }

}
