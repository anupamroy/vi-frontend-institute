import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationCategoryService {

  api = environment.api;
  api2 = environment.api2;
  apiSuffix = "?masterType=ORGANIZATION_CATEGORY"
  constructor(private http : HttpClient) { }

  getOrganizationCategory():Observable<any> {
    return this.http.get<any>(`${this.api2}/orgcategory/list/${this.apiSuffix}`)
  }

  getOrganizationCategoryById(id: string): any {
    return this.http.get(`${this.api2}/orgcategory/getbyid/${id}/${this.apiSuffix}`);
  }

  updateOrganizationById(id: string, body: any): Observable<any> {
    console.log(body);
    
    return this.http.put<any>(`${this.api2}/orgcategory/update`, body);
  }

  deleteOrganizationById(id: string,body: any): Observable<any> {
    return this.http.put<any>(`${this.api2}/orgcategory/delete`, body);
  }

  addOrganizationCategory(body: any): Observable<any> {
    return this.http.post<any>(`${this.api2}/orgcategory/save`, body);
  }


}
