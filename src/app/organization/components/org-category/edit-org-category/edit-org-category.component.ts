import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { OrganizationCategoryService } from '../Services/organization-category.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-org-category',
  templateUrl: './edit-org-category.component.html',
  styleUrls: ['./edit-org-category.component.scss']
})
export class EditOrgCategoryComponent implements OnInit {

  OrgCategory: string
  id: string

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private organizationService : OrganizationCategoryService ) { }

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
      this.organizationService
        .updateOrganizationById(this.id, {
          attribute: ['orgCategory'],
          value: [
            this.OrgCategory
          ],
        })
        .subscribe((data) => {
          console.log(data);
        });
        
        Swal.fire({
          title: 'Editted',
          text: 'Data Editted Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          setTimeout(() => {
            this.router.navigate(['./org/list-org-category']);
          }, 500);
        })
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
    const orgCategory =this.activatedRoute.snapshot.params.orgCategory
    console.log(this.id, orgCategory)
    this.OrgCategory = orgCategory
  }

}
