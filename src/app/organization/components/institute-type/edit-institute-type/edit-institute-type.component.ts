import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-edit-institute-type',
  templateUrl: './edit-institute-type.component.html',
  styleUrls: ['./edit-institute-type.component.scss']
})
export class EditInstituteTypeComponent implements OnInit {
  oldInstituteType = "MTech"
  newInstituteType = ""

  constructor(private activatedRoute : ActivatedRoute, private router : Router ) { }

  onClick(){
    if(this.oldInstituteType !== this.newInstituteType){
      console.log(this.oldInstituteType, this.newInstituteType)

      fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/${id}', {
        method : 'PUT',
        body : JSON.stringify({
          "attribute" : ["instituteType"],
          "value" : [this.newInstituteType]
        })
      })
      .then( result => {
        console.log(result)
        this.router.navigate(['/org/list-institute-type'])
      })
      .catch(err => {
        console.log(err)
      })

    }
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.itemId;
    const instituteType =this.activatedRoute.snapshot.params.instituteType
    console.log(id, instituteType)
    this.oldInstituteType = instituteType


  }

}
