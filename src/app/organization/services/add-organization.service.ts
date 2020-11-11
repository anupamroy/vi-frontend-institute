import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddOrganizationService {
  constructor(private http: HttpClient) { }

  $orgKey: ReplaySubject<string> = new ReplaySubject(1);

  $associatedPostList: ReplaySubject<string> = new ReplaySubject(1);
  $preview: ReplaySubject<any> = new ReplaySubject(3);
  // preview = new EventEmitter(false);

  firstStepForm;
  secondStepForm;
  thirdStepForm;
  fourthStepForm;
  fifthStepForm;
  SixthStepForm;
  SeventhStepForm;

  contactDetailsFields = {
    isPhoneSectionValid: false,
    isAddressSectionValid: false,
    isEmailSectionValid: false,
    isSocialMediaSectionValid: false,
  };

  isContactDetailsFormValid(): boolean {
    for (const key in this.contactDetailsFields) {
      if (!this.contactDetailsFields[key]) {
        return false;
      }
    }
    return true;
  }
  // private ngUnsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

  // private basicDetails = new ReplaySubject(null);


  api = environment.orgAPI;

  saveBasicDetails(body: any): Observable<any> {
    return this.http.post(`${this.api}/organization/save`, body);
  }

  updateBasicDetails(body: any): Observable<any> {
    return this.http.put(`${this.api}/organization/update`, body);
  }

  saveAddress(body: any): Observable<any> {
    return this.http.post(`${this.api}/orgaddress/save`, body);
  }

  saveEmail(body: any): Observable<any> {
    return this.http.post(`${this.api}/orgemail/save`, body);
  }

  savePhone(body: any): Observable<any> {
    return this.http.post(`${this.api}/orgphone/save`, body);
  }

  saveSocial(body: any): Observable<any> {
    return this.http.post(`${this.api}/orgsocial/save`, body);
  }

  saveRegistrationDetails(body: any): Observable<any> {
    return this.http.post(`${this.api}/orgregaff/save`, body);
  }

  saveOrgDocsDetails(body: any): Observable<any> {
    return this.http.post(`${this.api}/orgadddoc/save`, body);
  }

  saveInstituteUser(body) {
    return this.http.post(`https://lv64hnovk5.execute-api.ap-south-1.amazonaws.com/Prod/institute/createuser`, body);
  }

  saveSellerUser(body) {
    return this.http.post(`https://t8hnq6pt22.execute-api.ap-south-1.amazonaws.com/Prod/seller/createuser`, body);
  }

  saveOrgModule(body) {
    return this.http.post(`${this.api}/orgmodule/save`, body);
  }

  uploadFileinS3(file) {
    // this.http is the injected HttpClient
    const headers = new HttpHeaders();
    headers.set('bypass', 'true');
    return this.http.put(`https://vedtcktqr1.execute-api.ap-south-1.amazonaws.com/v1/uploadfile`, file);

  }

  getAddressByID(id) {
    return this.http.get<any>(`https://ns8mvacvu1.execute-api.ap-south-1.amazonaws.com/Prod/orgsocial/getbyid/${id}?orgTableType=ORGANIZATION_ADDRESS`);
    // https://ns8mvacvu1.execute-api.ap-south-1.amazonaws.com/Prod/orgsocial/getbyid/${id}?orgTableType=ORGANIZATION_SOCIAL
  }
  
  getSocialByID(id) {
    return this.http.get<any>(`https://ns8mvacvu1.execute-api.ap-south-1.amazonaws.com/Prod/orgsocial/getbyid/${id}?orgTableType=ORGANIZATION_SOCIAL`);
    // https://ns8mvacvu1.execute-api.ap-south-1.amazonaws.com/Prod/orgsocial/getbyid/${id}?orgTableType=ORGANIZATION_SOCIAL
  }

  getEmailByID(id) {
    return this.http.get<any>(`https://ns8mvacvu1.execute-api.ap-south-1.amazonaws.com/Prod/orgsocial/getbyid/${id}?orgTableType=ORGANIZATION_EMAIL`);
  }

  getPhoneByID(id) {
    return this.http.get<any>(`https://ns8mvacvu1.execute-api.ap-south-1.amazonaws.com/Prod/orgsocial/getbyid/${id}?orgTableType=ORGANIZATION_PHONE`);
    // https://ns8mvacvu1.execute-api.ap-south-1.amazonaws.com/Prod/orgsocial/getbyid/${id}?orgTableType=ORGANIZATION_SOCIAL
  }

  getRegistration(id){
    return this.http.get<any>(`https://ns8mvacvu1.execute-api.ap-south-1.amazonaws.com/Prod/orgsocial/getbyid/${id}?orgTableType=ORGANIZATION_REGAFF`);
  }

  getAdditionalDocumnet(id) {
    return this.http.get<any>(`https://ns8mvacvu1.execute-api.ap-south-1.amazonaws.com/Prod/orgsocial/getbyid/${id}?orgTableType=ORGANIZATION_ADDDOCF`);
  }
  

  saveOrgKey(key) {
    this.$orgKey.next(key);
  }

  broadcastAssociatedPostList(list) {
    this.$associatedPostList.next(list);
  }
}
