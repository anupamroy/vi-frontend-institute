import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-subject-attributes',
  templateUrl: './view-subject-attributes.component.html',
  styleUrls: ['./view-subject-attributes.component.scss']
})
export class ViewSubjectAttributesComponent implements OnInit {

  item:any;
  constructor() { }

  ngOnInit(): void {
    this.item={
      masterId: '1'
    }
  }
  onDelete = (event) => {
    console.log('deleted data');

  }

}
