import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
const jsonData = require('../add-organization/common/Validations/org_fields.json');
import { OrganizationModel } from '../../../shared/models/organization';
import { EditOrganizationService } from '../../services/edit-organization.service'
import Organization from '../../../shared/models/organization'
import { forkJoin, ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { AddOrganizationService } from '../../services/add-organization.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validatorForFormControl } from '../add-organization/common/Validations/MyErrorStateMatcher';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.scss']
})
export class EditOrganizationComponent implements OnInit {
  editData: any;
  editMode: { editing: boolean; editData: any; };

   /** used to help terminate all subscriptions when component destroyed */
   private ngUnsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService, private editOrgService: EditOrganizationService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  secondFormGroup: FormGroup;

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

  organizationFields;

  editing: any = { mode: "", editData: {} };

  id: string = '8f35eb00-185e-11eb-bafc-474e42308503';

  processObjUpdated(object: Organization) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'orgHash' && key != 'associated_with_org') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      itemId: object.itemId
    }
  }

  onSubmit() {
    // this.editOrgService.updateOrganizationById(this.id,this.processObjUpdated(this.selectedOrganization)).subscribe();
  }

  ngOnInit() {
    this.organizationFields = jsonData;
    console.log(this.data.dataKey, this.data.basicDetails);
    this.addOrganizationService.$refreshList.next(this.data.basicDetails)
    // this.basicDetails = ;
    let apiArray: Array<any> = [];
    apiArray.push(this.addOrganizationService.getAddressByID(this.data.dataKey));
    apiArray.push(this.addOrganizationService.getEmailByID(this.data.dataKey));
    apiArray.push(this.addOrganizationService.getPhoneByID(this.data.dataKey));
    apiArray.push(this.addOrganizationService.getRegistration(this.data.dataKey));
    apiArray.push(this.addOrganizationService.getAdditionalDocumnet(this.data.dataKey));
    apiArray.push(this.addOrganizationService.getSocialByID(this.data.dataKey));


    forkJoin(apiArray).subscribe(results => {
      console.log(results);

      results.forEach(res => {
        let data: any = JSON.parse(String(res));
        console.log(data.Items);
        this.populateData(data.Items);

      });

    });

    this.addOrganizationService.$refreshList.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
     
      console.log("populate...");
      this.populateData([res]);
      // this.dialog.closeAll()
      // this.refreshList();
    })


    // this.editOrgService.getOrganizationById(this.id).subscribe((res)=> {
    //   let body = JSON.parse(res).Items[0]
    //   console.log(body);
    //   this.selectedOrganization  = new Organization(body)
    //   console.log('ddsf',this.selectedOrganization);


    // })

    //  this.selectedOrganization.organization.settings.modules



  }

  populateData(res) {
    switch (res[0]?.orgHash) {
      case "organizationType":
        this.organizationType = res.organizationType
        break;

      case "ORGANIZATION":
        this.basicDetails = res[0]
        break;

      case "ORGANIZATION_ADDRESS":
        this.addressList = res
        break;

      case "ORGANIZATION_ADDDOCF":
        this.documentList = res;
        break;

      case "ORGANIZATION_EMAIL":
        this.emailList = res;
        break;

      case "ORGANIZATION_PHONE":
        this.phoneList = res;
        break;

      case "ORGANIZATION_SOCIAL":
        this.socialList = res;
        break;

      case "ORGANIZATION_REGAFF":
        this.registrationDetails = res[0];

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
  }

  editDoc() { }

  editRegistration() {
    this.editing = "registrationdetail";
    this.editMode = { editing: true, editData: this.registrationDetails };

  }

  editSocial(social) {
    console.log(social);
    
    this.editing = "social";
    this.editMode = { editing: true, editData: social };
   }

  editEmail(email) {
    this.editing = "email";
    this.editMode = { editing: true, editData: email };
   }

  editPhone(phone) {
    console.log(phone);

    this.editing = "phone";
    this.editMode = { editing: true, editData: phone };
  }

  editAddress(address) {
    this.editing = "address";
    this.editMode = { editing: true, editData: address };
  }

  editBasicDetails() {
    this.secondFormGroup = this.formBuilder.group({
      instituteTypeSelector: new FormControl(this.basicDetails.institute_type, Validators.required),
      orgName: new FormControl(this.basicDetails?.org_name, validatorForFormControl(this.organizationFields.organizationName)),
      orgShortCode: new FormControl(this.basicDetails?.org_short_code, validatorForFormControl(this.organizationFields.organizationShortCode))
    });
    this.editing = "basicdetail";
    this.editMode = { editing: true, editData: this.basicDetails };

  }

  cancelEditMode(event) {
    this.editing = "";
  }


  // this.editOrgService.getOrganization().subscribe(
  //   (res) => {
  //     const data = JSON.parse(res).Items;
  //     console.log(data);

  //     const tempInstituteType = [];
  //     const tempModules = [];

  //     data.forEach((item) => {
  //       if (item.isDeleted === false) {
  //         if (item.itemId === 'INSTITUTE_TYPE') {
  //           tempInstituteType.push(item);
  //         } else if (item.itemId === 'MODULE') {
  //           tempModules.push(item);
  //         }
  //       }
  //     });

  //     this.instituteTypeList = tempInstituteType.map((item) => {
  //       return { type: item.instituteType, value: false };
  //     });
  //     this.moduleList = tempModules.map((item) => {
  //       return { type: item.moduleName, value: false };
  //     });
  //     console.log(this.instituteTypeList);
  //     console.log(this.moduleList);
  //     this.orgType = this.editOrgService.getOrganizationType().filter((item)=>{
  //       return item !== this.selectedOrganization.organization.orgType;
  //     })
  //     this.emailType = this.editOrgService.getEmailType().filter((item)=>{
  //       return item !== this.selectedOrganization.organization.contactDetails.email[0].emailType
  //     })
  //     console.log('MY ARRAY',this.orgType);
  //   },
  //   (error) => console.error(error)
  // );

  // addOrganizationForm: FormGroup;
  // currentStep = 0;
  // validatedStep: number | null = null;
  // instituteTypeList = [
  //   { type: 'PG', value: false },
  //   { type: 'UG', value: false },
  // ];
  // selectAllInstitute = false;
  // selectAllDays = [true];
  // selectAllModules = false;
  // addressForList = ['Manager', 'Employee'];
  // phoneTextList = ['Manager', 'Employee'];
  // phoneTypeList = ['Primary', 'Secondary', 'Emergency'];
  // phoneDays = [
  //   { type: 'Monday', value: true },
  //   { type: 'Tuesday', value: true },
  //   { type: 'Wednesday', value: true },
  //   { type: 'Thursday', value: true },
  //   { type: 'Friday', value: true },
  //   { type: 'Saturday', value: true },
  //   { type: 'Sunday', value: true },
  // ];
  // daysList = [this.phoneDays];
  // shiftList = ['Day', 'Evening', 'Night'];
  // associatedWithList = ['Principal', 'Dean'];
  // emailTypeList = ['Primary', 'Emergency'];
  // socialMediaList = ['Facebook', 'Instagram', 'Twitter'];
  // organizationCategoryList = ['Private', 'LLP'];
  // documentTypeList = ['Regular', 'Confidential'];
  // moduleList = [
  //   { type: 'E-Fees', value: false },
  //   { type: 'E-Payments', value: false },
  //   { type: 'E-Organization', value: false },
  //   { type: 'E-Course', value: false },
  //   { type: 'E-Examination', value: false },
  // ];

  // constructor(private fb: FormBuilder) {}

  // ngOnInit(): void {
  //   this.addOrganizationForm = this.fb.group({
  //     orgType: ['', [Validators.required, Validators.nullValidator]],
  //     // Step 2
  //     basicDetails: this.fb.group({
  //       instituteType: this.fb.array([]),
  //       organizationName: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.pattern(new RegExp(/^[a-zA-Z0-9\s-\.']*$/)),
  //           emptyValidator(),
  //         ],
  //       ],
  //       organizationCode: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.pattern(new RegExp(/^[a-zA-Z0-9]{1,6}$/)),
  //           emptyValidator(),
  //         ],
  //       ],
  //       fileChoosen: ['', [Validators.required]],
  //     }),
  //     // Step 3
  //     contactDetails: this.fb.group(
  //       {
  //         address: this.fb.array([this.createAddressGroup()]),
  //         phone: this.fb.array([this.createPhoneGroup()]),
  //         email: this.fb.array([this.createEmailGroup()]),
  //         socialMedia: this.fb.array([this.createSocialMediaGroup()]),
  //       },
  //       [
  //         this.minAddressValidation(),
  //         this.minPhoneValidation(),
  //         this.minEmailValidation(),
  //       ]
  //     ),
  //     // Step 4
  //     registrationDetails: this.fb.group({
  //       organizationCategory: [''],
  //       registrationNumber: [''],
  //       registrationDocument: [''],
  //       validUpto: [''],
  //       additionalDocument: this.fb.array([
  //         this.createAdditionalDocumentGroup(),
  //       ]),
  //       accredition: [false],
  //       accreditionFrom: [''],
  //       accreditionTo: [''],
  //       issuingAuthority: [''],
  //       grade: [''],
  //       certificateDocument: [''],
  //       certificateNumber: [''],
  //       certificateStatus: [false],
  //     }),
  //     // Step 5
  //     settings: this.fb.group({
  //       multifactorAuthentication: [false],
  //       passwordAuthentication: [false],
  //       modules: this.fb.array([]),
  //     }),
  //     // Step 6
  //     userDetails: this.fb.group({
  //       firstName: [''],
  //       middleName: [''],
  //       lastName: [''],
  //       emailAddress: [''],
  //       phoneNumber: [''],
  //     }),
  //     // Step 7
  //     preview: this.fb.group({}),
  //   });
  // }

  // // ngOnInit Ends -------------------------------------------------------------------

  // // -----------------------------------------------------------------------------------
  // // Common Controls -----------------------------------------------------------------
  // // -----------------------------------------------------------------------------------

  // // Step Controls

  // step(no: number): void {
  //   console.log(this.validatedStep, 'validated');
  //   this.validateForm();
  //   if (this.validatedStep !== null && no <= this.validatedStep + 1) {
  //     this.currentStep = no;
  //   }
  //   console.log(no);
  // }

  // nextStep(): void {
  //   console.log(this.addOrganizationForm.value);
  //   this.validateForm();
  //   if (
  //     (this.currentStep < 6 && this.validatedStep === this.currentStep) ||
  //     this.currentStep < this.validatedStep
  //   ) {
  //     this.currentStep = this.currentStep + 1;
  //   }
  //   console.log('Current', this.currentStep);
  //   console.log('validated', this.validatedStep);
  //   // console.log(this.getSelectedInstitutes());
  // }

  // previousStep(): void {
  //   console.log(this.addOrganizationForm.value);
  //   if (this.currentStep > 0) {
  //     this.currentStep = this.currentStep - 1;
  //   }
  //   console.log('Current', this.currentStep);
  //   console.log('validated', this.validatedStep);
  // }

  // ifDisabled(no: number): boolean {
  //   if (this.currentStep > no) {
  //     return false;
  //   }
  //   return true;
  // }

  // // Validating Form

  // validateForm(): void {
  //   if (this.addOrganizationForm.controls.orgType.valid) {
  //     this.validatedStep = 0;
  //     if (this.addOrganizationForm.controls.basicDetails.valid) {
  //       this.validatedStep = 1;
  //       if (this.addOrganizationForm.controls.contactDetails.valid) {
  //         this.validatedStep = 2;
  //         if (this.addOrganizationForm.controls.registrationDetails.valid) {
  //           this.validatedStep = 3;
  //           if (this.addOrganizationForm.controls.settings.valid) {
  //             this.validatedStep = 4;
  //             if (this.addOrganizationForm.controls.userDetails.valid) {
  //               this.validatedStep = 5;
  //               if (this.addOrganizationForm.controls.preview.valid) {
  //                 this.validatedStep = 6;
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  // // -----------------------------------------------------------------------------------
  // // Step 1 ----------------------------------------------------------------------------
  // // -----------------------------------------------------------------------------------

  // onChangeOrg(): void {
  //   if (this.addOrganizationForm.controls.orgType.value === 'Institute') {
  //     (this.addOrganizationForm.controls
  //       .basicDetails as AbstractControl).setValidators([
  //       this.selectInstituteTypeValidation(),
  //     ]);
  //   } else {
  //     (this.addOrganizationForm.controls
  //       .basicDetails as AbstractControl).setValidators([]);
  //     this.selectAllInstitute = false;
  //     this.instituteTypeFormArray.clear();
  //   }
  // }

  // // -----------------------------------------------------------------------------------
  // // Step 2 ----------------------------------------------------------------------------
  // // -----------------------------------------------------------------------------------

  // singleUpload(): void {}

  // selectInstituteTypeValidation(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     const oneAdded = this.instituteTypeFormArray.controls.length === 0;
  //     return oneAdded ? { noInstituteSelected: true } : null;
  //   };
  // }

  // setOrgCode(): void {
  //   if (
  //     (this.addOrganizationForm.controls.basicDetails as FormGroup).controls
  //       .organizationCode.pristine ||
  //     (this.addOrganizationForm.controls.basicDetails as FormGroup).controls
  //       .organizationCode.value === ''
  //   ) {
  //     // tslint:disable-next-line: no-shadowed-variable
  //     const orgName = (this.addOrganizationForm.controls
  //       .basicDetails as FormGroup).controls.organizationName.value;
  //     // tslint:disable-next-line: no-shadowed-variable
  //     const acronymList = orgName.split(/\s/).map((word) => {
  //       const letter = word.slice(0, 1).toUpperCase();
  //       if (word.length > 2) {
  //         return letter;
  //       } else {
  //         return '';
  //       }
  //     });
  //     (this.addOrganizationForm.controls
  //       .basicDetails as FormGroup).controls.organizationCode.patchValue(
  //       acronymList.join('')
  //     );
  //   }
  // }

  // selectAllInstituteTypeToggle(): void {
  //   this.instituteTypeFormArray.clear();
  //   this.selectAllInstitute = !this.selectAllInstitute;
  //   // console.log(this.selectAllInstitute);
  //   if (this.selectAllInstitute) {
  //     this.instituteTypeList.forEach((item) => {
  //       item.value = true;
  //       this.instituteTypeFormArray.push(new FormControl(item.type));
  //     });
  //   } else {
  //     this.instituteTypeList.forEach((item) => {
  //       item.value = false;
  //     });
  //   }
  //   console.log(this.instituteTypeFormArray.value);
  // }

  // onInstituteTypeSelectChange(e): void {
  //   if (e.target.checked) {
  //     this.instituteTypeFormArray.push(new FormControl(e.target.value));
  //   } else {
  //     let i = 0;
  //     this.instituteTypeFormArray.controls.forEach((item: FormControl) => {
  //       if (item.value === e.target.value) {
  //         this.instituteTypeFormArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  //   if (
  //     this.instituteTypeFormArray.controls.length ===
  //     this.instituteTypeList.length
  //   ) {
  //     this.selectAllInstitute = true;
  //   } else {
  //     this.selectAllInstitute = false;
  //   }
  //   console.log(this.instituteTypeFormArray.value);
  // }

  // // Getters

  // get instituteTypeFormArray(): FormArray {
  //   return (this.addOrganizationForm.controls.basicDetails as FormGroup)
  //     .controls.instituteType as FormArray;
  // }

  // // -----------------------------------------------------------------------------------
  // // Step 3 ----------------------------------------------------------------------------
  // // -----------------------------------------------------------------------------------

  // // Validations

  // minAddressValidation(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     const oneAdded = this.addressArray.controls.length === 0;
  //     return oneAdded ? { minaddressvalidation: true } : null;
  //   };
  // }
  // minPhoneValidation(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     const oneAdded = this.phoneArray.controls.length === 0;
  //     return oneAdded ? { minaddressvalidation: true } : null;
  //   };
  // }
  // minEmailValidation(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     const oneAdded = this.emailArray.controls.length === 0;
  //     return oneAdded ? { minaddressvalidation: true } : null;
  //   };
  // }

  // // Utility functions

  // selectAllDaysToggle(index, e): void {
  //   this.daysArray(index).clear();
  //   if (e.target.checked === true) {
  //     this.selectAllDays[index] = true;
  //   } else {
  //     this.selectAllDays[index] = false;
  //   }
  //   if (this.selectAllDays[index]) {
  //     this.daysList[index].forEach((item) => {
  //       item.value = true;
  //       this.daysArray(index).push(new FormControl(item.type));
  //     });
  //   } else {
  //     this.daysList[index].forEach((item) => {
  //       item.value = false;
  //     });
  //   }
  //   console.log(this.daysList);
  //   console.log(this.daysArray(index).value);
  // }

  // onDaySelectChange(index, e): void {
  //   if (e.target.checked) {
  //     this.daysArray(index).push(new FormControl(e.target.value));
  //   } else {
  //     let i = 0;
  //     this.daysArray(index).controls.forEach((item: FormControl) => {
  //       if (item.value === e.target.value) {
  //         this.daysArray(index).removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  //   if (this.daysArray(index).controls.length === this.daysList[index].length) {
  //     this.selectAllDays[index] = true;
  //   } else {
  //     this.selectAllDays[index] = false;
  //   }
  //   console.log(this.daysArray(index).value);
  // }

  // // Adding Groups

  // addaddressGroup(): void {
  //   this.addressArray.push(this.createAddressGroup());
  // }
  // addPhoneGroup(): void {
  //   this.selectAllDays.push(true);
  //   this.daysList.push(this.phoneDays);
  //   this.phoneArray.push(this.createPhoneGroup());
  // }
  // addEmailGroup(): void {
  //   this.emailArray.push(this.createEmailGroup());
  // }
  // addSocialMediaGroup(): void {
  //   this.socialMediaArray.push(this.createSocialMediaGroup());
  // }

  // // Deleting Groups

  // deleteAddressGroup(index: number): void {
  //   if (this.addressArray.length > 1) {
  //     this.selectAllDays.filter((item, i) => {
  //       return i !== index;
  //     });
  //     this.daysList.filter((item, i) => {
  //       return i !== index;
  //     });
  //     this.addressArray.removeAt(index);
  //   }
  // }
  // deletePhoneGroup(index: number): void {
  //   if (this.phoneArray.length > 1) {
  //     this.phoneArray.removeAt(index);
  //   }
  // }
  // deleteEmailGroup(index: number): void {
  //   if (this.emailArray.length > 1) {
  //     this.emailArray.removeAt(index);
  //   }
  // }
  // deleteSocialMediaGroup(index: number): void {
  //   if (this.socialMediaArray.length > 1) {
  //     this.socialMediaArray.removeAt(index);
  //   }
  // }

  // // Creating Groups

  // createAddressGroup(): FormGroup {
  //   return this.fb.group({
  //     addressFor: ['Address'],
  //     address: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.pattern(new RegExp(/^[a-zA-Z0-9\s-\.\/',]*$/)),
  //         emptyValidator(),
  //       ],
  //     ],
  //   });
  // }

  // createPhoneGroup(): FormGroup {
  //   return this.fb.group({
  //     phoneText: ['Default'],
  //     phoneNumber: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.pattern(
  //           new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
  //         ),
  //         emptyValidator(),
  //       ],
  //     ],
  //     phoneType: ['Default'],
  //     timing: ['00:00-23:59'],
  //     days: this.fb.array([
  //       'Monday',
  //       'Tuesday',
  //       'Wednesday',
  //       'Thrusday',
  //       'Friday',
  //       'Saturday',
  //       'Sunday',
  //     ]),
  //     shift: [''],
  //     associatedWith: [''],
  //   });
  // }

  // createEmailGroup(): FormGroup {
  //   return this.fb.group({
  //     emailText: [''],
  //     emailAddress: [''],
  //     emailType: [''],
  //     shift: [''],
  //     associatedWith: [''],
  //   });
  // }

  // createSocialMediaGroup(): FormGroup {
  //   return this.fb.group({
  //     socialMediaType: [''],
  //     socialMediaLink: [''],
  //   });
  // }

  // // Getters

  // get addressArray(): FormArray {
  //   return (this.addOrganizationForm.controls.contactDetails as FormGroup)
  //     .controls.address as FormArray;
  // }

  // get phoneArray(): FormArray {
  //   return (this.addOrganizationForm.controls.contactDetails as FormGroup)
  //     .controls.phone as FormArray;
  // }

  // get emailArray(): FormArray {
  //   return (this.addOrganizationForm.controls.contactDetails as FormGroup)
  //     .controls.email as FormArray;
  // }

  // get socialMediaArray(): FormArray {
  //   return (this.addOrganizationForm.controls.contactDetails as FormGroup)
  //     .controls.socialMedia as FormArray;
  // }

  // daysArray(i: number): FormArray {
  //   return (((this.addOrganizationForm.controls.contactDetails as FormGroup)
  //     .controls.phone as FormArray).controls[i] as FormGroup).controls
  //     .days as FormArray;
  // }

  // // -----------------------------------------------------------------------------------
  // // Step 4 ----------------------------------------------------------------------------
  // // -----------------------------------------------------------------------------------

  // createAdditionalDocumentGroup(): FormGroup {
  //   return this.fb.group({
  //     documentType: [''],
  //     documentNumber: [''],
  //     registrationDocument: [''],
  //     validUpto: [''],
  //   });
  // }

  // addAdditionalDocumentGroup(): void {
  //   this.additionalDocumentArray.push(this.createAdditionalDocumentGroup());
  // }

  // deleteAdditionalDocumentGroup(index: number): void {
  //   if (this.additionalDocumentArray.length > 1) {
  //     this.additionalDocumentArray.removeAt(index);
  //   }
  // }

  // get additionalDocumentArray(): FormArray {
  //   return (this.addOrganizationForm.controls.registrationDetails as FormGroup)
  //     .controls.additionalDocument as FormArray;
  // }

  // // -----------------------------------------------------------------------------------
  // // Step 5 ----------------------------------------------------------------------------
  // // -----------------------------------------------------------------------------------

  // selectAllModulesToggle(): void {
  //   this.moduleArray.clear();
  //   this.selectAllInstitute = !this.selectAllInstitute;
  //   // console.log(this.selectAllInstitute);
  //   if (this.selectAllInstitute) {
  //     this.moduleList.forEach((item) => {
  //       item.value = true;
  //       this.moduleArray.push(new FormControl(item.type));
  //     });
  //   } else {
  //     this.moduleList.forEach((item) => {
  //       item.value = false;
  //     });
  //   }
  //   console.log(this.moduleArray.value);
  // }

  // onModuleSelectChange(e): void {
  //   if (e.target.checked) {
  //     this.moduleArray.push(new FormControl(e.target.value));
  //   } else {
  //     let i = 0;
  //     this.moduleArray.controls.forEach((item: FormControl) => {
  //       if (item.value === e.target.value) {
  //         this.moduleArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  //   if (this.moduleArray.controls.length === this.moduleList.length) {
  //     this.selectAllInstitute = true;
  //   } else {
  //     this.selectAllInstitute = false;
  //   }
  //   console.log(this.moduleArray.value);
  // }

  // get moduleArray(): FormArray {
  //   return (this.addOrganizationForm.controls.settings as FormGroup).controls
  //     .modules as FormArray;
  // }

  // -----------------------------------------------------------------------------------
  // Step 6 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Step 7 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

}
