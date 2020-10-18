import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institute-type',
  templateUrl: './institute-type.component.html',
  styleUrls: ['./institute-type.component.scss']
})
export class InstituteTypeComponent implements OnInit {
  disableButton : boolean = true
  instituteType : string = ''

  constructor() { }

  onAddInstituteType( event : Event ){
    this.disableButton = false
    this.instituteType = (<HTMLInputElement>event.target).value

  }

  onSubmit(){
    const instituteTypeObj = {
      instituteType : this.instituteType
    }

    console.log(instituteTypeObj)

    fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org', {
      method : 'post',
      body : JSON.stringify(instituteTypeObj)
    })
    .then(result =>{
      console.log(result)
      
    })
    .catch(err => {
      console.log(err)
    })


  }

  ngOnInit(): void {
  }

}
