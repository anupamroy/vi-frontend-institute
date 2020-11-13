import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';

@Component({
  selector: 'app-master-user',
  templateUrl: './master-user.component.html',
  styleUrls: ['./master-user.component.scss']
})
export class MasterUserComponent implements OnInit {
  @Input() fifthFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

  ngOnInit(): void {
    this.fifthFormGroup = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl(''),
      emailAddress: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      authType: new FormControl('mfa', Validators.required),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  displayData(): void {
    console.log(this.fifthFormGroup.value);

    // Storing data
    this.addOrganizationService.$preview.next({
      section: "masterUserDetails",
      masterUserDetails: this.fifthFormGroup.value
    })

    //localstorage
    localStorage.setItem('master-user', JSON.stringify(this.fifthFormGroup.value))
  }

  mfaPassword(e) {
    console.log("asadsds", e.value);
    if(e.value == "password") {
      this.fifthFormGroup.controls["password"].setValidators(Validators.required);
      this.fifthFormGroup.controls["confirmPassword"].setValidators(Validators.required);
      this.fifthFormGroup.controls["confirmPassword"].updateValueAndValidity()
      this.fifthFormGroup.controls["password"].updateValueAndValidity()
    } else {
      this.fifthFormGroup.controls["password"].clearValidators()
      this.fifthFormGroup.controls["password"].updateValueAndValidity()
      this.fifthFormGroup.controls["confirmPassword"].clearValidators()
      this.fifthFormGroup.controls["confirmPassword"].updateValueAndValidity()
    }
   
    
  }

}
