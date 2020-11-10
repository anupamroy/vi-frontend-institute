import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  phone_number: number;

  constructor() { }

  ngOnInit(): void {
    this.phone_number = 9
  }

  signIn=(event)=>{
    console.log(event);
    
  }
}
