import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fees-head',
  templateUrl: './add-fees-head.component.html',
  styleUrls: ['./add-fees-head.component.scss'],
})
export class AddFeesHeadComponent implements OnInit {
  addFeesHeadForm: FormGroup;
  instituteTypeList = [];
  finalItems = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addFeesHeadForm = this.formBuilder.group({
      instituteType: ['', [Validators.required, Validators.nullValidator]],
      feesHeadName: [
        '',
        [
          Validators.required,
          Validators.nullValidator,
          Validators.maxLength(25),
          Validators.pattern(RegExp(`^[a-zA-Z_ ]*$`)),
        ],
      ],
      parentFees: ['', [Validators.required, Validators.nullValidator]],
    });

    fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/all')
      .then((res) => res.json())
      .then((res) => {
        this.instituteTypeList = JSON.parse(res).Items;
        const temp = [];
        this.instituteTypeList.forEach((record) => {
          if (record.instituteType) {
            temp.push(record);
          }
        });
        this.finalItems = temp;
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
        this.router.navigate(['/fees-management/fees-head']);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  get feesHeadName(): AbstractControl {
    return this.addFeesHeadForm.get('feesHeadName');
  }
  get parentFees(): AbstractControl {
    return this.addFeesHeadForm.get('parentFees');
  }
  get instituteType(): AbstractControl {
    return this.addFeesHeadForm.get('instituteType');
  }
}
