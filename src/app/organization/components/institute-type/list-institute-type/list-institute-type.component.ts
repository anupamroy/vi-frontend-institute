import { Component, OnInit } from '@angular/core';
import { InstituteTypeService } from '../Services/institute-type.service'
import { InstituteType } from '../instituteType.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-list-institute-type',
  templateUrl: './list-institute-type.component.html',
  styleUrls: ['./list-institute-type.component.scss']
})
export class ListInstituteTypeComponent implements OnInit {

  /** Holds the list of institute type list */
  instituteTypeList = [];
  constructor(private router: Router, private InstituteTypeService: InstituteTypeService) { }


  /**
   * Process the obejct that is to be passed as body
   * @param object of Institute Type
   * @returns {object} of Institute Type
   * @memberof ListInstituteTypeComponent
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
   * Delete the selected item
   * @param id of the item to be deleted
   * @memberof ListInstituteTypeComponent
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
        var newObj = new InstituteType();

        newObj.isDeleted = true;
        newObj.masterId = id;

        this.InstituteTypeService.deleteInstituteType(this.processObjUpdated(newObj)).subscribe(() => {
          this.instituteTypeList = this.instituteTypeList.filter((item) => {
            return item.masterId !== id;
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
   * @memberof ListInstituteTypeComponent
   */
  onDashboard() {
    this.router.navigate(["./org"])
  }

  /**
   * Redirects to add view
   * @memberof ListInstituteTypeComponent
   */
  onAdd() {
    this.router.navigate(["/org/add-associated-post"])
  }


  /**
   * Deactivate a selected item
   * @param id of the selected item to be deactivated
   * @memberof ListInstituteTypeComponent
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
        // console.log('Deactivate')

        var newObj = new InstituteType();

        newObj.isActivated = false;
        newObj.masterId = id;
        
        this.InstituteTypeService.updateInstituteTypeById(this.processObjUpdated(newObj)).subscribe((data) => {
          // console.log(data);

          this.instituteTypeList = this.instituteTypeList.map((item) => {
            if (item.masterId === id) {
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
   * @memberof ListInstituteTypeComponent
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
        // console.log('Activate');

        var newObj = new InstituteType();

        newObj.isActivated = true;
        newObj.masterId = id;

        this.InstituteTypeService.updateInstituteTypeById(this.processObjUpdated(newObj)).subscribe((data) => {
          // console.log(data);

          this.instituteTypeList = this.instituteTypeList.map((item) => {
            if (item.masterId === id) {
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
    this.InstituteTypeService.getInstituteType().subscribe(responseData => {
      const fetchData = JSON.parse(responseData).Items
      console.log('DATA FROM DATABASE: ', fetchData)
      Swal.close()
      
      this.instituteTypeList = fetchData.filter((item) => {
        if (item.isDeleted === false){
          return item
        }
      })

      console.log('FINAL DATA TO BE POPULATED: ', this.instituteTypeList);
    },
      error => {
        console.log("Could not Fetch Data")
      })

  }
}



