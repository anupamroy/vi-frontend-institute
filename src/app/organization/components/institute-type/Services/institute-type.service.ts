import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituteTypeService {
  api = 'https://vs9ge0mhi9.execute-api.ap-south-1.amazonaws.com/Prod/institutiontype';

  constructor(private http : HttpClient) { }

  getInstituteType():Observable<any> {
    return this.http.get<any>(`${this.api}/list`, {
      params: {['masterType']: 'INSTITUTE_TYPE'}
    })
  }

  updateInstituteTypeById(body: any):Observable<any>{
    return this.http.put<any>(`${this.api}/update`, body) 
  }

  postInstituteType(body: any):Observable<any>{
    return this.http.post<any>(`${this.api}/save`, body)
  }

  deleteInstituteType(body: any):Observable<any>{
    return this.http.put<any>(`${this.api}/update`, body) 
  }

}
