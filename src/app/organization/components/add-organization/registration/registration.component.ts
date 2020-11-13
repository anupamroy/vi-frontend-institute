import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration } from 'src/app/organization/models/Registration';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() fourthFormGroup: FormGroup;
  @Input() editMode: any = { editing: false, editData: {} };
  @Output() cancelEdit = new EventEmitter();

  items = ['Law', 'Medical', 'Engineering', 'Aerospace'];
  isValid = true;

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

//   affAndAcc: true
// affiliationEndDate: "Sun Nov 01 2020 00:00:00 GMT+0530 (India Standard Time)"
// affiliationStartDate: "Tue Nov 10 2020 00:00:00 GMT+0530 (India Standard Time)"
// associated_with_org: "095725653"
// certificateNumber: "123123123123"
// orgCategory: "Medical"
// orgHash: "ORGANIZATION_REGAFF"
// orgKey: "095726746"
// registrationDate: "Tue Nov 17 2020 00:00:00 GMT+0530 (India Standard Time)"
// registrationNumber: "312321321312"
// status: true

  ngOnInit(): void {
    if(this.editMode.editing) {

      this.fourthFormGroup = this.formBuilder.group({
        organizationCategory: new FormControl(this.editMode?.editData?.orgCategory, Validators.required),
        registrationNumber: new FormControl(this.editMode?.editData?.registrationNumber),
        registrationDate: new FormControl(this.editMode?.editData?.registrationDate),
        affiliationStartDate: new FormControl(this.editMode?.editData?.affiliationStartDate),
        affiliationEndDate: new FormControl(this.editMode?.editData?.affiliationEndDate),
        affAndAcc: new FormControl(this.editMode?.editData?.affAndAcc),
        certificateNumber: new FormControl(this.editMode?.editData?.certificateNumber),
        status: new FormControl(this.editMode?.editData?.status)
      });

    } else {

      this.fourthFormGroup = this.formBuilder.group({
        organizationCategory: new FormControl('', Validators.required),
        registrationNumber: new FormControl(''),
        registrationDate: new FormControl(''),
        affiliationStartDate: new FormControl(''),
        affiliationEndDate: new FormControl(''),
        affAndAcc: new FormControl(false),
        certificateNumber: new FormControl(''),
        status: new FormControl(false)
      });

    }

    console.log(this.editMode.editData);
  }

  processObjUpdated(object: Registration) {
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

  displayData(): void{
    console.log(this.fourthFormGroup.value);
    
    // Storing data
    this.addOrganizationService.$preview.next({
      section: "registration",
      registrationDetails: this.fourthFormGroup.value
    })

    //localstorage
    localStorage.setItem('registration', JSON.stringify(this.fourthFormGroup.value))
  }

  cancelEditMode() {
    this.cancelEdit.emit(false);
  }

  updateData() {
    const registrationDetails = this.fourthFormGroup.value;
    const obj = new Registration();

    obj.affAndAcc = registrationDetails.affAndAcc;
    obj.affiliationEndDate = registrationDetails.affiliationEndDate;
    obj.affiliationStartDate = registrationDetails.affiliationStartDate;
    obj.certificateNumber = registrationDetails.certificateNumber;
    obj.orgCategory = registrationDetails.organizationCategory;
    obj.registrationNumber = registrationDetails.registrationNumber;
    // obj.status = registrationDetails.status;
    obj.registrationDate = registrationDetails.registrationDate;
    obj.orgKey = this.editMode.editData.orgKey;
// console.log();

    // API call for basic details
    // console.log(obj, this.editMode.editData);
    console.log(this.processObjUpdated(obj));

    this.addOrganizationService.updateRegistrationDetails(this.processObjUpdated(obj)).subscribe((res) => {
      let data = JSON.parse(res);
      // console.log("attributes res ",res, data.Attributes);
      let dataset = _.assign(new Registration(), data.Attributes, {status: registrationDetails.status}, _.pick(obj, ['associated_with_org', 'orgKey']))
      // console.log("data set .:",dataset)
     
      this.cancelEdit.emit(false);
      this.addOrganizationService.$refreshList.next(dataset);
    }), error => {
      this.cancelEdit.emit(false);
    }
  }

  handleFormValid(event){
    console.log(event);
    this.isValid = event;
  }

}