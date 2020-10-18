import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import FeesHeadModel from '../../../models/fees-head.model';

@Component({
  selector: 'app-add-fees-head',
  templateUrl: './add-fees-head.component.html',
  styleUrls: ['./add-fees-head.component.scss'],
})
export class AddFeesHeadComponent implements OnInit {
  addFeesHeadForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addFeesHeadForm = this.formBuilder.group({
      instituteType: [''],
      feesHeadName: [''],
      parentFees: [''],
    });
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    console.log(this.addFeesHeadForm.value);
    fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/fees', {
      method: 'POST',
      body: JSON.stringify(this.addFeesHeadForm.value),
    })
      .then((data) => {
        console.log(data);
        this.router.navigate(['/fees-management/fees-head']);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
