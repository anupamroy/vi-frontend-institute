import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  phone_number:number;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  signIn =(event)=>{
    console.log(event);
    
    console.log('my number======',this.phone_number);
    if(this.phone_number)
      {
        this.router.navigate(['org'])
      }
  }
}
