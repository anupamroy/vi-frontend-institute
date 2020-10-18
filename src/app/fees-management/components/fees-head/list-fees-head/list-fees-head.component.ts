import { Component, OnInit } from '@angular/core';
import { FeesService } from '../../../services/fees.service';

@Component({
  selector: 'app-list-fees-head',
  templateUrl: './list-fees-head.component.html',
  styleUrls: ['./list-fees-head.component.scss'],
})
export class ListFeesHeadComponent implements OnInit {
  feesHeadList = [];

  constructor(private feesService: FeesService) {}

  ngOnInit(): void {
    fetch(
      'https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/fees/all'
    )
      .then((res) => res.json())
      .then((res) => {
        this.feesHeadList = JSON.parse(res).Items;
        this.feesHeadList = this.feesHeadList;
      });
  }

  // tslint:disable-next-line: typedef
  onDelete(id: string) {
    fetch(
      `https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/fees/${id}`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => {
        this.feesHeadList = this.feesHeadList.filter((item) => {
          return item.fees_head_id !== id;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
