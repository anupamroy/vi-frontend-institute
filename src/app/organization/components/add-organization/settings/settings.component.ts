import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() sixthFormGroup: FormGroup;
  modules = ['Payment', 'Admission', 'Exam', 'Attendance'];

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

  ngOnInit(): void {
    this.sixthFormGroup = this.formBuilder.group({
      moduleSelector: new FormControl([], Validators.required)
    });
  }

  toggleAll(e): void {
    // console.log(e.source.value)
    if (e.source.value) {
      this.sixthFormGroup.controls.moduleSelector.setValue(this.modules);
    } else {
      this.sixthFormGroup.controls.moduleSelector.setValue([]);
    }
    e.source.value = !e.source.value;

    // console.log(this.sixthFormGroup.value);
  }

  displayData(): void {
    console.log(this.sixthFormGroup.value);

    // Storing data
    this.addOrganizationService.$preview.next({
      section: "settingsDetails",
      settingsDetails: this.sixthFormGroup.value
    });

    //localstorage
    localStorage.setItem('settings', JSON.stringify(this.sixthFormGroup.value));
  }

}
