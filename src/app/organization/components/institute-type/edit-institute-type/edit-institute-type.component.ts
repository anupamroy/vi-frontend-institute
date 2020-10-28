import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { InstituteTypeService} from '../Services/institute-type.service'
import Swal from 'sweetalert2'
import { InstituteType } from '../../../../shared/models/institute-type';


@Component({
  selector: 'app-edit-institute-type',
  templateUrl: './edit-institute-type.component.html',
  styleUrls: ['./edit-institute-type.component.scss']
})
export class EditInstituteTypeComponent implements OnInit {
 
  newInstituteType = ""
  id = ""
  institute_type=''
  
  constructor(
    private activatedRoute : ActivatedRoute, 
    private router : Router ,
    private InstituteTypeService : InstituteTypeService) { }

    
  processObjUpdated(object: InstituteType){
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'itemId') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      itemId: object.itemId
    }
  }

    enableButton() {
      if(this.newInstituteType && this.newInstituteType.trim() === '') {
        return true
      }
      else {
        return false
      }
    }
  
    enableAlert(){
      const regex = /^[a-zA-Z_ ]*$/
      return regex.test(this.newInstituteType)
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
    Swal.fire({
      title : "Updating Institute Type",
      willOpen: () => {
        Swal.showLoading()        
      },     
    }).then((result) => {
     
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('Adding Institute Type ')
      }
      })
    
      const instituteTypeObj = new InstituteType();
      instituteTypeObj.instituteType = this.newInstituteType



    this.InstituteTypeService.updateInstituteTypeById(this.id, this.processObjUpdated(instituteTypeObj)).subscribe({
      next : responseData =>{
        console.log(responseData)
        if(responseData){
          Swal.fire(
            'Congratulations!',
            'Institute Type has been Updated',
            'success'
          ).then(result => {
            this.router.navigate(['/org/list-institute-type'])
          })
        }
      },
      error : error => {
        console.log(error)
      }
    })

  }

  ngOnInit(): void {
    this.institute_type = this.activatedRoute.snapshot.params.instituteType;

    this.id = this.activatedRoute.snapshot.params.itemId;
    const instituteType =this.activatedRoute.snapshot.params.instituteType
    console.log(this.id, instituteType)
    this.newInstituteType = instituteType
  }

}
