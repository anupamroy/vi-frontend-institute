import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataService } from 'src/app/shared/Services/auth-data.service';
import { LoginInstituteService } from 'src/app/shared/Services/login-institute.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {
  phone_number: number;

  constructor(private router: Router, private authDataService: AuthDataService, private auth : LoginInstituteService) { }

  ngOnInit(): void {
  }
  signIn = (event) => {
    console.log('signin fired!!');
    
    let phone_number = "+91" + this.phone_number;
    let password : string;
    
    Swal.fire({
      title: "Password",
      text : 'Enter your password to enter Institute Dashboard',
      input: "password",
      showCancelButton: true
    }).then((result) => {
      password = result.value;
      
      if (password === '' || password.length < 8) {
        Swal.fire('Password length must be 8 ', '', 'error')
      }
      else {
        this.auth.signIn(phone_number, password).subscribe((data) => {
          this.router.navigate(['/institute-dashboard']);
          this.authDataService.setUserName('Admin'); //obj in 
        }, (err)=> {
          // this.emailVerificationMessage = true;
          Swal.fire('Authentication Failed', `You not registered as Institute Admin.`, 'error')
           this.router.navigate(['institute'])
        });   
      
      }
    })
    
  }
}
