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

  getFeesType(): Observable<any> {
    return this.http.get<any>(`${this.api}/feestype/list/${this.apiSuffix}`)
  }

  getFeesTypeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/feestype/getbyid/${id}/${this.apiSuffix}`)
  }

  updateFeesTypeById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/feestype/update`, body)
  }

  deleteFeesTypeById(id:string, body :any) : Observable<any>{
    return this.http.put<any>(`${this.api}/feestype/delete`,body);
  }
  

  addFeesType(body: any): Observable<any> {
    return this.http.post<any>(`${this.api}/feestype/save`, body)
  }
}
