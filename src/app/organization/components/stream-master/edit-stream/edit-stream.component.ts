import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-stream',
  templateUrl: './edit-stream.component.html',
  styleUrls: ['./edit-stream.component.scss']
})
export class EditStreamComponent implements OnInit {

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
