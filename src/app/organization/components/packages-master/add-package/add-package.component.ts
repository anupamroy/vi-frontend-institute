import { Component, OnInit } from '@angular/core';
import { ModelForPackage } from '../model';
import { PackagesService } from '../../../services/packages.service'
import { Router } from '@angular/router';

import { Packages } from '../../../../shared/models/packages';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

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
  isTrial: boolean = false;

  /** Attribute of Package Table */
  trialDuration: string = '';

  /** Attribute of Package Table */
  package: ModelForPackage

  /** Attribute of Package Table */
  packageTypeArray: string[];

  /** Attribute of Package Table */
  paymentPlanArray: string[]


  constructor(private packageService: PackagesService, private router: Router) { }


/**
 * Validation of duration entered by user
 * 
 * @returns {boolean} 
 * @memberof AddPackageComponent
 */
  requiredTrialDuration(): boolean {
    if (this.isTrial) {
      if (this.trialDuration && this.trialDuration.trim() === '')
        return true
      else
        return false
    } else
      return false
  }

  /**
   * Change Update the parameter value on change
   * @param {Dropdown Selection Change Evenet} $event
   * @memberof AddPackageComponent
   */
  paymentPlanOnChange(event: any) {
    console.log(event.target.value);

    this.paymentPlan = event.target.value
  }

  /**
   * Update the parameter value on change
   * @param {Dropdown Selection Change Evenet} $event
   * @memberof AddPackageComponent
   */
  packageTypeOnChange(event: any) {
    this.packageType = event.target.value
  }


  /**
   * Update the parameter value on change
   * @param {Dropdown Selection Change Evenet} $event
   * @memberof AddPackageComponent
   */
  checkBoxOnChange(event: any) {
    console.log('checkBox: ' + this.isTrial);


  }

  /**
   * 
   * Validate the Parameter 
   *
   * @memberof AddPackageComponent
   */
  requiredPackageValidator(): boolean {
    if (this.packageName.trim() === '')
      return true;
    else
      return false;
  }


  /**
   * 
   * Validate the Parameter 
   *
   * @memberof AddPackageComponent
   */
  requiredDurationValidator(): boolean {
    if (this.packageDuration.trim() === '')
      return true;
    else
      return false;
  }


  /**
   * 
   * Validate the Parameter 
   *
   * @memberof AddPackageComponent
   */
  requiredPriceValidator(): boolean {
    if (this.packagePrice.trim() === '')
      return true;
    else
      return false;
  }


  /**
   * 
   * Form Submit 
   *
   * @memberof AddPackageComponent
   */
  onSubmit() {
    let obj = new Packages();
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

    console.log(obj);

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        this.packageService
          .addPackage(obj)
          .subscribe((data) => {
            console.log('ID' + data);
            if (data) {
              Swal.fire({
                title: 'Added',
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


  }

  /**
 * Load PackageType from Masters Table
 * @memberof AddPackageComponent
 */
  ngOnInit(): void {
    this.packageTypeArray = this.packageService.getPackageType()
    console.log(this.packageTypeArray)
    this.paymentPlanArray = this.packageService.getPaymentPlan()
    console.log(this.paymentPlanArray);
  }

}
