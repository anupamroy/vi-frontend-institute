import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      organizationType: new FormControl('Seller'),
    });

    this.secondFormGroup = this.formBuilder.group({
      instituteTypeSelector: new FormControl('', Validators.required),
      orgName: new FormControl('', validatorForFormControl(this.organizationFields.organizationName)),
      orgShortCode: new FormControl('', validatorForFormControl(this.organizationFields.organizationShortCode))
    });
    // this.firstFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.thirdFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.fourthFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.fifthFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.sixthFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
  }

}
