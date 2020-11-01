import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsHeadService } from '../../../services/accounts-head.service'
import { AccountsHead } from '../../../../shared/models/accounts-head'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-accounts-head',
  templateUrl: './edit-accounts-head.component.html',
  styleUrls: ['./edit-accounts-head.component.scss']
})
export class EditAccountsHeadComponent implements OnInit {

  /** To be populated with Accounts Head */
  accountsHead: string = ''

  /** Contains parent account Head */
  parentAccountHead: string = ''

  /** Contains masterId of the Accounts Head which is to be edited */
  id: string

  /** Holds parent account */
  parentAccount: any

  /** Holds the list of final items of account head */
  finalItems: any

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private accountsHeadService : AccountsHeadService ) { }

  /**
   * Process the object for passing as body in api
   * @memberof EditAccountsHeadComponent
   * @param object of AccountsHead
   * @returns {object} of AccountsHead
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
   * Enable disable submit button
   * @memberof EditAccountsHeadComponent
   * @returns {boolean}
   */
  enableButton() {
    if(this.accountsHead.trim() === '') {
      return true
    }
    else {
      return false
    }
  }


  /**
   * Enable disable validation alert
   * @memberof EditAccountsHeadComponent
   * @returns {boolean}
   */
  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.accountsHead)
  }


  /**
   * Populate parent account head
   * @memberof EditAccountsHeadComponent
   * @param value
   */
  selectParentAccount(value){
    this.parentAccountHead = value
  }


  /**
   * Submits the edit form
   * @memberof EditAccountsHeadComponent
   */
  onClick(){
      Swal.fire({
        title: 'Please Wait',
        allowEscapeKey: false,
        allowOutsideClick: true,
        background: '#fff',
        showConfirmButton: false,
        onOpen: ()=>{
          Swal.showLoading();

          let obj = new AccountsHead();

          obj.masterId = this.id;
          obj.accountsHead = this.accountsHead
          obj.parentAccountsHead = this.parentAccountHead

          this.accountsHeadService
            .updateAccountsHeadById(this.id,this.processObjUpdated(obj))
            .subscribe((data) => {
            if(data){
              Swal.fire({
                title: 'Edited',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                this.router.navigate(['./org/list-accounts-head']);
              })  
            }
          });
        }
      });
 
  }


  /**
   * Redirects to add-accounts-head
   * @memberof EditAccountsHeadComponent
   */
  onAdd(){
    this.router.navigate(['./org/add-accounts-head'])
  }

  /**
   * Redirects to list-accounts-head
   * @memberof EditAccountsHeadComponent
   */
  onView(){
    this.router.navigate(['./org/list-accounts-head'])
  }

  /**
   * Redirects to Dashboard Page
   * @memberof EditAccountsHeadComponent
   */
  onDashboard(){
    this.router.navigate(['./org'])
  }


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.itemId;

    this.accountsHeadService.getAccountsHeadById(this.id).subscribe((item)=>{
      item = JSON.parse(item);
    
      this.accountsHead = item.Items[0].accountsHead
      this.parentAccountHead = item.Items[0].parentAccountsHead
      console.log(item)
    })

    this.accountsHeadService.getAccountsHead().subscribe(responseData => {
      this.parentAccount = JSON.parse(responseData).Items

      let temp = [];

      this.parentAccount.forEach(record => {
        if (record.itemId === 'ACCOUNTS_HEAD' && record.isDeleted === false) {
          temp.push(record)
        }
      })

      this.finalItems = temp;
    },
      error => {
        console.log("Could not Fetch Data")
      }
    )
  }

}
