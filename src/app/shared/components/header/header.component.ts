import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataService } from '../../Services/auth-data.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  username: string;
  headerData: any;
  isLoggedIn: boolean = false;
  signoutButton: boolean;
  constructor(private authDataService: AuthDataService, private _auth: AuthService,private _router : Router) { }

  ngOnInit(): void {
    this.authDataService.getUserName().subscribe((username) => {
      this.username = username;
    });
    this.authDataService.getHeaderForUser().subscribe((obj) => {
      this.isLoggedIn = true;
      if(obj) {
        this.headerData = JSON.parse(obj).Items[0];
      }
     
    });
    console.log('this.auth.login',this._auth.isLoggedIn());
    this.signoutButton = this._auth.isLoggedIn();
    console.log('signoutButton',this.signoutButton);
  }
  

  ngOnChanges(): void {
    // this.authDataService.getUserName().subscribe((username) => {
    //   this.username = username;
    // })
    this.signoutButton = true;
    console.log('signoutButton',this.signoutButton);
  }

  signOut():void{
    this._auth.logout();
    this._router.navigate(['home']);
    this.username = ''
  }
}
