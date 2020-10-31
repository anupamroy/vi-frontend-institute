import { Component, OnInit } from '@angular/core';
import { ModelForPackage } from '../model'
import { PackagesService } from '../../../services/packages.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Packages } from '../../../../shared/models/packages'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss']
})
export class EditPackageComponent implements OnInit {

  /** Attribute of Package Table */
  packageType: string;

  /** Attribute of Package Table */
  packageName: string = '';

  /** Attribute of Package Table */
  paymentPlan: string;

  /** Attribute of Package Table */
  packageDuration: string;

  /** Attribute of Package Table */
  packagePrice: string;

  /** Attribute of Package Table */
  packageDescription: string = '';

  /** Attribute of Package Table */
  isTrial: boolean;

  /** Attribute of Package Table */
  trialDuration: string

  /** Attribute of Package Table partition Key */
  id: string

  /** Attribute of Package Table */
  package: ModelForPackage;

  /** Array contains package type array */
  packageTypeArray: string[];

  /** Array contains playment plan array */
  paymentPlanArray: string[]

  constructor(private packageService: PackagesService, private router: Router, private activatedRoute: ActivatedRoute) { }

/**
 * Process Model attributes to format as Request Parameter
 * 
 * @returns {Packages} 
 * @memberof EditPackageComponent
 */
  processObjUpdated(object: Packages) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'master' && key != 'masterId') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      masterId: object.masterId,
      master: object.master
    }
  }

  /**
 * Route to list packages component
 * 
 * 
 * @memberof EditPackageComponent
 */
  onView() {
    this.router.navigate(['./org/list-packages'])
  }

  /**
 * Route to add packages component
 * 
 * 
 * @memberof EditPackageComponent
 */
  onAdd() {
    this.router.navigate(['./org/add-package']);
  }

/**
 * Route to org component
 * 
 * @returns {boolean} 
 * @memberof EditPackageComponent
 */
  onDashboard() {
    this.router.navigate(['./org'])
  }

/**
 * Update value on selection
 * 
 * @param {Dropdown change event} event
 * @memberof EditPackageComponent
 */
  paymentPlanOnChange(event: any) {
    this.paymentPlan = event.target.value
  }

/**
 * Update value on selection
 * 
 * @param {Dropdown change event} event
 * @memberof EditPackageComponent
 */
  packageTypeOnChange(event: any) {
    this.packageType = event.target.value
  }

  /**
 * chackbox checked event handle
 * 
 * @returns {checked} event
 * @memberof EditPackageComponent
 */
  checkBoxOnChange(event: any) {
    console.log('checkBox: ' + this.isTrial);

    // console.log(document.getElementById('trialPackage'));
    // console.log('Value of checkbox'+event.target.value)
  }

  /**
 * Validation of duration entered by user
 * 
 * @returns {boolean} 
 * @memberof EditPackageComponent
 */
  requiredTrialDuration(): boolean {
    // console.log(this.isTrial);

    if (this.isTrial) {
      if (this.trialDuration.trim() === '')
        return true
      else
        return false
    } else
      return false
  }


  /**
 * Validation of package entered by user
 * 
 * @returns {boolean} 
 * @memberof EditPackageComponent
 */
  requiredPackageValidator(): boolean {
    if (this.packageName.trim() === '')
      return false;
    else
      return true;
  }

  /**
 * Validation of duration entered by user
 * 
 * @returns {boolean} 
 * @memberof EditPackageComponent
 */
  requiredDurationValidator(): boolean {
    if (this.packageDuration.trim() === '')
      return false;
    else
      return true;
  }

  /**
 * Validation of price entered by user
 * 
 * @returns {boolean} 
 * @memberof EditPackageComponent
 */
  requiredPriceValidator(): boolean {
    if (this.packagePrice.trim() === '')
      return false;
    else
      return true;
  }

  /**
 * Submit handler call Api and update the data
 * 
 * @returns {any} 
 * @memberof EditPackageComponent
 */
  onSubmit() {
    var obj = new Packages();
    obj.masterId = this.id;
    obj.packageType = this.packageType;
    obj.packageName = this.packageName;
    obj.paymentPlan = this.paymentPlan;
    obj.packageDuration = this.packageDuration;
    obj.packagePrice = this.packagePrice;
    obj.packageDescription = this.packageDescription;
    obj.isTrial = this.isTrial;
    obj.trialDuration = this.trialDuration;
    obj.isActivated = true;
    obj.isDeleted = false;

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        this.packageService
          .updatePackageById(this.id, this.processObjUpdated(obj))
          .subscribe((data) => {
            console.log('ID' + data);
            if (data) {
              Swal.fire({
                title: 'Edited',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.router.navigate(['./org/list-packages']);
              })
            }
          });
        // Swal.close()

      }
    });
    // this.packageService.updatePackageById(this.id,this.processObjUpdated(obj)
    // ).subscribe((data)=> {
    //   console.log(data);
    //   if(data) {
    //     this.router.navigate(['./org/list-packages'])
    //   }

    // })

  }

  /**
 * load package data by Id to edit
 * 
 * @returns {boolean} 
 * @memberof EditPackageComponent
 */
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.masterId;
    this.packageService.getPackageById(this.id).subscribe((item) => {
      item = JSON.parse(item);
      this.packageType = item.Items[0].packageType
      this.packageName = item.Items[0].packageName
      this.paymentPlan = item.Items[0].paymentPlan
      this.packageDuration = item.Items[0].packageDuration
      this.packagePrice = item.Items[0].packagePrice
      this.packageDescription = item.Items[0].packageDescription
      this.isTrial = item.Items[0].isTrial
      this.trialDuration = item.Items[0].trialDuration

      // Filtering Duplicates
      this.packageTypeArray = this.packageService.getPackageType().filter((items) => {
        return items !== this.packageType;
      })

      // Filtering Duplicates
      this.paymentPlanArray = this.packageService.getPaymentPlan().filter((items) => {
        return items !== this.paymentPlan;
      })
      // this.accountsHead = item.accountsHead
      // this.parentAccountHead = item.parentAccountHead
      console.log(item)
    })

  }

}
