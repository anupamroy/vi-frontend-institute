import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, input } from 'aws-amplify';
import {AuthService} from '../shared/Services/auth.service'
import Swal from 'sweetalert2';
import { AuthDataService } from '../shared/Services/auth-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  phone_number: number;

  constructor(private router: Router, private authDataService: AuthDataService, private auth : AuthService) { }

  ngOnInit(): void {
    // this.auth.isLoggedIn();
    
  }

  signIn = (event) => {
    let phone_number = "+91" + this.phone_number;
    let password = "helloWorld";
    Swal.fire({
      title: "OTP",
      text: `OTP sent to your phone number ${phone_number} :: ${Date.now().toString().slice(-4)}`,
      input: "text",
      showCancelButton: true
    }).then((result) => {
      const otp = result.value;
      
      if (otp.length > 4) {
        Swal.fire('Invalid OTP', '', 'error')
      }
      else {
        this.auth.signIn(phone_number, password).subscribe((data) => {
          this.router.navigate(['org']);
          this.authDataService.setUserName('SuperAdmin'); //obj in 
        }, (err)=> {
          // this.emailVerificationMessage = true;
          Swal.fire('Authentication Failed', `${this.phone_number} is not registered as Super Admin.`, 'error')
           this.router.navigate([''])
        });   
      
      }
    })
  }
}
