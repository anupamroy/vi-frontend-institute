import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.scss']
})
export class ViewStreamComponent implements OnInit {

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
