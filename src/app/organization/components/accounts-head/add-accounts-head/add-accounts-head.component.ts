import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsHeadService } from '../../../services/accounts-head.service'
import { Validations } from '../../../../shared/Services/Validations'
import { AccountsHead } from '../../../../shared/models/accounts-head'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-accounts-head',
  templateUrl: './add-accounts-head.component.html',
  styleUrls: ['./add-accounts-head.component.scss']
})
export class AddAccountsHeadComponent implements OnInit {

  /** This is for enabling and disabling the add button */
  disableButton: boolean = true

  /** Here parents acoount head is populated */
  parentAccountHead: string = 'None'

  /** Here accounts head is populated */
  accountsHead: string = ''

  /** Validation model */
  validate: Validations

  /** Contains the final list of accounts head fetch */
  finalItems: any

  /** Contains the final list of parentAccounts */
  parentAccount: any

  constructor(private router: Router, private accountsHeadService: AccountsHeadService) { }

  /**
   * Enable submit button
   * 
   * @memberof AddAccountsHeadComponent
   */
  enableButton() {
    if (this.accountsHead.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  /**
   * Alert message
   * 
   * @memberof AddAccountsHeadComponent
   */
  enableAlert() {
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.accountsHead)
  }

  /**
   * select for parents head
   * 
   * @param value 
   * @memberof AddAccountsHeadComponent
   */
  selectParentAccount(value) {
    this.parentAccountHead = value
  }


  /**
   * Submit the form
   * 
   * @memberof AddAccountsHeadComponent
   */
  onSubmit() {
    let obj = new AccountsHead();
    obj.accountsHead = this.accountsHead
    obj.parentAccountsHead = this.parentAccountHead
    obj.isDeleted = false
    obj.isActivated = true

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();

        this.accountsHeadService
          .addAccountsHead(obj)
          .subscribe((data) => {

            if (data) {
              Swal.fire({
                title: 'Added',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.router.navigate(['./org/list-accounts-head']);
              })
            }
          });
      }
    });
  }

  ngOnInit(): void {
    this.accountsHeadService.getAccountsHead().subscribe(responseData => {
      this.parentAccount = JSON.parse(responseData).Items
      console.log(this.parentAccount)
      let temp = []
      this.parentAccount.forEach(record => {
        if (record.master === 'ACCOUNTS_HEAD' && record.isDeleted === false) {
          temp.push(record)
        }
      })
      this.finalItems = temp
    },
      error => {
        console.log("Could not Fetch Data")
      }
    )
  }

}
