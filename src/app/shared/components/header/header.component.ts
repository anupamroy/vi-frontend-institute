import { Component, OnInit, OnChanges } from '@angular/core';
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
  signoutButton: boolean;
  constructor(private authDataService: AuthDataService, private _auth: AuthService) { }

  ngOnInit(): void {
    this.authDataService.getUserName().subscribe((username) => {
      this.username = username;
    });
    this.authDataService.getHeaderForUser().subscribe((obj) => {
      this.headerData = obj;
    });

    this.signoutButton = this._auth.isLoggedIn()
    console.log('signoutButton',this.signoutButton);
    

  }

  ngOnChanges(): void {
    // this.authDataService.getUserName().subscribe((username) => {
    //   this.username = username;
    // })
  }
}
