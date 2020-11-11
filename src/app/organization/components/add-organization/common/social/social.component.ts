import { Component, OnInit } from '@angular/core';
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
  social: FormGroup;
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
    this.social = this.formBuilder.group({
      socialMediaType: new FormControl('', Validators.required),
      socialMediaLink: new FormControl('', Validators.required)
    });
  }

  addSocialHandle(): void{
    const socialHandleObject = this.social.value;
    _.assign(socialHandleObject, {
      id: _.uniqueId('social_')
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
      this.addOrganizationService.contactDetailsFields.isSocialMediaSectionValid = false;
    }

    //localstorage
    localStorage.setItem('socialHandleList', JSON.stringify(this.socialHandleList))
  }

  editSocialHandle(id: string): void{
    const socialHandleToEdit = _.remove(this.socialHandleList, (a) => {
      return a.id === id;
    });
    this.addOrganizationService.contactDetailsFields.isSocialMediaSectionValid = false;

    this.social = this.formBuilder.group({
      socialMediaType: new FormControl(socialHandleToEdit[0].socialMediaType, Validators.required),
      socialMediaLink: new FormControl(socialHandleToEdit[0].socialMediaLink, Validators.required)
    });

    //localstorage
    localStorage.setItem('socialHandleList', JSON.stringify(this.socialHandleList))
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
