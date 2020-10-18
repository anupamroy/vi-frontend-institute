import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-edit-org-category',
  templateUrl: './edit-org-category.component.html',
  styleUrls: ['./edit-org-category.component.scss']
})
export class EditOrgCategoryComponent implements OnInit {

  OrgCategory: string
  id: string

  constructor(private activatedRoute : ActivatedRoute, private router : Router ) { }

  enableButton() {
    if(this.OrgCategory.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  onClick(){
   
      console.log(this.OrgCategory)

      fetch(`https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/${this.id}`, {
        method : 'PUT',
        body : JSON.stringify({
          "attribute" : ["orgCategory"],
          "value" : [this.OrgCategory]
        })
      })
      .then( result => {
        console.log(result)
        this.router.navigate(['/org/list-org-category'])
      })
      .catch(err => {
        console.log(err)
      })

    
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.itemId;
    const orgCategory =this.activatedRoute.snapshot.params.orgCategory
    console.log(this.id, orgCategory)
    this.OrgCategory = orgCategory
  }

}
