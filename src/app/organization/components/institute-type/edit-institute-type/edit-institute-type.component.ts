import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Validations} from '../../../../shared/Services/Validations'



@Component({
  selector: 'app-edit-institute-type',
  templateUrl: './edit-institute-type.component.html',
  styleUrls: ['./edit-institute-type.component.scss']
})
export class EditInstituteTypeComponent implements OnInit {
  oldInstituteType = "MTech"
  newInstituteType = ""
  id = ""
  showDangerMessage : boolean = false
  validations : any

  constructor(private activatedRoute : ActivatedRoute, private router : Router ) { }

  onClick(){
    console.log(this.newInstituteType)
    const validationResult = this.validations.validateName(this.newInstituteType)
    console.log(validationResult)
    if(validationResult)
    {
      if(this.oldInstituteType !== this.newInstituteType)
      {
        console.log(this.oldInstituteType, this.newInstituteType)
  
        fetch(`https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/${this.id}`, {
          method : 'PUT',
          body : JSON.stringify({
            "attribute" : ["instituteType"],
            "value" : [this.newInstituteType]
          })
        })
        .then( result => {
          console.log(result)
            console.log(result)
            this.router.navigate(['/org/list-institute-type'])
        })
        .catch(err => {
          console.log(err)
        })
      }
     
    }   
    else {
      this.showDangerMessage = true
    }
  }

  ngOnInit(): void {
    this.validations = new Validations()
    this.id = this.activatedRoute.snapshot.params.itemId;
    const instituteType =this.activatedRoute.snapshot.params.instituteType
    console.log(this.id, instituteType)
    this.newInstituteType = instituteType
  }

}
