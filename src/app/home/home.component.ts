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
  }

  signIn = (event) => {
    let phone_number = "+91" + this.phone_number;
    let password = "helloWorld";
    // let otp = prompt(`OTP sent to your phone number to ${phoneNumber} ::${Date.now().toString().slice(-4)}`)

    // if (otp.length > 4) {
    //   alert('Please enter 4 digit')
    // }
    // else {
    //   Auth.signIn(phoneNumber).then(user => {
    //     user = user;
    //     console.log(user);

    //     //setting up the username
    //     this.authDataService.setUserName(user.username);

    //     this.router.navigate(['org'])
    //   }).catch(err => {
    //     alert(`${this.phone_number} is not registered as Super Admin.`)
    //     this.router.navigate([''])
    //   })
    // }

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

        // Auth.signIn(phone_number).then(user => {
        //   user = user;
        //   console.log(user);


        //   //setting up the username
        //   this.authDataService.setUserName(user.username);
        //   this.router.navigate(['org'])
        // }).catch(err => {
        //   Swal.fire('Authentication Failed', `${this.phone_number} is not registered as Super Admin.`, 'error')
        //   this.router.navigate([''])
        // })
        this.auth.signIn(phone_number, password).subscribe((data) => {
          this.router.navigate(['org']);
        }, (err)=> {
          // this.emailVerificationMessage = true;
          Swal.fire('Authentication Failed', `${this.phone_number} is not registered as Super Admin.`, 'error')
           this.router.navigate([''])
        });   
      
      }
    })
  }
}
