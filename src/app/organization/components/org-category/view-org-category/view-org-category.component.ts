import { Component, OnInit } from '@angular/core';
import { OrganizationCategoryService } from '../Services/organization-category.service'
import Swal from 'sweetalert2';
import { read } from 'fs';
import { OrganizationCategory } from '../../../../shared/models/org-catagory';
@Component({
  selector: 'app-view-org-category',
  templateUrl: './view-org-category.component.html',
  styleUrls: ['./view-org-category.component.scss']
})
export class ViewOrgCategoryComponent implements OnInit {

  orgCategory: any;
  finalItems: any
  constructor(private organizationService: OrganizationCategoryService) { }

  processObjUpdated(object: OrganizationCategory) {
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
        var newObj = new OrganizationCategory();
        newObj.masterId = id;
        newObj.isDeleted = true;
        console.log("After Deleting  -- "+ newObj)

        this.organizationService.deleteOrganizationById(id, this.processObjUpdated(newObj)).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
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

        var newObj = new OrganizationCategory();
        newObj.masterId = id;
        newObj.isActivated = false;
        console.log('NEW: ', newObj);
        this.organizationService.updateOrganizationById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
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

        var newObj = new OrganizationCategory();
        newObj.isActivated = true;
        newObj.masterId = id;
        this.organizationService.updateOrganizationById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
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
    // Swal.showLoading();
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      didOpen: ()=>{
        Swal.showLoading();
        this.organizationService.getOrganizationCategory().subscribe(responseData => {
          this.orgCategory = JSON.parse(responseData).Items
          console.log(this.orgCategory)
          let temp = []
          this.orgCategory.forEach(record => {
            if (record.master==="ORGANIZATION_CATEGORY" && record.isDeleted===false) {
              temp.push(record)
            }
          })
          this.finalItems = temp
          Swal.close()
        },
          error => {
            console.log("Could not Fetch Data")
            Swal.fire({
              text: 'Error Fetching',
              icon: 'warning'
            })
          }
        )
       
        
        // this.router.navigate(['./org/list-org-category']);
        // Swal.close()

      }

      // timer: 3000,
      // timerProgressBar: true
    });
    // this.organizationService.getOrganizationCategory().subscribe(responseData => {
    //   this.orgCategory = JSON.parse(responseData).Items
    //   console.log(this.orgCategory)
    //   let temp = []
    //   this.orgCategory.forEach(record => {
    //     if (record.orgCategory) {
    //       temp.push(record)
    //     }
    //   })
    //   this.finalItems = temp
    // },
    //   error => {
    //     console.log("Could not Fetch Data")
    //   }
    // )

  }
}


