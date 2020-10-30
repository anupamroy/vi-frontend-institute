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

  getPackageType(){
    return this.packageTypeArray
  }
  getPaymentPlan(){
    return this.paymentPlanArray
  }

  getPackage():Observable<any> {
    return this.http.get<any>(`${this.api2}/package/list/${this.apiSuffix}`)
  }

  getPackageById(id: string):Observable<any> {
    return this.http.get<any>(`${this.api2}/package/getbyid/${id}/${this.apiSuffix}`)
  }

  updatePackageById(id: string, body: any):Observable<any> {
    console.log(body);
    
    return this.http.put<any>(`${this.api2}/package/update`, body)
  }

  deletePackagebyId(id: string,body:any):Observable<any> {
    return this.http.put<any>(`${this.api2}/package/delete`, body)
  }

  addPackage(body: any):Observable<any> {
    return this.http.post<any>(`${this.api2}/package/save`,body)
  }
}
