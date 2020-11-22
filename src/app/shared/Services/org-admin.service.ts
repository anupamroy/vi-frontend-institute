import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrgAdminService {

  constructor(private http: HttpClient) { }

  getSellerProfile(id) {
    return this.http.get(`https://69jm8b6ya5.execute-api.ap-south-1.amazonaws.com/Prod/seller/org/${id}?orgTableType=ORGANIZATION`);
  }

  getInstituteProfile(id) {
    return this.http.get(`https://fsvq9a4d1d.execute-api.ap-south-1.amazonaws.com/Prod/institute/org/${id}?orgTableType=ORGANIZATION`);
  }
}
