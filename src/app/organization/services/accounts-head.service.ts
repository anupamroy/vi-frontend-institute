import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AccountsHeadService {
 
  api = environment.api;
  api2 = environment.api2;
  apiSuffix = "?masterType=ACCOUNTS_HEAD";

  constructor(private http: HttpClient) {}

  getAccountsHead():Observable<any> {
    return this.http.get<any>(`${this.api2}/accountshead/list/${this.apiSuffix}`)
  }

  getAccountsHeadById(id: string):Observable<any> {
    return this.http.get<any>(`${this.api2}/accountshead/getbyid/${id}/${this.apiSuffix}`)
  }

  updateAccountsHeadById(id: string, body: any):Observable<any> {
    return this.http.put<any>(`${this.api2}/accountshead/update`, body)
  }

  deleteAccountsHeadById(id: string, body: any):Observable<any> {
    return this.http.put<any>(`${this.api2}/accountshead/delete`,body)
  }

  addAccountsHead(body: any):Observable<any> {
    return this.http.post<any>(`${this.api2}/accountshead/save`,body)
  }
}
