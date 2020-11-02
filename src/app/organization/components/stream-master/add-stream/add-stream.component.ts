import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.scss']
})
export class AddStreamComponent implements OnInit {

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
