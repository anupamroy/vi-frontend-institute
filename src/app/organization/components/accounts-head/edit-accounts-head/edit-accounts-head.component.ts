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

  accountsHead: string = ''
  parentAccountHead: string = ''
  id: string
  parentAccount: any
  finalItems: any

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private accountsHeadService : AccountsHeadService ) { }

  processObjUpdated(object: AccountsHead){
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'itemId') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      itemId: object.itemId
    }
  }

  enableButton() {
    if(this.accountsHead.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.accountsHead)
  }

  selectParentAccount(value){
    this.parentAccountHead = value
  }

  onClick(){
   
      console.log(this.accountsHead)
      
      Swal.fire({
        title: 'Please Wait',
        allowEscapeKey: false,
        allowOutsideClick: true,
        background: '#fff',
        showConfirmButton: false,
        onOpen: ()=>{
          Swal.showLoading();
          let obj = new AccountsHead()
          obj.accountsHead = this.accountsHead
          obj.parentAccountsHead = this.parentAccountHead
          this.accountsHeadService
            .updateAccountsHeadById(this.id,this.processObjUpdated(obj))
            .subscribe((data) => {
            console.log('ID'+data);
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
          // Swal.close()
         
        }
      });
 
  }

  onAdd(){
    this.router.navigate(['./org/add-accounts-head'])
  }

  onView(){
    this.router.navigate(['./org/list-accounts-head'])
  }

  onDashboard(){
    this.router.navigate(['./org'])
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.itemId;
    console.log('My ID',this.id);
    
    this.accountsHeadService.getAccountsHeadById(this.id).subscribe((item)=>{
      item = JSON.parse(item);
      console.log("HELLO: ",item);
      console.log("accountsHead:",item.Items[0].accountsHead);
      
      this.accountsHead = item.Items[0].accountsHead
      this.parentAccountHead = item.Items[0].parentAccountsHead
      console.log(item)
    })
    // console.log(this.getResult);
    
    // const accountsHead =this.activatedRoute.snapshot.params.accountsHead
    // console.log(this.id, accountsHead)
    // this.accountsHead = accountsHead

    this.accountsHeadService.getAccountsHead().subscribe(responseData => {
      this.parentAccount = JSON.parse(responseData).Items
      console.log(this.parentAccount)
      let temp = []
      this.parentAccount.forEach(record => {
        if (record.itemId === 'ACCOUNTS_HEAD' && record.isDeleted === false) {
          temp.push(record)
        }
      })
      this.finalItems = temp
      // Swal.close()
    },
      error => {
        console.log("Could not Fetch Data")
        // Swal.fire({
        //   text: 'Error Fetching',
        //   icon: 'warning'
        // })
      }
    )
  }

}
