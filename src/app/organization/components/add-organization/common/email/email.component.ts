import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input() emailForm: FormGroup;
  @Output() formReset = new EventEmitter();
  @Input() editMode: any = { editing: false, editData: {} };
  @Output() cancelEdit = new EventEmitter();

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

    if(this.editMode.editing){
      this.emailForm = this.formBuilder.group({
        emailText: new FormControl(this.editMode.editData.email_text, Validators.required),
        emailAddress: new FormControl(this.editMode.editData.email, Validators.required),
        emailType: new FormControl(this.editMode.editData.email_type, Validators.required),
        shift: new FormControl(this.editMode.editData.email_availability_shift),
        associatedWith: new FormControl(this.editMode.editData.associated_with)
      });
    } else {
      this.emailForm = this.formBuilder.group({
        emailText: new FormControl('', Validators.required),
        emailAddress: new FormControl('', Validators.required),
        emailType: new FormControl('', Validators.required),
        shift: new FormControl(''),
        associatedWith: new FormControl('')
      });
    }
  }

  processObjUpdated(object: Email) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'orgHash' && key != 'associated_with_org' && key != 'orgKey') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      orgHash: object.orgHash,
      orgKey: object.orgKey
    }
  }

  cancelEditMode() {
    this.cancelEdit.emit(false);
  }

  updateData(){
    const obj = new Email();
    obj.associated_with = this.emailForm.controls.associatedWith.value;
    obj.email = this.emailForm.controls.emailAddress.value;
    obj.email_text = this.emailForm.controls.emailText.value;
    obj.email_availability_shift = this.emailForm.controls.shift.value;
    obj.orgKey = this.editMode.editData.orgKey;

    console.log(this.processObjUpdated(obj));

    this.addOrganizationService.updateEmailDetails(this.processObjUpdated(obj)).subscribe((res) => {
      let data = JSON.parse(res);
      // console.log("attributes res ",res, data.Attributes);
      let dataset = _.assign(new Email(), data.Attributes, _.pick(obj, ['associated_with_org', 'orgKey']))
      // console.log("data set .:",dataset)
     
      this.cancelEdit.emit(false);
      this.addOrganizationService.$refreshList.next(dataset);
    })
  }

  addEmail(): void {
    const emailObject = this.emailForm.value;
    _.assign(emailObject, {
      id: _.uniqueId('email')
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
      shift: new FormControl(documentToEdit[0].shift),
      associatedWith: new FormControl(documentToEdit[0].associatedWith)
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