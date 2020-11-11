import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
const jsonData = require('../Validations/org_fields.json');
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import { EditOrganizationService } from 'src/app/organization/services/edit-organization.service';
import { MyErrorStateMatcher, validatorForFormControl } from '../Validations/MyErrorStateMatcher';
import { Address } from '../../../../models/Address'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  @Output() formReset = new EventEmitter();
  matcher = new MyErrorStateMatcher();
  addressFields = jsonData.addressFields;
  /** used to help terminate all subscriptions when component destroyed */
  private ngUnsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

  orgkey = "";

  addressList = [];

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService, private EditOrganizationService: EditOrganizationService) { }

  ngOnInit(): void {
    this.addOrganizationService.$orgKey.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      console.log("subscribed in address", res);
      this.orgkey = res;

    })
    this.addressForm = this.formBuilder.group({
      addressTypeSelector: new FormControl('', validatorForFormControl(this.addressFields.addressType)),
      address: new FormControl('', validatorForFormControl(this.addressFields.address)),
    });

  }

  addAddress(): void {
    const addressObject = this.addressForm.value;
    _.assign(addressObject, {
      id: _.uniqueId('address_')
    });
    console.log(addressObject);
    this.addressList.push(addressObject);

    this.addOrganizationService.contactDetailsFields.isAddressSectionValid = true;

    // Storing data
    this.addOrganizationService.$preview.next({
      section: "address",
      addressList: this.addressList 
    })

    // const newAddressObj = {
    //   orgHash: "ORGANIZATION_ADDRESS",
    //   address_for: this.addressForm.controls.addressTypeSelector.value,
    //   address: this.addressForm.controls.address.value,
    //   associated_with_org: this.orgkey  //orgkey
    // }

    // const newAddressObj = new Address();

    // newAddressObj.address_for = this.addressForm.controls.addressTypeSelector.value;
    // newAddressObj.address = this.addressForm.controls.address.value;
    // newAddressObj.associated_with_org = this.orgkey;

    // console.log(newAddressObj);

    // this.addOrganizationService.saveAddress(newAddressObj).subscribe(res => {
    //   console.log("aws ... ",res);
    // })
  
    // Resetting the form
    let control: AbstractControl = null;

    Object.keys(this.addressForm.controls).forEach((name) => {
      control = this.addressForm.controls[name];
      control.setErrors(null);
    });
    this.addressForm.reset();
    this.addressForm.markAsUntouched();

    // saving to localstorage
    localStorage.setItem("addressList", JSON.stringify(this.addressList))
  }

  removeAddress(id: string): void {
    _.remove(this.addressList, (a) => {
      return a.id === id;
    });
    if (this.addressList.length == 0) {
      this.addOrganizationService.contactDetailsFields.isAddressSectionValid = false;
    }

    localStorage.setItem("addressList", JSON.stringify(this.addressList))
  }

  editAddress(id: string): void {
    const addressToEdit = _.remove(this.addressList, (a) => {
      return a.id === id;
    });
    this.addOrganizationService.contactDetailsFields.isAddressSectionValid = false;
    console.log(addressToEdit);

    this.addressForm = this.formBuilder.group({
      addressTypeSelector: new FormControl(addressToEdit[0].addressTypeSelector, Validators.required),
      address: new FormControl(addressToEdit[0].address, Validators.required),
    });

    // this.addOrganizationService.$preview.next({
    //   section: "address",
    //   addressList: this.addressList 
    // })

    // this.EditOrganizationService.updateOrganizationAddress(this.processObjUpdated())

    localStorage.setItem("addressList", JSON.stringify(this.addressList))
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
