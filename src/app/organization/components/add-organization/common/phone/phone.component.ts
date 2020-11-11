import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import { Phone } from '../../../../models/Phone';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  phoneForm: FormGroup;
  associatedPostList;
  phoneList = [];

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

  ngOnInit(): void {
    this.addOrganizationService.$associatedPostList.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.associatedPostList = res;
    })
    this.addOrganizationService.$orgKey.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      console.log("subscribed in phone", res);
      this.orgkey = res;

    })
    this.phoneForm = this.formBuilder.group({
      phoneNumber: new FormControl('', Validators.required),
      phoneType: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      daysSelector: new FormControl([], Validators.required),
      shift: new FormControl('', Validators.required),
      associatedWith: new FormControl('', Validators.required)
    });
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


    // "orgHash":"ORGANIZATION_PHONE",
    // "orgKey":"198764237934",
    // "phone_text":"Principal's Phone",
    // "phone_number":"+911234567890",
    // "phone_type":"Primary",
    // "phone_timings":"1PM-3PM",
    // "phone_availability_days": "WeekDays",
    // "phone_availability_shift":"Day",
    // "associated_with":"Principal",
    // "associated_with_org":"12354329132"

    // const newPhoneObject = new Phone()

    // newPhoneObject.phone_number = this.phoneForm.controls.phoneNumber.value;
    // newPhoneObject.phone_type = this.phoneForm.controls.phoneType.value;
    // newPhoneObject.phone_timings = this.phoneForm.controls.time.value;
    // newPhoneObject.phone_availability_days = this.phoneForm.controls.daysSelector.value;
    // newPhoneObject.phone_availability_shift = this.phoneForm.controls.shift.value;
    // newPhoneObject.associated_with = this.phoneForm.controls.associatedWith.value;
    // newPhoneObject.associated_with_org = this.orgkey


    // //API service
    // this.addOrganizationService.savePhone(newPhoneObject).subscribe((res) => {
    //   console.log('aws ....', res)
    // })
    // console.log(newPhoneObject)


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
      phoneNumber: new FormControl(phoneToEdit[0].phoneNumber, Validators.required),
      phoneType: new FormControl(phoneToEdit[0].phoneType, Validators.required),
      time: new FormControl(phoneToEdit[0].time, Validators.required),
      daysSelector: new FormControl(phoneToEdit[0].daysSelector, Validators.required),
      shift: new FormControl(phoneToEdit[0].shift, Validators.required),
      associatedWith: new FormControl(phoneToEdit[0].associatedWith, Validators.required)
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
