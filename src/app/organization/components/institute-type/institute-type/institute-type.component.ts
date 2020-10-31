import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { InstituteTypeService } from '../Services/institute-type.service'
import { InstituteType } from '../instituteType.model';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-institute-type',
  templateUrl: './institute-type.component.html',
  styleUrls: ['./institute-type.component.scss']
})
export class InstituteTypeComponent implements OnInit {

  /** Holds thevlaue for enabling or disabling the button */
  disableButton: boolean = true

  /** Holds the value of institute Type */
  instituteType: string = ''


  constructor(
    private activatedRoute: ActivatedRoute, //not used
    private router: Router,
    private InstituteTypeService: InstituteTypeService) { }

  
  /**
   * Process the obejct that is to be passed as body
   * @param object of Institute Type
   * @returns {object} of Institute Type
   * @memberof InstituteTypeComponent
   */
  processObjUpdated(object: InstituteType) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'master' && key !== 'masterId') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      master: object.master,
      masterId: object.masterId
    }
  }


  /**
   * Enable disbale edit button
   * @returns {boolean}
   * @memberof InstituteTypeComponent
   */
  enableButton() {
    if (this.instituteType.trim() === '') {
      return true
    }
    else {
      return false
    }
  }


  /**
   * Enable disable validation warning
   * @returns {boolean}
   * @memberof InstituteTypeComponent
   */
  enableAlert() { // need to add in commom framework validationss
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.instituteType)
  }


  /**
   * Submits the add institute type form
   * @memberof InstituteTypeComponent
   */
  onSubmit() {
    const instituteTypeObj = new InstituteType();
    instituteTypeObj.isDeleted = false;
    instituteTypeObj.isActivated = true;
    instituteTypeObj.institute_type_name = this.instituteType;


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

