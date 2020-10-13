import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html',
  styleUrls: ['./org-form.component.css']
})
export class OrgFormComponent implements OnInit {
  errorMsg : string = "Invalid ."
  showError : boolean  = false
  name : string = ''
  disableButton : boolean = true
  form = new FormGroup({
    OrgName: new FormControl('', Validators.required)
    
   });

  constructor() { }

  ngOnInit(): void {
  }

  onUpdateName( event : Event ){
    this.disableButton = false
    this.name = (<HTMLInputElement>event.target).value

  }
  onSubmit(){
     var regex = /^[A-Za-z0-9.'_ ]+$/
     var isValid = regex.test(this.name)
     
    if(this.name === ''){
      this.showError = true
      this.errorMsg = "Please Enter  Institute Type : "
    }
    else if(!isValid){
      this.showError = true
      this.errorMsg = 'Institute  Type can Only contain special characters like dot, single, quotes, dash,space . '
    }
    else{
      return
    }
    

  }
}
