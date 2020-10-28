import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EditOrganizationService {
  api = environment.api
  constructor(private http: HttpClient) { }

  organizationType: string[] = ['Seller','Institute']
  emailType: string[] = ['Primary','Emergency']

  getOrganizationType(){
    return this.organizationType
  }

  getEmailType() {
    return this.emailType
  }

  getOrganization():Observable<any>{
    return this.http.get<any>(`${this.api}/all`);
  }
  getOrganizationById(id : string):Observable<any>{
    return this.http.get<any>(`${this.api}/${id}?masterType=ORGANIZATION`);
  }

  updateOrganizationById(id : string,body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body);
  }
}
