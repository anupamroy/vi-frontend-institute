import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationCategoryService } from '../Services/organization-category.service'
import Swal from 'sweetalert2'
import { OrganizationCategory } from '../../../../shared/models/org-catagory';
@Component({
  selector: 'app-add-org-category',
  templateUrl: './add-org-category.component.html',
  styleUrls: ['./add-org-category.component.scss']
})
export class AddOrgCategoryComponent implements OnInit {

   /** Attribute of OrganizationCategory Table */
  disableButton : boolean = true;

   /** Attribute of OrganizationCategory Table */
  orgCategory : string = '';

   /** Attribute of OrganizationCategory Table */
  requiredError : string = 'Organization Category cannot be blank';

   /** Attribute of OrganizationCategory Table */
  validationError : string = 'Special Characters and Numbers are not Allowed'

  constructor(private router : Router, private organizationService : OrganizationCategoryService) { }

/**
 * Enable disable button
 * 
 * @param {boolean} 
 * @memberof OrganizationCategory
 */
  enableButton() {
    if(this.orgCategory && this.orgCategory.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  /**
 * Validate against reg expression 
 * 
 * @param {boolean} 
 * @memberof OrganizationCategory
 */
  enableAlert(){
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.orgCategory)
  }

/**
 * Submit handler to create a Organization category
 * 
 * 
 * @memberof OrganizationCategory
 */
  onSubmit(){
    const orgCategoryObj = new OrganizationCategory();
    orgCategoryObj.organizationCategory = this.orgCategory;
    orgCategoryObj.isActivated = true;
    orgCategoryObj.isDeleted = false;
    
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: ()=>{
        Swal.showLoading();
        this.organizationService
          .addOrganizationCategory(orgCategoryObj)
          .subscribe((data) => {
          console.log('ID'+data);
          if(data){
            Swal.fire({
              title: 'Added',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              this.router.navigate(['./org/list-org-category']);
            })  
          }
        });
        // Swal.close()
       
      }
    });

    // this.organizationService
    //     .addOrganizationCategory(orgCategoryObj)
    //     .subscribe((data) => {
    //       console.log(data);
    //     });
    
    // Swal.fire({
    //   title: 'Added',
    //   text: 'Data Added Successfully',
    //   icon: 'success',
    //   confirmButtonText: 'Ok'
    // }).then(()=>{
    //   setTimeout(() => {
    //     this.router.navigate(['./org/list-org-category']);
    //   }, 500);
    // })
  }

  ngOnInit(): void {
  }

}
