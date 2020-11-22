import { Component, OnInit } from '@angular/core';
import { AuthDataService } from 'src/app/shared/Services/auth-data.service';
import { OrgAdminService } from 'src/app/shared/Services/org-admin.service';

@Component({
  selector: 'app-institute-dashboard',
  templateUrl: './institute-dashboard.component.html',
  styleUrls: ['./institute-dashboard.component.scss']
})
export class InstituteDashboardComponent implements OnInit {

  constructor(private orgAdminService : OrgAdminService, private authDataService: AuthDataService) { }

  ngOnInit(): void {
    let org_id = sessionStorage.getItem('org_id');
    console.log(org_id);
    this.orgAdminService.getInstituteProfile(org_id).subscribe(res => {
      this.authDataService.setHeaderForUser(res);      
    })
  }

}
