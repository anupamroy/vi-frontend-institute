import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthDataService } from '../../Services/auth-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  username: string;

  constructor(private authDataService: AuthDataService) { }

  ngOnInit(): void {
    this.authDataService.getUserName().subscribe((username) => {
      this.username = username;
    })
  }
  
  ngOnChanges(): void {
    // this.authDataService.getUserName().subscribe((username) => {
    //   this.username = username;
    // })
  }
}
