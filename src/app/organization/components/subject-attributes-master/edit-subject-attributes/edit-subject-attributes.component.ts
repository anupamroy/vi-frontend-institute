import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-subject-attributes',
  templateUrl: './edit-subject-attributes.component.html',
  styleUrls: ['./edit-subject-attributes.component.scss']
})
export class EditSubjectAttributesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick = () => {
    console.log('on click');

  }

  enableButton = () => {
    console.log('enable button');
    return false;
  }

  enableAlert = () => {
    console.log('enable Alert');
    return true;
  }

}
