import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EditOrganizationService {
  api = environment.api
  constructor(private http: HttpClient) { }

  organizationType: string[] = ['Seller', 'Institute']
  emailType: string[] = ['Primary', 'Emergency']

/**
 * get Attrible value
 * 
 * @memberof EditOrganizationService
 */
  getOrganizationType() {
    return this.organizationType
  }

/**
 * Get Attribute Value
 * 
 * @returns {string} 
 * @memberof EditOrganizationService
 */
  getEmailType() {
    return this.emailType
  }

  /**
   * get Organization
   * 
   * @returns {Observable<any>} 
   * @memberof EditOrganizationService
   */
  getOrganization(): Observable<any> {
    return this.http.get<any>(`${this.api}/all`);
  }

  /**
   * sends a single request
   * 
   * @param {string} id  
   * @returns {Observable<any>} 
   * @memberof EditOrganizationService
   */
  getOrganizationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}?masterType=ORGANIZATION`);
  }

  /**
   * sends a single request
   * 
   * @param {any} body 
   * @param {string} id  
   * @returns {Observable<any>} 
   * @memberof EditOrganizationService
   */
  updateOrganizationById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body);
  }
}
