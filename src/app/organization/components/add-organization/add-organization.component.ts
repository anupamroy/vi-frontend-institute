import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddOrganizationService } from '../../services/add-organization.service';
import { validatorForFormControl } from './common/Validations/MyErrorStateMatcher';
const jsonData = require('./common/Validations/org_fields.json');

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  organizationFields = jsonData;

  constructor(private formBuilder: FormBuilder, private addOrgService: AddOrganizationService) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      organizationType: new FormControl('Seller'),
    });
    this.secondFormGroup = this.formBuilder.group({
      instituteTypeSelector: new FormControl({ value: "", disabled: this.firstFormGroup.controls.organizationType.value == 'Seller' }, Validators.required),
      orgName: new FormControl('', validatorForFormControl(this.organizationFields.organizationName)),
      orgShortCode: new FormControl('', validatorForFormControl(this.organizationFields.organizationShortCode))
    });

  }

  orgTypeChange() {
    console.log(this.firstFormGroup.controls.organizationType.value);
    // this.secondFormGroup.controls["instituteTypeSelector"].setValue({value: "", disabled: this.firstFormGroup.controls.organizationType.value == 'Seller'});
    // this.secondFormGroup.controls["instituteTypeSelector"].updateValueAndValidity()

    if (this.firstFormGroup.controls.organizationType.value == 'Seller') {
      this.secondFormGroup.get("instituteTypeSelector").disable();

    } else {
      this.secondFormGroup.get("instituteTypeSelector").enable();
    }

    localStorage.setItem('organization-type', this.firstFormGroup.controls.organizationType.value);

    this.addOrgService.$preview.next({
      section: "organizationType",
      organizationType: this.firstFormGroup.controls.organizationType.value
    });

  }
  displayData(): void {

  }

}
