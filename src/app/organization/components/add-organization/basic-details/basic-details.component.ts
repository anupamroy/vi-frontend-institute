import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher, validatorForFormControl } from '../common/Validations/MyErrorStateMatcher';
import { AddOrganizationService } from '../../../services/add-organization.service';
import { BasicDetails } from '../../../models/BasicDetails';
import * as _ from 'lodash';
import { InstituteTypeService } from '../../institute-type/Services/institute-type.service';
const jsonData = require('../common/Validations/org_fields.json');

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss']
})
export class BasicDetailsComponent implements OnInit, OnChanges {
  @Input() secondFormGroup: FormGroup;
  @Input() editMode: any = { editing: false, editData: {} };
  @Output() cancelEdit = new EventEmitter();
  organizationMatcher = new MyErrorStateMatcher();
  organizationFields = jsonData;
  instituteTypeList;
  imgURL = "";

  items = ['Item 1', 'Item 2', 'Item 3'];

  constructor(private formBuilder: FormBuilder,
    private addOrganizationService: AddOrganizationService,
    private InstituteTypeService: InstituteTypeService) { }

  ngOnChanges(change) {
    this.secondFormGroup = change.secondFormGroup.currentValue;
    // this.secondFormGroup.reset
    // if(this.secondFormGroup.controls.)
    // this.secondFormGroup.get("instituteTypeSelector").enable();
    console.log("changes view", change.secondFormGroup.currentValue);

  }

  processObjUpdated(object: BasicDetails) {
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



  ngOnInit(): void {
    console.log("second form ", this.secondFormGroup);
    
    this.InstituteTypeService.getInstituteType().subscribe(responseData => {
      const fetchData = JSON.parse(responseData).Items
      console.log('DATA FROM DATABASE: ', fetchData)
      this.instituteTypeList = fetchData.filter((item) => {
        if (item.isDeleted === false) {
          return item
        }
      })

      // console.log('FINAL DATA TO BE POPULATED: ', this.instituteTypeList);
    },
      error => {
        console.log("Institute Type Could not Fetch Data")
      })

  }
  /**
   * Generate a Short code for provided Organization Name
   * @param any event
   * 
   * @memberof BasicDetailsComponent
   */
  generateShortCode(event): void {
    let shortCode = "";
    if (!event.target.value.includes(" ") && event.target.value.length >= 3) {
      this.secondFormGroup.controls.orgShortCode.setValue(String(event.target.value).slice(0, 3));
    } else {
      let temp = String(event.target.value).split(' ');
      temp.forEach(element => {
        if (element.toLowerCase() != 'and' && element.toLowerCase() != 'of')
          shortCode += element.slice(0, 1);
      });
      this.secondFormGroup.controls.orgShortCode.setValue(shortCode.toUpperCase());
    }

  }

  saveBasicDetails(): void {
    console.log(this.secondFormGroup.value);
  }

  cancelEditMode() {
    this.cancelEdit.emit(false);
  }

  updateData() {
    // console.log(this.secondFormGroup.value);
    let basicDetails = this.secondFormGroup.value;
    const basicDetailsObj = new BasicDetails();
    basicDetailsObj.institute_type = basicDetails.instituteTypeSelector;
    basicDetailsObj.org_name = basicDetails.orgName;
    basicDetailsObj.org_short_code = basicDetails.orgShortCode;
    basicDetailsObj.orgKey = this.editMode.editData.orgKey;

    console.log(this.processObjUpdated(basicDetailsObj))

    // API call for basic details
    console.log(basicDetailsObj, this.editMode.editData);
    this.addOrganizationService.updateBasicDetails(this.processObjUpdated(basicDetailsObj)).subscribe(res => {
      let data = JSON.parse(res);
      // console.log("attributes res ",res, data.Attributes);
      let dataset = _.assign(new BasicDetails(), data.Attributes, _.pick(basicDetailsObj, ['orgKey']))
      // console.log("data set .:",dataset)

      this.cancelEdit.emit(false);
      this.addOrganizationService.$refreshList.next(dataset);
    }, error => {
      this.cancelEdit.emit(false);
    })
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(file);
    this.addOrganizationService.uploadFileinS3(file).subscribe(res => {
      console.log(res);
      this.imgURL = res.url;
    }, error => {

    });

  }


  generateORGCODE() {
    return `ORG${''}${this.secondFormGroup.controls.orgShortCode.value}${this.addOrganizationService.firstStepForm}`;
  }

  displayData() {
    console.log(this.secondFormGroup.value)

    // Storing data
    this.addOrganizationService.$preview.next({
      section: "basicDetails",
      basicDetails: _.assign(this.secondFormGroup.value, { org_logo: this.imgURL })
    })

    localStorage.setItem("basic-details", JSON.stringify(this.secondFormGroup.value))
  }

}

