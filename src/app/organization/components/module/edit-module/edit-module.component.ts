import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ModuleService } from '../Services/module.service'
import Swal from 'sweetalert2'
import { Module } from 'src/app/shared/models/module';


@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {

  /** Holds the value of new parentModule  */
  newParentModule = '';

  /** Holds the value of new module name */
  newModuleName = '';

  /** Holds the value of new connected module */
  newConnectedModules = '';

  /** Holds Short Key of Module */
  id = ''

  /** Holds the module object from DB  */
  module;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ModuleService: ModuleService) { }

  /**
* Redirects to dashboard view
* @memberof EditModuleComponent
*/
  goToDashboard() {
    this.router.navigate(['/org'])

  }

  /**
 * Redirects to go to view
 * @memberof EditModuleComponent
 */
  goToView() {
    this.router.navigate(['/org/list-module'])

  }


  /**
   * Redirects to add view
   * @memberof EditModuleComponent
   */
  goToAdd() {
    this.router.navigate(['/org/add-module'])

  }

  /**
 * Enable disbale edit button
 * @returns {boolean}
 * @memberof EditModuleComponent
 */
  enableButton() {
    if (this.newModuleName.trim() === '' || this.newConnectedModules.trim() === "") {
      return true
    }
    if ((!this.newParentModule)
      || !(this.newModuleName)
      || (!this.newConnectedModules)) {
      return true
    }
    else {
      return false
    }
  }

  /**
 * Enable disable validation warning
 * @returns {boolean}
 * @memberof EditModuleComponent
 */
  enableAlert() {
    const regex = /^[a-zA-Z_ ]*$/
    const parent = regex.test(this.newParentModule)
    const name = regex.test(this.newModuleName)
    const connected = regex.test(this.newConnectedModules)
    if (parent == true && name == true && connected == true) {
      return true
    } else {
      return false
    }
  }

  /**
 * Process the obejct that is to be passed as body
 * @param object of Module
 * @returns {object} of Module
 * @memberof EditModuleComponent
 */
  processObjUpdated(object: Module) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'master' && key != 'masterId') {
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
 * Submits the edited form
 * @memberof EditModuleComponent
 */
  onClick() {
    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })

    var obj = new Module();
    obj.masterId = this.id;
    obj.parentModule = this.newParentModule
    obj.moduleName = this.newModuleName
    obj.connectedModules = this.newConnectedModules


    this.ModuleService
      .updateModule(this.id, this.processObjUpdated(obj))
      .subscribe((data) => {
        console.log(data);
        if (data) {
          Swal.fire(
            'Congratulations!',
            'Module  has been Updated',
            'success'
          ).then(result => {
            this.router.navigate(['/org/list-module'])

          })
        }

        error => {
          Swal.fire(
            'Error!',
            'Could not add Module',
            'error'
          )
          console.log(error)
        }
      })

  }







  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(

      (queryParams: Params) => {
        this.module = JSON.parse(queryParams.params)
        console.log(this.module)
      }

    );
    this.id = this.module.masterId
    this.newParentModule = this.module.parentModule
    this.newModuleName = this.module.moduleName
    this.newConnectedModules = this.module.connectedModules;
  }

}
