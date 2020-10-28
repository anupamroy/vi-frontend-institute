import { Component, OnInit } from '@angular/core';
import { ModelForPackage } from '../model';
import { PackagesService } from '../../../services/packages.service'
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Packages } from '../../../../shared/models/packages';
=======
import {Packages} from '../../../../shared/models/packages';
import Swal from 'sweetalert2'
>>>>>>> 44c6a27ccbe7f5a47c833c1117f08bf15b2f3b1e

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
  packageType: string
  packageName: string = ''
  paymentPlan: string
  packageDuration: string
  packagePrice: string
  packageDescription: string = ''
  isTrial: boolean = false
  trialDuration: string = ''

  package: ModelForPackage

  packageTypeArray: string[]
  paymentPlanArray: string[]


  constructor(private packageService: PackagesService, private router: Router) { }


  requiredTrialDuration(): boolean {


    if (this.isTrial) {
      if (this.trialDuration.trim() === '')
        return true
      else
        return false
    } else
      return false
  }

  paymentPlanOnChange(event: any) {
    console.log(event.target.value);

    this.paymentPlan = event.target.value
  }
  packageTypeOnChange(event: any) {
    this.packageType = event.target.value
  }

  checkBoxOnChange(event: any) {
    console.log('checkBox: ' + this.isTrial);


  }

  requiredPackageValidator(): boolean {
    if (this.packageName.trim() === '')
      return true;
    else
      return false;
  }
  requiredDurationValidator(): boolean {
    if (this.packageDuration.trim() === '')
      return true;
    else
      return false;
  }
  requiredPriceValidator(): boolean {
    if (this.packagePrice.trim() === '')
      return true;
    else
      return false;
  }
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
<<<<<<< HEAD
    this.packageService.addPackage(obj).subscribe((data) => {
      console.log(data);
      if (data) {
        this.router.navigate(['./org/list-packages'])
      }

    })

=======

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: ()=>{
        Swal.showLoading();
        this.packageService
          .addPackage(obj)
          .subscribe((data) => {
          console.log('ID'+data);
          if(data){
            Swal.fire({
              title: 'Added',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              this.router.navigate(['./org/list-packages']);
            })  
          }
        });
        // Swal.close()
       
      }
    });
    // this.packageService.addPackage(obj).subscribe((data)=> {
    //   console.log(data);
    //   if(data) {
    //     this.router.navigate(['./org/list-packages'])
    //   }
      
    // })
    
>>>>>>> 44c6a27ccbe7f5a47c833c1117f08bf15b2f3b1e
  }
  ngOnInit(): void {
    this.packageTypeArray = this.packageService.getPackageType()
    console.log(this.packageTypeArray)
    this.paymentPlanArray = this.packageService.getPaymentPlan()
    console.log(this.paymentPlanArray);
  }

}
