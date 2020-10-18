import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesService } from '../../../services/fees.service';

@Component({
  selector: 'app-edit-fees-head',
  templateUrl: './edit-fees-head.component.html',
  styleUrls: ['./edit-fees-head.component.scss'],
})
export class EditFeesHeadComponent implements OnInit {
  editFeesHeadForm: FormGroup;
  instituteType = [];
  finalItems = [];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private feesService: FeesService
  ) {}

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params);
    this.editFeesHeadForm = this.formBuilder.group({
      instituteType: [
        this.activatedRoute.snapshot.params.instituteType,
        [Validators.required, Validators.nullValidator],
      ],
      feesHeadName: [
        this.activatedRoute.snapshot.params.feesHeadName,
        [
          Validators.nullValidator,
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(RegExp('^[A-Za-z_ ]*$')),
        ],
      ],
      parentFees: [
        this.activatedRoute.snapshot.params.parentFees,
        [Validators.required, Validators.nullValidator],
      ],
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
    // console.log(this.editFeesHeadForm.controls.feesHeadName.value);
    // const feesHeadData = {
    //   attribute: ['instituteType', 'feesHeadName', 'parentFees'],
    //   value: [
    //     this.editFeesHeadForm.controls.instituteType.value,
    //     this.editFeesHeadForm.controls.feesHeadName.value,
    //     this.editFeesHeadForm.controls.parentFees.value,
    //   ],
    // };
    // this.feesService.updateFeesHeadById(this.activatedRoute.snapshot.params.id, feesHeadData).subscribe((data) => {
    //   console.log(data);
    // });
    fetch(
      `https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/fees/${this.activatedRoute.snapshot.params.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          attribute: ['instituteType', 'feesHeadName', 'parentFees'],
          value: [
            this.editFeesHeadForm.controls.instituteType.value,
            this.editFeesHeadForm.controls.feesHeadName.value,
            this.editFeesHeadForm.controls.parentFees.value,
          ],
        }),
      }
    )
      .then((data) => {
        console.log(data);
        this.router.navigate(['/fees-management/fees-head']);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
