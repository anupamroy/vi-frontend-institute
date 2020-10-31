import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { OrganizationCategoryService } from '../Services/organization-category.service'
import Swal from 'sweetalert2'
import { OrganizationCategory } from '../../../../shared/models/org-catagory';

@Component({
  selector: 'app-edit-org-category',
  templateUrl: './edit-org-category.component.html',
  styleUrls: ['./edit-org-category.component.scss']
})
export class EditOrgCategoryComponent implements OnInit {

   /** Attribute of OrganizationCategory Table */
  OrgCategory: string = '';

   /** Attribute of OrganizationCategory Table */
  id: string

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private organizationService : OrganizationCategoryService ) { }


  /**
 * Process Model attributes to format as Request Parameter
 * 
 * @returns {OrganizationCategory} 
 * @memberof EditOrgCategoryComponent
 */
  processObjUpdated(object: OrganizationCategory) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'master' && key !== 'masterId') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      master: object.master,
      masterId: object.masterId
    }
  }
  enableButton() {
    if(this.OrgCategory.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.OrgCategory)
  }

  onClick(){
   
      console.log(this.OrgCategory)
      Swal.fire({
        title: 'Please Wait',
        allowEscapeKey: false,
        allowOutsideClick: true,
        background: '#fff',
        showConfirmButton: false,
        onOpen: ()=>{
          Swal.showLoading();
          
          var obj = new OrganizationCategory();
          obj.organizationCategory = this.OrgCategory;
obj.masterId = this.id;
          this.organizationService
            .updateOrganizationById(this.id, this.processObjUpdated(obj))
            .subscribe((data) => {
            console.log('ID'+data);
            if(data){
              Swal.fire({
                title: 'Edited',
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
      //   .updateOrganizationById(this.id, {
      //     attribute: ['orgCategory'],
      //     value: [
      //       this.OrgCategory
      //     ],
      //   })
      //   .subscribe((data) => {
      //     console.log(data);
      //   });
        
      //   Swal.fire({
      //     title: 'Editted',
      //     text: 'Data Editted Successfully',
      //     icon: 'success',
      //     confirmButtonText: 'Ok'
      //   }).then(()=>{
      //     setTimeout(() => {
      //       this.router.navigate(['./org/list-org-category']);
      //     }, 500);
      //   })
  }

  onAdd(){
    this.router.navigate(['./org/add-org-category'])
  }

  onView(){
    this.router.navigate(['./org/list-org-category'])
  }

  onDashboard(){
    this.router.navigate(['./org'])
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.itemId;
    this.organizationService.getOrganizationCategoryById(this.id).subscribe((item)=>{
      item = JSON.parse(item);
      this.OrgCategory = item.Items[0].organizationCategory
      console.log(item)
    })

    // const orgCategory =this.activatedRoute.snapshot.params.orgCategory
    // console.log(this.id, orgCategory)
    // this.OrgCategory = orgCategory
  }

}
