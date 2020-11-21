import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import { Address } from '../../../models/Address';
import { BasicDetails } from '../../../models/BasicDetails';
// import { Document } from '../../../models/Document';
import { Email } from '../../../models/Email';
import { Phone } from '../../../models/Phone';
import { Social } from '../../../models/Social';
import { Registration } from '../../../models/Registration';
import { AdditionDocument } from '../../../models/Document';
import { MasterUser } from '../../../models/MasterUser';
import { RegistrationComponent } from '../registration/registration.component';
import { ModuleService } from '../../module/Services/module.service';
import { OrgModule } from '../../../models/OrgModule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  organizationType;
  basicDetails;
  addressList;
  documentList;
  emailList;
  phoneList;
  socialList;
  registrationDetails;
  masterUserDetails;
  settingsDetails;

  orgKey;

  constructor(private router: Router, private moduleService: ModuleService, private addOrganizationService: AddOrganizationService, private vcrf: ViewContainerRef, private cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.addOrganizationService.$preview.subscribe((res) => {
      console.log('service', res)
      switch (res.section) {
        case "organizationType":
          this.organizationType = res.organizationType
          break;

        case "basicDetails":
          this.basicDetails = res.basicDetails
          break;

        case "address":
          this.addressList = res.addressList
          break;

        case "document":
          this.documentList = res.documentList
          break;

        case "email":
          this.emailList = res.emailList
          break;

        case "phone":
          this.phoneList = res.phoneList
          break;

        case "social":
          this.socialList = res.socialList
          break;

        case "registration":
          this.registrationDetails = res.registrationDetails
          console.log(this.registrationDetails);

          break;

        case "masterUserDetails":
          this.masterUserDetails = res.masterUserDetails
          break;

        case "settingsDetails":
          this.settingsDetails = res.settingsDetails
          break;

        default:
          break;
      }
    })

    // this.organizationType = localStorage.getItem('organization-type') ? JSON.parse(localStorage.getItem('organization-type')) : {}
    // this.basicDetails = localStorage.getItem('basic-details') ? JSON.parse(localStorage.getItem('basic-details')) : {}
    // this.addressList = localStorage.getItem('addressList') ? JSON.parse(localStorage.getItem('addressList')) : []

    console.log(this.organizationType, this.basicDetails, this.addressList)
  }

  // ngAfterViewInit(): void {
  //   this.organizationType = localStorage.getItem('organization-type') ? JSON.parse(localStorage.getItem('organization-type')) : {}
  //   this.basicDetails = localStorage.getItem('basic-details') ? JSON.parse(localStorage.getItem('basic-details')) : {}
  //   this.addressList = localStorage.getItem('addressList') ? JSON.parse(localStorage.getItem('addressList')) : []

  //   console.log(this.organizationType, this.basicDetails, this.addressList)
  // }

  // handleRefresh(event){
  //   this.organizationType = localStorage.getItem('organization-type') ? JSON.parse(localStorage.getItem('organization-type')) : {}
  //   this.basicDetails = localStorage.getItem('basic-details') ? JSON.parse(localStorage.getItem('basic-details')) : {}
  //   this.addressList = localStorage.getItem('addressList') ? JSON.parse(localStorage.getItem('addressList')) : []
  // }

  generateORGCODE() {
    return `ORG${''}${this.basicDetails.orgShortCode}${this.basicDetails.instituteTypeSelector}`;
  }

  finalSubmit() {
    // Basic Details Object
    const basicDetailsObj = new BasicDetails();
    basicDetailsObj.institute_type = this.basicDetails.instituteTypeSelector;
    basicDetailsObj.org_name = this.basicDetails.orgName;
    basicDetailsObj.org_short_code = this.basicDetails.orgShortCode;
    if (this.organizationType == 'Seller') {
      basicDetailsObj.org_type = this.organizationType;
      basicDetailsObj.seller_id = '';
    } else {
      basicDetailsObj.org_type = this.organizationType;
    }
    basicDetailsObj.org_code = this.generateORGCODE();
    basicDetailsObj.org_logo = this.basicDetails.org_logo;
    basicDetailsObj.org_parent_id = '';

    // API call for basic details
    console.log(basicDetailsObj);


    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();

        this.addOrganizationService.saveBasicDetails(basicDetailsObj)
          .pipe(tap(res => this.orgKey = res))
          .subscribe((res) => {
            console.log('ORGKEY: ', this.orgKey);
            const apiArray = [];

            // Document
            let regObj = new Registration();
            regObj.orgCategory = this.registrationDetails.organizationCategory;
            regObj.affAndAcc = this.registrationDetails.affAndAcc;
            regObj.affiliationEndDate = String(this.registrationDetails.affiliationEndDate);
            regObj.affiliationStartDate = String(this.registrationDetails.affiliationStartDate);
            regObj.status = this.registrationDetails.status;
            regObj.certificateNumber = this.registrationDetails.certificateNumber;
            regObj.registrationDate = String(this.registrationDetails.registrationDate);
            regObj.registrationNumber = this.registrationDetails.registrationNumber;
            regObj.associated_with_org = this.orgKey;

            console.log("regobjjjjj", regObj);
            // apiArray.push(this.addOrganizationService.saveRegistrationDetails(regObj));

            // Address List
            this.addressList.forEach((address, index) => {
              const obj = new Address();
              obj.address = address.address;
              obj.address_for = address.addressTypeSelector;
              obj.associated_with_org = this.orgKey;

              // Return api observable
              apiArray.push(this.addOrganizationService.saveAddress(obj));
            });

            // additional Document list
            if (this.documentList && this.documentList.length > 0) {
              this.documentList.forEach(doc => {
                const obj = new AdditionDocument();
                obj.docType = doc.documentType;
                obj.docNumber = doc.documentNumber;
                obj.docFile = "";
                obj.validUpto = String(doc.documentRegistrationDate)
                obj.associated_with_org = this.orgKey;

                // Return api observable
                apiArray.push(this.addOrganizationService.saveOrgDocsDetails(obj));
              });
            }


            // Phone List
            this.phoneList.forEach((phone, index) => {
              const obj = new Phone();
              obj.phone_number = phone.phoneNumber;
              obj.phone_type = phone.phoneType;
              obj.associated_with = phone.associatedWith;
              obj.phone_timings = phone.time;
              obj.phone_availability_shift = phone.shift;
              obj.phone_availability_days = phone.daysSelector;
              obj.associated_with_org = this.orgKey;

              // Return api observable
              apiArray.push(this.addOrganizationService.savePhone(obj));
            });

            if (this.organizationType == "Seller") {
              let obj = new MasterUser();
              obj.email = this.masterUserDetails.emailAddress;
              obj.first_name = this.masterUserDetails.firstName
              obj.last_name = this.masterUserDetails.lastName;
              obj.middle_name = this.masterUserDetails.middleName;
              obj.locale = this.orgKey;
              obj.phone_number = this.masterUserDetails.isd + this.masterUserDetails.phoneNumber;
              if (this.masterUserDetails.authType == "password") {
                obj.password = this.masterUserDetails.password;
              }
              console.log("master user final", obj);
              this.addOrganizationService.saveSellerUser(obj).subscribe(res => {
                console.log(res);

              });
            } else {
              let obj = new MasterUser();
              obj.email = this.masterUserDetails.emailAddress;
              obj.first_name = this.masterUserDetails.firstName;
              obj.last_name = this.masterUserDetails.lastName;
              obj.middle_name = this.masterUserDetails.middleName;
              obj.phone_number = this.masterUserDetails.isd + this.masterUserDetails.phoneNumber;
              obj.locale = this.orgKey;
              if (this.masterUserDetails.authType == "password") {
                obj.password = this.masterUserDetails.password;
              }
              console.log("master user final", obj);
              
              this.addOrganizationService.saveInstituteUser(obj).subscribe(res => {
                console.log(res);

              });
            }

            // Email List
            this.emailList.forEach((email, index) => {
              const obj = new Email();

              obj.email_text = email.emailText;
              obj.email = email.emailAddress;
              obj.email_type = email.emailType;
              obj.email_availability_shift = email.shift;
              obj.associated_with = email.associatedWith;
              obj.associated_with_org = this.orgKey;

              // Return api observable
              apiArray.push(this.addOrganizationService.saveEmail(obj));
            });

            // Social List
            if (this.socialList && this.socialList.length > 0) {
              this.socialList.forEach((social, index) => {
                const obj = new Social();
  
                obj.social_media = social.socialMediaType;
                obj.social_media_link_handle = social.socialMediaLink;
                obj.associated_with_org = this.orgKey;
  
                // Return api observable
                apiArray.push(this.addOrganizationService.saveSocial(obj));
              });
            }
           

            const moduleObj = new OrgModule();
            moduleObj.allotedModules = this.settingsDetails.moduleSelector.join(", ");
            moduleObj.associated_with_org = this.orgKey;

            console.log(moduleObj);

            apiArray.push(this.addOrganizationService.saveOrgModule(moduleObj));

            // console.log(this.registrationDetails);


            // apiArray.push(this.addOrganizationService.saveRegistrationDetails(this.registrationDetails))
            //Settings
            this.addOrganizationService.saveRegistrationDetails(regObj).subscribe(res => {
              console.log(res);

            }, error => {
              console.log(error);

            });

            // Handling multiple api observable
            forkJoin(apiArray).subscribe(results => {
              Swal.fire({
                title: 'Added',
                icon: 'success',
                showConfirmButton: false,

                timer: 1500,
              }).then(() => {
              this.router.navigate(['/org/list-organization']);
              })
            });
          })

      }
    });

    // Address Object


    // Phone Object
    this.phoneList.forEach((phone, index) => {
      const obj = new Phone();
      obj.phone_number = phone.phoneNumber;
      obj.phone_type = phone.phoneType;
      obj.associated_with = phone.associatedWith;
      obj.phone_timings = phone.time;
      obj.phone_availability_shift = phone.shift;
      obj.phone_availability_days = phone.daysSelector;
      obj.associated_with_org = this.orgKey;
    })
  }

}
