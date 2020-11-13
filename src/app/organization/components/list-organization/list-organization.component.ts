import { Component, OnInit } from '@angular/core';
import { BasicDetails } from '../../models/BasicDetails';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ListOrganizationService } from '../../services/list-organization.service';
import { PreviewComponent } from '../add-organization/preview/preview.component';
import { EditOrganizationComponent } from '../edit-organization/edit-organization.component';
import { AddOrganizationService } from '../../services/add-organization.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-list-organization',
  templateUrl: './list-organization.component.html',
  styleUrls: ['./list-organization.component.scss']
})
export class ListOrganizationComponent implements OnInit {

  list_organization = [];

  /** used to help terminate all subscriptions when component destroyed */
  private ngUnsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private addorgServive: AddOrganizationService, public dialog: MatDialog, private listOrganizationService: ListOrganizationService) { }

  ngOnInit(): void {
    this.addorgServive.$refreshList.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
     
   
      
      // this.dialog.closeAll()
      this.refreshList();
    })
    this.refreshList();
  }

  refreshList() {
    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    })
    this.listOrganizationService.getAllOrganization().subscribe((res) => {
      const fetchData = JSON.parse(res).Items
      console.log('DATA FROM DATABSE: ', JSON.parse(res).Items);
      Swal.close()
      this.list_organization = fetchData;
      // .filter((item) => {
      //   if (item.isDeleted === false){
      //     return item;
      //   }
      // })
    })
  }

  processObjUpdated(object: BasicDetails) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'orgKey') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      orgKey: object.orgKey
    }
  }

  onDelete(id: string): void {
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

        var newObj = new BasicDetails();
        newObj.isDeleted = true;
        newObj.orgKey = id;

        this.listOrganizationService.updateOrganization(this.processObjUpdated(newObj)).subscribe((res) => {
          console.log(res);
          this.list_organization = this.list_organization.filter((item) => {
            return item.orgKey !== id;
          })
          Swal.fire(
            'Deleted!',
            'Your Data has been deleted.',
            'success'
          )
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Data is safe :)',
          'error'
        )
      }
    })
  }

  showOrganization(item) {
    // this.router
    console.log(item.orgKey);


    const dialogRef = this.dialog.open(EditOrganizationComponent, {
      width: '800px',
      // height: '400px',
      data: {
        dataKey: item.orgKey,
        basicDetails: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

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
        // console.log('Activate');

        var newObj = new BasicDetails();

        newObj.isActivated = true;
        newObj.orgKey = id;

        this.listOrganizationService.updateOrganization(this.processObjUpdated(newObj)).subscribe((data) => {
          // console.log(data);

          this.list_organization = this.list_organization.map((item) => {
            if (item.orgKey === id) {
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

  onDeactivate(id: string) {
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

        var newObj = new BasicDetails();

        newObj.isActivated = false;
        newObj.orgKey = id;

        this.listOrganizationService.updateOrganization(this.processObjUpdated(newObj)).subscribe((data) => {
          // console.log(data);

          this.list_organization = this.list_organization.map((item) => {
            if (item.orgKey === id) {
              item.isActivated = false;
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

  /**
* Unsubscribe from any observable
* This avoids "Attempt to use a destroyed view" when user navigates away before page done loading
*
* @memberof 
*/
  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}


