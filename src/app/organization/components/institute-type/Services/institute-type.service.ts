import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituteTypeService {
  api = environment.api2;

  constructor(private http : HttpClient) { }

    /**
   * sends a single request
   * 
   * @returns {Observable<any>} 
   * @memberof InstituteTypeService
   */
  getInstituteType():Observable<any> {
    return this.http.get<any>(`${this.api}/institutiontype/list`, {
      params: {['masterType']: 'INSTITUTE_TYPE'}
    })
  }

    /**
   * sends a single request
   * 
   * @param {InstituteType} body  
   * @returns {Observable<any>} 
   * @memberof InstituteTypeService
   */
  updateInstituteTypeById(body: any):Observable<any>{
    return this.http.put<any>(`${this.api}/institutiontype/update`, body) 
  }

    /**
   * sends a single request
   * 
   * @param {InstituteType} body  
   * @returns {Observable<any>} 
   * @memberof InstituteTypeService
   */
  postInstituteType(body: any):Observable<any>{
    return this.http.post<any>(`${this.api}/institutiontype/save`, body)
  }

    /**
   * sends a single request
   * 
   * @param {InstituteType} body  
   * @returns {Observable<any>} 
   * @memberof InstituteTypeService
   */
  deleteInstituteType(body: any):Observable<any>{
    return this.http.put<any>(`${this.api}/institutiontype/delete`, body) 
  }

}
