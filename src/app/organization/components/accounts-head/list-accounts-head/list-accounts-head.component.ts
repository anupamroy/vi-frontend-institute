import { Component, OnInit } from '@angular/core';
import { AccountsHeadService } from '../../../services/accounts-head.service'
import { AccountsHead } from '../../../../shared/models/accounts-head'
import Swal from 'sweetalert2'
import { from } from 'rxjs';

@Component({
  selector: 'app-list-accounts-head',
  templateUrl: './list-accounts-head.component.html',
  styleUrls: ['./list-accounts-head.component.scss']
})
export class ListAccountsHeadComponent implements OnInit {

  /** Holds the accounts Head */
  accountsHead: any;

  /** Holds the list of finalItems */
  finalItems: any;

  constructor(private accountsHeadService: AccountsHeadService) { }

  /**
   * Process the object for passing it as body in post api
   * @memberof ListAccountsHeadComponent
   * @param object of Accounts Head
   * @returns {object} of Accounts Head
   */
  processObjUpdated(object: AccountsHead) {
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
   * Deletes the selected list item
   * @memberof ListAccountsHeadComponent
   * @param id of the item to be deleted
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
        let obj = new AccountsHead();
        obj.masterId = id;
        obj.isDeleted = true;

        this.accountsHeadService.deleteAccountsHeadById(id, this.processObjUpdated(obj)).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.masterId !== id;
          })
        });
        Swal.fire(
          'Deleted!',
          'Your Accounts Head has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Accounts Head is safe :)',
          'error'
        )
      }
    })

  }


  /**
   * Deactivates the selected item
   * @memberof ListAccountsHeadComponent
   * @param id 
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

        var newObj = new AccountsHead();
        newObj.masterId = id;
        newObj.isActivated = false;
        console.log('NEW: ', newObj);
        this.accountsHeadService.updateAccountsHeadById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.masterId === id) {
              item.isActivated = false
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Accounts Head has been deactivated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Accounts Head is not deactivated', 'error');
      }
    })
  }


  /**
   * Activates the selected item
   * @param id of selected item
   * @memberof ListAccountsHeadComponent
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
        var newObj = new AccountsHead();
        newObj.masterId = id;
        newObj.isActivated = true;

        this.accountsHeadService.updateAccountsHeadById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          this.finalItems = this.finalItems.map((item) => {
            if (item.masterId === id) {
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Accounts Head has been activated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Accounts Head is not activated', 'error');
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
        this.accountsHeadService.getAccountsHead().subscribe(responseData => {
          this.accountsHead = JSON.parse(responseData).Items

          let temp = []
          this.accountsHead.forEach(record => {
            if (record.master === 'ACCOUNTS_HEAD' && record.isDeleted === false) {
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
