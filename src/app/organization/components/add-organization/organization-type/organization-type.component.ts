import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';

@Component({
  selector: 'app-organization-type',
  templateUrl: './organization-type.component.html',
  styleUrls: ['./organization-type.component.scss']
})
export class OrganizationTypeComponent implements OnInit {
  mode: string;
  @Input() firstFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

  ngOnInit(): void {
    console.log("oninit ", this.firstFormGroup.value.organizationType);
    
    this.addOrganizationService.fifthStepForm = this.firstFormGroup.value.organizationType;
  }

  displayData(): void {
    console.log(this.firstFormGroup);
    console.log(this.firstFormGroup.value);
    this.addOrganizationService.firstStepForm = this.firstFormGroup.value.organizationType;

    // store date
    this.addOrganizationService.$preview.next({
      section: "organizationType",
      organizationType: this.firstFormGroup.controls.organizationType.value
    })

    // localstorage
    localStorage.setItem('organization-type', JSON.stringify(this.firstFormGroup.value))
  }

}
