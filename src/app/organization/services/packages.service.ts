import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  api = environment.api;
  api2 = environment.api2;
  apiSuffix = "?masterType=PACKAGE";
  constructor(private http: HttpClient) { }

  packageTypeArray: string[] = ['Type 1','Type 2','Type 3']
  paymentPlanArray: string[] = ['Plan 1','Plan 2','Plan 3']

    /**
   * sends a single request
   * 
   * @param {any} body  
   * @returns {Observable<any>} 
   * @memberof AddOrganizationService
   */
  getPackageType(){
    return this.packageTypeArray
  }

    /**
   * sends a single request
   * 
   * @param {any} body  
   * @returns {Observable<any>} 
   * @memberof AddOrganizationService
   */
  getPaymentPlan(){
    return this.paymentPlanArray
  }

    /**
   * sends a single request
   * 
   * @param {any} body  
   * @returns {Observable<any>} 
   * @memberof AddOrganizationService
   */
  getPackage():Observable<any> {
    return this.http.get<any>(`${this.api2}/package/list/${this.apiSuffix}`)
  }

    /**
   * sends a single request
   * 
   * @param {any} body  
   * @returns {Observable<any>} 
   * @memberof AddOrganizationService
   */
  getPackageById(id: string):Observable<any> {
    return this.http.get<any>(`${this.api2}/package/getbyid/${id}/${this.apiSuffix}`)
  }

    /**
   * sends a single request
   * 
   * @param {any} body  
   * @returns {Observable<any>} 
   * @memberof AddOrganizationService
   */
  updatePackageById(id: string, body: any):Observable<any> {
    console.log(body);
    
    return this.http.put<any>(`${this.api2}/package/update`, body)
  }

    /**
   * sends a single request
   * 
   * @param {any} body  
   * @returns {Observable<any>} 
   * @memberof AddOrganizationService
   */
  deletePackagebyId(id: string,body:any):Observable<any> {
    return this.http.put<any>(`${this.api2}/package/delete`, body)
  }

    /**
   * sends a single request
   * 
   * @param {any} body  
   * @returns {Observable<any>} 
   * @memberof AddOrganizationService
   */
  addPackage(body: any):Observable<any> {
    return this.http.post<any>(`${this.api2}/package/save`,body)
  }
}
