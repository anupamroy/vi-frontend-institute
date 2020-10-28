import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { InstituteTypeService } from '../Services/institute-type.service'
import { InstituteType } from '../../../../shared/models/institute-type';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-institute-type',
  templateUrl: './institute-type.component.html',
  styleUrls: ['./institute-type.component.scss']
})
export class InstituteTypeComponent implements OnInit {
  disableButton: boolean = true
  instituteType: string = ''


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private InstituteTypeService: InstituteTypeService) { }

    
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
    if (this.instituteType.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert() {
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.instituteType)
  }

  onSubmit() {
    const instituteTypeObj = new InstituteType();
    instituteTypeObj.isDeleted = false
    instituteTypeObj.isActivated = true
    instituteTypeObj.instituteType = this.instituteType

    
    Swal.fire({
        title: "Please Wait",
        willOpen: () => {
          Swal.showLoading()
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('Adding Institute Type ')
        }
      })

    this.InstituteTypeService.postInstituteType(instituteTypeObj)
        .subscribe({
          next: responseData => {
            console.log(responseData)
            if (responseData) {
              Swal.fire(
                'Congratulations!',
                'Institute Type has been added',
                'success'
              ).then(result => {
                console.log(instituteTypeObj)
                this.router.navigate(['/org/list-institute-type'])

              })
            }

          },
          error: error => {
            console.log(error)
          }
        })
    }


    ngOnInit(): void {

    }

  }

