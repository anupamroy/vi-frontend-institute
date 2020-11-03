import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  api = environment.api2
  apiSuffix = '?masterType=STREAM'

  constructor(private http: HttpClient) { }

  saveStream = (body: any): Observable<any> => {
    return this.http.post<any>(`${this.api}/stream/save`, body);
  }

  getAllStream = () :Observable<any> =>{
    return this.http.get<any>(`${this.api}/stream/list${this.apiSuffix}`)
  }

  deleteStream = (id:string,body:any) : Observable<any> => {
    return this.http.put<any>(`${this.api}/stream/delete`,body)
  }

  activateStream = (id:string, body:any) :Observable<any> =>{
    return this.http.put<any>(`${this.api}/stream/change-status`,body)
  }

  updateStream = (id:string,body:any) :Observable<any> =>{
    return this.http.put<any>(`${this.api}/stream/update`,body)
  }

  getStreamById = (id:string) :Observable<any> =>{
    return this.http.get(`${this.api}/stream/getbyid/${id}/${this.apiSuffix}`)
  }

}
