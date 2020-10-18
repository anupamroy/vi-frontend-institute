import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-org-category',
  templateUrl: './view-org-category.component.html',
  styleUrls: ['./view-org-category.component.scss']
})
export class ViewOrgCategoryComponent implements OnInit {

  orgCategory : any;
  finalItems : any
  constructor() { }

  onDelete(id: string){
    fetch(`https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      console.log(res)

      this.finalItems = this.finalItems.filter((item) => {
        return item.itemId !== id;
      })
    }).catch((err) => {
      console.log(err)
    })
  }


  ngOnInit(): void {
    fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/all')
    .then( res=> res.json())
    .then( res => {
      this.orgCategory = JSON.parse(res).Items;
      console.log(this.orgCategory)

      let temp= []
      this.orgCategory.forEach(record => {
        if(record.orgCategory){
          temp.push(record)
        }
      })
      this.finalItems = temp
    })
    .catch(err => console.log(err))
  }
}


