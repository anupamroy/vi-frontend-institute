import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { InstituteTypeService } from '../Services/institute-type.service'
import Swal from 'sweetalert2'
import { InstituteType } from '../instituteType.model';


@Component({
  selector: 'app-edit-institute-type',
  templateUrl: './edit-institute-type.component.html',
  styleUrls: ['./edit-institute-type.component.scss']
})
export class EditInstituteTypeComponent implements OnInit {

  /** Holds the value of new institute type */
  newInstituteType: string = ""

  /** Holds the id of the institute */
  id: string = ""

  /** Holds the original vlue of the institute type */
  institute_type: string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private InstituteTypeService: InstituteTypeService) { }

  
  /**
   * Process the obejct that is to be passed as body
   * @param object of Institute Type
   * @returns {object} of Institute Type
   * @memberof EditInstituteTypeComponent
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
   * @memberof EditInstituteTypeComponent
   */
  enableButton() {
    if (this.newInstituteType && this.newInstituteType.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  /**
   * Enable disable validation warning
   * @returns {boolean}
   * @memberof EditInstituteTypeComponent
   */
  enableAlert() { //common validation
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.newInstituteType)
  }

  /**
   * Redirects to go to view
   * @memberof EditInstituteTypeComponent
   */
  goToView() {
    this.router.navigate(['/org/list-institute-type'])
  }

  /**
   * Redirects to add view
   * @memberof EditInstituteTypeComponent
   */
  goToAdd() {
    this.router.navigate(['/org/add-institute-type'])
  }

  /**
   * Redirects to dashboard view
   * @memberof EditInstituteTypeComponent
   */
  goToDashboard() {
    this.router.navigate(['/org'])
  }


  /**
   * Submits the edited form
   * @memberof EditInstituteTypeComponent
   */
  onClick() {
    Swal.fire({
      title: "Updating Institute Type",
      willOpen: () => {
        Swal.showLoading()
      },
    }).then((result) => {

      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('Adding Institute Type ')
      }
    })

    const instituteTypeObj = new InstituteType();

    instituteTypeObj.institute_type_name = this.newInstituteType
    instituteTypeObj.masterId = this.id;
    
    this.InstituteTypeService.updateInstituteTypeById(this.processObjUpdated(instituteTypeObj)).subscribe({
      next: responseData => {
        if (responseData) {
          Swal.fire(
            'Congratulations!',
            'Institute Type has been Updated',
            'success'
          ).then(result => {
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
    this.institute_type = this.activatedRoute.snapshot.params.instituteType;
    this.id = this.activatedRoute.snapshot.params.itemId;

    const instituteType = this.activatedRoute.snapshot.params.instituteType
    this.newInstituteType = instituteType
  }

}
