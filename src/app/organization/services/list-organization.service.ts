import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ListOrganizationService {

  constructor(private http: HttpClient) { }

  api = environment.orgAPI;

  getAllOrganization(): Observable<any> {
    return this.http.get(`${this.api}/organization/list?orgTableType=ORGANIZATION`)
  }

  updateOrganization(body: any): Observable<any> {
    return this.http.put(`${this.api}/organization/update`, body)
  }
}
