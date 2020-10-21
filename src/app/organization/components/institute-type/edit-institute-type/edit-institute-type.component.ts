import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Validations} from '../../../../shared/Services/Validations'
import { InstituteTypeService} from '../Services/institute-type.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-institute-type',
  templateUrl: './edit-institute-type.component.html',
  styleUrls: ['./edit-institute-type.component.scss']
})
export class EditInstituteTypeComponent implements OnInit {
  oldInstituteType = "MTech"
  newInstituteType = ""
  id = ""
  
  validations : any
  disabledButton : boolean = false
  showMessage : boolean = false
  message : string
  class : string = ""

  constructor(
    private activatedRoute : ActivatedRoute, 
    private router : Router ,
    private InstituteTypeService : InstituteTypeService) { }

  onEditInstituteType( event : Event ){
    
    const validationResult = this.validations.validateName(this.newInstituteType)
    console.log(validationResult)
    if(validationResult ){
      this.disabledButton = false
      this.showMessage = false
    }
    else {
      if(this.newInstituteType.trim() === ''){
        this.disabledButton = true
        this.showMessage = true
        this.class = 'alert alert-danger'
        this.message = 'Institute Type Can Not Be Blank'
      } else{
        this.disabledButton=true
        this.showMessage = true
        this.class = 'alert alert-danger'
        this.message = 'Numbers And  Special Characters Are Not Allowed . '

      }
      
    }
    
    this.newInstituteType = (<HTMLInputElement>event.target).value

  }
  goToView(){
    this.router.navigate(['/org/list-institute-type'])
  }
  goToAdd(){
    this.router.navigate(['/org/add-institute-type'])
  }
  goToDashboard(){
    this.router.navigate(['/org'])
  }

  onClick(){
    Swal.fire(
      'Congratulations!',
      'Institute Type has been Updated',
      'success'
    )
    console.log(this.newInstituteType)
   
      if(this.oldInstituteType !== this.newInstituteType)
      {
        console.log(this.oldInstituteType, this.newInstituteType)
        let body = JSON.stringify({
              "attribute" : ["instituteType"],
              "value" : [this.newInstituteType]
            })

        this.InstituteTypeService.updateInstituteTypeById(this.id, body).subscribe({
          next : responseData =>{
            console.log(responseData)
            this.router.navigate(['/org/list-institute-type'])
          },
          error : error => {
            console.log(error)
          }
        })
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
