import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Validations } from '../../../../shared/Services/Validations'


@Component({
  selector: 'app-institute-type',
  templateUrl: './institute-type.component.html',
  styleUrls: ['./institute-type.component.scss']
})
export class InstituteTypeComponent implements OnInit {
  disableButton : boolean = true
  instituteType : string = ''
  showDangerMessage: boolean = false
  validations : any

  constructor( private activatedRoute : ActivatedRoute, private router : Router) { }

  onAddInstituteType( event : Event ){
    this.disableButton = false
    this.instituteType = (<HTMLInputElement>event.target).value

  }

  onSubmit(){
    const validationResult = this.validations.validateName(this.instituteType)
    console.log(validationResult)
    if(validationResult){
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
        this.router.navigate(['/org/list-institute-type'])
        })
      .catch(err => {
        console.log(err)
      })

    }
    else {
      this.showDangerMessage = true
    }

  }

  ngOnInit(): void {
    this.validations = new Validations()
  }

}
