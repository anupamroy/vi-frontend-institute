import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import { Phone } from '../../../../models/Phone';
const countryData = require('../Validations/country.json')

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  @Input() editMode: any = { editing: false, editData: {} };
  @Output() cancelEdit = new EventEmitter();
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  phoneForm: FormGroup;
  associatedPostList = [];
  phoneList = [];
  countryList = countryData;

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

  ngOnInit(): void {
    this.addOrganizationService.$associatedPostList.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.associatedPostList = res;
      console.log(res);
      
    })
    this.addOrganizationService.$orgKey.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      // console.log("subscribed in phone", res);
      this.orgkey = res;

    })
    if(this.editMode.editing) {
      this.phoneForm = this.formBuilder.group({
        isd: new FormControl(this.editMode.editData.isd, Validators.required),
        phoneNumber: new FormControl(this.editMode.editData.phone_number, Validators.required),
        phoneType: new FormControl(this.editMode.editData.phone_type, Validators.required),
        time: new FormControl(this.editMode.editData.phone_timings),
        daysSelector: new FormControl(this.editMode.editData.phone_availability_days),
        shift: new FormControl(this.editMode.editData.phone_availability_shift),
        associatedWith: new FormControl(this.editMode.editData.associated_with)
      });
      // this.associatedPostList.push(this.editMode.editData.associated_with)
    } else {
      this.phoneForm = this.formBuilder.group({
        isd: new FormControl(this.countryList[87].dial_code, Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        phoneType: new FormControl('', Validators.required),
        time: new FormControl(''),
        daysSelector: new FormControl([]),
        shift: new FormControl(''),
        associatedWith: new FormControl('')
      });
    }
   

  }

  
  processObjUpdated(object: Phone) {
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


  toggleAll(e): void {
    if (e.source.value) {
      this.phoneForm.controls.daysSelector.setValue(this.days);
    } else {
      this.phoneForm.controls.daysSelector.setValue([]);
    }
    e.source.value = !e.source.value;

    // console.log(this.phoneForm.value);
  }

  /** used to help terminate all subscriptions when component destroyed */
  private ngUnsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

  orgkey = "";
  // displayData(): void{
  //   console.log(this.phoneForm.value);
  // }

  updateData() {
   console.log(this.editMode.editData);
    const newPhoneObject = new Phone();

    newPhoneObject.phone_number = this.phoneForm.controls.phoneNumber.value;
    newPhoneObject.phone_type = this.phoneForm.controls.phoneType.value;
    newPhoneObject.phone_timings = this.phoneForm.controls.time.value;
    newPhoneObject.phone_availability_days = this.phoneForm.controls.daysSelector.value;
    newPhoneObject.phone_availability_shift = this.phoneForm.controls.shift.value;
    newPhoneObject.associated_with = this.phoneForm.controls.associatedWith.value;
    newPhoneObject.isd = this.phoneForm.controls.isd.value;
    newPhoneObject.orgKey = this.editMode.editData.orgKey;
    console.log(this.processObjUpdated(newPhoneObject));

    this.addOrganizationService.updatePhoneDetails(this.processObjUpdated(newPhoneObject)).subscribe(res => {
      let data = JSON.parse(res);
      // console.log("attributes res ",res, data.Attributes);
      let dataset = _.assign(new Phone(),{associated_with_org :  this.editMode.editData.associated_with_org }, data.Attributes, _.pick(newPhoneObject, ['orgKey']))
      // console.log("data set .:",dataset)
     
      this.cancelEdit.emit(false);
      this.addOrganizationService.$refreshList.next(dataset);
      
    }, error => {
      this.cancelEdit.emit(false);
    })
    
   
  }

  cancelEditMode() {
    this.cancelEdit.emit(false);
  }

  addPhone(): void {

    const phoneObject = this.phoneForm.value;
    _.assign(phoneObject, {
      id: _.uniqueId('phone_')
    });

    console.log(phoneObject);
    this.phoneList.push(phoneObject);
    this.addOrganizationService.contactDetailsFields.isPhoneSectionValid = true;

    // Storing data
    this.addOrganizationService.$preview.next({
      section: "phone",
      phoneList: this.phoneList
    })

    // Resetting the form
    let control: AbstractControl = null;

    Object.keys(this.phoneForm.controls).forEach((name) => {
      control = this.phoneForm.controls[name];
      control.setErrors(null);
    });
    this.phoneForm.reset();
    this.phoneForm.markAsUntouched();

    //localstorage
    localStorage.setItem('phoneList', JSON.stringify(this.phoneList))
  }

  removePhone(id: string): void {
    _.remove(this.phoneList, (a) => {
      return a.id === id;
    });
    if (this.phoneList.length == 0) {
      this.addOrganizationService.contactDetailsFields.isPhoneSectionValid = false;
    }

    //localstorage
    localStorage.setItem('phoneList', JSON.stringify(this.phoneList))
  }

  editPhone(id: string): void {
    const phoneToEdit = _.remove(this.phoneList, (a) => {
      return a.id === id;
    });
    this.addOrganizationService.contactDetailsFields.isPhoneSectionValid = false;

    this.phoneForm = this.formBuilder.group({
      isd: new FormControl(phoneToEdit[0].isd, Validators.required),
      phoneNumber: new FormControl(phoneToEdit[0].phoneNumber, Validators.required),
      phoneType: new FormControl(phoneToEdit[0].phoneType, Validators.required),
      time: new FormControl(phoneToEdit[0].time),
      daysSelector: new FormControl(phoneToEdit[0].daysSelector),
      shift: new FormControl(phoneToEdit[0].shift),
      associatedWith: new FormControl(phoneToEdit[0].associatedWith)
    });

    //localstorage
    localStorage.setItem('phoneList', JSON.stringify(this.phoneList))
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
