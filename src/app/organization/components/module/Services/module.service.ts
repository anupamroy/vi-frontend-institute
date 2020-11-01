import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  api = environment.api;
  api2 = environment.api2;
  apiSuffix = "?masterType=MODULE"


  constructor(private http : HttpClient) { }

  
    /**
   * sends a single request
   * 
   * @returns {Observable<any>} 
   * @memberof ModuleService
   */
  getModules():Observable<any> {
    return this.http.get<any>(`${this.api2}/module/list${this.apiSuffix}`)
  }

      /**
   * sends a single request
   * 
   * @param {string} id
   * @param {Module} body 
   * @returns {Observable<any>} 
   * @memberof ModuleService
   */
  updateModule(id : string, body : any):Observable<any>{
    return this.http.put<any>(`${this.api2}/module/update`,body) 
  }

      /**
   * sends a single request
   * 
   * @param {Module} body 
   * @returns {Observable<any>} 
   * @memberof ModuleService
   */
  postModule(body: any):Observable<any>{
    return this.http.post<any>(`${this.api2}/module/save`, body)
  }

      /**
   * sends a single request
   * 
   * @param {Module} body 
   * @returns {Observable<any>} 
   * @memberof ModuleService
   */
  deleteModule(id : string, body: any):Observable<any>{
    console.log(body);
    
    return this.http.put<any>(`${this.api2}/module/delete` , body) 
  }

}

