import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesService } from '../../../services/fees.service';

@Component({
  selector: 'app-edit-fees-head',
  templateUrl: './edit-fees-head.component.html',
  styleUrls: ['./edit-fees-head.component.scss'],
})
export class EditFeesHeadComponent implements OnInit {
  editFeesHeadForm: FormGroup;
  instituteTypeList = [];
  finalItems = [];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private feesService: FeesService
  ) {}

  ngOnInit(): void {
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
          Validators.pattern(`^[a-zA-Z_ ]*$`),
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

    if (
      this.editFeesHeadForm.controls.instituteType.value !==
        this.activatedRoute.snapshot.params.instituteType ||
      this.editFeesHeadForm.controls.feesHeadName.value !==
        this.activatedRoute.snapshot.params.feesHeadName ||
      this.editFeesHeadForm.controls.parentFees.value !==
        this.activatedRoute.snapshot.params.parentFees
    ) {
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
          this.router.navigate(['/fees-management/fees-head']);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.router.navigate(['/fees-management/fees-head']);
    }
  }

  get feesHeadName(): AbstractControl {
    return this.editFeesHeadForm.controls.feesHeadName;
  }
  get parentFees(): AbstractControl {
    return this.editFeesHeadForm.get('parentFees');
  }
  get instituteType(): AbstractControl {
    return this.editFeesHeadForm.get('instituteType');
  }
}
