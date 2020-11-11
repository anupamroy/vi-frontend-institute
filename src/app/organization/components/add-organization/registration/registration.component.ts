import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() fourthFormGroup: FormGroup;

  items = ['Law', 'Medical', 'Engineering', 'Aerospace'];
  isValid = true;

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

  ngOnInit(): void {
    this.fourthFormGroup = this.formBuilder.group({
      organizationCategory: new FormControl('', Validators.required),
      registrationNumber: new FormControl('', Validators.required),
      registrationDate: new FormControl('', Validators.required),
      affiliationStartDate: new FormControl('', Validators.required),
      affiliationEndDate: new FormControl('', Validators.required),
      affAndAcc: new FormControl('', Validators.required),
      certificateNumber: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
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

  handleFormValid(event){
    console.log(event);
    this.isValid = event;
  }

}
