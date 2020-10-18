import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-org-category',
  templateUrl: './add-org-category.component.html',
  styleUrls: ['./add-org-category.component.scss']
})
export class AddOrgCategoryComponent implements OnInit {

  disableButton : boolean = true
  orgCategory : string = ''

  constructor() { }

  onAddOrgCategory( event : Event ){
    //this.disableButton = false
    this.orgCategory = (<HTMLInputElement>event.target).value

  }

  onSubmit(){
    const orgCategoryObj = {
      orgCategory : this.orgCategory
    }

    console.log(orgCategoryObj)

    fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org', {
      method : 'post',
      body : JSON.stringify(orgCategoryObj)
    })
    .then(result =>{
      console.log(result)
      
    })
    .catch(err => {
      console.log(err)
    })


  }

  ngOnInit(): void {
  }

}
