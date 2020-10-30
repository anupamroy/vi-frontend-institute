import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root',
})
export class FeesService {
  api = environment.api;
  api2 = environment.api2;
  apiSuffix = "?masterType=FEES_TYPE";

  constructor(private http: HttpClient) { }

  getFeesType(): Observable<any> {
    return this.http.get<any>(`${this.api}//feestype/list/${this.apiSuffix}`)
  }

  getFeesTypeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api2}/feestype/getbyid/${id}/${this.apiSuffix}`)
  }

  updateFeesTypeById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api2}/feestype/update`, body)
  }

  deleteFeesTypeById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api2}/feestype/delete`)
  }

  addFeesType(body: any): Observable<any> {
    return this.http.post<any>(`${this.api2}/feestype/save`, body)
  }
}
