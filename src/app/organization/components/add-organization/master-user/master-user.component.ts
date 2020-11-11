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
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
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

}
