import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root',
})
export class FeesService {
  api = environment.api2;
  apiSuffix = "?masterType=FEES_TYPE";

  constructor(private http: HttpClient) { }

  /**
 * sends a single request
 * 
 * @param {any} body  
 * @returns {Observable<any>} 
 * @memberof FeesService
 */
  getFeesType(): Observable<any> {
    return this.http.get<any>(`${this.api}/feestype/list/${this.apiSuffix}`)
  }

  /**
 * sends a single request
 * 
 * @param {string} id  
 * @returns {Observable<any>} 
 * @memberof FeesService
 */
  getFeesTypeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/feestype/getbyid/${id}/${this.apiSuffix}`)
  }


  /**
 * sends a single request
 * 
 * @param {string} id  
 * @param {any} body  
 * @returns {Observable<any>} 
 * @memberof FeesService
 */
  updateFeesTypeById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/feestype/update`, body)
  }

  /**
 * sends a single request
 * 
 * @param {string} id  
 * @param {any} body  
 * @returns {Observable<any>} 
 * @memberof FeesService
 */
  deleteFeesTypeById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/feestype/delete`, body);
  }

  /**
   * sends a single request
   * 
   * @param {any} body  
   * @returns {Observable<any>} 
   * @memberof FeesService
   */
  addFeesType(body: any): Observable<any> {
    return this.http.post<any>(`${this.api}/feestype/save`, body)
  }
}
