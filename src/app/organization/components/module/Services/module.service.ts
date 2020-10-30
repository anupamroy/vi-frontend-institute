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

  

  getModules():Observable<any> {
    return this.http.get<any>(`${this.api2}/module/list${this.apiSuffix}`)
  }

  updateModule(id : string, body : any):Observable<any>{
    return this.http.put<any>(`${this.api2}/module/update`,body) 
  }

  postModule(body: any):Observable<any>{
    return this.http.post<any>(`${this.api2}/module/save`, body)
  }

  deleteModule(id : string, body: any):Observable<any>{
    console.log(body);
    
    return this.http.put<any>(`${this.api2}/module/delete` , body) 
  }

}

