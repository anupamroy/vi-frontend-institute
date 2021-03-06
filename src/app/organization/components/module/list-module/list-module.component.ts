import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Module } from '../../../../shared/models/module'
import Swal from 'sweetalert2'
import { ModuleService } from '../Services/module.service';

@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.scss']
})
export class ListModuleComponent implements OnInit {
  modules: Module[]
  finalItems: any

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private ModuleService: ModuleService) { }


  /**
   * Process the obejct that is to be passed as body
   * @param object of Institute Type
   * @returns {object} of Institute Type
   * @memberof ListModuleComponent
   */
  processObjUpdated(object: Module) {
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
   * Delete the selected item
   * @param id of the item to be deleted
   * @memberof ListModuleComponent
   */
  onDelete(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.value) {

        Swal.fire({
          title: "Please Wait",
          willOpen: () => {
            Swal.showLoading()
          },
        })
        var newObj = new Module();
        newObj.isDeleted = true;
        newObj.masterId = id;
        this.ModuleService.deleteModule(id, this.processObjUpdated(newObj)).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.institue_type !== id;
          })
          Swal.fire(
            'Deleted!',
            'Your Data has been deleted.',
            'success'
          )
        });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Data is safe :)',
          'error'
        )
      }
    })

  }


  /**
   * Redirects to dashboard
   * @memberof ListModuleComponent
   */
  onDashboard() {
    this.router.navigate(["./org"])
  }

  /**
   * Redirects to add view
   * @memberof ListModuleComponent
   */
  onAdd() {
    this.router.navigate(["/org/add-module"])
  }

  /**
   * Deactivate a selected item
   * @param id of the selected item to be deactivated
   * @memberof ListModuleComponent
   */
  onDeactivate(id: string) {
    Swal.fire({
      title: 'Are you sure you want to deactivate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.isConfirmed) {
        // Deactivate Logic
        console.log('Deactivate')

        var newObj = new Module();
        newObj.masterId = id;
        newObj.isActivated = false;
        console.log('NEW: ', newObj);
        this.ModuleService.updateModule(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = false
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Data has been deactivated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Data is not deactivated', 'error');
      }
    })
  }

  /**
   * Activate a selected item
   * @param id of the selected item to be activated
   * @memberof ListModuleComponent
   */
  onActivate(id: string) {
    Swal.fire({
      title: 'Are you sure you want to activate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.isConfirmed) {
        // Activate Logic
        console.log('Activate');

        var newObj = new Module();
        newObj.masterId = id;
        newObj.isActivated = true;

        this.ModuleService.updateModule(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Data has been activated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Data is not activated', 'error');
      }
    })
  }




  ngOnInit(): void {
    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    })
    this.ModuleService.getModules().subscribe(responseData => {
      this.modules = JSON.parse(responseData).Items
      console.log(this.modules)
      Swal.close()
      let temp = []
      this.finalItems = this.modules.filter(record =>
        record.master === 'MODULE' && record.isDeleted === false)
      console.log(this.finalItems)

    },
      error => {
        console.log("Could not Fetch Data")
      })

  }
}
