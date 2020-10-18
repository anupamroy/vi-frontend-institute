import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  phone_number: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signIn = (event) => {
    let phoneNumber = "+91" + this.phone_number;
    let otp = prompt(`OTP sent to your phone number to ${phoneNumber} ::${Date.now().toString().slice(-4)}`)

    if (otp.length > 4) {
      alert('Please enter 4 digit')
    }
    else {
      Auth.signIn(phoneNumber).then(user => {
        user = user;
        console.log(user);
        this.router.navigate(['org'])
      }).catch(err => {
        alert(`${this.phone_number} is not registered as Super Admin.`)
        this.router.navigate([''])
      })
    }
  }
}
