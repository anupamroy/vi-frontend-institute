import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
const jsonData = require('../Validations/org_fields.json');
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import { EditOrganizationService } from 'src/app/organization/services/edit-organization.service';
import { MyErrorStateMatcher, validatorForFormControl } from '../Validations/MyErrorStateMatcher';
import { Address } from '../../../../models/Address';
const countryData = require('../Validations/country.json')

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  countryList = countryData;
  @Input() addressForm: FormGroup;
  @Output() formReset = new EventEmitter();
  @Input() editMode: any = { editing: false, editData: {} };
  @Output() cancelEdit = new EventEmitter();

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

    if(this.editMode.editing){
      this.addressForm = this.formBuilder.group({
        addressTypeSelector: new FormControl(this.editMode.editData.address_for, validatorForFormControl(this.addressFields.addressType)),
        address: new FormControl(this.editMode.editData.address, validatorForFormControl(this.addressFields.address)),
        countryName: new FormControl(this.editMode.editData.country_name, Validators.required),
        zipCode: new FormControl(this.editMode.editData.zip_code, Validators.required)
      });
    } else {
      this.addressForm = this.formBuilder.group({
        addressTypeSelector: new FormControl('', validatorForFormControl(this.addressFields.addressType)),
        address: new FormControl('', validatorForFormControl(this.addressFields.address)),
        countryName: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required)
      });
    }

  }

  processObjUpdated(object: Address) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'orgHash' && key != 'associated_with_org' && key != 'orgKey') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      orgHash: object.orgHash,
      orgKey: object.orgKey
    }
  }

  cancelEditMode() {
    this.cancelEdit.emit(false);
  }

  updateData(): void {
    const obj = new Address();
    obj.address = this.addressForm.controls.address.value;
    obj.address_for = this.addressForm.controls.addressTypeSelector.value;
    obj.country_name = this.addressForm.controls.countryName.value;
    obj.zip_code = this.addressForm.controls.zipCode.value;
    obj.orgKey = this.editMode.editData.orgKey

    console.log(this.processObjUpdated(obj));

    this.addOrganizationService.updateAddressDetails(this.processObjUpdated(obj)).subscribe((res) => {
      let data = JSON.parse(res);
      // console.log("attributes res ",res, data.Attributes);
      let dataset = _.assign(new Address(),{associated_with_org :  this.editMode.editData.associated_with_org }, data.Attributes, _.pick(obj, ['orgKey']))
      // console.log("data set .:",dataset)
     
      this.cancelEdit.emit(false);
      this.addOrganizationService.$refreshList.next(dataset);
    })
  }

  addAddress(): void {
    const addressObject = this.addressForm.value;
    _.assign(addressObject, {
      id: _.uniqueId('address')
    });
    console.log(addressObject);
    this.addressList.push(addressObject);

    this.addOrganizationService.contactDetailsFields.isAddressSectionValid = true;

    // Storing data
    this.addOrganizationService.$preview.next({
      section: "address",
      addressList: this.addressList 
    })
  
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
      countryName: new FormControl(addressToEdit[0].countryName, Validators.required),
      zipCode: new FormControl(addressToEdit[0].zipCode, Validators.required)
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