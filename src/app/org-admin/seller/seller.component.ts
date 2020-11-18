import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataService } from 'src/app/shared/Services/auth-data.service';
import { LoginSellerService } from 'src/app/shared/Services/login-seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  phone_number: number;
  constructor(private router: Router, private authDataService: AuthDataService, private auth : LoginSellerService) { }

  ngOnInit(): void {
  }

  signIn=(event)=>{
    console.log('signin fired!!');
    
    let phone_number = "+91" + this.phone_number;
    let password : string;
    
    Swal.fire({
      title: "Password",
      text : 'Enter your password to enter Seller Dashboard',
      input: "password",
      showCancelButton: true
    }).then((result) => {
      password = result.value;
      
      if (password === '' || password.length < 8) {
        Swal.fire('Password length must be 8 ', '', 'error')
      }
      else {
        this.auth.signIn(phone_number, password).subscribe((data) => {
          this.router.navigate(['/seller-dashboard']);
          this.authDataService.setUserName('Admin'); //obj in 
        }, (err)=> {
          // this.emailVerificationMessage = true;
          Swal.fire('Authentication Failed', `You are not registered as Seller Admin.`, 'error')
           this.router.navigate(['seller'])
        });   
      
      }
    })
  }
}
