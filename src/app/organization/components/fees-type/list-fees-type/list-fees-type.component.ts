import { Component, OnInit } from '@angular/core';
import { FeesService } from '../../../services/fees-type.service'
import Swal from 'sweetalert2'
import {FeesType} from '../../../../shared/models/fees-type'
@Component({
  selector: 'app-list-fees-type',
  templateUrl: './list-fees-type.component.html',
  styleUrls: ['./list-fees-type.component.scss']
})
export class ListFeesTypeComponent implements OnInit {

  feesType: any;
  finalItems: any
  constructor(private feesService: FeesService) { }

  processObjUpdated(object: FeesType) {
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
    const deleteObj = new FeesType();
    deleteObj.masterId = id;
    deleteObj.isDeleted = true;

    Swal.fire({
      title: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.value) {
        this.feesService.deleteFeesTypeById(id,this.processObjUpdated(deleteObj)).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.masterId !== id;
          })
        });
        Swal.fire(
          'Deleted!',
          'Your Fees type has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Fees type is safe :)',
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

        var deactivateObj = new FeesType();
        deactivateObj.isActivated = false;
        console.log('NEW: ', deactivateObj);
        this.feesService.updateFeesTypeById(id, this.processObjUpdated(deactivateObj)).subscribe((data) => {
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

        var activateObj = new FeesType();
        activateObj.isActivated = true;

        this.feesService.updateFeesTypeById(id, this.processObjUpdated(activateObj)).subscribe((data) => {
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
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        this.feesService.getFeesType().subscribe(responseData => {
          this.feesType = JSON.parse(responseData).Items
          console.log(this.feesType)
          let temp = []
          this.feesType.forEach(record => {
            if (record.feesType) {
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

      }
    });


  }

}
