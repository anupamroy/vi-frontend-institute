import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import { Social } from '../../../../models/Social';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  @Input() social: FormGroup;
  @Output() formReset = new EventEmitter();
  @Input() editMode: any = { editing: false, editData: {} };
  @Output() cancelEdit = new EventEmitter();

  socialHandleList = [];
    /** used to help terminate all subscriptions when component destroyed */
    private ngUnsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

    orgkey = "";

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

  ngOnInit(): void {
    this.addOrganizationService.$orgKey.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      console.log("subscribed in address", res);
      this.orgkey = res;

    })
    

    if(this.editMode.editing){
      this.social = this.formBuilder.group({
        socialMediaType: new FormControl(this.editMode.editData.social_media, Validators.required),
        socialMediaLink: new FormControl(this.editMode.editData.social_media_link_handle, Validators.required)
      });
    } else {
      this.social = this.formBuilder.group({
        socialMediaType: new FormControl('', Validators.required),
        socialMediaLink: new FormControl('', Validators.required)
      });
    }
  }

  addSocialHandle(): void{
    const socialHandleObject = this.social.value;
    _.assign(socialHandleObject, {
      id: _.uniqueId('social')
    });
    console.log(socialHandleObject);
    this.socialHandleList.push(socialHandleObject);
    this.addOrganizationService.contactDetailsFields.isSocialMediaSectionValid = true;

    // Storing data
    this.addOrganizationService.$preview.next({
      section: "social",
      socialList: this.socialHandleList
    })

    // "orgHash":"ORGANIZATION_SOCIAL",
    // "orgKey":"198764237934",
    // "social_media":"Facebook",
    // "social_media_link_handle:"https://www.facebook.com/sit"
    // "associated_with_org":"12354329132"

    const newSocialObject = new Social();
    newSocialObject.social_media = this.social.controls.socialMediaType.value;
    newSocialObject.social_media_link_handle = this.social.controls.socialMediaLink.value;
    newSocialObject.associated_with_org = this.orgkey;

    // API Service
    this.addOrganizationService.saveSocial(newSocialObject).subscribe((res) => {
      console.log('aws .....', res);
    })
    console.log(newSocialObject);

    // Resetting the form
    let control: AbstractControl = null;
    
    Object.keys(this.social.controls).forEach((name) => {
      control = this.social.controls[name];
      control.setErrors(null);
    });
    this.social.reset();
    this.social.markAsUntouched();

    //localstorage
    localStorage.setItem('socialHandleList', JSON.stringify(this.socialHandleList))
  }

  deleteSocialHandle(id: string): void{
    _.remove(this.socialHandleList, (a) => {
      return a.id === id;
    });
    if(this.socialHandleList.length == 0) {
      this.addOrganizationService.contactDetailsFields.isSocialMediaSectionValid = true;
    }

    //localstorage
    localStorage.setItem('socialHandleList', JSON.stringify(this.socialHandleList))
  }

  editSocialHandle(id: string): void{
    const socialHandleToEdit = _.remove(this.socialHandleList, (a) => {
      return a.id === id;
    });
    this.addOrganizationService.contactDetailsFields.isSocialMediaSectionValid = true;

    this.social = this.formBuilder.group({
      socialMediaType: new FormControl(socialHandleToEdit[0].socialMediaType, Validators.required),
      socialMediaLink: new FormControl(socialHandleToEdit[0].socialMediaLink, Validators.required)
    });

    //localstorage
    localStorage.setItem('socialHandleList', JSON.stringify(this.socialHandleList))
  }

  processObjUpdated(object: Social) {
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
    const obj = new Social();
    obj.social_media = this.social.controls.socialMediaType.value;
    obj.social_media_link_handle = this.social.controls.socialMediaLink.value;
    obj.orgKey = this.editMode.editData.orgKey;

    console.log(this.processObjUpdated(obj));

    this.addOrganizationService.updateSocialDetails(this.processObjUpdated(obj)).subscribe((res) => {
      let data = JSON.parse(res);
      // console.log("attributes res ",res, data.Attributes);
      let dataset = _.assign(new Social(),{associated_with_org :  this.editMode.editData.associated_with_org }, data.Attributes, _.pick(obj, ['orgKey']))
      // console.log("data set .:",dataset)
     
      this.cancelEdit.emit(false);
      this.addOrganizationService.$refreshList.next(dataset);
    })
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