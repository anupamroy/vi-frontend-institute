import { Component, OnInit } from '@angular/core';
import {FeesService} from '../../../services/fees.service';

@Component({
  selector: 'app-list-fees-head',
  templateUrl: './list-fees-head.component.html',
  styleUrls: ['./list-fees-head.component.scss'],
})
export class ListFeesHeadComponent implements OnInit {
  feesHead = [];

  constructor(private feesService: FeesService) {}

  ngOnInit(): void {


    fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/fees/all')
      .then((res) => res.json())
      .then((res) => {
        this.feesHead = JSON.parse(res).Items;
        this.feesHead = this.feesHead;
        // console.log(this.feesHead);
      });
  }
}
