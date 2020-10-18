import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import FeesHeadModel from '../../../models/fees-head.model';

@Component({
  selector: 'app-add-fees-head',
  templateUrl: './add-fees-head.component.html',
  styleUrls: ['./add-fees-head.component.scss'],
})
export class AddFeesHeadComponent implements OnInit {
  addFeesHeadForm: FormGroup;
  instituteType = [];
  finalItems = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addFeesHeadForm = this.formBuilder.group({
      instituteType: ['', [Validators.required, Validators.nullValidator]],
      feesHeadName: [
        '',
        [
          Validators.nullValidator,
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(RegExp('^[A-Za-z_ ]*$')),
        ],
      ],
      parentFees: ['', [Validators.required]],
    });

    fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/all')
      .then((res) => res.json())
      .then((res) => {
        this.instituteType = JSON.parse(res).Items;
        const temp = [];
        this.instituteType.forEach((record) => {
          if (record.instituteType) {
            temp.push(record);
          }
        });
        this.finalItems = temp;
        console.log(this.finalItems);
        // console.log(this.instituteType);
      })
      .catch((err) => console.log(err));
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    // console.log(this.addFeesHeadForm.value);
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
