import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AccountsHeadService {

  private api = environment.api;
  private api2 = environment.api2;
  private apiSuffix = "?masterType=ACCOUNTS_HEAD";

  constructor(private http: HttpClient) { }

  /**
   * sends a single request
   * 
   * @param {AccountsHead} body  
   * @returns {Observable<any>} 
   * @memberof HttpQueue
   */
  getAccountsHead(): Observable<any> {
    return this.http.get<any>(`${this.api2}/accountshead/list/${this.apiSuffix}`)
  }

  /**
   * sends a single request
   * 
   * @param {AccountsHead} body  
   * @returns {Observable<any>} 
   * @memberof HttpQueue
   */
  getAccountsHeadById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api2}/accountshead/getbyid/${id}/${this.apiSuffix}`)
  }

  /**
   * sends a single request
   * 
   * @param {AccountsHead} body  
   * @returns {Observable<any>} 
   * @memberof HttpQueue
   */
  updateAccountsHeadById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api2}/accountshead/update`, body)
  }

  /**
   * sends a single request
   * 
   * @param {AccountsHead} body  
   * @returns {Observable<any>} 
   * @memberof HttpQueue
   */
  deleteAccountsHeadById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api2}/accountshead/delete`, body)
  }

  /**
   * sends a single request
   * 
   * @param {AccountsHead} body  
   * @returns {Observable<any>} 
   * @memberof HttpQueue
   */
  addAccountsHead(body: any): Observable<any> {
    return this.http.post<any>(`${this.api2}/accountshead/save`, body)
  }
}
