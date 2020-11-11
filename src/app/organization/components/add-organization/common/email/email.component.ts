import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import { MyErrorStateMatcher } from '../Validations/MyErrorStateMatcher';
import { Email } from '../../../../models/Email';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  emailForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  associatedPostList;
  emailFormList = [];
    /** used to help terminate all subscriptions when component destroyed */
    private ngUnsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

    orgkey = "";

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

  ngOnInit(): void {
    this.addOrganizationService.$associatedPostList.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.associatedPostList = res;
    })

    this.addOrganizationService.$orgKey.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      console.log("subscribed in email", res);
      this.orgkey = res;

    })
    this.emailForm = this.formBuilder.group({
      emailText: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      emailType: new FormControl('', Validators.required),
      shift: new FormControl('', Validators.required),
      associatedWith: new FormControl('', Validators.required)
    });
  }

  addEmail(): void {
    const emailObject = this.emailForm.value;
    _.assign(emailObject, {
      id: _.uniqueId('email_')
    });

    console.log(emailObject);
    this.emailFormList.push(emailObject);
    this.addOrganizationService.contactDetailsFields.isEmailSectionValid = true;

    // Storing data
    this.addOrganizationService.$preview.next({
      section: "email",
      emailList: this.emailFormList
    })

    // Object structure
    // "orgHash":"ORGANIZATION_EMAIL",
    // "orgKey":"198764237934",
    // "email_text":"Principal's Email",
    // "email":"prinicpal@sit.co.in",
    // "email_type":"Primary",
    // "email_availability_shift":"Day",
    // "associated_with":"Principal",
    // "associated_with_org":"12354329132"

    //Declaring email object
    // const newEmailObj = new Email();
    
    // newEmailObj.email_text = this.emailForm.controls.emailText.value,
    // newEmailObj.email = this.emailForm.controls.emailAddress.value,
    // newEmailObj.email_type = this.emailForm.controls.emailType.value,
    // newEmailObj.email_availability_shift = this.emailForm.controls.shift.value,
    // newEmailObj.associated_with = this.emailForm.controls.associatedWith.value,
    // newEmailObj.associated_with_org = this.orgkey

    // //calling API service
    // this.addOrganizationService.saveEmail(newEmailObj).subscribe((res) => {
    //   console.log('aws .....', res)
    // })
    // console.log(newEmailObj)


    // Resetting the form
    let control: AbstractControl = null;
   
    Object.keys(this.emailForm.controls).forEach((name) => {
      control = this.emailForm.controls[name];
      control.setErrors(null);
    });
    this.emailForm.reset();
    this.emailForm.markAsUntouched();

    //localstorage
    localStorage.setItem('emailFormList', JSON.stringify(this.emailFormList))
  }

  removeEmail(id: string): void {
    _.remove(this.emailFormList, (a) => {
      return a.id === id;
    });
    if (this.emailFormList.length == 0) {
      this.addOrganizationService.contactDetailsFields.isEmailSectionValid = false;
    }

    //localstorage
    localStorage.setItem('emailFormList', JSON.stringify(this.emailFormList))
  }

  editEmail(id: string): void {
    const documentToEdit = _.remove(this.emailFormList, (a) => {
      return a.id === id;
    });

    this.addOrganizationService.contactDetailsFields.isEmailSectionValid = false;
    this.emailForm = this.formBuilder.group({
      emailText: new FormControl(documentToEdit[0].emailText, Validators.required),
      emailAddress: new FormControl(documentToEdit[0].emailAddress, Validators.required),
      emailType: new FormControl(documentToEdit[0].emailType, Validators.required),
      shift: new FormControl(documentToEdit[0].shift, Validators.required),
      associatedWith: new FormControl(documentToEdit[0].associatedWith, Validators.required)
    });

    //localstorage
    localStorage.setItem('emailFormList', JSON.stringify(this.emailFormList))
  }

    /**
 * Unsubscribe from any observable
 * This avoids "Attempt to use a destroyed view" when user navigates away before page done loading
 *
 * @memberof 
 */
ngOnDestroy() {
  this.ngUnsubscribe.next(true);
  this.ngUnsubscribe.complete();
}
}
