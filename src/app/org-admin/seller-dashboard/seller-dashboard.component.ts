import { Component, OnInit } from '@angular/core';
import { AuthDataService } from 'src/app/shared/Services/auth-data.service';
import {OrgAdminService } from '../../shared/Services/org-admin.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {

  constructor(private orgAdminService : OrgAdminService, private authDataService: AuthDataService) { }

  ngOnInit(): void {
    let org_id = sessionStorage.getItem('org_id');
    console.log(org_id);
    this.orgAdminService.getSellerProfile(org_id).subscribe(res => {
      this.authDataService.setHeaderForUser(res);
      console.log(res);
      
    })
    console.log("hello");
    
  }

}
